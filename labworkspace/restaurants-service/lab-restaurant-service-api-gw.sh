#!/bin/bash

region="us-west-2"
app_path="restaurants"
lambda_function="lab-restaurant-service"

#api_id=`aws apigateway create-rest-api --name 'lab-restaurant-service' --region $region|grep id | awk -F\" '{print $4}'`
#echo "api id "$api_id
api_id="yc2errp030"

resource_id=`aws apigateway get-resources --rest-api-id $api_id --region $region|python -c 'import json,sys;obj=json.load(sys.stdin);print obj["items"][0]["id"]'`
echo "resource_id "$resource_id

parent_id=`aws apigateway get-resources --rest-api-id $api_id --region $region|python -c 'import json,sys;obj=json.load(sys.stdin);print obj["items"][0]["id"]'`
echo "parent_id "$parent_id

app_id=`aws apigateway create-resource --rest-api-id $api_id --region $region --parent-id $parent_id --path-part $app_path|python -c 'import json,sys;obj=json.load(sys.stdin);print obj["id"]'`
echo "app_id "$app_id

method_id=`aws apigateway put-method --rest-api-id $api_id --region $region --resource-id $app_id --http-method ANY --authorization-type "NONE"` 
echo "method_id "$method_id


