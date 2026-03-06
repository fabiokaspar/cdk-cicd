import { handler } from "../services/lambdaLogicBusiness";
import dotenv from "dotenv"

dotenv.config()
const env = process.env.NODE_ENV
if (env) {
    dotenv.config({ path: `.env.${env}`, override: true })
    dotenv.config({ path: `.env.${env}.local`, override: true })
}


handler({} as any, {} as any)