const clientId = 'd8d98aa9438b45e39477709ef588c3ad';
const redirectUri = 'http://localhost:3000/';
let accessToken;

let Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

        async search(term) {
            const accessToken = Spotify.getAccessToken();
            if (accessToken) {
            const response = await fetch(
                `https://api.spotify.com/v1/search?type=track&q=${term}`,
                {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                }
            );
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
            }
        },

       savePlaylist(playlistName, trackUris) {
            if (playlistName && trackUris.length) {
              return;
            }

            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`,
              };
              //Get userID
              let userId;
              response = await fetch(`https://api.spotify.com/v1/me`, {
                headers: headers,
              });
              jsonResponse = await response.json();
              userId = jsonResponse.id;

              response = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ name: playlistName }),
                }
              );
              jsonResponse = await response.json();
              const playlistId = jsonResponse.id;

              response = await fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackUris }),
                }
              );
              return await response.json();
            }
            return;
          },
};

export default Spotify;