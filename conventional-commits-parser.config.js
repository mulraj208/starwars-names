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
      '*{{#if scope}} **{{scope}}:**\n' +
      '{{~/if}} {{#if subject}}\n' +
      '    {{~subject}}\n' +
      '{{~else}}\n' +
      '    {{~header}}\n' +
      '{{~/if}}\n' +
      '\n' +
      '{{~!-- commit link --}}\n' +
      '{{#if @root.linkReferences~}}\n' +
      '       ([{{shortHash}}](\n' +
      '    {{~#if @root.repository}}\n' +
      '        {{~#if @root.host}}\n' +
      '            {{~@root.host}}/\n' +
      '        {{~/if}}\n' +
      '        {{~#if @root.owner}}\n' +
      '            {{~@root.owner}}/\n' +
      '        {{~/if}}\n' +
      '        {{~@root.repository}}\n' +
      '    {{~else}}\n' +
      '        {{~@root.repoUrl}}\n' +
      '    {{~/if}}/\n' +
      '    {{~@root.commit}}/{{hash}}))\n' +
      '{{~else}}\n' +
      '    {{~shortHash}}\n' +
      '{{~/if}}\n' +
      '\n' +
      '{{~!-- Jira link --}}\n' +
      '{{#if jiraId}}\n' +
      '    ([{{ jiraId }}](' +
      jiraUrl +
      '{{ jiraId }}))\n' +
      '{{/if}}\n' +
      '\n' +
      '{{~!-- commit references --}}\n' +
      '{{~#if references~}}\n' +
      '    , closes\n' +
      '    {{~#each references}} {{#if @root.linkReferences~}}\n' +
      '        [\n' +
      '        {{~#if this.owner}}\n' +
      '            {{~this.owner}}/\n' +
      '        {{~/if}}\n' +
      '        {{~this.repository}}#{{this.issue}}](\n' +
      '        {{~#if @root.repository}}\n' +
      '            {{~#if @root.host}}\n' +
      '                {{~@root.host}}/\n' +
      '            {{~/if}}\n' +
      '            {{~#if this.repository}}\n' +
      '                {{~#if this.owner}}\n' +
      '                    {{~this.owner}}/\n' +
      '                {{~/if}}\n' +
      '                {{~this.repository}}\n' +
      '            {{~else}}\n' +
      '                {{~#if @root.owner}}\n' +
      '                    {{~@root.owner}}/\n' +
      '                {{~/if}}\n' +
      '                {{~@root.repository}}\n' +
      '            {{~/if}}\n' +
      '        {{~else}}\n' +
      '            {{~@root.repoUrl}}\n' +
      '        {{~/if}}/\n' +
      '        {{~@root.issue}}/{{this.issue}})\n' +
      '    {{~else}}\n' +
      '        {{~#if this.owner}}\n' +
      '            {{~this.owner}}/\n' +
      '        {{~/if}}\n' +
      '        {{~this.repository}}#{{this.issue}}\n' +
      '    {{~/if}}{{/each}}\n' +
      '{{~/if}}\n'
  }
}
