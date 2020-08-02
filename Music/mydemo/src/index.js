import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/js/rem.js'
import './assets/css/reset.css'
// 引入移动端UI框架样式
import 'antd-mobile/dist/antd-mobile.css';
// 引入路由相关插件，让浏览器可以解析路由插件
import { BrowserRouter } from 'react-router-dom'
// BrowserRouter 相当于history模式
// HashRouter 相当于hash模式
ReactDOM.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
