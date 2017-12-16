## Rabbit to Elasticsearch

This is one component of the scraping architecture.

Currently, this component:

1. Consumes the name+zonefile from RabbitMQ published
1. Requests data at the URIs specified in the zonefile
1. Indexes data to elasticsearch

### Setup
Install app dependencies with:
```
yarn
```

or
```
npm install
```

Then, make sure you have RabbitMQ and Elasticsearch instances available:
```
docker-compose up
```
will do the trick. If you already have them running running, ensure that
the rabbit host/exchange, ES host/port  are configured properly in
`config.json`.

Since multiple parts of this scraping system rely on RabbitMQ, I'd
recommend spinning one up and pointing all projects to it.

Run the app with:
```
yarn run dev
```
or
```
npm run dev
```
