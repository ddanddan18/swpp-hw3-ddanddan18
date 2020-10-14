import React from "react";
import { shallow } from "enzyme";
import Article from "./Article";

describe("<Article />", () => {
  it("should render without errors", () => {
    const title = "titleTest";
    const component = shallow(<Article title={title} />);
    const wrapper = component.find(".Article");
    expect(wrapper.length).toBe(1);
    expect(component.find(".title").at(0).text()).toBe(title);
  });
});
