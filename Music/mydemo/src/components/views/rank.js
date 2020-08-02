import React, { Component } from 'react'

import '../../assets/css/rank.css'
// 引入导航路由链接
import { NavLink } from 'react-router-dom'
export default class rank extends Component {
    constructor() {
        super()
        this.state = {
            rankList: [
                {
                    id: 1,
                    songName: '午后红茶',
                    songInfo: '张国荣'
                },
                {
                    id: 2,
                    songName: '你走',
                    songInfo: '李宗锦'
                },
                {
                    id: 3,
                    songName: '海底',
                    songInfo: '一枝榴莲'
                },
                {
                    id: 4,
                    songName: '夏天的风',
                    songInfo: '火羊瞌睡了'
                },
                {
                    id: 5,
                    songName: '雨爱',
                    songInfo: '周星星'
                }
            ]
        }
    }
    // 封装一个query跳转的方法
    goPlay(id) {
        this.props.history.push({
            pathname: '/play',
            state: {
                id
            }
        })
    }
    render() {
        const { rankList } = this.state
        return (
            <div className="rank">
                <div className="hotop">
                    <div className="hotPic">
                        <div className="hoticon u-hmsprt"></div>
                        <div className="hotime">
                            更新日期：7月30号
                        </div>
                    </div>
                </div>
                <ul>
                    {
                        rankList.map(item => {
                            return <li className="sgitem" key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                <div className="sgfl">0{item.id}</div>
                                <div className="sgfr">
                                    <div className="innerfl">
                                        <div className=" f-thide sgtl">{item.songName}</div>
                                        <div className=" f-thide sginfo">{item.songInfo}</div>
                                    </div>
                                    <div className="innerfr">
                                        <span className="u-hmsprt sgchply"></span>
                                    </div>
                                </div>
                            </li>
                        })
                    }

                </ul>
            </div>
        )
    }
}
