# Mock Soap API for the Scottish Power API

[ Update: See the README.md in the Product Server Repo for info about running Postman tests,  (tests/postman/README.md) ]

This node server mocks the Scottish Power interfaces for end to end testing of the product server.

It will respond to 251 (prepayment) and 253 (reversal) requests, with successful results. 

It was originally written as a development tool before the SP interfaces were ready.

Its a development tool that should allow us to work on the project before the actual API is ready.

You can point the PAYZONE_API_BASE at this server too because it will respond with HTTP 200 for
any request to '/v1/merchant/remaining_credit'. This means you don't need to set up a Payzone 
merchant to test the SP Product Server.

The WSDL descriptions of the SOAP API and are in the docs directory.

The API is described in flow charts and documents the same place.

The SOAP functionality is provided by a couple of modules called [node-soap](https://github.com/vpulim/node-soap) and [soap](https://github.com/RobinBuschmann/express-soap)

In the diagram below, the purple octagon represents this server.

![Parts](docs/parts.png)



## Install and run

* git clone git@github.com:Payzone-UK/scottish_power_mock_api.git
* cd scottish_power_mock_api
* git checkout feature/reversals
* npm install
* npm run build # You might need to manually create some dirs, eg mkdir -p dist/public/js
* export PRODUCT_SERVER_URL=http://localhost:3020
* npm start


## How to use

From curl or Postman,  POST the following json to http://localhost:3090/scottish-power-251 

See the README.md in the Product Server Repo for info about running Postman tests,  (tests/postman/README.md)

### 251 - prepayment

The call should return successfully straight away, and then 2 - 10 seconds later, another
request to SOAP 252 should be made from this mock server to the actual Scottish Power
Product Server, at the URL pointed to by the environment variables PRODUCT_SERVER and 
WSDL_252.

This 252 call should return a UTRN.

### 253 - Reversal

The reversal call will always return success, it does not check that the PaymentIdentifier
already exists.


```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/“ xmlns:xsd=“http://www.w3.org/2001/XMLSchema">
  <soapenv:Header/>
  <soapenv:Body>
    <ns0:MT_PrepaymentRequestInput_251 xmlns="urn:scottishpower.com:SMART:PAYOUTLET:ISU1:prepaymentRequest:251">
      <Message>
        <ExternalID>PayzoneXYZ</ExternalID>
        <PaymentIdentifier>1234567765432</PaymentIdentifier>
        <PaymentSource>S</PaymentSource>
        <Amount>643.00</Amount>
      </Message>
    </ns0:MT_PrepaymentRequestInput_251>
  </soapenv:Body>
</soapenv:Envelope>
```

## Environment variable

This is where the SOAP 252 reply will go to

PRODUCT_SERVER_URL=http://localhost:3020

## Extending this mock API
At the moment it just provides successful results for prepayment and reversals.

To simulate the full range of Scottish Power errors, you could add code to
twoFiveThreeService and twoFiveOneService to produce errors particular to a 
specific PaymentIdentifier.
