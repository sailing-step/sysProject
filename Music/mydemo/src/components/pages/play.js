import React, { Component } from 'react'
import axios from 'axios'
// 引入jquery
import $ from 'jquery'
import { getLyric, getUrl, getSongDetail } from '../../util/axios'
import '../../assets/css/play.css'
export default class play extends Component {
    constructor() {
        super()
        this.state = {
            lyric: '',
            songUrl: '',
            songDetail: '',
            flag: false,// 用来控制播放和暂停
            playTime: "00:00",
            al: '' // 背景图片地址
        }
        // 创建ref
        this.playIcon = React.createRef()
        this.audio = React.createRef()
    }
    componentDidMount() {
        axios.all([getLyric({ id: this.props.location.state.id }), getUrl({ id: this.props.location.state.id }), getSongDetail({ ids: this.props.location.state.id })]).then(axios.spread((lyric, songUrl, songDetail) => {
            console.log(lyric, '歌词')
            // console.log(songUrl, '歌曲地址')
            console.log(songDetail, '歌曲详情')
            if (lyric.code === 200) {
                // 创建一个去除数组的正则
                let lyricInfo = lyric.lrc.lyric
                let reg = /\[(.*?)](.*)/g
                // 把字符串的每一处[] 符号 都替换掉
                // 定义一个对象
                let obj = {}
                lyricInfo.replace(reg, (a, b, c) => {
                    // console.log(a, 'aaa')
                    // console.log(b, 'bbb')
                    // console.log(c, 'ccc')
                    // 字符串截取 截取出格式 00：00
                    b = b.slice(0, 5)
                    if (c) {
                        obj[b] = c
                    }
                    // obj[b] = c
                })
                console.log(obj)
                this.setState({
                    lyric: obj
                }, () => {
                    let audio = this.audio.current
                    this.audio.current.ontimeupdate = () => {
                        // console.log(audio.currentTime, '正在播放')
                        // 把播放器时间转化成00：00格式
                        let nowTime = this.tranTime(audio.currentTime)
                        // console.log(nowTime)
                        if (nowTime in this.state.lyric) {
                            this.setState({
                                playTime: nowTime
                            }, () => {
                                // 歌词滚动
                                this.moveLyric()
                            })
                        }
                    }
                })
            }
            if (songUrl.code === 200) {
                this.setState({
                    songUrl: songUrl.data[0].url
                })
            }
            if (songDetail.code === 200) {
                this.setState({
                    songDetail: songDetail.songs[0],
                    al: songDetail.songs[0].al
                })
            }
        }))
    }
    // 创建播放事件
    toPlay() {
        // 当用户点击开关取反
        this.setState({
            flag: !this.state.flag
        }, () => {
            if (this.state.flag) {
                // flag是真应该暂停音乐
                this.audio.current.pause()
                this.playIcon.current.style.display = 'block'
            } else {
                // flag是假应该播放音乐
                this.audio.current.play()
                this.playIcon.current.style.display = 'none'
            }
        })

    }
    // 封装一个时间转化事件
    tranTime(timer) {
        let minute = (Math.floor(timer / 60) + '').padStart(2, '0')
        let second = (Math.floor(timer % 60) + '').padStart(2, '0')
        return `${minute}:${second}`
    }
    // 歌词滚动事件
    moveLyric() {
        // 取出带active的P标签
        let active = document.getElementsByClassName('active')[0]
        // 查找出active索引
        let index = $('.m-song-iner').children().index(active)
        console.log(index)
        let offset = 32
        if (active) {
            if (active.offsetTop > offset) {
                // console.log('进来')
                //移动Y 轴 //transform: translateY(32px);
                $('.m-song-iner').css("transform", `translateY(-${index * offset}px)`)
            }
        }
    }
    render() {
        const { lyric, songUrl, songDetail, playTime, al } = this.state
        // console.log(al)
        return (
            <div className="play">
                <div className="container">
                    <div className="m-newsong">
                        {/*  */}
                        <div className="m-song-bg" style={{ backgroundImage: `url(${al.picUrl})` }}></div>
                        <div className="m-song_nor">
                            <div className="m-scroll"></div>
                            <div>
                                <div className="m-song_newfst" onClick={this.toPlay.bind(this)}>
                                    <audio src={songUrl} autoPlay ref={this.audio}></audio>
                                    <div>
                                        <div className="m-song-wrap ">
                                            <div className="m-song-disc">
                                                <div className="m-song-turn">
                                                    <div className="m-song-rollwrap" style={{ transform: 'matrix(0.161973, 0.986795, -0.986795, 0.161973, 0, 0)' }}>
                                                        <div className="m-song-img ">
                                                            {
                                                                songDetail.al ? <img className="u-img" alt="song-img" src={songDetail.al.picUrl} /> : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="m-song-lgour" style={{ transform: 'matrix(0.161973, 0.986795, -0.986795, 0.161973, 0, 0)' }}>
                                                        <div className="m-song-light ">
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="m-song-plybtn" ref={this.playIcon}></span>
                                            </div>
                                            <div className="m-song-clickarea"></div>
                                        </div>
                                        <div>
                                            <div className="m-song-info">
                                                <h2 className="m-song-h2">
                                                    <span className="m-song-sname">{songDetail.name}
                                                        {
                                                            songDetail.alia ? songDetail.alia.map(item => {
                                                                return <span className="sgalia" style={{ color: '#fff' }} key={item}>( {item} )</span>
                                                            }) : ""
                                                        }
                                                    </span>
                                                    <span className="m-song-gap">-</span>
                                                    {
                                                        songDetail.ar ? songDetail.ar.map(item => {
                                                            return <b className="m-song-autr" key={item.id}>{item.name}</b>
                                                        }) : ''
                                                    }
                                                </h2>
                                                <div className="m-song-lrc f-pr">
                                                    <div className="m-song-scroll" style={{ height: '1.12rem' }}>
                                                        <div className="m-song-iner">
                                                            {/* 对象转化成数组，循环遍历 */}
                                                            {
                                                                Object.entries(lyric).map((item, i) => {
                                                                    if (playTime == item[0]) {
                                                                        return <p className="m-song-lritem j-lritem active" key={i}>{item[1]}</p>
                                                                    } else {
                                                                        return <p className="m-song-lritem j-lritem" key={i}>{item[1]}</p>
                                                                    }
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="u-ft">
                        <div className="footer-wrap">
                            <div className="m-btn">
                                <button className="btn">打 开</button>
                            </div>
                            <span className="u-btn u-btn-red">下 载</span>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
