$(document).ready(function () {

    var topics = ["games"];

    var favoriteChosen = false;//will be triggered to true when first favorite is chosen, 
    //to generate an outer div with a border to hold the favorites.

    var games = ["Silent Hill", "Resident Evil", "Dead Space", "Fallout", "Death Stranding", "Fatal Frame", "Final Fantasy", "Animal Crossing", "Metal Gear Solid", "Apex"];

    function displayGifs() {//this function is triggered when a button of a theme is clicked

        var game = $(this).attr("data-name");
        var apiKey = "hObEDaRGHCg6J0PmD7ph9yeDk0t4iH8b";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&limit=10&rating=r&api_key=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < 10; i++) {//10 gifs are generated

                var gifDiv = $("<div>");
                gifDiv.attr("class", "gif-and-rating");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);
                p.attr("class", "rating-text");

                var gameGif = $("<img>");//create an img with several options for gifs, including still and animated
                gameGif.attr("src", results[i].images.fixed_height_still.url);
                gameGif.attr("data-still", results[i].images.fixed_height_still.url);
                gameGif.attr("data-animate", results[i].images.fixed_height.url);
                gameGif.attr("data-state", "still");//set data-state to still so that it can later be triggered to animate when tapped
                gameGif.attr("class", "gif");

                var favButton = $("<button>");//add a button so users can save favorites
                favButton.attr("class", "fav-button btn btn-secondary");//button will have all of the information of the image it represents
                favButton.attr("src", results[i].images.fixed_height_still.url);//this way it can be generate the image later when tapped
                favButton.attr("data-still", results[i].images.fixed_height_still.url);
                favButton.attr("data-animate", results[i].images.fixed_height.url);
                favButton.text("\u2605");//star symbol

                gifDiv.append(gameGif);
                gifDiv.append(p);
                gifDiv.append(favButton);

                gameGif.css("display", "block");
                p.css("display", "inline");

                $("#games-view").prepend(gifDiv);

            }

        });
    }

    function renderButtons() {//renders buttons of intial array

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

    $("#add-game").on("click", function (e) {//takes user input of added theme, pushes it to category array
        e.preventDefault();

        var game = $("#game-input").val().trim();

        games.push(game);

        renderButtons();// new buttons are generated
    });

    $(document).on("click", ".game", displayGifs);//when a button on top is clicked, gifs are generated

    $(document).on("click", ".gif", function () {//when any gif is clicked..

        var state = $(this).attr("data-state");//its current state is recorded

        if (state === "still") {//if it is in a state of still before the click, its src will be changed to the animated version
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log($(this).attr("data-state"));
        }

        else if (state === "animate") {//and vice-versa
            $(this).attr("src", $(this).attr("data-still"));
            console.log("data-still");
            $(this).attr("data-state", "still");
        }

    });

    $(document).on("click", "#title", function () {//page reloads when title is clicked
        location.reload();
    });

    $(document).on("click", ".fav-button", function () {//when favorite (star) button is clicked..

        if (favoriteChosen === false) {//upon the first favorite being added
            $("#favorite-gifs").wrap( "<div class='favorite-container'></div>" );
            favoriteChosen = true;
        }//a new div is created to wrap the existing favorite-gifs div, in order to create a border
        //that does not initally appear on the page, until a favorite is chosen


        var gifDiv = $("<div>");//the gif is generated based on the information stored in the button
        gifDiv.attr("class", "favorited-gif");

        var gameGif = $("<img>");
        gameGif.attr("src", $(this).attr("src"));
        gameGif.attr("data-still", $(this).attr("data-still"));
        gameGif.attr("data-animate", $(this).attr("data-animate"));
        gameGif.attr("data-state", "still");
        gameGif.attr("class", "gif");

        gifDiv.append(gameGif);

        $("#favorite-gifs").prepend(gifDiv);//add to favorite gifs div, above the generated gifs

        gifDiv.css("display", "inline");

    });

    renderButtons();//buttons are rendered upon opening page

});