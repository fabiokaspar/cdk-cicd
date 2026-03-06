async function handler(event: any, context: any) {
    let statusCode = 200

    if (!process.env.DB_HOST) {
        statusCode = 500
    }

    console.log('MUDANÇA NA LÓGICA DE NEGÓCIOS....')

    const response = {
        statusCode: statusCode,
        body: JSON.stringify(`Rodando a lógica de negócios do ambiente: ${process.env.NODE_ENV}
            - Credenciais BD:
            DB_PORT:  ${process.env.DB_PORT} - 
            DB_HOST:  ${process.env.DB_HOST} - 
            DB_NAME:  ${process.env.DB_NAME} - 
            DB_USER:  ${process.env.DB_USER} - 
            DB_PASSWORD  ${process.env.DB_PASSWORD}
        `)
    }

    console.log('RESPONSE: ======================>>>>>> ', response)

    return response
}

export { handler }