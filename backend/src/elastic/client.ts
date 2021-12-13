import { Client, ClientOptions } from "@elastic/elasticsearch"

const config: ClientOptions = {
    node: "http://10.11.12.69:9200",
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD
    },
}

const client = new Client(config)
export default client
