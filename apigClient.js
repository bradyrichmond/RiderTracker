/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://uqz8uvqzcl.execute-api.us-west-2.amazonaws.com/DEV';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.adminProxyS3FolderObjectGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['object', 'folder'], ['body']);
        
        var adminProxyS3FolderObjectGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/admin-proxy/s3/{folder}/{object}').expand(apiGateway.core.utils.parseParametersToObject(params, ['object', 'folder'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(adminProxyS3FolderObjectGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.adminProxyS3FolderObjectOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var adminProxyS3FolderObjectOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/admin-proxy/s3/{folder}/{object}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(adminProxyS3FolderObjectOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

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

    
    apigClient.adminProxyProxyOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var adminProxyProxyOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/admin-proxy/{proxy+}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(adminProxyProxyOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdAddressesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body'], ['body']);
        
        var organizationsOrgIdAddressesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdAddressesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesBatchByIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdAddressesBatchByIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesBatchByIdPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesBatchByIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdAddressesBatchByIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesBatchByIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdAddressesIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id', 'body'], ['body']);
        
        var organizationsOrgIdAddressesIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdAddressesIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdAddressesIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdAddressesIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/addresses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdAddressesIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdBusesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body'], ['body']);
        
        var organizationsOrgIdBusesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdBusesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdBusesIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdBusesIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdBusesIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdBusesIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdBusesIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/buses/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdBusesIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdRidersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdRidersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdRidersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersBatchByIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdRidersBatchByIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersBatchByIdPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersBatchByIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdRidersBatchByIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersBatchByIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdRidersIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdRidersIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdRidersIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdRidersIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdRidersIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/riders/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdRidersIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdScansGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'body'], ['body']);
        
        var organizationsOrgIdScansPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdScansOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdScansIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdScansIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdScansIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdScansIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdScansIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/scans/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdScansIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdSchoolsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdSchoolsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdSchoolsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdSchoolsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdSchoolsIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdSchoolsIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdSchoolsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdSchoolsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/schools/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdSchoolsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdStopsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdStopsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdStopsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsBulkPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdStopsBulkPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/bulk').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsBulkPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsBulkOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdStopsBulkOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/bulk').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsBulkOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdStopsIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdStopsIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdStopsIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdStopsIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdStopsIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/stops/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdStopsIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdUsersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdUsersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdUsersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersBatchByIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId'], ['body']);
        
        var organizationsOrgIdUsersBatchByIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersBatchByIdPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersBatchByIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdUsersBatchByIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/batchById').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersBatchByIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdUsersIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdUsersIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgId', 'id'], ['body']);
        
        var organizationsOrgIdUsersIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgId', 'id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.organizationsOrgIdUsersIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var organizationsOrgIdUsersIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/organizations/{orgId}/users/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(organizationsOrgIdUsersIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.publicOrganizationsOrgSlugGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['orgSlug'], ['body']);
        
        var publicOrganizationsOrgSlugGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/public/organizations/{orgSlug}').expand(apiGateway.core.utils.parseParametersToObject(params, ['orgSlug'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(publicOrganizationsOrgSlugGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.publicOrganizationsOrgSlugOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var publicOrganizationsOrgSlugOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/public/organizations/{orgSlug}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(publicOrganizationsOrgSlugOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userProxyProxyOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userProxyProxyOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user-proxy/{proxy+}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userProxyProxyOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.validateAddressPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var validateAddressPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/validate-address').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(validateAddressPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.validateAddressOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var validateAddressOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/validate-address').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(validateAddressOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
