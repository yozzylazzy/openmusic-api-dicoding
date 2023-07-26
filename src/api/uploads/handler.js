const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(albumsService, storageService, validator) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumCoverHandler(request, h) {
    try {
      const { albumId } = request.params;
      const { cover } = request.payload;
      this._validator.validateImageHeaders(cover.hapi.headers);
      const filename = await this._storageService.writeFile(cover, cover.hapi);
      const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/albums/${albumId}/cover/${filename}`;

      await this._albumsService.updateAlbumCover(albumId, coverUrl);

      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
        cover: {
          pictureUrl: coverUrl,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = UploadsHandler;
