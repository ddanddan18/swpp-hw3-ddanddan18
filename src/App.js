import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Login from "./containers/Login/Login";
import ArticleList from "./containers/Articles/ArticleList";
import ArticleDetail from "./components/Article/Detail";
import EditArticle from "./containers/EditArticle/EditArticle";
import NewArticle from "./containers/NewArticle/NewArticle";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onGetUsers();
    this.props.onGetArticles();
    this.props.onGetComments();
    this.props.onGetLoggedIn();
  }
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <Redirect exact from="/" to="/login" />
            <AuthRoute authenticated={this.props.isLoggedIn} path="/articles/create" exact component={NewArticle} />
            <AuthRoute authenticated={this.props.isLoggedIn} path="/articles" exact component={ArticleList} />
            <AuthRoute authenticated={this.props.isLoggedIn} path="/articles/:id" exact component={ArticleDetail} />
            <AuthRoute authenticated={this.props.isLoggedIn} path="/articles/:id/edit" exact component={EditArticle} />
            <AuthRoute authenticated={this.props.isLoggedIn} render={() => <h1>Not Found</h1>} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

// 로그인 되어있지 않으면 로그인 페이지로 보내는 라우팅
// 로그인 되어있을 경우에는 기존대로 라우팅 (로그인 되어있을 때 로그인 화면에서 articles 로 redirect하는 것은 Login.js에 구현)
function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? render ? render(props) : <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    users: state.user.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => dispatch(actionCreators.getUsers()),
    onGetArticles: () => dispatch(actionCreators.getArticles()),
    onGetComments: () => dispatch(actionCreators.getComments()),
    onGetLoggedIn: () => dispatch(actionCreators.getLoggedIn()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
