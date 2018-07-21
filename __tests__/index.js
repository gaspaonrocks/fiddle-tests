import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';
import { loadData, saveData } from '../module.js';

describe('saveData method', () => {
  describe('target folder doesn\'t exist', () => {
    beforeAll(() => {
      try {
        if (fs.lstatSync(path.resolve(__dirname, '../state')).isDirectory()) rimraf.sync(path.resolve(__dirname, '../state'));
      } catch (error) { }
    });

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
  beforeAll(() => {
    try {
      if (fs.lstatSync(path.resolve(__dirname, '../state')).isDirectory()) rimraf.sync(path.resolve(__dirname, '../state'));
    } catch (error) { }
  });

  describe('target folder deosn\'t exist', () => {
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