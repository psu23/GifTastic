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
        var gameGifsDiv = $("<div class='game'>");

        // var gameGifsContent = $("<div class='game-gifs'>");

        for (var i = 0; i < 10; i++){
            var gameGif = $("<img>").attr("src", response.data[i].images.original.url);
            gameGifsDiv.append(gameGif);
            $("#games-view").prepend(gameGifsDiv);
        }


        // loadJSON(url, gotData)
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

renderButtons();