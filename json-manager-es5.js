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

function JsonManager() {
  this.throwError = function (message) {
    throw new Error('[JsonManager.getSpeedLimit] params are not valid, ' + message);
  }

  this.areParamsValid = function (type) {
    return testJson[type] == null ? this.throwError('no such type') : (device) => {
      if (type === 'speedIndex') {
        return testJson[type][device] == null ? this.throwError('no such device') : (browser) => {
          return testJson[type][device][browser] == null ? this.throwError('no such browser') : (page) => {
            return testJson[type][device][browser][page] == null ? this.throwError('no such page') : true
          }
        }
      } else if (type === 'size') {
        return testJson[type][device] == null ? this.throwError('no such device') : (contentType) => {
          return testJson[type][device][contentType] == null ? this.throwError('no such content type') : true
        }
      }
    }
  }

  this.areSpeedIndexParamsValid = function ({ device, browser, page }) {
    try {
      if (testJson.speedIndex[device][browser][page]) return true;
    } catch (error) {
      throw new Error('[JsonManager.areSpeedIndexParamsValid] the combination of parameters given doesn\'t exist');
    }
  }

  this.areSpeedIndexParamsValid = function (device, browser, page) {
    if (this.areParamsValidV2(testJson, device, browser, page)) return testJson.speedIndex[device][browser][page];
  }

  this.areSizeParamsValid = function ({ device, contentType }) {
    try {
      if (testJson.size[device][contentType]) return true;
    } catch (error) {
      throw new Error('[JsonManager.areSizeParamsValid] the combination of parameters given doesn\'t exist')
    }
  }

  this.isKeyInObj = function (obj, key) {
    if (typeof obj !== "object" || !obj || !key) {
      return false;
    }

    if (!obj[key]) {
      return false;
    }

    return obj[key];
  }

  this.areParamsValidV2 = function (incomingJson, ...params) {
    let obj = incomingJson;

    for (let i = 0; i < params.length - 1; i++) {
      obj = this.isKeyInObj(obj, params[i])

      if (!obj) this.throwError('hello world');
    }

    return true;
  }
}

module.exports = JsonManager;