import React, { useState } from 'react';
import { Layout, Breadcrumb, Col, Row, Form, Input, Button, Icon, Alert } from 'antd';
import { Route, withRouter } from 'react-router-dom'
import Headers from './Headers'
import News from './News'
import './App.css';
import Deneme from './deneme';

const { Content, Footer } = Layout;

const App = (props) => {
  const categoryPathname = props.history.location.pathname.substring(1);
  const [userLogged, setUserLogged] = useState(true)
  const [isError, setError] = useState(false)

  let username = 'bahadir';
  let password = 123;

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })
  const handleForm = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    if (userInfo.username == username && userInfo.password == password) {
      setUserLogged(true)
    } else {
      setError(true)
    }
  }
  return (
    <Layout>
      {!userLogged &&

        <Row type="flex" align='middle' style={{ height: '100vh' }} justify="center">
          <Col span={4}>
            <Form className="login-form">
              <Form.Item>
                <h2 align='center'>Kullanıcı Girişi</h2>
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  name='username'
                  onChange={(e) => handleForm(e)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  name='password'
                  onChange={(e) => handleForm(e)}
                />
              </Form.Item>
              {
                isError ?
                  <Alert
                    message="Hata"
                    description="Bilgilerinizde hata var. Lütfen Kontrol Edin. Ve Düzeltin."
                    type="error"
                    showIcon
                  />
                  :
                  null
              }
              <Form.Item>

              </Form.Item>
              <Form.Item>
                <Button onClick={() => { handleSubmit() }} type="primary" htmlType="submit" className="login-form-button">
                  Log in
          </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      }
      {
        userLogged &&
        <>
          <Headers />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>{categoryPathname.charAt(0).toUpperCase() + categoryPathname.slice(1)}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Route exact path="/" component={News} />
              <Route exact path="/business" component={News} />
              <Route exact path="/entertainment" component={News} />
              <Route exact path="/health" component={News} />
              <Route exact path="/science" component={News} />
              <Route exact path="/sports" component={News} />
              <Route exact path="/technology" component={News} />
              <Route exact path="/deneme" component={Deneme} />
            </div>
          </Content>
          <Footer />
        </>
      }

    </Layout>
  );
}

export default withRouter(App);
