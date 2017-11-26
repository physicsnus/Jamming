let accessToken = "";
const clientId = "e6047d76363d4f53968561baebe04852";
const secret = "978b50babebd4a61aa15921e5857acac";
const redirect_uri = "http://localhost:3000/";

const Spotify = {
  getAccessToken: function() {
    // case 1: accessToken already existed
    if (accessToken){
      //return new Promise(resolve => resolve(accessToken));
      return accessToken;
    }

    // case 2: already in URL?
    let url = window.location.href;
    accessToken = this.extract(url, "access_token=", "&");
    if (accessToken) {
        expiresIn = this.extract(url, "expires_in=", "&");
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log("access token successful retrieved.");
        return accessToken;
    } else {
        // case 3: fetch from spotify
        let state = 4321;
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirect_uri}&state=${state}`;
    }

    /*return fetch("https://accounts.spotify.com/authorize?client_id="+clientId+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirect_uri).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });*/
  },

  search: function(searchTerm) {
    return Spotify.getAccessToken().then(() => {
      return fetch(
        "https://api.spotify.com/v1/search?type=TRACK&q="+searchTerm,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      ).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return jsonResponse.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri}
        ));
      });
    });
  },

  savePlaylist: function(playlistName, trackURI) {
    const token = accessToken;
    const headers = {Authorization: `Bearer ${accessToken}`, "Content-type": "application/json"};
    const userID = fetch("https://api.spotify.com/v1/me", {headers:headers}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });

    let playlistID = fetch("https://api.spotify.com/v1/users/"+userID+"/playlists", {
      headers: headers,
      method: "POST",
      body: playlistName //I'm not quite sure what to put inside the body
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });

    fetch("https://api.spotify.com/v1/users/"+userID+"/playlists/"+playlistID+"/tracks", {
      headers: headers,
      method: "POST",
      body: trackURI //I'm not quite sure what to put inside the body
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.id;
    });
  }
}

export default Spotify;
