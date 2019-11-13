import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { NewsStore } from './stores/newsStore'
import { Drawer, List, Avatar } from 'antd'

const Deneme = observer(() => {
    useEffect(() => {
        NewsStore.getNews()
    }, [])
    return (
        <div>
            <Drawer
                placement="right"
                closable={false}
                onClose={() => NewsStore.showDrawer()}
                visible={NewsStore.visible}
            >
                <List
                    dataSource={NewsStore.saved}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                description={<p>{item.title.substring(0, 30) + '...'}</p>}
                            />
                        </List.Item>
                    )}
                />


            </Drawer>
            <ul>
                {
                    NewsStore.news &&
                    NewsStore.news.map((res, index) => (
                        <li key={index}><a onClick={() => NewsStore.handleForSave(res.title, res.urlToImage)}>{res.title}</a></li>
                    ))
                }
            </ul>
        </div>
    )
})

export default Deneme