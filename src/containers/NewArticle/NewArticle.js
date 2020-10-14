import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/Article/ArticleInput";
import Preview from "../../components/Article/ArticleView";
import Tab from "../../components/Article/Tab/Tab";
import Button from "../../components/Article/Button/CreateButton";
import * as actionCreators from "../../store/actions/index";
import Logout from "../Login/Logout";

class NewArticle extends Component {
  state = {
    title: "",
    content: "",
    value: 1,
  };

  postArticleHandler = () => {
    this.props.onStoreArticle(
      this.props.userID,
      this.state.title,
      this.state.content
    );
  };
  render() {
    return (
      <div className="NewArticle">
        <Logout />
        <Tab
          className="CreateArticleTab"
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
            onChangeTitle={(event) =>
              this.setState({ title: event.target.value })
            }
            onChangeContent={(event) =>
              this.setState({ content: event.target.value })
            }
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
    onStoreArticle: (userID, title, content) =>
      dispatch(
        actionCreators.postArticle({ author_id: userID, title, content })
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
