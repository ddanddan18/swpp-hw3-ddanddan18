import React, { Component } from "react";
import Input from "../../components/InputArticle/TabContent/Input";
import Preview from "../../components/InputArticle/TabContent/Preview";
import Tab from "../../components/InputArticle/Tab";
import Button from "../../components/InputArticle/Button";

class NewArticle extends Component {
  state = {
    title: "",
    content: "",
    value: 1,
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
            author={"temp author"}
          />
        </div>
        <Button />
      </div>
    );
  }

  handleChange = (event, newValue) => {
    console.log("tab change", newValue);
    this.setState({ value: newValue });
  };
}
export default NewArticle;
