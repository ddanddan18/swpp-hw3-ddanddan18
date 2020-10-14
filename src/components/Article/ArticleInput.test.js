import React from "react";
import { shallow } from "enzyme";
import ArticleInput from "./ArticleInput";

describe("<ArticleInput />", () => {
  it("should render without errors", () => {
    const component = shallow(<ArticleInput />);
    const wrapper = component.find(".tabContent");
    expect(wrapper.length).toBe(1);
  });

  it("should not render when preview tab", () => {
    const component = shallow(<ArticleInput value={2} index={1} />);
    expect(component.find(".tabContent").props().hidden).toBe(true);
  });
});
