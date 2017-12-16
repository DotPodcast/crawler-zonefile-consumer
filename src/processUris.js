let request = require('request-promise-native');

const processUris = (doc) => {
  return new Promise((resolve, reject) => {
    doc.uriContents = [];
    if(doc.zonefileJson.uri) {
      let uriPromises = doc.zonefileJson.uri.map((uriEntry) => {
        let uri = uriEntry.target;
        return request.get({uri, json: true}).then((data) => {
          doc.uriContents.push(data);
        }).catch((e) => {
          console.warn(e);
        });
      });
      Promise.all(uriPromises).then(() => {
        resolve(doc);
      });
    } else {
      resolve(doc);
    }
  })
}

module.exports = processUris;
