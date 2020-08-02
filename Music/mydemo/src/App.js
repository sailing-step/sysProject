import React, { Component } from 'react'
// 引入要渲染的组件
import Index from './components/pages/index'
import Play from './components/pages/play'
import List from './components/pages/list'
// 引入路由插件中相关的属性和方法
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom'
import './App.css';
export default class App extends Component {
  render() {
    return (
      <div className="app">
        {/* 一级路由出口 */}
        <Switch>
          <Route path="/index" component={Index}></Route>
          {/* 动态路由 */}
          {/* <Route path="/play/:id" component={Play}></Route> */}
          {/* query参数 */}
          <Route path="/play" component={Play}></Route>
          <Route path="/list" component={List}></Route>
          <Redirect to="/index"></Redirect>
        </Switch>
      </div>
    )
  }
}
