require("dotenv").config();

// Modules
const keys = require("./keys.js");
const axios = require("axios");
const SpotifyAPI = require("node-spotify-api");
const fs = require("fs");
const moment = require("moment");
moment().format();

const spotify = new SpotifyAPI(keys.spotify);
const userCommand = process.argv[2];
const query = process.argv[3];

switch (
  userCommand // We can use a switch statement to check for the user's command input in the command line!
) {
  case "concert-this": // info about concerts for a certain band
    concerts(query);
    break;
  case "spotify-this-song": // info about songs with a specific song name
    spotifyThisSong(query);
    // Displays information about a song
    break;
  case "movie-this": // info about movie with a specific name
    movieInfo(query);
    break;
  case "do-what-it-says":
    doWhatItSays();
    // Takes text inside of random.txt and then use it to call one of LIRI's commands
    break;
}

// FUNCTION for userCommand "concert-this" //
function concerts(query = "Metallica") {
  // ES6 way of declaring parameter value if it is undefined
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (let i = 0; i < response.data.length; i++) {
        const concert = response.data[i];
        let concertInfo = `--------------------------------------------------------------------
Name of the venue: ${concert.venue.name} 
Venue Location: ${concert.venue.city} 
Date of the Event: ${moment(concert.datetime).format("L")}`;
        console.log(concertInfo);
        fs.appendFile("log.txt", concertInfo, function(err) {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

// FUNCTION for userCommand "movie-this" //
function movieInfo(query = "mr nobody") {
  // ES6 way of declaring parameter value if it is undefined
  axios
    .get(
      "https://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy" // grabbing from omdb api
    )
    .then(function(response) {
      const movie = response.data;
      let movieInformation = `--------------------------------------------------------------------
Title of the movie: ${movie.Title} 
Year the movie came out: ${movie.Year} 
IMDB Rating of the movie: ${movie.imdbRating} 
Rotten Tomatoes Rating of the movie: ${movie.Ratings[1].Value} 
Country where the movie was produced: ${movie.Country}
Language of the movie: ${movie.Language}
Plot of the movie: ${movie.Plot} 
Actors/Actresses in the movie: ${movie.Actors}`;
      console.log(movieInformation);
      fs.appendFile("log.txt", movieInformation, function(err) {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

// FUNCTION for userCommand "spotify-this-song" //
function spotifyThisSong(songQuery = "The Sign") {
  // ES6 way of declaring parameter value if it is undefined
  spotify
    .search({ type: "track", query: songQuery }) // node-spotify-api documentation for retrieving information about a song
    .then(function(response) {
      for (let i = 0; i < 3; i++) {
        const song = response.tracks.items[i];
        let spotifySong = `--------------------------------------------------------------------
Artist(s): ${song.artists[0].name} 
Song Name: ${song.name}
Album Name:  ${song.album.name} 
Preview Link:  ${song.preview_url}`;
        console.log(spotifySong);
        fs.appendFile("log.txt", spotifySong, function(err) {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// Function for userCommand "do-what-it-says" //
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    const dataArr = data.split(","); // splits txt data into different indices
    console.log(dataArr);
    spotifyThisSong(dataArr[1]);
  });
}
