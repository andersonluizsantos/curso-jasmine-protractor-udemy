import { greet } from './greet';

describe('greet', () => {
    it('should include the name in the message', () => {
        const result = greet('mosh');
        expect(result).toContain('mosh');
    })
})

