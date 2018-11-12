# deep-delete

<a href="https://circleci.com/gh/dimax/deep-delete"><img alt="CircleCI Build Status" src="https://img.shields.io/circleci/project/github/dimax/deep-delete/master.svg?style=flat-square&label=CircleCI"></a> <a href="https://coveralls.io/github/dimax/deep-delete"><img alt="Codecov Coverage Status" src="https://img.shields.io/coveralls/github/dimax/deep-delete.svg?style=flat-square"></a> <a href="https://twitter.com/acdlite/status/974390255393505280"><img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a> <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">

Removes every matched key for every object recursively. Can handle every type value. It's written in ES6++ and being used in our own codebase.

Since v2.0.0, the importing process is transparent. It works with CommonJS and ES6 modules without the need of importing specific files. See how this works: https://stackoverflow.com/a/42817320/2862917

## Usage

### For multiple keys

```js
import deepDelete from 'deep-delete';

const data = [
  {
    moreData: {
      key1ToDelete: 1,
    },
    key2ToDelete: 'Bye bye',
    anotherKey: 2,
  },
  1,
  null,
  'hola'
];

const newData = deepDelete(['key1ToDelete', 'key2ToDelete'], data);
```

```diff
[
  {
    moreData: {
-      key1ToDelete: 1,
    },
-    key2ToDelete: 'Bye bye',
    anotherKey: 2,
  },
  1,
  null,
  'hola'
];
```

### For one key

```js
import deepDelete from 'deep-delete';

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
  'hola'
];

const newData = deepDelete('keyToBeDeleted', data);
```

```diff
[
  {
    moreData: {
-      keyToBeDeleted: 1,
    },
-    keyToBeDeleted: 'Bye bye',
    anotherKey: 2,
  },
  1,
  null,
  'hola'
];
```
