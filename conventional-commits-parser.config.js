// Documentation for the options
// https://github.com/release-it/conventional-changelog?tab=readme-ov-file#parseropts
const jiraUrl = 'https://aiopsgroup.atlassian.net/browse/'

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
    commitPartial:
      `*{{#if scope}} **{{scope}}:** {{~/if}} {{#if subject}}
          {{~subject}} 
      {{~else}}
          {{~header}} 
      {{~/if}}
      
      {{~!-- commit link --}}
      {{#if @root.linkReferences~}}
          ([{{hash}}](
          {{~#if @root.repository}}
              {{~#if @root.host}}{{@root.host}}/{{/if}}
              {{~#if @root.owner}}{{@root.owner}}/{{/if}}
              {{~@root.repository}}/commit/{{hash}}
          {{~else}}
              {{~@root.repoUrl}}/commit/{{hash}}
          {{~/if}})) 
      {{~else}}
          {{~hash}}
      {{~/if}}
      
      {{~!-- Jira link --}}
      {{#if jiraId}}
          ([{{ jiraId }}](${jiraUrl}{{ jiraId }}))
      {{/if}}
      
      {{~!-- commit references --}}
      {{~#if references~}}
          , closes
          {{~#each references}} {{#if @root.linkReferences~}}
              [
              {{~#if this.owner}}{{this.owner}}/{{/if}}
              {{this.repository}}#{{this.issue}}](
              {{~#if @root.repository}}
                  {{~#if @root.host}}{{@root.host}}/{{/if}}
                  {{~#if this.repository}}
                      {{~#if this.owner}}{{this.owner}}/{{/if}}
                      {{this.repository}}
                  {{~else}}
                      {{~#if @root.owner}}{{@root.owner}}/{{/if}}
                      {{@root.repository}}
                  {{~/if}}
              {{~else}}
                  {{@root.repoUrl}}
              {{~/if}}/{{@root.issue}}/{{this.issue}})
          {{~else}}
              {{~#if this.owner}}{{this.owner}}/{{/if}}
              {{this.repository}}#{{this.issue}}
          {{~/if}}{{/each}}
      {{~/if}}`
  }
}
