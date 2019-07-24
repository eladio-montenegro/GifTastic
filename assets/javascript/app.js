//initial array of state
var states = ["Illinois", "New York", "California", "Texas", "Florida" ];

//create buttons for the states in the array
$(document).ready(function() {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();

        for (var i=0 ; i < states.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-info");
            newButton.text(states[i]);
            newButton.attr("data-name", states[i]);
            $("#allbuttons").append(newButton);

        }

    }
    //add a button after someone enter a new name into the form field
    $("#addbutton").on("click", function(event) {
        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if (addedData !="") {
            states.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }
});
//pull info from the API and show the giff
$(document).on("click", ".itembutton", displayInfo);

function displayInfo() {
    var states = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    states + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $("mainimages").empty();

    $.ajax ({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        //making sure the api pulls the gifs
        console.log(response);

        var results = response.data;

        for (var i=0; i<results.length; i++){

            var dataImage = $("<img>");
            dataImage.attr("src", results[i].images.fixed_height_still.url);
            dataImage.attr("data-still", results[i].images.fixed_height_still.url);
            dataImage.attr("data-animate", results[i].images.fixed_height.url);
            dataImage.addClass("gif");
            dataImage.attr("data-state", "still");


            var newItemdiv = $('<div class="newItem">');
            var gifRating = results[i].rating;
            var divRating = $("<p>").text("Rating: " + gifRating);
            
            newItemdiv.append(divRating);
            newItemdiv.append(dataImage);

            $("#mainimages").prepend(newItemdiv);

        }
    
    });
}

$("#mainimages").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }


    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});
});