module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "jsdom", // Use jsdom for testing React components
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Handle TypeScript files
    "^.+\\.jsx?$": "babel-jest", // Handle JavaScript files
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore these folders
};
