import React, { Component } from 'react'
import '../../assets/css/detail.css'
import axios from 'axios'
import { getPlayList, getPlayComment } from '../../util/axios'
export default class list extends Component {
    constructor() {
        super()
        this.state = {
            playDetail: {},
            commentDetail: [],
            creator: {},
            playCount: 0
        }
    }
    componentDidMount() {
        // console.log(this.props)
        // 组件一加载就调取歌单详情 评论详情
        axios.all([getPlayList({ id: this.props.location.state.id }), getPlayComment({ id: this.props.location.state.id })]).then(axios.spread((playDetail, commentDetail) => {
            console.log(playDetail, 'playDetail详情')
            console.log(commentDetail, 'commentDetail详情')
            if (playDetail.code === 200) {
                this.setState({
                    playDetail: playDetail.playlist,
                    creator: playDetail.playlist.creator,
                    playCount: playDetail.playlist.playCount
                })
            }
            if (commentDetail.code === 200) {
                this.setState({
                    commentDetail: commentDetail.hotComments
                })
            }
        }))
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
        const { playDetail, commentDetail, creator, playCount } = this.state
        return (
            <div className="detail">
                <div>
                    <section className="u-plhead">
                        <div className="plhead_bg" style={{ backgroundImage: `url(${playDetail.coverImgUrl})` }}></div>
                        <div className="plhead_wrap">
                            <div className="plhead_fl lsthd_fl">
                                <img className="u-img" src={playDetail.coverImgUrl} />
                                <span className="lsthd_icon">歌单</span>
                                <i className="u-earp lsthd_num">{this.tranNumber(playCount, 1)}</i>
                            </div>
                            <div className="plhead_fr">
                                <h2 className="pl_title">{playDetail.name}</h2>
                                <div className="author">
                                    <a className="pl_link" href="#">
                                        <div className="u-avatar lsthd_ava">
                                            <img className="u-img" src={creator.avatarUrl} />
                                            <span className="ava-icon ava-icon-yyr">
                                            </span>
                                        </div>
                                        {creator.nickname}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pylst_intro">
                        <div className="lstit_tags">
                            标签：
                            {
                                playDetail.tags ? playDetail.tags.map(item => {
                                    return <em className="f-bd f-bd-full lstit_tag" key={item}>{item}</em>
                                }) : ''
                            }
                        </div>
                        <div className="u-intro"><div className="f-brk">
                            <span><i>{playDetail.description}</i>
                            </span>
                        </div>
                        </div>
                    </section>
                    <div className="pylst_list">
                        <h3 className="u-smtitle">歌曲列表</h3>
                        <div className="m-sglst">

                            {
                                playDetail.tracks ? playDetail.tracks.map((item, i) => {
                                    return <div className="m-sgitem" key={item.id}>
                                        <div className="sgfl">{i + 1}</div>
                                        <div className="sgfr f-bd f-bd-btm">
                                            <div className="sgchfl">
                                                <div className="f-thide sgtl">{item.name}
                                                    {
                                                        item.alia ? item.alia.map(item => {
                                                            return <span className="sgalia" key={item}>({item})</span>
                                                        }) : ""
                                                    }
                                                </div>
                                                <div className="f-thide sginfo">
                                                    {
                                                        item.ar ?
                                                            item.ar.map(item => {
                                                                return <span className="artist" key={item.id}>{item.name}<i>/</i></span>
                                                            })
                                                            : ''
                                                    }
                                                    -{item.al.name}

                                                </div>
                                            </div>
                                            <div className="sgchfr">
                                                <span className="u-hmsprt sgchply"></span>
                                            </div>
                                        </div>
                                    </div>
                                }) : ''

                            }

                            <div className="more-holder"></div>
                            <div className="more-wrap f-fcc">
                                <div className="more-text">查看更多歌曲，请下载客户端</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
