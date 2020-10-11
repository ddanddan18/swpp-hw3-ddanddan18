import React from "react";
import { shallow } from "enzyme";
import EditButton from "./EditButton";

describe("<EditButton />", () => {
  it("should render without errors", () => {
    const component = shallow(<EditButton />);
    const wrapper = component.find(".EditButton");
    expect(wrapper.length).toBe(1);
  });
});
