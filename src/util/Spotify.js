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
        const searchLink = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const endpoint = '/v1/search?type=';

        return fetch(searchLink, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed');
            }, networkError => console.log(networkError.message)).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },
};

export default Spotify;