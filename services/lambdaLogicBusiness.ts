async function handler(event: any, context: any) {
    const {db_port, db_host, db_name, db_user, db_password} = process.env
    let statusCode = 200

    if (!db_port || !db_host || !db_name || !db_user || !db_password) {
        statusCode = 500
    }

    const response = {
        statusCode: statusCode,
        body: JSON.stringify(`Rodando a lógica de negócios do ambiente: ${process.env.ENVIRONMENT}
            - Credenciais BD:
            DB_PORT:  ${process.env.DB_PORT} - 
            DB_HOST:  ${process.env.DB_HOST} - 
            DB_NAME:  ${process.env.DB_NAME} - 
            DB_USER:  ${process.env.DB_USER} - 
            DB_PASSWORD  ${process.env.DB_PASSWORD}
        `)
    }

    return response
}

export { handler }