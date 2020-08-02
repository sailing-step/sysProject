import React, { Component } from 'react'
import '../../assets/css/list.css'
export default class list extends Component {
    render() {
        return (
            <div class="list">
                <div>
                    <section className="u-plhead">
                        <div className="plhead_bg"></div>
                        <div className="plhead_wrap">
                            <div className="plhead_fl lsthd_fl">
                                <img class="u-img" src="https://p2.music.126.net/INq3U1kogB4zwrtTWP7kVg==/109951164983505096.jpg?imageView=1&amp;type=webp&amp;thumbnail=252x0" />
                                <span class="lsthd_icon">歌单</span>
                                <i class="u-earp lsthd_num">139.3万</i>
                            </div>
                            <div className="plhead_fr">
                                <h2 className="pl_title">维吾尔语精选歌曲</h2>
                                <div className="author">
                                    <a className="pl_link" href="#">
                                        <div class="u-avatar lsthd_ava">
                                            <img class="u-img" src="http://p1.music.126.net/3_4ZvXF2Xlwtk5iV63hb3g==/109951165153220408.jpg?imageView=1&amp;type=webp&amp;thumbnail=60x0" />
                                            <span class="ava-icon ava-icon-yyr">
                                            </span>
                                        </div>
                                            Amarjan...
                                            </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pylst_intro">
                        <div className="lstit_tags">
                            标签：
                        <em className="f-bd f-bd-full lstit_tag">小语种</em>
                            <em className="f-bd f-bd-full lstit_tag">流行</em>
                            <em className="f-bd f-bd-full lstit_tag">榜单</em>
                        </div>
                        <div className="u-intro"><div className="f-brk">
                            <span><i>简介：精选维吾尔语歌曲，持续更新。最新、最经典的歌曲都会在这里更新，肯定会有那么一首是你的最爱，希望你们收藏并分享，Thank You！</i>
                            </span>
                        </div>
                        </div>
                    </section>
                    <div className="pylst_list">
                        <h3 className="u-smtitle">歌曲列表</h3>
                        <div className="m-sglst">
                            <a className="m-sgitem" href="#">
                                <div className="sgfl">1</div>
                                <div className="sgfr f-bd f-bd-btm">
                                    <div className="sgchfl">
                                        <div className="f-thide sgtl">Gulum</div>
                                        <div className="f-thide sginfo">Ghulamjan Yakup
                                        Ghulamjan Yakup
                                         </div>
                                    </div>
                                    <div className="sgchfr">
                                        <span className="u-hmsprt sgchply"></span>
                                    </div>
                                </div>
                            </a>
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
