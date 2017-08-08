const rp = require('request-promise');
const cheerio = require('cheerio')

rp({
  method: 'GET',
  uri: `https://myrotvorets.center/criminal/`,
  qs: {name: 'vasy'},
  headers: {
  	'User-Agent': 'Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36'
  },
  resolveWithFullResponse: true,
  json: true
})
.then(r => {
	const $ = cheerio.load(r.body);

	console.log($('.panel-title.entry-title').text())
	console.log($('.criminal-description').text());
	console.log(`${r.request.url.protocol}//${r.request.url.host}${r.request.url.path}`);
})
.catch(r => {
	console.log('Not found')
});