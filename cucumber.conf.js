module.exports = {
  default: {
    require: [
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
    publishQuiet: true,
    paths: ['features/**/*.feature']
  }
}