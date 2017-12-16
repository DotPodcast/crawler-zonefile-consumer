var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const save = (id, doc) => {
  episodes = doc.items;
  //clear episodes from doc
  delete doc.items;

  client.index({
    index: 'podcasts',
    type: 'podcast',
    id,
    body: doc
  });

  episodes.forEach((ep) => {
    client.index({
      index: 'episodes',
      type: 'episode',
      body: ep
    });
  });
};

module.exports = save;
