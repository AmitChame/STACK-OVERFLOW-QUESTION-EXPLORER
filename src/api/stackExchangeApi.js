import { MOCK_QUESTIONS } from "./mockData.js";

const BASE_URL = "https://api.stackexchange.com/2.3";

// In-memory cache for API quota and responses to optimize performance
let lastQuotaRemaining = null;
let apiBackoffUntil = 0;

export async function fetchQuestions({
  query = "",
  tag = "All",
  sort = "votes",
  page = 1,
  pageSize = 10,
  minAnswers = 0,
  forceMock = false,
  signal
} = {}) {
  // If in forced mock mode or currently throttled by API backoff
  const now = Date.now();
  if (forceMock || now < apiBackoffUntil) {
    return filterMockQuestions({ query, tag, sort, page, pageSize, minAnswers });
  }

  try {
    const params = new URLSearchParams({
      site: "stackoverflow",
      order: "desc",
      sort: sort === "answers" ? "votes" : sort,
      page: String(page),
      pagesize: String(pageSize),
      filter: "!nNPvSNdWjv" // includes body, answer_count, owner, tags
    });

    let endpoint = `${BASE_URL}/questions`;

    if (query.trim()) {
      endpoint = `${BASE_URL}/search/advanced`;
      params.set("q", query.trim());
    }

    if (tag && tag !== "All") {
      params.set("tagged", tag.toLowerCase());
    }

    if (minAnswers > 0) {
      params.set("answers", String(minAnswers));
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, { signal });

    if (!response.ok) {
      throw new Error(`Stack Exchange API responded with HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.backoff) {
      apiBackoffUntil = Date.now() + data.backoff * 1000;
    }
    if (data.quota_remaining !== undefined) {
      lastQuotaRemaining = data.quota_remaining;
    }

    // Format questions consistently
    const items = (data.items || []).map((item) => ({
      id: item.question_id,
      question_id: item.question_id,
      title: item.title,
      body: item.body || "",
      score: item.score ?? 0,
      votes: item.score ?? 0,
      answer_count: item.answer_count ?? 0,
      answers: item.answer_count ?? 0,
      view_count: item.view_count ?? 0,
      tags: item.tags || [],
      owner: item.owner || { display_name: "Anonymous" },
      creation_date: item.creation_date,
      last_activity_date: item.last_activity_date,
      is_answered: item.is_answered,
      link: item.link
    }));

    return {
      items,
      has_more: !!data.has_more,
      quota_remaining: data.quota_remaining ?? lastQuotaRemaining,
      total: data.total || items.length,
      isFallback: false
    };
  } catch (err) {
    if (err.name === "AbortError") {
      throw err;
    }
    console.warn("Stack Exchange API live request failed. Falling back to local dataset:", err.message);
    const mockResult = filterMockQuestions({ query, tag, sort, page, pageSize, minAnswers });
    mockResult.isFallback = true;
    mockResult.fallbackReason = err.message;
    return mockResult;
  }
}

export async function fetchQuestionDetails(questionId, { signal, forceMock = false } = {}) {
  const numericId = Number(questionId);
  const now = Date.now();

  if (!forceMock && now >= apiBackoffUntil) {
    try {
      const qUrl = `${BASE_URL}/questions/${questionId}?site=stackoverflow&filter=!nNPvSNdWjv`;
      const aUrl = `${BASE_URL}/questions/${questionId}/answers?site=stackoverflow&filter=withbody&order=desc&sort=votes`;

      const [qRes, aRes] = await Promise.allSettled([
        fetch(qUrl, { signal }),
        fetch(aUrl, { signal })
      ]);

      if (qRes.status === "fulfilled" && qRes.value.ok) {
        const qData = await qRes.value.json();
        const question = qData.items?.[0];

        if (question) {
          let answers = [];
          if (aRes.status === "fulfilled" && aRes.value.ok) {
            const aData = await aRes.value.json();
            answers = aData.items || [];
          }

          return {
            question: {
              id: question.question_id,
              question_id: question.question_id,
              title: question.title,
              body: question.body || "",
              score: question.score ?? 0,
              votes: question.score ?? 0,
              answer_count: question.answer_count ?? 0,
              answers: question.answer_count ?? 0,
              view_count: question.view_count ?? 0,
              tags: question.tags || [],
              owner: question.owner || { display_name: "Anonymous" },
              creation_date: question.creation_date,
              last_activity_date: question.last_activity_date,
              is_answered: question.is_answered,
              link: question.link
            },
            answers: answers.map((a) => ({
              answer_id: a.answer_id,
              is_accepted: a.is_accepted,
              score: a.score,
              creation_date: a.creation_date,
              owner: a.owner,
              body: a.body
            })),
            isFallback: false
          };
        }
      }
    } catch (err) {
      if (err.name === "AbortError") throw err;
      console.warn("API details fetch failed, trying mock:", err.message);
    }
  }

  // Fallback to local mock data
  const mockMatch = MOCK_QUESTIONS.find(
    (q) => q.id === numericId || q.question_id === numericId
  );

  if (mockMatch) {
    return {
      question: mockMatch,
      answers: mockMatch.mockAnswers || [],
      isFallback: true
    };
  }

  return null;
}

function filterMockQuestions({ query, tag, sort, page, pageSize, minAnswers }) {
  let list = [...MOCK_QUESTIONS];

  if (tag && tag !== "All") {
    const targetTag = tag.toLowerCase();
    list = list.filter(
      (q) =>
        (q.category && q.category.toLowerCase() === targetTag) ||
        (q.tags && q.tags.some((t) => t.toLowerCase().includes(targetTag)))
    );
  }

  if (query.trim()) {
    const qLower = query.toLowerCase().trim();
    list = list.filter(
      (q) =>
        q.title.toLowerCase().includes(qLower) ||
        (q.body && q.body.toLowerCase().includes(qLower)) ||
        (q.tags && q.tags.some((t) => t.toLowerCase().includes(qLower)))
    );
  }

  if (minAnswers > 0) {
    list = list.filter((q) => (q.answers || q.answer_count || 0) >= minAnswers);
  }

  // Sorting
  if (sort === "votes") {
    list.sort((a, b) => (b.votes || b.score || 0) - (a.votes || a.score || 0));
  } else if (sort === "creation") {
    list.sort((a, b) => (b.creation_date || 0) - (a.creation_date || 0));
  } else if (sort === "activity") {
    list.sort((a, b) => (b.last_activity_date || 0) - (a.last_activity_date || 0));
  }

  const startIndex = (page - 1) * pageSize;
  const items = list.slice(startIndex, startIndex + pageSize);

  return {
    items,
    has_more: startIndex + pageSize < list.length,
    quota_remaining: lastQuotaRemaining ?? 295,
    total: list.length,
    isFallback: true,
    fallbackReason: "Using verified offline mock dataset"
  };
}
