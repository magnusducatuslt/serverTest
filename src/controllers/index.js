const parserJSON = require('../modules/helpers');

class Controller {
  constructor() {
    const DAO = require('../DAO');
    const Voting = require('./voting');
    const DB = require('./database');
    this.db = new DB(new DAO());
    this.voting = new Voting();
  }
  async approveVote(req) {
    const user_agent = req.headers['user-agent'];
    const { mentor, token, ip } = await parserJSON(req);
    const voteExist = await this.db.findVote({ ip });
    console.log('before', token);
    if (voteExist.length === 0) {
      console.log('save vote by ip');
      await this.db.saveVote({ ip, user_agent, mentor, session: '' });
    } else {
      console.log(`ip exist`, voteExist);
      console.log(token.match(/voted=123asdio@8asdmc/gi));
      if (token.match(/voted=123asdio@8asdmc/gi)) {
        console.log('token', token.match(/voted=123asdio@8asdmc/gi)[0]);
        if (
          token.match(/voted=123asdio@8asdmc/gi)[0] === 'voted=123asdio@8asdmc'
        ) {
          console.log('token exist');
          if (user_agent === voteExist[0].user_agent) {
            console.log('user already voted probably');
          } else {
            console.log('user_agetn doent exist');
            console.log('save vote');
            await this.db.saveVote({ ip, user_agent, mentor, session: token });
          }
        } else {
          console.log(`token doesn't exist`);
          console.log('save vote by token');
          await this.db.saveVote({ ip, user_agent, mentor, session: token });
        }
      } else {
        console.log('token doent exist');
        console.log('save vote by token');
        await this.db.saveVote({ ip, user_agent, mentor, session: token });
      }
    }
    return;
  }
  async getVotes(req, res) {
    try {
      const result = await this.db.getVotes();
      console.log(result);
      return { status: 0, message: result };
    } catch (e) {
      return { status: 1, message: e };
    }
  }
}

module.exports = Controller;
