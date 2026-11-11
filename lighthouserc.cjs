const baseURL = process.env.BASE_URL || 'http://localhost:4173'

module.exports = {
  ci: {
    collect: {
      startServerCommand: baseURL === 'http://localhost:4173' ? 'npm run preview' : undefined,
      url: [
        `${baseURL}/`,
        `${baseURL}/about/`,
        `${baseURL}/experience/`,
        `${baseURL}/projects/`,
        `${baseURL}/writing/`,
      ],
      numberOfRuns: 2,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
