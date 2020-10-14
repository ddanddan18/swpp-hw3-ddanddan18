import React from "react";
import { shallow } from "enzyme";
import CreateButton from "./CreateButton";

describe("<CreateButton />", () => {
  it("should render without errors", () => {
    const component = shallow(<CreateButton />);
    const wrapper = component.find(".CreateButton");
    expect(wrapper.length).toBe(1);
  });
});
