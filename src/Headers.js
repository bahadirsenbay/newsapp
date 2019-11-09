import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'

const { Header } = Layout;

const Headers = () => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><Link to="/business">Business</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/entertainment">Entertainment</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/health">Health</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/science">Science</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/sports">Sports</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/technology">Technology</Link></Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
}

export default Headers;
