async function handler(event: any, context: any) {
    return {
        statusCode: 200,
        body: JSON.stringify({msg: 'Hello from lambda'})
    }
}

export { handler }