import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "./Components/ErrorPage";
import Header from "./Components/Header";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import AppBar from "@material-ui/core/AppBar";

Enzyme.configure({ adapter: new Adapter() });

describe("Error page should contain 404", () => {
  const { getByText } = render(<ErrorPage />);
  expect(getByText(/404/)).toBeInTheDocument();
});

const setup = (props = {}, state = null) => {
  const defaultProps = {};
  const setUpProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Header {...setUpProps} />);
  const tree = () => renderer.create(<Header {...setUpProps} />).toJSON();
  if (state) wrapper.setState(state);
  return { wrapper, props: setUpProps, tree };
};

describe("Header component", () => {
  it("should match with snapshot", () => {
    const { tree } = setup();
    expect(tree()).toMatchSnapshot();
  });

  it("Should contain Bar", () => {
    const { wrapper } = setup();
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });
});
