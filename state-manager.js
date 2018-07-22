import fs from 'fs';
import path from 'path';

class StateManager {
  constructor(statePath) {
    this._path = statePath;
  }

  saveData(state) {
    try {
      fs.writeFileSync(path.resolve(this._path, './state.json'), JSON.stringify(state));
    } catch (error) {
      // => create an alert ERROR_SAVING_STATE
      throw new Error(`[StateManager.saveState] Error while saving the state: wrong path`);
    }
  };

  loadData() {
    try {
      return JSON.parse(fs.readFileSync(path.resolve(this._path, './state.json')));
    } catch (error) {
      // => create a alert ERROR_LOADING_STATE
      throw new Error(`[StateManager.loadState] Error while loading the state: wrong path`);
    }
  }
}

export default StateManager;