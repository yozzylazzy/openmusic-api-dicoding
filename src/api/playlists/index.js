const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlists',
  version: '3.0.0',
  register: async (server, {
    playlistsService, songsService, playlistSongActivitiesService, validator,
  }) => {
    // eslint-disable-next-line max-len
    const playlistsHandler = new PlaylistsHandler(playlistsService, songsService, playlistSongActivitiesService, validator);
    server.route(routes(playlistsHandler));
  },
};
