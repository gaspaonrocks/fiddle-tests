import JsonManager from '../json-manager-es6';

const jsonManager = new JsonManager();

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

describe('JsonManager class', () => {
  describe('areParamsValidV3 method', () => {
    it('should throw error if params are not valid', () => {
      const error = () => jsonManager.areParamsValidV3(testJson, 'speedIndex', 'mobile', 'firefox', 'Basket')

      expect(error).toThrow('[JsonManager] params are not valid');
    });

    it('should return true if params are all valid', () => {
      const actual = jsonManager.areParamsValidV3(testJson, 'speedIndex', 'mobile', 'firefox', 'PA')

      expect(actual).toEqual(true);
    });
  });
});