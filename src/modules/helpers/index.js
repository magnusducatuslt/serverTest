module.exports = function parserJSON(req) {
  return new Promise((resolve, reject) => {
    let string = ``;
    req.on(`data`, (data) => (string += data));
    req.on(`end`, () => resolve(JSON.parse(string)));
    req.on(`error`, (e) => reject(e));
  });
};
