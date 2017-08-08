const express = require('express');
const bodyParser = require('body-parser');

const rp = require('request-promise');
const cheerio = require('cheerio');

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, Authorization`);
  next();
})

app.get('/gangsta', function(req, res) {
    rp({
    method: 'GET',
    uri: `https://myrotvorets.center/criminal/`,
    qs: {name: req.query.name || ''},
    headers: {
      'User-Agent': 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36'
    },
    resolveWithFullResponse: true,
    json: true
  })
  .then(r => {
    const $ = cheerio.load(r.body);

    res.send({
      status: 'ok', 
      gangsta: {
        name: $('.panel-title.entry-title').text(),
        description: $('.criminal-description').text(),
        link: `${r.request.url.protocol}//${r.request.url.host}${r.request.url.path}`
      }
    });
  })
  .catch(r => {
    res.send({status: 'err', msg: 'not found gangsta'});
  });
});


app.listen(3222)