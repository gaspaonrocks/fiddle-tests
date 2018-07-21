import fs from 'fs';
import mockFs from 'mock-fs';
import path from 'path';

import { loadData, saveData } from '../module.js';

const state = {
  hello: 'world'
};

beforeEach(() => {
  // Creates an in-memory file system 
  mockFs({
    '/state': {}
  });
});

describe('saveData method', () => {
  describe('target folder doesn\'t exist', () => {
    it('should throw error', () => {
      mockFs.restore()

      const error = () => saveData('/state', state);

      expect(error).toThrow();
    });
  });

  describe('target folder exists', () => {
    it('should save the state', () => {
      saveData('/state', state);
      const isFile = fs.lstatSync(path.resolve('/state/state.json')).isFile();

      expect(isFile).toEqual(true);

      mockFs.restore()
    });
  });
});

describe('loadData method', () => {
  describe('target folder doesn\'t exist', () => {
    it('should throw error', () => {
      mockFs.restore();

      const error = () => loadData('/state');

      expect(error).toThrow();
    });
  });

  describe('target folder exists', () => {
    it('should load state', () => {
      saveData('/state', state);
      const actual = loadData('/state');

      expect(actual).toEqual({
        hello: 'world'
      });

      mockFs.restore()
    });
  });
});