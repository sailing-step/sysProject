import React, { Component } from 'react'
// 引入axios库
import axios from 'axios'
// 引入swiper.css
import 'swiper/css/swiper.min.css'
import 'swiper/js/swiper.min.js'
// 调用swiper插件
import Swiper from 'swiper'
import '../../assets/css/home.css'
import { personalized, banner, newsong } from '../../util/axios'
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            bannerList: [],
            songInfo: [],
            songList: [

            ]
        }
    }
    // 调用挂载函数
    componentDidMount() {
        // 组件一加载就调取推荐歌单，banner，最新音乐的接口
        axios.all([personalized({ limit: 6 }), banner(), newsong()]).then(axios.spread((songInfo, bannerList, songList) => {
            // console.log(songInfo)
            if (bannerList.code === 200) {
                // 可以通过filter 对数组进行过滤
                let banners = bannerList.banners.filter((item, i) => i < 4)
                this.setState({
                    bannerList: banners
                }, () => {
                    //调用轮播图
                    let swiper = new Swiper('.swiper-container', {
                        autoplay: {
                            delay: 3000,
                        },
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                        }
                    });
                })
            }
            if (songInfo.code === 200) {
                this.setState({
                    songInfo: songInfo.result
                })
            }
            if (songList.code === 200) {
                this.setState({
                    songList: songList.result
                })
            }

        }))
    }
    // 封装一个跳转到推荐列表页面
    toDetail(id) {
        console.log(id)
        this.props.history.push({
            pathname: '/detail',
            state: {
                id
            }
        })
    }
    // 封装一个数字转化的方法，以万和亿为单位
    tranNumber(num, point) {
        // num:需要转化的数
        // point:需要保留的小数位数
        let numStr = num.toString()
        // 十万以内直接返回
        if (numStr.length < 6) {
            return numStr;
        }
        // 大于8位是亿
        else if (numStr.length > 8) {
            let decimal = numStr.substring(numStr.length - 8, + numStr.length - 8 + point)
            return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
        }
        // 大于6位数的是十万(以10万为分割 10万以下全部显示)
        else if (numStr.length > 5) {
            let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
            return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
        }
    }
    render() {
        const { songInfo, songList, bannerList } = this.state
        return (
            <div className="home">
                <div className="container">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {
                                bannerList.map(item => {
                                    return <div key={item.imageUrl} className="swiper-slide">
                                        <img className='imgUrl' src={item.imageUrl} alt="" />
                                    </div>
                                })
                            }
                        </div>
                        {/* 分页器。如果放置在swiper-container外面，需要自定义样式。 */}
                        <div className="swiper-pagination"></div>
                    </div>
                    <h2 className="remd_tl">推荐歌单</h2>
                    <div className="remd_song">
                        <div className="remd_ul">
                            {
                                songInfo.map(item => {
                                    return <div className="remd_li" key={item.id} onClick={this.toDetail.bind(this, item.id)}>
                                        <div className="remd_img">
                                            <img className="u-img" src={item.picUrl} />
                                            {/* <span className="u-earp remd_lnum">{item.playCount}</span> */}
                                            <span className="u-earp remd_lnum">{this.tranNumber(item.playCount, 1)}</span>
                                        </div>
                                        <p className="remd_text">{item.name}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <h2 className="remd_tl">最新音乐</h2>
                    <div className="remd_newsg">
                        <div className="sglist">
                            {
                                songList.map((item, i) => {

                                    return <div className="sgitem" key={item.id}>
                                        <div className="sgfr">
                                            <div className="innerfl">
                                                <div className=" f-thide sgtl">{item.song.name}
                                                    {
                                                        item.song.alias ? item.song.alias.map(item => {
                                                            return <span className="sgalia" key={item}>({item})</span>
                                                        }) : ""
                                                    }

                                                </div>
                                                <div className=" f-thide sginfo">
                                                    <i className="u-hmsprt sghot"></i>
                                                    {
                                                        item.song.artists ?
                                                            item.song.artists.map(item => {
                                                                return <span className="artist" key={item.id}>{item.name}<i>/</i></span>
                                                            })
                                                            : ''
                                                    }-{item.song.album.name}
                                                </div>
                                            </div>
                                            <div className="innerfr">
                                                <span className="u-hmsprt sgchply"></span>
                                            </div>
                                        </div>
                                    </div>
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
