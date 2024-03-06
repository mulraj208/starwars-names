module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^([A-Z]+-\d+) (\w*)(?:\(([^)]*)\))?: (.*)$/,
      headerCorrespondence: ['jiraId', 'type', 'scope', 'subject']
    }
  },
  plugins: [
    {
      rules: {
        'has-jira-ticket': parsed => {
          const message = parsed.raw
          const jiraTicketPattern = new RegExp(`^[A-Z]+-\\d+\\s`)

          return [
            jiraTicketPattern.test(message),
            `Commit message must include a JIRA ticket reference (JIRA-123 feat: implement user-auth). \n Note: \n a) Make sure the commit starts with the JIRA ticket number. \n b) Make sure there is space after JIRA ticket number. \n c) Make sure the JIRA ticket prefix is in Capital letters.`
          ]
        }
      }
    }
  ],
  rules: {
    'has-jira-ticket': [2, 'always'],
    'body-max-line-length': [2, 'always', 500],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'refactor',
        'deprecate',
        'remove',
        'test',
        'build',
        'ci',
        'docs',
        'style',
        'change',
        'chore',
        'revert',
        'security'
      ]
    ]
  }
}
