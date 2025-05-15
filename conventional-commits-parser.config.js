// Documentation for the options
// https://github.com/release-it/conventional-changelog?tab=readme-ov-file#parseropts
const fs = require('fs');
const commitTemplate = fs.readFileSync('commit.hbs').toString();

module.exports = {
  preset: {
    name: 'conventionalcommits',
    types: [
      // Exampe configuration for sections generated in CHANGELOG.md
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'perf', section: 'Performance Improvements', hidden: false },
      { type: 'refactor', section: 'Code Refactoring', hidden: true },
      { type: 'revert', section: 'Reverts' },
      { type: 'deprecate', section: 'Deprecations', hidden: false },
      { type: 'remove', section: 'Removals', hidden: false },
      { type: 'a11y', section: 'Accessibility', hidden: false },
      { type: 'test', section: 'Tests', hidden: true },
      { type: 'build', section: 'Build System', hidden: true },
      { type: 'ci', section: 'Continuous Integration', hidden: true },
      { type: 'docs', section: 'Documentation', hidden: false },
      { type: 'style', section: 'Styles', hidden: true },
      { type: 'change', section: 'Miscellaneous Changes', hidden: false },
      { type: 'chore', section: 'Miscellaneous Chores', hidden: false },
      { type: 'revert', section: 'Reverts', hidden: true },
      { type: 'security', section: 'Security', hidden: false }
    ]
  },
  parserOpts: {
    headerPattern: /^([A-Z]+-\d+) (\w*)(?:\(([^)]*)\))?: (.*)$/,
    headerCorrespondence: ['jiraId', 'type', 'scope', 'subject']
  },
  releaseRules: [
    { type: 'docs', release: 'patch' },
    { type: 'refactor', release: 'patch' }
  ],
  writerOpts: {
    groupBy: 'type',
    noteGroupsSort: 'scope',
    helpers: {
      log: (ctx) => {
        console.log('Handlebars log:', JSON.stringify(ctx, null, 2));
        return '';
      },
      helpers: {
        shortHash: (hash) => hash?.substring(0, 7),
        jiraLink: (id) => `https://your-jira-url/browse/${id}`
      }
    },
    commitPartial: commitTemplate
  }
}
