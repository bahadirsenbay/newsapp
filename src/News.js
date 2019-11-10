import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Icon, Col, Row, Button, Input, Modal, Drawer, List, Avatar } from 'antd'

const { Meta } = Card;
const { Search } = Input

const News = (props) => {
    const [news, setNews] = useState()
    const [modals, setModals] = useState({ index: null })
    const [drawers, setDrawers] = useState(false)
    const [saved, setSaved] = useState([])
    const categoryPath = props.history.location.pathname.substring(1);

    //Kategorileme Apisi
    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=tr&category=' + categoryPath + '&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
            .then(res => {
                setNews(res.data.articles)
            })
    }, [categoryPath])


    const handleValue = (e) => {
        const searchs = e.target.value
        axios.get('https://newsapi.org/v2/top-headlines?country=tr&q=' + searchs + '&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
            .then(res => {
                setNews(res.data.articles)
            })
    }

    const showModal = (i) => {
        setModals({ index: i })
    }

    const showDrawer = () => {
        setDrawers({
            visible: true
        })
    }

    const onClose = () => {
        setDrawers({
            visible: false
        })
    }

    const handleForSave = (title, image) => {
        let newItem={ title,image }
        setSaved([...saved, newItem])
    }
    return (

        <>
        <Row gutter={23}>
            <Col span={22}><Search onChange={(e) => handleValue(e)} placeholder="search text" style={{ width: '100%', marginBottom: 18 }} /></Col>
            <Col span={1}><Button type="primary" onClick={() => showDrawer()}>Open</Button></Col>
        </Row>
            
            <div>
               
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={() => onClose()}
                    visible={drawers.visible}
                >
                    <List
                            dataSource={saved}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                description={<p>{item.title.substring(0, 30)+'...'}</p>}
                                />
                            </List.Item>
                            )}
                        />
                

                </Drawer>
            </div>
            <Row gutter={16}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={news}
                    renderItem={(res,index) => (
                    <List.Item>
                                    <Card
                                        style={{ marginBottom: 30 }}
                                        cover={

                                            <img
                                                style={{ height: 200 }}
                                                alt="example"
                                                src={res.urlToImage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
                                            />

                                        }

                                        actions={[
                                            <Icon onClick={() => showModal(index)} type="arrow-up" key="setting" />,
                                            <Modal
                                                title={res.title}
                                                visible={modals.index === index ? true : false}
                                                onCancel={() => setModals(false)}
                                                footer={[
                                                    <Button key="warnings" type="primary" onClick={() => setModals(false)}>
                                                        Close
                                                </Button>,
                                                ]}
                                            >
                                                <img
                                                    style={{ height: 200, width: 470, marginBottom: 7 }}
                                                    alt="example"
                                                    src={res.urlToImage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
                                                />
                                                <hr />
                                                {res.content && res.content}
                                            </Modal>,
                                            <Icon onClick={() => handleForSave(res.title, res.urlToImage)} type="save" key="save" />,
                                            <Icon type="edit" key="edit" />,
                                            <a href={res.url} rel="noopener noreferrer" target="_blank"><Icon type="right" key="edit" /></a>,


                                        ]}
                                    >
                                        <Meta
                                            style={{ height: 90 }}
                                            title={res.title}
                                            description={res.description && res.description.substring(0, 100) + '...'}
                                        />
                                    </Card>
                    </List.Item>
                    )}
                />
            </Row>

        </>
    )
}

export default News;



