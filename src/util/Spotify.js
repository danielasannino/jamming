import spotifyClientID from './privateInfo';
const clientID = spotifyClientID;
const redirectURI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        const searchLink = `https://api.spotify.com/v1/search?type=track&q=T${term}`;

        return fetch(searchLink, { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(response => {
            response.json();
        }
        ).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    savePlaylist(name, trackURIs) {
        if (!name || trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => {
            response.json();
        }
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: name }),
            }.then(response => {
                response.json();
            }
            ).then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`), {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackURIs }),
                }
            })
            )
        })
    }
};

export default Spotify;