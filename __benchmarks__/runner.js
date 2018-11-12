/* eslint-disable camelcase, strict */

'use strict';

require('dotenv').config();

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const firebase = require('firebase-admin');
const jsonReporter = require('benchmark-json-reporter');

const deepDelete = require('../src/commonjs');
const deepDeleteWithWT = require('../src/experimental-workers');

const deepDeletev120 = require('./versions/v1.2.0');
const deepDeletev201 = require('./versions/v2.0.1');

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_PROVIDER,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const firebaseDatabase = firebaseApp.database();

const data = [
  {
    moreData: {
      keyToBeDeleted: 1,
    },
    keyToBeDeleted: 'Bye bye',
    anotherKey: 2,
  },
  1,
  null,
  'hola',
  new Date('2015-03-25T12:00:00Z'),
];
const suite = new Benchmark.Suite('deep-delete');

jsonReporter(suite, {
  callback(data, id) {
    firebaseDatabase
      .ref(`/${id}`)
      .update({ sysinfo: data.sysinfo })
      .then(() =>
        Promise.all(
          data.benchmarks.map(bench =>
            firebaseDatabase
              .ref(`/${id}/benchmarks/${bench.timestamp}`)
              .push(bench),
          ),
        ),
      )
      .then(() => {
        firebaseApp.delete();
      })
      .catch(err => {
        firebaseApp.delete();

        throw err;
      });
  },
});

suite
  .add('latest', () => {
    deepDelete('keyToBeDeleted', data);
  })
  .add('v2.0.1', () => {
    deepDeletev201('keyToBeDeleted', data);
  })
  .add('v1.2.0', () => {
    deepDeletev120('keyToBeDeleted', data);
  })
  .add('experimental-workers', () => {
    deepDeleteWithWT('keyToBeDeleted', data);
  })
  // add listeners
  .on('cycle', event => {
    benchmarks.add(event.target);
  })
  .on('complete', () => {
    benchmarks.log();
  })
  // run async
  .run({ async: true });
