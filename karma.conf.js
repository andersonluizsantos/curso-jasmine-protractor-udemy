// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-remap-istanbul',
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      remapOptions: {}, //additional remap options
      reportOptions: {}, //additional report options
      reports: {
        lcovonly: 'path/to/output/coverage/lcov.info',
        html: 'path/to/output/html/report'
      }
    },
    
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul']
              : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
