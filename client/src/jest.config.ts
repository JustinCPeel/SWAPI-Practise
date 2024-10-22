export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Transform TypeScript files
    "^.+\\.jsx?$": "babel-jest", // Transform JavaScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Ensure axios is transformed by Babel
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ES Modules
  globals: {
    "ts-jest": {
      useESM: true, // Ensure ts-jest uses ESM for TypeScript
    },
  },
};
