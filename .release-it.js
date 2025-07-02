const conventionalCommitParserConfig = require('./conventional-commits-parser.config.js')

// Documentation:
// release-it configration
// https://github.com/release-it/release-it/blob/main/docs/configuration.md

module.exports = {
  git: {
    // eslint-disable-next-line no-template-curly-in-string
    commitMessage: 'chore: release v${version} [ci skip]',
    requireCleanWorkingDir: false
  },
  npm: false,
  preRelease: false,
  plugins: {
    // IMPORTANT!
    // Uncomment this plugin to use "CalVer" (yyyy.mm.dd.minor) as versioning
    // or leave it commented to use "SemVer" (major.minor.patch)
    // '@csmith/release-it-calver-plugin': {
    //   // Documentation about version format:
    //   // https://github.com/casmith/release-it-calver-plugin
    //   // https://calver.org/
    //   //
    //   // NB: patch is not ignored (not working in this version)
    //   // https://github.com/casmith/release-it-calver-plugin/issues/39
    //   format: 'yyyy.mm.dd.minor.patch',
    //   increment: 'calendar.minor.patch',
    //   fallbackIncrement: 'calendar.minor'
    // },
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
      ...conventionalCommitParserConfig
    }
  }
}
