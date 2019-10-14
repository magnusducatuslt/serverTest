const express = require('express');
const router = express.Router();
const faker = require('faker');
const cash = new Map();
router.get('/resolve', async (req, res) => {
  const data = {
    statement: req.query.statement,
    propose: faker.random.arrayElement([
      ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'],

      ['zend1', 'zend2', 'zend3', 'zend4', 'zend5', 'zend6'],

      ['beta1', 'beta2', 'beta3', 'beta4', 'beta5', 'beta6'],

      ['alfa1', 'alfa2', 'alfa3', 'alfa4', 'alfa5', 'alfa6'],
    ]),
    solutions: faker.random.arrayElement([
      ['sol1', 'sol2', 'sol2', 'sol3'],
      ['ols1', 'ols', 'ols', 'ols3'],
      ['los1', 'los2', 'los2', 'los3'],
    ]),
    answer: faker.random.number(),
  };
  const uuid = faker.random.uuid();
  console.log('resolve:', uuid);
  cash.set(uuid, data);
  console.log(cash);
  res.status(200);
  res.send({ ...data, uuid });
  res.end();
});
router.get('/resolve/:id', async (req, res) => {
  const uuid = req.params.id;
  console.log('GET cash', uuid);

  console.log(cash);
  res.status(200);
  res.send({ ...cash.get(uuid), uuid });
  res.end();
});

module.exports = router;
