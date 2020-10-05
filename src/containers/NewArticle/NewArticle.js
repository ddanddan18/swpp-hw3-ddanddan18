import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/InputArticle/TabContent/Input";
import Preview from "../../components/InputArticle/TabContent/Preview";
import Tab from "../../components/InputArticle/Tab";
import Button from "../../components/InputArticle/Button";
import * as actionCreators from "../../store/actions/index";

class NewArticle extends Component {
  state = {
    title: "",
    content: "",
    value: 1,
  };

  postArticleHandler = () => {
    this.props.onStoreArticle(this.state.title, this.state.content, this.props.userID);
  };
  render() {
    return (
      <div className="NewArticle">
        <Tab
          value={this.state.value}
          onClick={(event) => {
            this.setState({ value: parseInt(event.target.value) });
          }}
        />
        <div className="tabContentConatiner">
          <Input
            value={this.state.value}
            index={1}
            title={this.state.title}
            content={this.state.content}
            onChangeTitle={(event) => this.setState({ title: event.target.value })}
            onChangeContent={(event) => this.setState({ content: event.target.value })}
          />
          <Preview
            value={this.state.value}
            index={2}
            title={this.state.title}
            content={this.state.content}
            author={this.props.users.find((user) => user.id === this.props.userID).name}
          />
        </div>
        <Button
          isEmpty={this.state.title === "" || this.state.content === ""}
          backHandler={() => this.props.history.push("/articles")}
          confirmHandler={() => this.postArticleHandler()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: state.user.userID,
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreArticle: (title, content, userID) =>
      dispatch(actionCreators.postArticle({ author_id: userID, title, content })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
