const JsonManager = require('./json-manager');

const manager = new JsonManager();

const testJson = {
  speedIndex: {
    mobile: {
      firefox: {
        PA: 1000
      }
    }
  },
  size: {
    mobile: {
      html: 1000
    }
  }
};

console.log(manager.areParamsValidV2(testJson, 'speedIndex', 'mobile', 'firefox', 'PA'));