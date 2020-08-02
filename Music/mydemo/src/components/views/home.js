import React, { Component } from 'react'
import '../../assets/css/home.css'
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            songInfo: [
                {
                    id: 1,
                    img: require('../../assets/images/remd01.jpg'),
                    count: '3.4亿',
                    title: '[VIP专享] 一周新歌推荐',
                },
                {
                    id: 2,
                    img: require('../../assets/images/remd02.jpg'),
                    count: '15.2万',
                    title: '这个世界很大，可是没人听我说话',
                },
                {
                    id: 3,
                    img: require('../../assets/images/remd03.jpg'),
                    count: '177.1万',
                    title: '中文DJ（电摇版）（车载DJ）开车驾车必听',
                },
                {
                    id: 4,
                    img: require('../../assets/images/remd04.jpg'),
                    count: '194.2万',
                    title: '好听的歌没有完整版，就像喜欢的人没有结局',
                },
                {
                    id: 5,
                    img: require('../../assets/images/remd05.jpg'),
                    count: '191.4万',
                    title: 'KORG P1000电子琴',
                },
                {
                    id: 6,
                    img: require('../../assets/images/remd06.jpg'),
                    count: '138万',
                    title: '维吾尔语精选歌曲',
                },
            ],
            songList: [
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
                },
                {
                    id: 6,
                    songName: '睹物思人',
                    songInfo: '武艺'
                }
            ]
        }
    }
    // 封装一个跳转到推荐列表页面
    toList(id) {
        this.props.history.push({
            pathname: '/list',
            state: {
                id
            }
        })
    }
    render() {
        const { songInfo, songList } = this.state
        return (
            <div className="home">
                <div className="container">
                    <h2 className="remd_tl">推荐歌单</h2>
                    <div className="remd_song">
                        <div className="remd_ul">
                            {
                                songInfo.map(item => {
                                    return <a href="#" className="remd_li" key={item.id} onClick={this.toList.bind(this, item.id)}>
                                        <div className="remd_img">
                                            <img className="u-img" src={item.img} />
                                            <span className="u-earp remd_lnum">{item.count}</span>
                                        </div>
                                        <p className="remd_text">{item.title}</p>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                    <h2 className="remd_tl">最新音乐</h2>
                    <div className="remd_newsg">
                        <div className="sglist">
                            {
                                songList.map(item => {
                                    return <a href="#" className="sgitem" key={item.id}>
                                        <div className="sgfr">
                                            <div className="innerfl">
                                                <div className=" f-thide sgtl">{item.songName}</div>
                                                <div className=" f-thide sginfo">{item.songInfo}</div>
                                            </div>
                                            <div className="innerfr">
                                                <span className="u-hmsprt sgchply"></span>
                                            </div>
                                        </div>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                    <div className="homeft">
                        <div className="ftwrap">
                            <div className="openapp">打开APP，发现更多好音乐 &gt;</div>
                            <p className="copyright">网易公司版权所有©1997-2020 杭州乐读科技有限公司运营</p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
