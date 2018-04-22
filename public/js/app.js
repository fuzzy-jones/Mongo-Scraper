$(function() {

    $("#scrape-button").on("click", function(event) {
        location.reload();
    });

    
    $.getJSON("/articles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#display-articles").append("<li class='article-list'>'" + 
                "<h3>" + data.title + "</h3>" +
                "<p>" + data.summary + "</p>" +
                "<p>" + data.link + "</p></li>");
        }
    });


});