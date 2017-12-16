let expect = require('chai').expect;
let sinon = require('sinon');
let request = require('request-promise-native');

let processMessage = require('../src/processMessage');
let fixtureZonefiles = require('./fixtures/podcast');
let fixtureFeed = require('./fixtures/feed');

describe('The consumer', () => {
  it('should enhance records with json zonefiles', (done) => {
    let stub = sinon.stub(request, 'get').returns(Promise.resolve(fixtureFeed));

    processMessage(fixtureZonefiles[0]).then((enhanced) => {
      expect(enhanced).to.have.property('zonefileJson');
      expect(enhanced).to.have.property('uriContents');
      expect(enhanced.uriContents).to.have.lengthOf(1);

      stub.restore();

      done();
    });

  });
});
