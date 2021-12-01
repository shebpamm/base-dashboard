import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;



function App() {
  return (
    <div className="App">
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
