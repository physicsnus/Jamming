let accessToken = "";
const clientId = "place clientID here";
const secret = "place secret here";
const redirect_uri = "http://localhost:3000/";

const Spotify = {
  getAccessToken: function() {
    if (accessToken){
      return new Promise(resolve => resolve(accessToken));
    }

    return fetch("https://accounts.spotify.com/authorize?client_id="+clientId+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirect_uri).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
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

  savePlaylist(playlistName, trackURI) {
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
