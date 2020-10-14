import React from "react";
import { shallow } from "enzyme";
import DetailButton from "./DetailButton";

describe("<DetailButton />", () => {
  it("should render without errors", () => {
    const component = shallow(<DetailButton />);
    const wrapper = component.find(".DetailButton");
    expect(wrapper.length).toBe(1);
  });
});
