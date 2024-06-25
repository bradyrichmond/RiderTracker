/* eslint-disable */

apigClient.adminProxyProxyAny = function (method, params, body, additionalParams) {
    if(additionalParams === undefined) { additionalParams = {}; }
    
    utils.assertParametersDefined(params, ['proxy'], ['body']);
    
    var adminProxyProxyOptionsRequest = {
        verb: method,
        path: pathComponent + uritemplate('/admin-proxy/{proxy}').expand(utils.parseParametersToObject(params, ['proxy'])),
        headers: utils.parseParametersToObject(params, []),
        queryParams: utils.parseParametersToObject(params, []),
        body: body
    };
    
    
    return apiGatewayClient.makeRequest(adminProxyProxyOptionsRequest, authType, additionalParams, config.apiKey);
};

apigClient.userProxyProxyAny = function (method, params, body, additionalParams) {
    if(additionalParams === undefined) { additionalParams = {}; }
    
    utils.assertParametersDefined(params, ['proxy'], ['body']);
    
    var userProxyProxyOptionsRequest = {
        verb: method,
        path: pathComponent + uritemplate('/user-proxy/{proxy}').expand(utils.parseParametersToObject(params, ['proxy'])),
        headers: utils.parseParametersToObject(params, []),
        queryParams: utils.parseParametersToObject(params, []),
        body: body
    };
    
    
    return apiGatewayClient.makeRequest(userProxyProxyOptionsRequest, authType, additionalParams, config.apiKey);
};