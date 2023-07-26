const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };
    const result = await this._pool.query(query);
    await this._cacheService.delete(`like:${userId}`);
    if (!result.rowCount) {
      throw new InvariantError('Failed to like album');
    }
  }

  async deleteLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);
    await this._cacheService.delete(`likes:${userId}`);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus like album. Id tidak ditemukan');
    }
  }

  async getTotalLike(albumId) {
    try {
      const result = await this._cacheService.get(`like:${albumId}`);
      return {
        likes: JSON.parse(result),
        from: 'cache',
      };
    } catch {
      const query = {
        text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);
      await this._cacheService.set(`like:${albumId}`, JSON.stringify(result.rows));
      return {
        likes: result.rowCount,
      };
    }
  }

  async verifyAlbumLike(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);
    return result.rowCount;
  }
}

module.exports = UserAlbumLikesService;
