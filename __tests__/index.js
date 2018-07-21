import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';
import { loadData, saveData } from '../module.js';

describe('saveData method', () => {
  beforeAll(() => {
    if (fs.lstatSync(path.resolve(__dirname, '../state')).isDirectory()) rimraf.sync(path.resolve(__dirname, '../state'));
  });

  afterAll(() => {
    if (fs.lstatSync(path.resolve(__dirname, '../state')).isDirectory()) rimraf.sync(path.resolve(__dirname, '../state'));
  });

  describe('target folder doesn\'t exist', () => {
    it('should throw error', () => {
      const state = {
        hello: 'world'
      };

      const error = () => saveData(state);

      expect(error).toThrow();
    });

    it('should save the state', () => {
      fs.mkdirSync(path.resolve(__dirname, '../state'));

      const state = {
        hello: 'world'
      };

      saveData(state);
      const isFile = fs.lstatSync(path.resolve(__dirname, '../state/state.json')).isFile();

      expect(isFile).toEqual(true);
    });
  })
})

describe('loadData method', () => {
  describe('target folder deosn\'t exist', () => {
    beforeAll(() => {
      if (fs.lstatSync(path.resolve(__dirname, '../state')).isDirectory()) rimraf.sync(path.resolve(__dirname, '../state'));
    });

    it('should throw error', () => {
      const error = () => loadData();

      expect(error).toThrow();
    });

    it('should load state', () => {
      fs.mkdirSync(path.resolve(__dirname, '../state'));

      const state = {
        hello: 'world'
      };

      saveData(state);
      const actual = loadData();

      expect(actual).toEqual({
        hello: 'world'
      });
    });
  });
});