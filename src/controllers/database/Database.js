class DataBase {
  constructor(client) {
    this.client = client;
  }
  async findVote(credentials) {
    return await this.client.findVote(credentials);
  }
  async saveVote(credentials) {
    return await this.client.saveVote(credentials);
  }
  async getVotes() {
    return await this.client.getVotes();
  }
}
module.exports = DataBase;
