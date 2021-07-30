# text-analyzer

![node express](https://img.shields.io/node/v/express)

This project implements an api endpoint with [express](http://expressjs.com/) to analyze a raw data requests.  Requests should be sent to the endpoint as plaintext encoded in UTF-8.  Successful requests will yield a JSON response that contains:

1. The top 50 most frequently used words along with their frequency.  Punctuation and case are ignored during comparison.

2. The total word count of the document.

3. The percentage of characters in the document that are whitespace.

4. The percentage of characters in the document that are punctuation marks.

To install clone the repo and install the dependencies with:

```
npm install```

Then run the server with:
```
npm server.js```

Then send your requests to http://localhost:3000/analyze using post, ensuring the charset is utf-8 and the Content-Type is text/plain.  Valid requests will yield a JSON response containing the results of the text analysis.  A nice tool to easily test API endpoints I'd recommend is [Insomnia](https://insomnia.rest/).