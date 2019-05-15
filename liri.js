require("dotenv").config();

const keys = require("./keys.js"); // To have access to our spotify api keys
const axios = require("axios"); // Need to get information using axios
const moment = require("moment"); // Formatting dates in node
moment().format();
const fs = require("fs"); // Reading out text file
const spotifyAPI = require("node-spotify-api"); // Having access to spotify api and using the keys to grab information
/* const spotify = new Spotify(keys.spotify); */

let userCommand = process.argv[2];
let query = process.argv[3];

switch (
  userCommand // We can use a switch statement to check for the user's command input in the command line!
) {
  case "concert-this":
    console.log("NOT DONE YET");
    concerts(query);
    break;
  case "spotify-this-song":
    console.log("NOT DONE YET");
    // Displays information about a song
    break;
  case "movie-this":
    console.log("NOT DONE YET");
    movieInfo(query);
    break;
  case "do-what-it-says":
    console.log("NOT DONE YET");
    // Takes text inside of random.txt and then use it to call one of LIRI's commands
    break;
}

// FUNCTION for userCommand "concert-this" //
function concerts(query) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        query +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      for (let i = 0; i < response.data.length; i++) {
        const concert = response.data[i];
        let concertInfo =
          "--------------------------------------------------------------------" +
          "\nName of the venue: " +
          concert.venue.name +
          "\nVenue Location: " +
          concert.venue.city +
          "\nDate of the Event: " +
          moment(concert.datetime).format("L"); // formats the date of the concert
        console.log(concertInfo);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

// FUNCTION for userCommand "movie-this" //
function movieInfo(query) {
  if (query === undefined) {
    query = "mr nobody";
  }
  axios
    .get(
      "https://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      const movie = response.data;
      let movieInformation =
        "--------------------------------------------------------------------" +
        "\nTitle of the movie: " +
        movie.Title +
        "\nYear the movie came out: " +
        movie.Year +
        "\nIMDB Rating of the movie: " +
        movie.imdbRating /*
        "\nRotten Tomatoes Rating of the movie: " +
        movie.Ratings[1].Value + */ +
        "\nCountry where the movie was produced: " +
        movie.Country +
        "\nLanguage of the movie: " +
        movie.Language +
        "\nPlot of the movie: " +
        movie.Plot +
        "\nActors/Actresses in the movie: " +
        movie.Actors;
      console.log(response);
      console.log(movieInformation);
    })
    .catch(function(error) {
      console.log(error);
    });
}
