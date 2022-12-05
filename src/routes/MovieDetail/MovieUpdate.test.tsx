import { render, screen } from "@testing-library/react";
import MovieUpdate from "./MovieUpdate";


test("renders a name", () => {
    render(<MovieUpdate/>);
    const divElement = screen.getByRole("movieupdate");
    expect(divElement.textContent?.match("Düzenlenen Film")).not.toBeNull()
})