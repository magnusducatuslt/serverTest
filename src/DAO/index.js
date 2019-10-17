class Postgre {
  constructor() {
    console.log('init dao');
    const config = require('./dbconfig.json');
    const { Client } = require('pg');
    this.connectionString =
      'postgres://' +
      config.db_user_name +
      ':' +
      config.db_password +
      '@' +
      config.ip +
      ':' +
      config.port +
      '/' +
      config.db_name;
    this.client = new Client({
      connectionString: this.connectionString,
    });
    this.connectToDB();
  }

  connectToDB() {
    return new Promise((resolve, reject) =>
      this.client.connect((err) => {
        if (err) {
          //reject(console.error('connection error', err));
          reject(err);
        } else {
          resolve(true);
        }
      })
    );
  }

  connectionDBEnd() {
    this.client.end();
  }
  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.client.query(query, params, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
  async findVote(credentials) {
    return await this.executeQuery('SELECT * FROM list WHERE list.ip=($1)', [
      credentials.ip,
    ]);
  }
  async saveVote(credentials) {
    return await this.executeQuery(
      'INSERT INTO list (ip,mentor,user_agent,session) VALUES ($1,$2,$3,$4)',
      [
        credentials.ip,
        credentials.mentor,
        credentials.user_agent,
        credentials.session,
      ]
    );
  }
  async getVotes() {
    return await this.executeQuery(
      'SELECT mentor,COUNT(mentor) from list GROUP BY mentor',
      []
    );
  }
}

module.exports = Postgre;
