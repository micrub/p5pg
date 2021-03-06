const Configuration = {
    /*
     * Resolve and load @commitlint/config-conventional from node_modules.
     * Referenced packages must be installed
     */
    extends: ['@commitlint/config-conventional'],
    /*
     * Resolve and load conventional-changelog-atom from node_modules.
     * Referenced packages must be installed
     */
    parserPreset: 'conventional-changelog-atom',
    /*
     * Resolve and load @commitlint/format from node_modules.
     * Referenced package must be installed
     */
    formatter: '@commitlint/format',
    /*
     * Any rules defined here will override rules 
     * from @commitlint/config-conventional
     */
    rules: {
        // 'type-enum': [2, 'always', ['foo']],
    },
    /*
     * Functions that return true if commitlint should ignore the given message.
     */
    ignores: [(commit) => commit === 'quickfix'],
    /*
     * Whether commitlint uses the default ignore rules.
     */
    defaultIgnores: true,
    /*
     * Custom URL to show upon failure
     */
    helpUrl:
    // TODO point to docs
      'https://github.com/conventional-changelog/commitlint/#TODO',

};
  
module.exports = Configuration;