import { useState, useEffect, useCallback, useRef } from "react";
import { fetchQuestions } from "../api/stackExchangeApi.js";

export function useQuestions({
  query = "",
  tag = "All",
  sort = "votes",
  page = 1,
  pageSize = 10,
  minAnswers = 0,
  forceMock = false
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [quotaRemaining, setQuotaRemaining] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState("");

  const abortControllerRef = useRef(null);

  const loadQuestions = useCallback(async () => {
    // Abort pending previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchQuestions({
        query,
        tag,
        sort,
        page,
        pageSize,
        minAnswers,
        forceMock,
        signal: controller.signal
      });

      setQuestions(result.items || []);
      setHasMore(result.has_more);
      setQuotaRemaining(result.quota_remaining);
      setIsFallback(result.isFallback);
      setFallbackReason(result.fallbackReason || "");
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to load questions. Please check connection.");
      }
    } finally {
      setLoading(false);
    }
  }, [query, tag, sort, page, pageSize, minAnswers, forceMock]);

  useEffect(() => {
    loadQuestions();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadQuestions]);

  return {
    questions,
    loading,
    error,
    hasMore,
    quotaRemaining,
    isFallback,
    fallbackReason,
    refetch: loadQuestions
  };
}
