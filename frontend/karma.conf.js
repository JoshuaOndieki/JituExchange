module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('@angular-devkit/build-angular/plugins/karma'),
        require('karma-coverage')
      ],
      files: [
        // Add any additional files or dependencies that are required for your tests
      ],
      preprocessors: {
        // Add any additional preprocessors if needed
      },
      reporters: ['progress', 'coverage'],
      coverageReporter: {
        dir: require('path').join(__dirname, 'coverage'),
        subdir: '.',
        reporters: [
          { type: 'lcov', file: 'lcov.info' },
          { type: 'clover', file: 'clover.xml' }
        ]
      },
      browsers: ['Chrome'],
      singleRun: true
    });
  };
  