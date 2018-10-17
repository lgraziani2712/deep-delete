# deep-delete

Removes every matched key for every object recursively. Can handle every type value. It's written in ES6++ and being used in our own codebase.

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
