import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Login from "./containers/Login/Login";
import ArticleList from "./containers/Articles/ArticleList";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Redirect exact from="/" to="/login" />
            <AuthRoute authenticated={this.props.isLogin} path="/articles" exact component={ArticleList} />
            <AuthRoute authenticated={this.props.isLogin} render={() => <h1>Not Found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// 로그인 되어있지 않으면 로그인 페이지로 보내는 라우팅
// 로그인 되어있을 경우에는 기존대로 라우팅 (로그인 되어있을 때 로그인 화면에서 articles 로 redirect하는 것은 Login.js에 구현)
function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return <Route {...rest} render={(props) => (authenticated ? render ? render(props) : <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)} />;
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.sign.isLogin,
  };
};

export default connect(mapStateToProps, null)(App);
