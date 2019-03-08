# Mock Soap API for the Scottish Power API

This is a mock server that should acts in the same way as the Scottish Power API.

Its a development tool that should allow us to work on the project before the actual API is ready.

They have provided the WSDL descriptions of the SOAP API and these are in the docs directory.

The API is described in flow charts and documents the same place.

The SOAPiness is from a couple of modules called 

POSTing this to http://localhost:3090/sp works now

`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <MT_PrepaymentRequestInput_251>
      	<a>1112</a>
      </MT_PrepaymentRequestInput_251>
   </soapenv:Body>
</soapenv:Envelope>
`

Also for comparison http://localhost:3090/calculator

`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <Add>
      	<a>222</a>
      	<b>3</b>
      </Add>
   </soapenv:Body>
</soapenv:Envelope>
`

[node-soap](https://github.com/vpulim/node-soap) and [soap](https://github.com/RobinBuschmann/express-soap])

## Environment variables

None needed

## Testing

npm run build

This shows that the SOAP API replies to a request

npm run test

## How to start

npm start 

# Design

