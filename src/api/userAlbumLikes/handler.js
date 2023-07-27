const autoBind = require('auto-bind');
const InvariantError = require('../../exceptions/InvariantError');

class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumsService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumsService = albumsService;

    autoBind(this);
  }

  async postLikeAlbumHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;
    await this._albumsService.getAlbumById(albumId);
    const isLiked = await this._userAlbumLikesService.verifyAlbumLike(credentialId, albumId);
    if (isLiked) {
      throw new InvariantError('Album sudah di Like!');
    } else {
      await this._userAlbumLikesService.addLike(credentialId, albumId);
      return h.response({
        status: 'success',
        message: 'Berhasil Menambahkan Like Album',
      }).code(201);
    }
  }

  async deleteLikeAlbumHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;
    await this._albumsService.getAlbumById(albumId);
    await this._userAlbumLikesService.deleteLike(credentialId, albumId);
    return h.response({
      status: 'success',
      message: 'Berhasil Membatalkan Like Album',
    }).code(200);
  }

  async getUserAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    await this._albumsService.getAlbumById(albumId);
    const { likes, cached } = await this._userAlbumLikesService.getTotalLike(albumId);
    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.code(200);
    if (cached) { response.header('X-Data-Source', 'cache'); }
    return response;
  }
}

module.exports = UserAlbumLikesHandler;
