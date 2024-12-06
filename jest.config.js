module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest", // Use babel-jest for JS/TS files
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios|d3|d3-array|@firebase|node-fetch)/)", // Transform these specific modules
    ],
    testEnvironment: "jsdom", // Use jsdom for React environment
  };
  