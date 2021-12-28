import './App.css';
import 'antd/dist/antd.css';

import React from 'react';

import stockComponent from './stockComponent';
import itemComponent from './itemComponent';
import energyComponent from './energyComponent';


import { Layout, Menu, Space } from 'antd';
const { Header, Content } = Layout;



class App extends React.Component {

pages = [
  { name: 'Stock Keeping', key: 'stock', component: stockComponent },
  { name: 'Inventory', key: 'items', component: itemComponent },
  { name: 'Energy', key: 'energy', component: energyComponent },
]

state = {
  current: this.pages[0],
}

handleClick = e => {
  console.log(this.pages.find(page => page.key === e.key))
  this.setState( {current: this.pages.find(page => page.key === e.key) });
};

render() {
  const { current } = this.state;
  const BodyComponent = current.component;

  return (
    <div className="App">
        <Layout>
          <Space direction="vertical" size='large'>
            <Header>
              <Menu theme="dark" mode="horizontal" onClick={this.handleClick} selectedKeys={[ current.key ]}>
                { this.pages.map( page => (
                  <Menu.Item key={page.key}>{page.name}</Menu.Item>
                )) }
              </Menu>
            </Header>
            <Content>
              <BodyComponent />
            </Content>
          </Space>
        </Layout>
    </div>
  );
  }
}

export default App
