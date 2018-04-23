function getAllArticles () {
    $.getJSON("/articles", function(data) {
        console.log(data);
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#display-articles").append("<li class='article-list'>" + 
                "<h3>" + data[i].title + "</h3>" +
                "<p>" + data[i].summary + "</p>" +
                "<button class='save-article-button' data-articleid=" + data[i]._id + ">Save Article</button>" + 
                "</li>"
            );
        }
        $(".save-article-button").on("click", function() {

        });
    });
};

getAllArticles();

$("#scrape-button").on("click", function(event) {
    getAllArticles();
    $("#scrape-amount").text("You scraped new articles");
    $("#scrape-modal").modal('show');
    location.reload();
});

    
 

