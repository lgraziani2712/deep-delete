const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');

const deepDelete = require('../src/index');
const deepDeleteWithWT = require('../src/experimental-workers');

const deepDeletev120 = require('./versions/v1.2.0');
const data = require('./data');

const suite = new Benchmark.Suite('deep-delete');

suite
  .add('optimized', () => {
    deepDelete('deleteme', data);
  })
  .add('with-worker-threads', () => {
    deepDeleteWithWT('deleteme', data);
  })
  .add('v1.2.0', () => {
    deepDeletev120('deleteme', data);
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
