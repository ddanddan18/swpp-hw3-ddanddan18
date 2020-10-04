import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Login extends Component {
  state = {
    id: "",
    pw: "",
  };
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/articles" />;
    }
    return (
      <div className="Login">
        <h1>Login</h1>
        <label>Email ID</label>
        <input
          id="email-input"
          type="text"
          value={this.state.id}
          onChange={(event) => this.setState({ id: event.target.value })}
        ></input>
        <br />
        <label>Password</label>
        <input
          id="pw-input"
          type="text"
          value={this.state.pw}
          onChange={(event) => this.setState({ pw: event.target.value })}
        ></input>
        <br />
        <button id="login-button" onClick={() => this.loginHandler()}>
          Login
        </button>
      </div>
    );
  }

  loginHandler = () => {
    // validation login input (find user in userlist)
    if (!this.authenticateInput()) return;
    // change authorize state
    this.props.onLogin(this.props.users.find((user) => user.id === 1));
    // redirect /articles page -> move on render
  };

  authenticateInput = () => {
    // TODO change to check with userlist
    const isValid = this.state.id === "swpp@snu.ac.kr" && this.state.pw === "iluvswpp";
    if (!isValid) alert("Email or password is wrong");
    return isValid;
  };
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    users: state.user.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch(actionCreators.login(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
