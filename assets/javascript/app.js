//initial array of state
var states = ["Illinois", "New York", "California", "Texas", "Florida" ];

$(document).ready(function() {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();

        for (var i=0 ; i < states.length; i++) {

            var newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-success");
            newButton.text(states[i]);
            newButton.attr("data-name", states[i]);
            $("#allbuttons").append(newButton);

        }

    }
    $("#addbutton").on("click", function(event) {
        event.preventDefault();
        var addedData = $("#userinput").val().trim();
        if (addedData !="") {
            states.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }
});
// displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayStatesInfo() {

//     var states = $(this).attr("data-name");
//     var queryURL = "https://www.https://api.giphy.com/v1/.com/?t=" + states + "&apikey=1OtdAX8hHrdlbBxQm3zjcoBL390pxYW4&limit=10";}

})