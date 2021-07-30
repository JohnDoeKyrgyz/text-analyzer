# text-analyzer

![node express](https://img.shields.io/node/v/express)

This project implements an api endpoint with [express](http://expressjs.com/) to analyze a raw data requests.  Requests should be sent to the endpoint as plaintext encoded in UTF-8.  Successful requests will yield a JSON response that contains:

1. The top 50 most frequently used words along with their frequency.  Punctuation and case are ignored during comparison.

2. The total word count of the document.

3. The percentage of characters in the document that are whitespace.

4. The percentage of characters in the document that are punctuation marks.

## Installation and usage

To install clone the repo and install the dependencies with:

```
npm install
```

Then run the server with:
```
npm server.js
```

Then send your requests to http://localhost:3000/analyze using post, ensuring the charset is utf-8 and the Content-Type is text/plain.  Requests with different types will be rejected by the server.  Valid requests will yield a JSON response containing the results of the text analysis.

A nice tool to easily test API endpoints I'd recommend is [Insomnia](https://insomnia.rest/).

![insomnia screenshot](https://raw.githubusercontent.com/karolat/text-analyzer/master/screenshots/analyzer-screenshot.png)

## Limitations

Currently there is no hardcoded limit for how big requests can be.  However, the entire request must be loaded into memory for analysis so care should be taken to during deployment to ensure the server prevents requests that are too large to handle by setting a cap in nginx, for example.