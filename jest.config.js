export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx|js)?$": "ts-jest",
    },
  
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png)$": "identity-obj-proxy"
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

    collectCoverage: true
  }