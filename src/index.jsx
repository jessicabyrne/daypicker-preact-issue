import React from 'react';
import { render } from 'react-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const startApp = () => render(
  <div>
    <DayPicker />
  </div>,
  document.body
);

startApp();
