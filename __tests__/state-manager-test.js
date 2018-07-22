import fs from 'fs';
import mockFs from 'mock-fs';
import path from 'path';

import StateManager from '../state-manager';

const manager = new StateManager('/state');

const state = {
  hello: 'world'
};

beforeEach(() => {
  // Creates an in-memory file system 
  mockFs({
    '/state': {}
  });
});

describe('StateManager class', () => {
  describe('saveData method', () => {
    describe('target folder doesn\'t exist', () => {
      it('should throw error', () => {
        mockFs.restore()

        const error = () => manager.saveData(state);
        const expectedErrorMessage = `[StateManager.saveState] Error while saving the state: wrong path`;

        expect(error).toThrow(expectedErrorMessage);
      });
    });

    describe('target folder exists', () => {
      it('should save the state', () => {
        manager.saveData(state);
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

        const error = () => manager.loadData();
        const expectedErrorMessage = `[StateManager.loadState] Error while loading the state: wrong path`;

        expect(error).toThrow(expectedErrorMessage);
      });
    });

    describe('target folder exists', () => {
      it('should load state', () => {
        manager.saveData(state);
        const actual = manager.loadData();

        expect(actual).toEqual({
          hello: 'world'
        });

        mockFs.restore()
      });
    });
  });
});