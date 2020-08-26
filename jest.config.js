module.exports = {
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts', '!<rootDir>/src/server.ts'],
    coverageDirectory: '<rootDir>/coverage/',
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>/src/'],
    rootDir: './',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testMatch: ['**/*.(spec|test).ts'],
    verbose: true,
    moduleNameMapper: {
        '^@routes(.*)$': '<rootDir>/src/routes$1',
        '^@middleware(.*)$': '<rootDir>/src/middleware$1'
    },
    transform: {
        '^.+\\.ts$': 'ts-jest'
    }
};
