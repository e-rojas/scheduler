import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getByAltText, getAllByTestId, getByPlaceholderText } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it('1. defaults to Monday and changes the schedule when a new day is selected (promise)', () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

  it('2. changes the schedule when a new day is selected ES2017 (await)', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

});