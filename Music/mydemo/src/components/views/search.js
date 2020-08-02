import React, { Component } from 'react'
import '../../assets/css/search.css'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
export default class search extends Component {
    constructor() {
        super()
        this.state = {
            searchList: [
                {
                    id: 1,
                    keyword: 'Taylor Swift'
                },
                {
                    id: 2,
                    keyword: '麻雀'
                },
                {
                    id: 3,
                    keyword: '无滤镜'
                },
                {
                    id: 4,
                    keyword: '周杰伦'
                },
                {
                    id: 5,
                    keyword: '知否知否'
                },
            ]
        }
    }
    render() {
        const { searchList } = this.state
        return (
            <div className="search">
                <div className="container">
                    <div className="bar">
                        <SearchBar placeholder="搜索歌曲、歌手、专辑" maxLength={8} />
                    </div>
                    <div className="hotlist">
                        <h3 className="hotitle">热门搜索</h3>
                        <ul className="list">
                            {
                                searchList.map(item => {
                                    return <li className="item" key={item.id}>
                                        <a href="#" className="link">{item.keyword}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
