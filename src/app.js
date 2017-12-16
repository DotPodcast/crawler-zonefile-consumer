let nconf = require('nconf');
let amqplib = require('amqplib');

let processMessage = require('./processMessage');
let saveToEs = require('./es');

nconf.argv()
  .env()
  .file('../config.json');


const ex = nconf.get('rabbit:exchange');
const qName = nconf.get('rabbit:queue');

let open = amqplib.connect(`amqp://${nconf.get('rabbit:host')}`);
open.then((conn) => {
  conn.createChannel()
    .then((ch) => {
      console.log('Created Channel, asserting exchange');
      ch.assertExchange(ex, 'fanout', {durable: false});
      console.log('Created exchange, asserting queue');

      ch.assertQueue(qName, {})
        .then((q) => {
          console.log(` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);
          ch.bindQueue(q.queue, ex, '');
          ch.consume(q.queue, (msg) => {
            let doc;
            try {
              doc = JSON.parse(msg.content.toString());
            } catch (e) {
              console.log(e)
              return console.warn('Could not parse message into JSON');
            }
            processMessage(doc).then((enhanced) => {
              console.log(`Saving info for ${doc.name}`);
              saveToEs(doc.name, enhanced.uriContents[0]);
            })
          }, {noAck: true});
        });
    });
});
