import { useRef, useEffect, useReducer } from 'react';
import './App.css';
import { SelectList } from './Select/components/Select.List';
import { SelectOption } from './Select/components/Select.Option';
import { Select } from './Select/Select';

function App() {
  return (
    <div className="App">
      <Select>
        <Select.Input placeholder="ree" />
        <Select.List>
          <Select.Option value="1">One</Select.Option>
          <Select.Option value="2">Two</Select.Option>
          <Select.Option value="3">Three</Select.Option>
        </Select.List>
      </Select>
    </div>
  );
}

export default App;
