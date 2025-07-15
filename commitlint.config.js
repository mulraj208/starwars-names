// eslint-disable-next-line @typescript-eslint/no-var-requires
const CZ_CONFIG = require('./.cz-config.js').CZ_CONFIG
// eslint-disable-next-line @typescript-eslint/no-var-requires
const conventionalCommitParserConfig = require('./conventional-commits-parser.config.js')

module.exports = {
  ignores: [
    (commit) => commit.startsWith('chore: release v') && commit.includes('[ci skip]')
  ],
  // OPTIONAL: './.cz-config.js'
  // './.cz-config.js' is not needed when `commitlint` is used alone without
  // `cz-conventional-changelog-for-jira` or `commitizen`.
  // Different packages are not fully extendable so `./.cz-config.js` may not be used for all cases.
  extends: ['./.cz-config.js', '@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: conventionalCommitParserConfig.parserOpts
  },
  plugins: [
    {
      rules: {
        'has-jira-ticket': parsed => {
          const message = parsed.raw
          const jiraTicketPattern = /^[A-Z]+-\d+\s/

          return [
            jiraTicketPattern.test(message),
            'Commit message must include a JIRA ticket reference (JIRA-123 feat: implement user-auth). \n Note: \n a) Make sure the commit starts with the JIRA ticket number. \n b) Make sure there is space after JIRA ticket number. \n c) Make sure the JIRA ticket prefix is in Capital letters.'
          ]
        },
        'valid-backtick-pairs': str => {
          const commitMessage = `${str.header} ${str.body} ${str.footer}`
          const regexMatchBacktick = /`/g
          const backticksCount = (commitMessage.match(regexMatchBacktick) || []).length
          const isAllBackticksPairs = backticksCount % 2 === 0
          return [isAllBackticksPairs, 'Not all backticks are closed! All backticks should be in pairs.']
        },
        'valid-escaping-for-hash': str => {
          // Check # special character is present in the commit message.
          const noHashCharacter = !`${str.header} ${str.body} ${str.footer}`.includes('#')
          return [noHashCharacter, 'Do not use "#" in your commit message.']
        }
      }
    }
  ],
  rules: {
    'valid-backtick-pairs': [2, 'always'],
    'valid-escaping-for-hash': [2, 'always'],
    'has-jira-ticket': [2, 'always'],
    'type-enum': [2, 'always', Object.keys(CZ_CONFIG.types)],
    'body-max-line-length': [2, 'always', 500],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-enum': [2, 'always', CZ_CONFIG.scopes | []]
  }
}
