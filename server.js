import express from "express";
const app = express();

app.use(function (req, res, next) {
  var data = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    data += chunk;
  });

  req.on("end", function () {
    req.body = data;
    next();
  });
});

app.post("/analyze", (req, res) => {

  if (req.headers['content-type'] != 'text/plain') {
    res.status(400).send();
  }

  const freqeuncy = wordFrequency(req.body);
  let top50 = [];
  if (freqeuncy.length > 50) {
    top50 = freqeuncy.slice(0, 50);
  } else {
    top50 = freqeuncy;
  }

  let jsonObj = {
    Frequency: [],
    WordCount: 0,
    WhitespacePercentage: 0,
    PunctuationPercentage: 0,
  };

  let whiteSpaces = countWhiteSpace(req.body);
  let punctuationCount = countPunctuation(req.body);

  for (let i = 0; i < top50.length; i += 1) {
    let item = {};
    item["Word"] = top50[i][0];
    item["Frequency"] = top50[i][1];

    jsonObj.Frequency.push(item);
  }

  jsonObj.WordCount = countWords(req.body);
  jsonObj.WhitespacePercentage = whiteSpaces / req.body.length;
  jsonObj.PunctuationPercentage = punctuationCount / req.body.length;

  res.status(200).json(jsonObj);
});

function countPunctuation(str) {
  return str.match(/[^\w\s]|_/g).length;
}

function countWhiteSpace(str) {
  return str.match(/\s/g).length;
}

function cleanString(str) {
  return str
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function extractSubstr(str, regexp) {
  return cleanString(str).match(regexp) || [];
}

function getWordsByNonWhiteSpace(str) {
  return extractSubstr(str, /\S+/g);
}

function getWordsByWordBoundaries(str) {
  return extractSubstr(str, /\b[a-z\d]+\b/g);
}

function wordMap(str) {
  return getWordsByWordBoundaries(str).reduce(function (map, word) {
    map[word] = (map[word] || 0) + 1;
    return map;
  }, {});
}

function mapToTuples(map) {
  return Object.keys(map).map(function (key) {
    return [key, map[key]];
  });
}

function mapToSortedTuples(map, sortFn, sortOrder) {
  return mapToTuples(map).sort(function (a, b) {
    return sortFn.call(undefined, a, b, sortOrder);
  });
}

function countWords(str) {
  return getWordsByWordBoundaries(str).length;
}

function wordFrequency(str) {
  return mapToSortedTuples(
    wordMap(str),
    function (a, b, order) {
      if (b[1] > a[1]) {
        return order[1] * -1;
      } else if (a[1] > b[1]) {
        return order[1] * 1;
      } else {
        return order[0] * (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
      }
    },
    [1, -1]
  );
}

const server = app.listen(3000, () => {
  console.log("Server ready and listening on port 3000");
});