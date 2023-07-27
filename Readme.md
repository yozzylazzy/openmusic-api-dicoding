DO NOT USE THIS CODE FOR DICODING SUBMISSION!!! EXCEPT YOSEF ADRIAN

- It's Original Made by Yozzy Lazzy or Yosef Adrian
- It's build by trial and error with some modul from Dicoding
- Submitted At 05 July 2023

This is Step to Start The Project:

- Make sure dependencies have been installed using "npm install"
- Make sure you have run "npm run migrate up" to create the postgres DB
- The run it with "npm run start-dev"
[Optional] npm run script:
- npm run lint (check)
- npm tun lint-fix (fix)

UPDATE V2 For Submisi Dicoding 2 Fundamental Back-End :

- Users
- Authentications
- PLaylists
- JOIN Table
- Collaboration
- Activities
- Revisi Code Sesuai Masukan dan Menyelesaikan Optional Task di v1 dan v2

UPDATE V3 For Submisi Dicoding 3 Fundamental Back-End :

- Export Playlis ke Email
- Uploads Gambar Secara Lokal (Secara AWS juga sudah dites)
- Album Likes by User Service
- Caching AlbumLikes Service
- Revisi Code Sesuai Masukan dan Menyelesaikan Optional Task di v1 dan v2 (Schema Joi, Services, eslint dangle, dan rowCount)


Command to Reset DB :
TRUNCATE songs,albums,collaborations, playlists, playlistsongs, users, authentications, playlist_song_activities, user_album_likes

TRUNCATE songs,albums,collaborations, playlists, playlistsongs, users, authentications, playlist_song_activities
SELECT s.id, s.title, s.performer FROM playlistsongs p
      JOIN songs s ON s.id = p.song_id WHERE p.id = 'playlist-j8FjIOa-MwmNqJZO'

SELECT * FROM playlists

SELECT s.id, s.title, s.performer FROM playlists p
      JOIN playlistsongs ps ON ps.playlist_id = p.id
      JOIN songs s ON s.id = ps.song_id
      WHERE p.id = 'playlist-j8FjIOa-MwmNqJZO'

SELECT * FROM pgmigrations
