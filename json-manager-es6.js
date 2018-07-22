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

class JsonManager {
  throwError(message) {
    throw new Error('[JsonManager] ' + message);
  }

  areParamsValid(type) {
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

  areParamsValidV2({ type, device, browser, page }) {
    try {
      if (testJson[type][device][browser][page]) return true;
    } catch (error) {
      throw new Error('[JsonManager.areSpeedIndexParamsValid] the combination of parameters given doesn\'t exist');
    }
  }

  isKeyInObj(obj, key) {
    if (typeof obj !== "object" || !obj || !key) {
      return false;
    }

    if (!obj[key]) {
      return false;
    }

    return obj[key];
  }

  areParamsValidV3(incomingJson, ...params) {
    let obj = incomingJson;

    for (let i = 0; i < params.length; i++) {
      obj = this.isKeyInObj(obj, params[i])

      if (!obj) this.throwError('params are not valid');
    }

    return true;
  }
}

export default JsonManager;