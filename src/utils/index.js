const mapDBAlbumsToModel = ({
  id, name, year, songs, coverurl,
}) => ({
  id, name, year, songs, coverUrl: coverurl,
});

const mapDBSongsToModel = ({
  id, title, year, performer, genre, duration, albumId,
}) => ({
  id, title, year, performer, genre, duration, albumId,
});

module.exports = { mapDBAlbumsToModel, mapDBSongsToModel };
