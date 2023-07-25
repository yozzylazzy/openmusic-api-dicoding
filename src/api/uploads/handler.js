class UploadsHandler {
  constructor(albumsService, storageService, validator) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validator = validator;
  }

  async poastAlbumCoverHandler(request, h) {
    const { albumId } = request.params;
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);
    const filename = await this._storageService.writeFile(data, data.hapi);
    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/albums/${albumId}/cover/${filename}`;

    await this._albumsService.updateAlbumCover(albumId, coverUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
