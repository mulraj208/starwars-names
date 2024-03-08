const commonConfig = {
    "preset": "angular",
    "parserOpts": {
        headerPattern: /^([A-Z]+-\d+) (\w*)(?:\(([^)]*)\))?: (.*)$/,
        headerCorrespondence: ['jiraId', 'type', 'scope', 'subject']
    }
}

module.exports = {
    branches: ['main'],
    "plugins": [
        ["@semantic-release/commit-analyzer",
            {
                ...commonConfig,
                "releaseRules": [
                    {"type": "docs", "release": "patch"},
                    {"type": "refactor", "release": "patch"},
                    {"type": "style", "release": "patch"}
                ]
            }
        ],
        ["@semantic-release/release-notes-generator",
            {
                ...commonConfig
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
