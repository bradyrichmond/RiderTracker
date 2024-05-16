apigClient.adminProxyProxyAny = function (method, params, body, additionalParams) {
    if(additionalParams === undefined) { additionalParams = {}; }
    
    apiGateway.core.utils.assertParametersDefined(params, ['proxy'], ['body']);
    
    var adminProxyProxyOptionsRequest = {
        verb: method,
        path: pathComponent + uritemplate('/admin-proxy/{proxy}').expand(apiGateway.core.utils.parseParametersToObject(params, ['proxy'])),
        headers: apiGateway.core.utils.parseParametersToObject(params, []),
        queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
        body: body
    };
    
    
    return apiGatewayClient.makeRequest(adminProxyProxyOptionsRequest, authType, additionalParams, config.apiKey);
};