import React, { Component } from 'react'
// 引入要渲染的组件
import Home from '../views/home'
import Rank from '../views/rank'
import Search from '../views/search'
import '../../assets/css/index.css'
// 调用路由插件
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
export default class index extends Component {
    render() {
        return (
            <div className="index">
                <div className="topbar">
                    <div className="title">
                        <span className="tName">网易云音乐</span>
                        <div className="topfr">
                            <span className="topbton">下载APP</span>
                        </div>
                    </div>
                </div>

                {/* 导航链接视图 */}
                <div className="bar">
                    <div className="tabBar">
                        <NavLink to="/index/home" activeClassName="select">推荐音乐</NavLink>
                        <NavLink to="/index/rank" activeClassName="select">热歌榜</NavLink>
                        <NavLink to="/index/search" activeClassName="select">搜索</NavLink>
                    </div>
                </div>


                <Switch>
                    <Route path="/index/home" component={Home}></Route>
                    <Route path="/index/rank" component={Rank}></Route>
                    <Route path="/index/search" component={Search}></Route>
                    <Redirect to="/index/home"></Redirect>
                </Switch>

            </div>
        )
    }
}
