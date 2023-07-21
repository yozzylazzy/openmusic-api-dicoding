const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'musicapp_jwt',
    },
  },
];

module.exports = routes;
