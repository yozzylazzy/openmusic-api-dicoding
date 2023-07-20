const { Pool } = require('pg');

class UsersService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    // TODO: Verifikasi username, pastikan belum terdaftar.
    // TODO: Bila verifikasi lolos, maka masukkan user baru ke database.
  }

}

module.exports = UsersService;
