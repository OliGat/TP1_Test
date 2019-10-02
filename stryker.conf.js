module.exports = function(config) {
  config.set({
    mutator: {
      name: 'javascript',
      excludedMutations: ['BooleanSubstitution', 'StringLiteral']
    },
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress", "dashboard"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off",
    thresholds: { high: 80, low: 60, break: null },
    files: [
        'src/**/*.js',
        '!src/db.js',
        '!src/test-script.js',
        'test/**/*.js']
  });
};
