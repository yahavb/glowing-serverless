#!/usr/bin/python

import boto3

client = boto3.client('lambda')

response = client.list_functions(
    MasterRegion='us-west-2',
)

print(response)
