let { parseZoneFile }  = require('zone-file');
let processUris = require('./processUris');

const processMessage = (msg) => {
  return new Promise((resolve, reject) => {
    msg.zonefileJson = parseZoneFile(msg.zonefileText);
    processUris(msg).then((doc) => {
      resolve(doc);
    });
  });
};

module.exports = processMessage;
