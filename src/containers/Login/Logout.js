import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Logout extends Component {
  render() {
    return (
      <div className="Logout">
        <button
          id="logout-button"
          onClick={() =>
            this.props.onLogout(this.props.users.find((user) => user.id === 1))
          }
        >
          Logout
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { users: state.user.users };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (user) => dispatch(actionCreators.logout(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
