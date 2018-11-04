import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


function render() {

  ReactDOM.render(
    <App/>,
    document.getElementsByClassName('todoapp')[0]
  );
}
render();
