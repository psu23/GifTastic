//add document.ready
var topics = ["games"];//more topics should be added here

var games = ["Silent Hill", "Resident Evil", "Dead Space", "Fallout", "Death Stranding", "Fatal Frame", "Final Fantasy", "Animal Crossing", "Metal Gear Solid", "Apex"];

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
            gifDiv.attr("class", "gif-and-rating");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
            p.attr("class", "rating-text");

            var gameGif = $("<img>");
            gameGif.attr("src", results[i].images.fixed_height_still.url);
            gameGif.attr("data-still", results[i].images.fixed_height_still.url);
            gameGif.attr("data-animate", results[i].images.fixed_height.url);
            gameGif.attr("data-state", "still");
            gameGif.attr("class", "gif");

            gifDiv.append(gameGif);
            gifDiv.append(p);

            // $(gifDiv).css('float','left');//float can be assigned without separate stylesheet
            $("#games-view").prepend(gifDiv);
            
        }

    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < games.length; i++) {

        var a = $("<button>");

        a.addClass("game");

        a.addClass("btn btn-primary");

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
        console.log("data-still");
        $(this).attr("data-state", "still");
    }

});

renderButtons();