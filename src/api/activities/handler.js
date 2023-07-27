const autoBind = require('auto-bind');

class PlaylistSongActivitiesHandler {
  constructor(playlistsService, playlistSingsActivitesService) {
    this._playlistsService = playlistsService;
    this._playlistSingsActivitesService = playlistSingsActivitesService;

    autoBind(this);
  }

  async getPlaylistSongActivities(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    const {
      playlistId, activities,
    } = await this._playlistSingsActivitesService.getPlaylistSongActivities(id);
    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistSongActivitiesHandler;
