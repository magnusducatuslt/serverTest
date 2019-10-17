const express = require('express');
const router = express.Router();
const Controller = require('../../../controllers');
const controller = new Controller();
const user = {
  ip: null,
  userAgent: null,
  session: null,
};
router.post('/', async (req, res) => {
  await controller.approveVote(req, res);
  res.status(200);
  res.send(`123asdio@8asdmc`);
  res.end();
});
router.get('/', async (req, res) => {
  const result = await controller.getVotes(req, res);
  res.status(200);
  res.send(result);
  res.end();
});
module.exports = router;
