async function handler(event: any, context: any) {
    const response = {
        statusCode: 200,
        body: JSON.stringify(`Rodando a lógica de negócios do ambiente: ${process.env.ENVIRONMENT}`)
    }

    return response
}

export { handler }