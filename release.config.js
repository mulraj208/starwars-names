module.exports = {
    branches: ['main'],
    "plugins": [
        ["@semantic-release/commit-analyzer",
            {
                "preset": "angular",
                "releaseRules": [
                    {"type": "docs", "release": "patch"},
                    {"type": "refactor", "release": "patch"},
                    {"type": "style", "release": "patch"}
                ],
                "parserOpts": {
                    headerPattern: /^([A-Z]+-\d+) (\w*)(?:\(([^)]*)\))?: (.*)$/,
                    headerCorrespondence: ['jiraId', 'type', 'scope', 'subject']
                }
            }
        ],
        ["semantic-release-jira-notes", {
            "jiraHost": "aiopsgroup.atlassian.net",
            "ticketPrefixes": ["PKS"]
        }],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
