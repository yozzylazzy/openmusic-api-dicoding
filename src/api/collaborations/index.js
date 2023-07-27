const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '3.0.0',
  register: async (server, {
    usersService, playlistsService,
    collaborationsService, validator,
  }) => {
    // eslint-disable-next-line max-len
    const collaborationsHandler = new CollaborationsHandler(usersService, playlistsService, collaborationsService, validator);
    server.route(routes(collaborationsHandler));
  },
};
