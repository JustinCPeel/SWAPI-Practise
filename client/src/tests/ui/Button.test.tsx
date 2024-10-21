import { fireEvent, render } from "@testing-library/react";
import { motion } from "framer-motion";
import Button from "../../components/button/Button";

jest.mock("framer-motion", () => ({
  motion: {
    button: jest.fn(({ children, ...rest }) => (
      <button {...rest}>{children}</button>
    )),
  },
}));

describe("Button component", () => {
  it("renders the button with the provided label", () => {
    const { getByTestId } = render(
      <Button label="Click me" data-testid="button-test" />
    );
    const button = getByTestId("button-test");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when the button is clicked", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Button
        label="Click me"
        onClick={handleClick}
        data-testid="button-test"
      />
    );
    const button = getByTestId("button-test");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes down additional props to the button", () => {
    const { getByTestId } = render(
      <Button label="Click me" data-testid="button-test" type="button" />
    );
    const button = getByTestId("button-test");
    expect(button).toHaveAttribute("data-testid", "button-test");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies hover and tap animations", () => {
    render(<Button label="Animated button" />);
    expect(motion.button).toHaveBeenCalledWith(
      expect.objectContaining({
        whileHover: { scale: 1.2 },
        whileTap: { scale: 0.9 },
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }),
      {}
    );
  });
});
