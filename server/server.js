const express = require('express');
const path = require('path');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

var history = require('connect-history-api-fallback');

const models = require('./models');
const schema = require('./schema/schema');
const webpackConfig = require('../webpack.config.js');
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

const app = express();
const MONGO_URI = process.env.MONGOURI;
if (!MONGO_URI) {
  throw new Error('please specify mLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useMongoClient: true});
mongoose.connection
    .once('open', () => console.log('YASSSSSSSSS we connected mongo'))
    .on('error', error => console.log('Big mongoose error right here **********', error))

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(history());
app.use(webpackMiddleware(webpack(webpackConfig), {
  publicPath: '/'
}));

module.exports = app;