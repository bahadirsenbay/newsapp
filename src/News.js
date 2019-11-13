import React, { useState, useEffect } from 'react'
import { Card, Icon, Col, Row, Button, Input, Modal, Drawer, List, Avatar } from 'antd'
import {observer} from 'mobx-react-lite'
import {NewsStore} from './stores/newsStore'
const { Meta } = Card;
const { Search } = Input

const News = observer((props) => {
    const [modals, setModals] = useState({ index: null })
    const categoryPath = props.history.location.pathname.substring(1);

    //Kategorileme Apisi
    useEffect(() => {
        NewsStore.getNews(categoryPath)
    }, [categoryPath])

    const showModal = (i) => {
        setModals({ index: i })
    }

    return (

        <>
        <Row gutter={23}>
            <Col span={22}><Search onChange={(e) => NewsStore.handleValue(e)} placeholder="search text" style={{ width: '100%', marginBottom: 18 }} /></Col>
            <Col span={1}><Button type="primary" onClick={() => NewsStore.showDrawer()}>Saved</Button></Col>
        </Row>
            
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
                    dataSource={NewsStore.news}
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
                                            <Icon onClick={() => NewsStore.handleForSave(res.title, res.urlToImage)} type="save" key="save" />,
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
})

export default News;



