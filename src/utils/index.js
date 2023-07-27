const mapDBAlbumsToModel = ({
  id, name, year, songs, coverurl,
}) => ({
  id, name, year, songs, coverUrl: coverurl,
});

module.exports = { mapDBAlbumsToModel };
