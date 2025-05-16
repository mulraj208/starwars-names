const conventionalCommitParserConfig = require('./conventional-commits-parser.config.js')

// Documentation:
// release-it configration
// https://github.com/release-it/release-it/blob/main/docs/configuration.md

module.exports = {
  git: {
    // eslint-disable-next-line no-template-curly-in-string
    commitMessage: 'chore: release v${version} [ci skip]',
    requireCleanWorkingDir: false,
    changelog: false  // Disable default changelog generation
  },
  npm: false,
  preRelease: false,
  plugins: {
    '@csmith/release-it-calver-plugin': {
      format: 'yyyy.mm.dd.minor.patch',
      increment: 'calendar.minor.patch',
      date: 'current'
    },
    '@release-it/bumper': {
      in: {
        file: 'package.json',
        path: 'version'
      },
      out: {
        file: 'package.json',
        path: 'version'
      }
    },
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      ignoreRecommendedBump: true,
      sectionFormat: '## [${version}]',
      releaseCount: 0,
      skipUnstable: false,
      header: '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n',
      preset: {
        name: 'conventionalcommits',
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'perf', section: 'Performance Improvements' },
          { type: 'refactor', section: 'Code Refactoring' },
          { type: 'revert', section: 'Reverts' },
          { type: 'docs', section: 'Documentation' },
          { type: 'style', section: 'Styles' },
          { type: 'chore', section: 'Chores' },
          { type: 'test', section: 'Tests' }
        ]
      }
    }
  }
}
