import { handler } from "../services/lambdaLogicBusiness";

describe('TESTING LOGIC BUSINESS', () => {
    test('check env', () => {
        console.log('DB_HOST:', process.env.DB_HOST)
        // expect(process.env.DB_HOST).toBeDefined()
    })

    test('handler should return 200', async () => {
        const result = await handler({}, {})
        expect(result.statusCode).toBe(200)
    })

});
