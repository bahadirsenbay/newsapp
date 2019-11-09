import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Icon, Col, Row, Button, Input, Modal } from 'antd'

const { Meta } = Card;
const { Search } = Input 

const News = (props) => {
    const [news, setNews] = useState()
    const [modals, setModals] = useState({ index:null })
    const categoryPath = props.history.location.pathname.substring(1);

    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=tr&category=' + categoryPath + '&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
            .then(res => {
                setNews(res.data.articles)
                console.log(res.data.articles)
            })
    }, [categoryPath])

    const handleValue = (e) => {
        axios.get('https://newsapi.org/v2/everything?q='+ e.target.value +'&from=2019-10-09&sortBy=publishedAt&apiKey=50663fc6125e4bb7b58f140e0f08ad59')
        .then(res => {
            setNews(res.data.articles)
        })
    }

   const showModal = (i) => {
       setModals({index:i})
   }

   const handleCancel = () => {
       setModals(false)
   }

    return (
        
        <>
            <Search onChange={(e)=>handleValue(e)} placeholder="search text" style={{ width: '100%', marginBottom: 18 }} />

            <Row gutter={16}>
                {
                    !news ?
                        <div style={{ textAlign: 'center' }}>
                            <img width='100' alt='loading' src='https://www.teknosacell.com/images/loadingmodal.gif' />
                        </div>
                        :
                        news && news.map((res, index) => {
                            return (
                            
                                <Col key={index} md={{span:6}}>
                                    <Card
                                        style={{marginBottom: 30 }}
                                        cover={

                                            <img
                                                style={{ height: 200 }}
                                                alt="example"
                                                src={res.urlToImage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
                                            />

                                        }
                                        
                                        actions={[
                                            <Icon onClick={()=>showModal(index)} type="arrow-up" key="setting" />,
                                            <Modal
                                            title={res.title}
                                            visible={modals.index === index ? true : false}
                                            onCancel={()=>handleCancel()}
                                            footer={[
                                                <Button key="warnings" type="primary" onClick={()=>handleCancel()}>
                                                  Close
                                                </Button>,
                                              ]}
                                          >
                                            <img
                                                style={{ height: 200, width: 470, marginBottom: 7 }}
                                                alt="example"
                                                src={res.urlToImage || 'http://design-ec.com/d/e_others_50/l_e_others_500.png'}
                                            />
                                            <hr/>
                                            {res.content && res.content}
                                          </Modal>,
                                            <Icon type="setting" key="setting" />,
                                            <Icon type="edit" key="edit" />,
                                            <Icon type="right" key="edit" />,
                                            

                                        ]}
                                    >
                                            <Meta
                                                style={{ height: 90 }}
                                                title={res.title}
                                                description={res.description && res.description.substring(0, 100) + '...'}
                                            />
                                    </Card>
                                </Col>
                            )

                        })
                }
            </Row>

        </>
    )
}

export default News;



