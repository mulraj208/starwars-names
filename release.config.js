const commonConfig = {
    "preset": "conventionalcommits",
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
                "writerOpts": {
                    "commitPartial": `
                        *{{#if scope}} **{{scope}}:**
                        {{~/if}} {{#if subject}}
                          {{~subject}} PKS-111
                        {{~else}}
                          {{~header}}
                        {{~/if}}
                        
                        {{~!-- commit link --}}{{~#if hash}} {{#if @root.linkReferences~}}
                          ([{{shortHash}}]({{commitUrlFormat}}))
                        {{~else}}
                          {{~shortHash}}
                        {{~/if}}{{~/if}}
                        
                        {{~!-- commit references --}}
                        {{~#if references~}}
                          , closes
                          {{~#each references}} {{#if @root.linkReferences~}}
                            [
                            {{~#if this.owner}}
                              {{~this.owner}}/
                            {{~/if}}
                            {{~this.repository}}{{this.prefix}}{{this.issue}}]({{issueUrlFormat}})
                          {{~else}}
                            {{~#if this.owner}}
                              {{~this.owner}}/
                            {{~/if}}
                            {{~this.repository}}{{this.prefix}}{{this.issue}}
                          {{~/if}}{{/each}}
                        {{~/if}}
                    `
                }
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
