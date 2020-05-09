//add document.ready
var topics = ["games"];//more topics should be added here

var games = ["Silent Hill", "Resident Evil 4", "Dead Space", "Layers of Fear", "Until Dawn", "Fatal Frame", "Resident Evil 2", "Resident Evil 3", "Silent Hill 2", "Alien Isolation"];

function displayGifs() {

    var game = $(this).attr("data-name");
    var apiKey = "hObEDaRGHCg6J0PmD7ph9yeDk0t4iH8b";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&limit=10&rating=r&api_key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // var gameGifsDiv = $("<div class='game'>");

        // var gameGifsContent = $("<div class='game-gifs'>");

        var results = response.data;

        for (var i = 0; i < 10; i++){
            
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gameGif = $("<img>");
            gameGif.attr("src", results[i].images.fixed_height_still.url);
            gameGif.attr("data-still", results[i].images.fixed_height_still.url);
            gameGif.attr("data-animate", results[i].images.fixed_height.url);
            gameGif.attr("data-state", "still");
            gameGif.attr("class", "gif");

            gifDiv.append(gameGif);
            gifDiv.append(p);

            $("#games-view").prepend(gifDiv);
        }

    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < games.length; i++) {

        var a = $("<button>");

        a.addClass("game");

        a.attr("data-name", games[i]);

        a.text(games[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-game").on("click", function(e) {
    e.preventDefault();

    var game = $("#game-input").val().trim();

    games.push(game);

    renderButtons();
});

$(document).on("click", ".game", displayGifs);

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log($(this).attr("data-state"));

    }

    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

renderButtons();