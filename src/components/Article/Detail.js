import React, { Component } from "react";
import { connect } from "react-redux";
import NewComment from "../../containers/NewComment/NewComment";
import ArticleView from "./ArticleView";
import CommentList from "../../containers/Comments/CommentList";
import * as actionCreators from "../../store/actions/index";
import Logout from "../../containers/Login/Logout";

class Detail extends Component {
  componentDidMount() {
    // selected로 넣기
    this.props.onGetArticle(parseInt(this.props.match.params.id));
  }
  render() {
    let title = "";
    let content = "";
    let authorName = "";
    let articleID = null;
    if (this.props.atc) {
      title = this.props.atc.title;
      content = this.props.atc.content;
      authorName = this.props.users.find((user) => user.id === this.props.atc.author_id).name;
      articleID = this.props.atc.id;
    }
    return (
      <div className="Detail">
        <Logout />
        <ArticleView title={title} content={content} authorName={authorName} />
        {/* TODO article detail buttons */}
        {/* TODO comments 불러오기 */}
        <CommentList articleID={articleID} />
        <NewComment articleID={articleID} />
        <br />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    atc: state.atc.selectedArticle,
    users: state.user.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
