# Playwright Typescript - one framework for both part1 and part2

## Installation

1. Install [node](https://nodejs.org/en/download/) on your environment where you have cloned this repo.
2. Open the project folder in desired IDE (e.g. VS Code).
3. Open terminal -> run following commands 
    'npm install'
    'npx playwright install'

## Run tests
``` 
npm run tests -> will run all tests part1 and part2
npm run part-1 -> will run only part1
npm run part-2 -> will run only part2
```

#### Test Reports
- playwright-report/index.html

## Important project structure details

#### ./tests/
In this directory you will find part1 and part2 tests separated in respective folders

#### ./fixtures/
Models, Services, Data-driven files for both part1 and 2 tests

#### ./pages/
PageObjectModels for the part1 UI tests