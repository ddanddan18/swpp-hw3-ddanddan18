import React from "react";
import { shallow } from "enzyme";
import Tab from "./Tab";

describe("<Tab />", () => {
  it("should render without errors", () => {
    const component = shallow(<Tab />);
    const wrapper = component.find(".TabMenuContainer");
    expect(wrapper.length).toBe(1);
  });
});
