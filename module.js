import fs from 'fs';
import path from 'path';

const saveData = (pathGiven, state) => {
  return fs.writeFileSync(path.resolve(pathGiven, './state.json'), JSON.stringify(state));
};

const loadData = (pathGiven) => {
  return JSON.parse(fs.readFileSync(path.resolve(pathGiven, './state.json')));
}

export {
  loadData,
  saveData
}