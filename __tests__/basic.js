const deepDelete = require('../src/commonjs');
const deepDeleteWorker = require('../src/experimental-workers');

const dataForOneKey = [
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
const dataForMultipleKeys = [
  {
    moreData: {
      key1ToDelete: 1,
    },
    key2ToDelete: 'Bye bye',
    anotherKey: 2,
  },
  1,
  null,
  'hola',
  new Date('2015-03-25T12:00:00Z'),
];

describe('Normal version', () => {
  test('Single key', () => {
    expect(deepDelete('keyToBeDeleted', dataForOneKey)).toMatchSnapshot();
  });
  test('Multiple keys', () => {
    expect(
      deepDelete(['key1ToDelete', 'key2ToDelete'], dataForMultipleKeys),
    ).toMatchSnapshot();
  });
});

describe('Worker version', () => {
  test('Single key', async () => {
    expect(
      await deepDeleteWorker('keyToBeDeleted', dataForOneKey),
    ).toMatchSnapshot();
  });

  test('Multiple keys', async () => {
    expect(
      await deepDeleteWorker(
        ['key1ToDelete', 'key2ToDelete'],
        dataForMultipleKeys,
      ),
    ).toMatchSnapshot();
  });
});
