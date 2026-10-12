import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import { MOCK_QUESTIONS } from '../api/mockData.js';

const mockResponse = (url) => {
  const urlStr = String(url);

  if (urlStr.includes('/answers')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        items: MOCK_QUESTIONS[0].mockAnswers || [],
        has_more: false
      })
    });
  }

  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({
      items: MOCK_QUESTIONS.map((q) => ({
        question_id: q.id,
        title: q.title,
        body: q.body || '<p>Question description</p>',
        score: q.votes ?? 0,
        answer_count: q.answers ?? 0,
        view_count: q.view_count ?? 100,
        tags: q.tags || ['javascript'],
        owner: q.owner || { display_name: 'Community Member' },
        creation_date: q.creation_date || 1672531199,
        last_activity_date: q.last_activity_date || 1696118400,
        is_answered: true,
        link: q.link || 'https://stackoverflow.com'
      })),
      has_more: true,
      quota_remaining: 295,
      total: MOCK_QUESTIONS.length
    })
  });
};

global.fetch = vi.fn().mockImplementation(mockResponse);

beforeEach(() => {
  global.fetch.mockImplementation(mockResponse);
});
