import { handler } from "../services/lambdaLogicBusiness";

describe('TESTING LOGIC BUSINESS', () => {
    test('check env', () => {
        expect(process.env.NODE_ENV).toBe('development')
    })

    test('handler should return 200', async () => {
        const result = await handler({}, {})
        expect(result.statusCode).toBe(200)
    })

});
