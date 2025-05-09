// Documentation for the configuration:
// https://github.com/digitalroute/cz-conventional-changelog-for-jira/tree/master?tab=readme-ov-file

const custom = require('@digitalroute/cz-conventional-changelog-for-jira/configurable')

const CZ_CONFIG = {
  types: {
    feat: {
      description: 'A new feature',
      title: 'Features'
    },
    fix: {
      description: 'A bug fix',
      title: 'Bug Fixes'
    },
    docs: {
      description: 'Documentation only changes',
      title: 'Documentation'
    },
    refactor: {
      description:
        'A code change that neither fixes a bug nor adds a feature (formatting, performance improvement, etc)',
      title: 'Code Refactoring'
    },
    test: {
      description: 'Adding missing tests or correcting existing tests',
      title: 'Tests'
    },
    build: {
      description: 'Changes that affect the build system or external dependencies (npm, webpack, typescript)',
      title: 'Builds'
    },
    ci: {
      description: 'Changes to our CI configuration files and scripts (NOTE: Does not bump the version)',
      title: 'Continuous Integrations'
    },
    chore: {
      description: "Other changes that don't modify src or test files",
      title: 'Chores'
    },
    revert: {
      description: 'Reverts a previous commit',
      title: 'Reverts'
    },
    perf: {
      description: 'Improvements that will make your code perform better',
      title: 'Performance'
    },
    deprecate: {
      description: 'Marks the deprecation of a feature, indicating that it will be removed in future versions',
      title: 'Performance'
    },
    remove: {
      description: 'Used when removing files, code, or features',
      title: 'Remove'
    },
    style: {
      description: 'File formatting or coding style',
      title: 'Style'
    },
    change: {
      description: "A generic commit type for changes that don't fit into other categories",
      title: 'Change'
    },
    security: {
      description: 'Commits related to security vulnerabilities or related updates',
      title: 'Security'
    },
    a11y: {
      description: 'For code changes intended for accessibility fixes and improvements',
      title: 'a11y'
    }
  },
  // scopes: ['myScope1', 'myScope2'],
  skipScope: false,
  skipType: false,
  skipDescription: false,
  skipBreaking: true,
  customScope: false,
  maxHeaderWidth: 100,
  minHeaderWidth: 2,
  maxLineWidth: 100,
  jiraPrefix: 'PKS',
  jiraOptional: false,
  jiraLocation: 'pre-type',
  // jiraPrepend: '',
  // jiraAppend: '',
  exclamationMark: false
}

module.exports.CZ_CONFIG = CZ_CONFIG
module.exports.default = custom(CZ_CONFIG)
