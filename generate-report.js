// generate-report.js
const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Project": "Reto Automatización Coordinadora",
    "Executed": "Local",
    "Tester": "Jean Paul"
  }
};

reporter.generate(options);