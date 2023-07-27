const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongActivities(playlistId, songId, userId, action, time) {
    const id = `playlistsongactivity-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Aktivitas Playlist Song gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getPlaylistSongActivities(playlistId) {
    const query = {
      text: `SELECT u.username, s.title, psa.action, psa.time
        FROM playlist_song_activities psa
        LEFT JOIN users u ON (u.id = psa.user_id)
        LEFT JOIN songs s ON (s.id = psa.song_id)
        WHERE psa.playlist_id = $1
        ORDER BY psa.time`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return {
      playlistId,
      activities: result.rows,
    };
  }
}

module.exports = PlaylistSongActivitiesService;
