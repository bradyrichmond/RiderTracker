import apiGatewayClientFactory from "./apiGatewayClientFactory"
import sigV4ClientFactory from "./sigV4Client"
import simpleHttpClientFactory from "./simpleHttpClient"
import utils from "./utils"

let instance

class ApiGateway {
    constructor () {
        if (!instance){
            this.apiGatewayClientFactory = apiGatewayClientFactory,
            this.sigV4ClientFactory = sigV4ClientFactory,
            this.simpleHttpClientFactory = simpleHttpClientFactory,
            this.utils = utils
        }
    }
}