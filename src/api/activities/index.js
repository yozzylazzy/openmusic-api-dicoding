const PlaylistSongActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongActivities',
  version: '3.0.0',
  register: async (server, { playlistsService, playlistSongActivitiesService }) => {
    // eslint-disable-next-line max-len
    const playlistSongActivitiesHandler = new PlaylistSongActivitiesHandler(playlistsService, playlistSongActivitiesService);
    server.route(routes(playlistSongActivitiesHandler));
  },
};
