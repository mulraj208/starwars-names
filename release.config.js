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
                ...commonConfig,
                host: 'https://aiopsgroup.atlassian.net',
                issue: 'PKS',
                "writerOpts": {
                    "transform": function (releaseNotes) {
                        const {jiraId, subject} = releaseNotes
                        const modifiedSubject = `${subject} ${jiraId}`
                        console.log({jiraId, subject, modifiedSubject})

                        return {
                            ...releaseNotes,
                            subject: modifiedSubject
                        };
                    }
                }
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
