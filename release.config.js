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
                    "commitPartial": "*{{#if scope}} **{{scope}}:**\n" +
                        "{{~/if}} {{#if subject}}\n" +
                        "    {{~subject}}\n" +
                        "{{~else}}\n" +
                        "    {{~header}}\n" +
                        "{{~/if}}\n" +
                        "\n" +
                        "{{~!-- commit link --}}{{~#if hash}} {{#if @root.linkReferences~}}\n" +
                        "    ([{{shortHash}}]({{commitUrlFormat}}))\n" +
                        "{{~else}}\n" +
                        "    {{~shortHash}}\n" +
                        "{{~/if}}{{~/if}}\n" +
                        "\n" +
                        "{{~!-- Jira link --}}\n" +
                        "{{#if jiraId}}\n" +
                        "    &nbsp;(<a href=\"{{@root.host}}/{{jiraId}}\">{{jiraId}}</a>)\n" +
                        "{{/if}}\n" +
                        "\n" +
                        "{{~!-- commit references --}}\n" +
                        "{{~#if references~}}\n" +
                        "    , closes\n" +
                        "    {{~#each references}} {{#if @root.linkReferences~}}\n" +
                        "        [\n" +
                        "        {{~#if this.owner}}\n" +
                        "            {{~this.owner}}/\n" +
                        "        {{~/if}}\n" +
                        "        {{~this.repository}}{{this.prefix}}{{this.issue}}]({{issueUrlFormat}})\n" +
                        "    {{~else}}\n" +
                        "        {{~#if this.owner}}\n" +
                        "            {{~this.owner}}/\n" +
                        "        {{~/if}}\n" +
                        "        {{~this.repository}}{{this.prefix}}{{this.issue}}\n" +
                        "    {{~/if}}{{/each}}\n" +
                        "{{~/if}}\n" +
                        "\n"
                }
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
