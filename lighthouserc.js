module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/v2/',
        'http://localhost:4173/v2/about/',
        'http://localhost:4173/v2/experience/',
        'http://localhost:4173/v2/projects/',
        'http://localhost:4173/v2/writing/',
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

