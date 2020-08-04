import React, { Component } from 'react'

import '../../assets/css/rank.css'
import { getHotList } from '../../util/axios'
// 引入导航路由链接
import { NavLink } from 'react-router-dom'
export default class rank extends Component {
    constructor() {
        super()
        this.state = {
            hotime: 0,
            hotList: []
        }
    }
    componentDidMount() {
        this.gethotlist()
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
    // 获取热歌榜事件
    gethotlist() {
        getHotList().then(res => {
            if (res.code === 200) {
                console.log(res.playlist, '热歌榜')
                // 对返回列表进行过滤
                let hotsongList = res.playlist.tracks.filter((item, i) => i < 20)
                console.log(hotsongList)
                this.setState({
                    hotime: res.playlist.updateTime,
                    hotList: hotsongList
                })
            }
        })
    }
    // 封装一个时间转化函数
    formatTime(timer) {
        let timeInfo = parseInt(timer)
        let date = new Date(timeInfo)
        // 年份
        let year = date.getFullYear()
        // 月份
        let month = (date.getMonth() + 1 + '').padStart(2, '0')
        // 日
        let day = (date.getDate() + '').padStart(2, '0')
        //小时
        let hours = (date.getHours() + '').padStart(2, '0')
        //分钟
        let minutes = (date.getMinutes() + '').padStart(2, '0')
        //秒数
        let seconds = (date.getSeconds() + '').padStart(2, '0')
        return `${month}月${day}日`
    }
    render() {
        const { hotList, hotime } = this.state
        return (
            <div className="rank">
                <div className="hotop">
                    <div className="hotPic">
                        <div className="hoticon u-hmsprt"></div>
                        <div className="hotime">
                            更新日期：{this.formatTime(hotime)}
                        </div>
                    </div>
                </div>
                <ul className="m-sglst">
                    {
                        hotList.map((item, i) => {
                            return <li className="sgitem" key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                {/* <div className="sgfl">{i < 9 ? '0' + (i + 1) : (i + 1)}</div> */}
                                <div className={i < 3 ? "sgfl sgfl-cred" : "sgfl"}>{i < 9 ? '0' + (i + 1) : (i + 1)}</div>
                                <div className="sgfr">
                                    <div className="sgchfl f-thide">
                                        <div className=" f-thide sgtl">{item.name}
                                            {
                                                item.alia ? item.alia.map(item => {
                                                    return <span className="sgalia" key={item}>({item})</span>
                                                }) : ""
                                            }
                                        </div>
                                        <div className="f-thide sginfo">
                                            <i className="u-hmsprt sghot"></i>
                                            {
                                                item.al ? item.ar.map(item => {
                                                    return <span className="artist" key={item.id}>{item.name} <i>/</i> </span>
                                                }) : ''
                                            }-{item.al.name}
                                        </div>
                                    </div>
                                    <div className="sgchfr">
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
