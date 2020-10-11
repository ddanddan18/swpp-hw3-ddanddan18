import React from "react";
import { shallow } from "enzyme";
import CommentButton from "./CommentButton";

describe("<CommentButton />", () => {
  it("should render without errors", () => {
    const component = shallow(<CommentButton />);
    const wrapper = component.find(".CommentButton");
    expect(wrapper.length).toBe(1);
  });
});
