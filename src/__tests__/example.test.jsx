import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { useState } from "react";

const Card = () => {
    const [count, setCount] = useState(0);
    return (
        <div style={{border: 'solid 2px', maxWidth: '500px'}}>
            <h1>Título card</h1>
            Count: <span role="count-indicator">{count}</span>
            <button onClick={() => {setCount((count) => count + 1)}}>Increment</button>
        </div>
    );
}

describe('Card test:',() => {
    afterEach(cleanup);

    it('should render component', () => {
        render(<Card />);
    });

    it('should render title', () => {
        render(<Card />);
        screen.getByText('Título card');
    });

    it('should increment count when user clicks on Increment button', () => {
        render(<Card />);

        const currentCountValue = parseInt(screen.getByRole('count-indicator').innerText);
        const incrementButton = screen.getByText('Increment');
        fireEvent.click(incrementButton);
        const updatedCountValue = parseInt(screen.getByRole('count-indicator').innerText);

        expect(updatedCountValue).toBe(currentCountValue + 1);
    });
});
