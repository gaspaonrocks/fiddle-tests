import fs from 'fs';
import path from 'path';

const saveData = (state) => {
  return fs.writeFileSync(path.resolve(__dirname, './state/state.json'), JSON.stringify(state));
};

const loadData = () => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, './state/state.json')));
}

export {
  loadData,
  saveData
}