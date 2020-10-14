import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/Article/ArticleInput";
import Preview from "../../components/Article/ArticleView";
import Tab from "../../components/Article/Tab/Tab";
import Button from "../../components/Article/Button/EditButton";
import * as actionCreators from "../../store/actions/index";
import Logout from "../Login/Logout";

class EditArticle extends Component {
  state = {
    title: "",
    content: "",
    value: 1,
  };

  componentDidMount() {
    this.props.onGetArticle(parseInt(this.props.match.params.id));
    this.setState({ title: this.props.atc.title });
    this.setState({ content: this.props.atc.content });
  }

  confirmHandler = () => {
    const editedArticle = {
      ...this.props.atc,
      title: this.state.title,
      content: this.state.content,
    };
    this.props.onEditArticle(editedArticle);
  };

  backHandler = () => {
    // not modified -> detail page
    if (
      this.state.title === this.props.atc.title &&
      this.state.content === this.props.atc.content
    ) {
      this.props.history.push("/articles/" + this.props.atc.id);
      return;
    }
    // modified
    else if (window.confirm("Are you sure? The change will be lost.")) {
      this.props.history.push("/articles/" + this.props.atc.id);
    }
  };

  render() {
    return (
      <div className="EditArticle">
        <Logout />
        <Tab
          className="EditTab"
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
            onChangeTitle={(event) => {
              this.setState({ title: event.target.value });
            }}
            onChangeContent={(event) => {
              this.setState({ content: event.target.value });
            }}
          />
          <Preview
            value={this.state.value}
            index={2}
            title={this.state.title}
            content={this.state.content}
            authorName={
              this.props.users.find((user) => user.id === this.props.userID)
                .name
            }
          />
        </div>
        <Button
          isEmpty={this.state.title === "" || this.state.content === ""}
          backHandler={() => this.backHandler()}
          confirmHandler={() => this.confirmHandler()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userID: state.user.userID,
    users: state.user.users,
    atc: state.atc.selectedArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
    onEditArticle: (atc) => dispatch(actionCreators.editArticle(atc)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
