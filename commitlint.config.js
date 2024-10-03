module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [
        (commit) => {
            return commit.includes('dependabot'); // Don't lint dependabot commits
        }
    ]
};