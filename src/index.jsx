require('preact/debug');
import React from 'react';
import { render } from 'react-dom';
import MyDayPickerExample from './Daypicker';

const startApp = () => render(
  <div>
    <MyDayPickerExample />
  </div>,
  document.body
);

startApp();
