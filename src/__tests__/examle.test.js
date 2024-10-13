const sum = (a, b) => a + b;

describe('Example test', () => {
    test('10 plus 2', () => {
        const result = sum(10, 2);

        expect(result).toEqual(12)
    })
})