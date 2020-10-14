import React from "react";
import { shallow } from "enzyme";
import ArticleView from "./ArticleView";

describe("<ArticleView />", () => {
  it("should render without errors", () => {
    const component = shallow(<ArticleView />);
    const wrapper = component.find(".tabContent");
    expect(wrapper.length).toBe(1);
  });

  it("should not render when write tab", () => {
    const component = shallow(<ArticleView value={1} index={2} />);
    expect(component.find(".tabContent").props().hidden).toBe(true);
  });
});
