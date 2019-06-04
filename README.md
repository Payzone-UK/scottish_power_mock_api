# Mock Soap API for the Scottish Power API

This node server acts as a mock up of the Scottish Power 251-252 and 253-254 SOAP interfaces.

Its a development tool that should allow us to work on the project before the actual API is ready.

The WSDL descriptions of the SOAP API and are in the docs directory.

The API is described in flow charts and documents the same place.

The SOAP functionality is provided by a couple of modules called [node-soap](https://github.com/vpulim/node-soap) and [soap](https://github.com/RobinBuschmann/express-soap)

In the diagram below, the purple octagon represents this server.

![Parts](docs/parts.png)



## Install

npm run build


## How to start

npm start 

## How to use

From curl or Postman,  POST the following json to http://localhost:3090/scottish-power-251 

The call should return successfully straight away, and then 2 - 10 seconds later, another
request to SOAP 252 should be made from this mock server to the actual Scottish Power
Product Server, at the URL pointed to by the environment variables PRODUCT_SERVER and 
WSDL_252.

This 252 call should provide a UTRN.


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

Also for comparison http://localhost:3090/calculator

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
   <soapenv:Body>
      <Add>
      	<a>222</a>
      	<b>3</b>
      </Add>
   </soapenv:Body>
</soapenv:Envelope>
```

## Environment variables

This is where the SOAP 252 reply will go to

PRODUCT_SERVER_URL=http://localhost:3020

To allow more than one Product Server to use this mock server, 
if the externalId contains the string 26111966, then 252 requests will go here
SECONDARY_PRODUCT_SERVER_URL=http://localhost:3030

WSDL_252=/two_five_two?wsdl

## Testing

npm run build

This shows that the SOAP API replies to a request

npm run test