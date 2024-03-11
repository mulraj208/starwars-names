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
                        "{{~!-- commit link --}} {{#if @root.linkReferences~}}\n" +
                        "    ([{{shortHash}}](\n" +
                        "    {{~#if @root.repository}}\n" +
                        "        {{~#if @root.host}}\n" +
                        "            {{~@root.host}}/\n" +
                        "        {{~/if}}\n" +
                        "        {{~#if @root.owner}}\n" +
                        "            {{~@root.owner}}/\n" +
                        "        {{~/if}}\n" +
                        "        {{~@root.repository}}\n" +
                        "    {{~else}}\n" +
                        "        {{~@root.repoUrl}}\n" +
                        "    {{~/if}}/\n" +
                        "    {{~@root.commit}}/{{hash}}))\n" +
                        "{{~else}}\n" +
                        "    {{~shortHash}}\n" +
                        "{{~/if}}\n" +
                        "\n" +
                        "{{~!-- Jira link --}}\n" +
                        "{{#if jiraId}}\n" +
                        "    &nbsp;(<a href=\"//aiopsgroup.atlassian.net/browse/{{jiraId}}\">{{jiraId}}</a>)\n" +
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
                        "        {{~this.repository}}#{{this.issue}}](\n" +
                        "        {{~#if @root.repository}}\n" +
                        "            {{~#if @root.host}}\n" +
                        "                {{~@root.host}}/\n" +
                        "            {{~/if}}\n" +
                        "            {{~#if this.repository}}\n" +
                        "                {{~#if this.owner}}\n" +
                        "                    {{~this.owner}}/\n" +
                        "                {{~/if}}\n" +
                        "                {{~this.repository}}\n" +
                        "            {{~else}}\n" +
                        "                {{~#if @root.owner}}\n" +
                        "                    {{~@root.owner}}/\n" +
                        "                {{~/if}}\n" +
                        "                {{~@root.repository}}\n" +
                        "            {{~/if}}\n" +
                        "        {{~else}}\n" +
                        "            {{~@root.repoUrl}}\n" +
                        "        {{~/if}}/\n" +
                        "        {{~@root.issue}}/{{this.issue}})\n" +
                        "    {{~else}}\n" +
                        "        {{~#if this.owner}}\n" +
                        "            {{~this.owner}}/\n" +
                        "        {{~/if}}\n" +
                        "        {{~this.repository}}#{{this.issue}}\n" +
                        "    {{~/if}}{{/each}}\n" +
                        "{{~/if}}\n"
                }
            }
        ],
        "@semantic-release/git",
        "@semantic-release/github"
    ],
}
