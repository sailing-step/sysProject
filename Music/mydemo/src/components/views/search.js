import React, { Component } from 'react'
import '../../assets/css/search.css'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { searchHot, searchInfo } from '../../util/axios'
export default class search extends Component {
    constructor() {
        super()
        this.state = {
            searchhotList: [
            ],
            searchList: []
        }
        this.inpVal = React.createRef()
    }
    componentDidMount() {
        this.get_search_hot()
    }
    //获取热搜列表接口
    get_search_hot() {
        searchHot().then(res => {
            if (res.code === 200) {
                // console.log(res, '热门搜索')
                this.setState({
                    searchhotList: res.result.hots
                })
            }
        })
    }
    // 封装一个搜索事件
    goSearch(keywords) {
        // 给input赋值
        this.inpVal.current.value = keywords
        // 调取搜索接口
        searchInfo({ keywords }).then(res => {
            if (res.code === 200) {
                console.log(res, '搜索结果')
                this.setState({
                    searchList: res.result.songs
                })
            }
        })
    }
    // 封装一个getInput
    getInput() {
        console.log(this.inpVal.current.value, 'input内容')
        // 重新渲染
        this.setState({})
    }
    //清空事件
    clearInfo() {
        // input为空
        this.inpVal.current.value = ''
        this.setState({
            searchList: []
        })
    }
    // 键盘事件
    enter(e) {
        if (e.keyCode === 13 && e.target.value != '') {
            this.goSearch(e.target.value)
        }
    }
    render() {

        const { searchhotList, searchList } = this.state
        let valFlag = ''
        if (this.inpVal.current) {
            valFlag = this.inpVal.current.value
            console.log(valFlag, 'this.inpVal.current.value')
        }
        let hotInfo = <div className="hotlist">
            <h3 className="hotitle">热门搜索</h3>
            <ul className="list">
                {
                    searchhotList.map(item => {
                        return <li className="item" key={item.first} onClick={this.goSearch.bind(this, item.first)}>
                            <a href="#" className="link">{item.first}</a>
                        </li>
                    })
                }
            </ul>
        </div>
        return (
            <div className="search">
                <div className="container">
                    {/* 搜索框 */}
                    {/* <SearchBar placeholder="搜索歌曲、歌手、专辑" maxLength={8} /> */}
                    <div className="m-input f-bd f-bd-btm" >
                        <div className="inputcover">
                            <i className="u-svg u-svg-srch"></i>
                            <input type="search" name="search" className="input" ref={this.inpVal} onInput={this.getInput.bind(this)} placeholder="搜索歌曲、歌手、专辑" onKeyUp={this.enter.bind(this)} />
                            <div className="close">
                                {
                                    valFlag ? <i className="u-svg u-svg-empty" onClick={this.clearInfo.bind(this)}></i> : ''
                                }
                            </div>

                        </div>
                    </div>


                    {/* 搜索列表 */}
                    <div>
                        <ul className="m-sglst">
                            {
                                searchList.length > 0 ? searchList.map(item => {
                                    return <li className="m-sgitem" key={item.id}>
                                        <div className="sgfr f-bd f-bd-btm">
                                            <div className="sgchfl">
                                                <div className="f-thide sgtl">{item.name}</div>
                                                <div className="f-thide sginfo">
                                                    <i className="u-hmsprt sghot"></i>
                                                    <p className="hcover">
                                                        {
                                                            item.artists ? item.artists.map((item, index) => {
                                                                return <span className={index == 0 ? 'highlight artist' : 'normal artist'} key={item.id}>{item.name}<i>/</i></span>
                                                            }) : ''
                                                        }
                                                        {/* <span className="highlight">黄明昊</span>
                                                        <span className="normal"> (Justin)</span> */}
                                                    </p>
                                                    - <p className="hcover">{item.album.name}</p>
                                                </div>
                                            </div>
                                            <div className="sgchfr"><span className="u-hmsprt sgchply"></span>
                                            </div>
                                        </div>
                                        {/* {item.name} */}
                                    </li>

                                }) : ''
                            }

                        </ul>
                    </div>
                    {/* 热搜标签 */}
                    {
                        searchList.length == 0 ? hotInfo : ''
                    }

                </div>
            </div>
        )
    }
}
