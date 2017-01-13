Links
----
Website found here: https://d29c3fen6vwvzd.cloudfront.net/
RSS Feed found here: https://0qbvomvsqe.execute-api.us-west-2.amazonaws.com/beta

Creation
--------
This website is hosted through AWS s3 (with cloudfront in front of it), and the RSS Feed was created by hooking up AWS API Gateway with AWS Lambda.

Shoutouts
---------
A terrific tutorial on returning non-json content from API Gateway can be found here: https://kennbrodhagen.net/2016/01/31/how-to-return-html-from-aws-api-gateway-lambda/. Just make sure to change `text/html` to `application/xml`.
