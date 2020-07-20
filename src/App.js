import React from "react";
import { Layout } from "antd";
import ErrorBoundary from "./components/error-boundary";
import routes, { mapRoutes, Switch } from "./routes";
import "./styles/App.scss";

const { Sider, Content, Header } = Layout;
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    const { loading } = this.state;

    return (
      <Layout className="boco">
        <Header></Header>
        <Layout>
          <Sider className="boco-sider"></Sider>
          <Content className="boco-content">
            <ErrorBoundary>
              {!loading && <Switch>{mapRoutes(routes)}</Switch>}
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
