import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { LOGIN } from "../../store/actions/actionTypes";

class Login extends Component {
  state = {
    id: "",
    pw: "",
  };
  render() {
    if (this.props.isLogin) {
      return <Redirect to="/articles" />;
    }
    return (
      <div className="Login">
        <h1>Login</h1>
        <label>Email ID</label>
        <input id="email-input" type="text" value={this.state.id} onChange={(event) => this.setState({ id: event.target.value })}></input>
        <br />
        <label>Password</label>
        <input id="pw-input" type="text" value={this.state.pw} onChange={(event) => this.setState({ pw: event.target.value })}></input>
        <br />
        <button id="login-button" onClick={() => this.loginHandler()}>
          Login
        </button>
      </div>
    );
  }

  loginHandler = () => {
    // validation login input
    if (!this.authenticateInput()) return;
    // change authorize state
    this.props.onLogin(this.state.id, this.state.pw);
    // redirect /articles page -> move on render
  };

  authenticateInput = () => {
    // TODO change to use api login
    const isValid = this.state.id === "swpp@snu.ac.kr" && this.state.pw === "iluvswpp";
    if (!isValid) alert("Email or password is wrong");
    return isValid;
  };
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.sign.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (id, pw) => dispatch({ type: LOGIN, id, pw }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
