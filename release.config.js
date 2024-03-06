module.exports = {
    branches: ['main'],
    "plugins": [
        "@semantic-release/commit-analyzer",
        ["semantic-release-jira-releases", {
            "projectId": "PKS",
            "jiraHost": "aiopsgroup.atlassian.net",
            "ticketPrefixes": ["PKS"]
        }],
        "@semantic-release/git",
        "@semantic-release/github"
    ]
}
