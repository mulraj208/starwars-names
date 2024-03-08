module.exports = {
    branches: ['main'],
    "plugins": [
        "@semantic-release/commit-analyzer",
        ["semantic-release-jira-notes", {
            "jiraHost": "aiopsgroup.atlassian.net",
            "ticketPrefixes": ["PKS"]
        }],
        "@semantic-release/git",
        "@semantic-release/github",
        ['@digitalroute/cz-conventional-changelog-for-jira', {
            "jiraLocation": "pre-type",
            "skipScope": false,
            "CZ_JIRA_PREFIX": "PKS"
        }]
    ],
}
