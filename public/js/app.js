$(document).ready(function(){   

    $.getJSON("/articles", function(data) {
        console.log(data);
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#display-articles").append("<li class='article-list'>" + 
                "<h3>" + data[i].title + "</h3>" +
                "<p>" + data[i].summary + "</p>" +
                "<button class='save-article-button' data-articleid=" + data[i]._id + " data-articletitle=" + data[i].title + " data-articlesummary=" + data[i].summary + " data-articlesaved=" + data[i].saved + ">Save Article</button>" + 
                "</li>"
            );
        }
        $(".save-article-button").on("click", function(event) {
            console.log("i was clicked");
            
            event.preventDefault();
            var id = $(this).data("articleid");
            var saved = $(this).data("articlesaved");
            console.log(id);
            console.log(saved);

            // $.ajax("/articles/" + id, {
            //     type: "PUT",
            //     data: {
            //         "saved": true
            //     }
            // }).then(
            //     function() {
            //     // console.log("changed devour to", newDevour);
            //     // Reload the page to get the updated list
            //     location.reload();
            //     }
            // );

        })
    });

    $.getJSON("/S-articles", function(data) {
        console.log(data);
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#display-saved-articles").append("<li class='article-list'>" + 
                "<h3>" + data[i].title + "</h3>" +
                "<p>" + data[i].summary + "</p>" +
                "<button class='unsave-article-button' data-articleid=" + data[i]._id + ">Remove Saved Article</button>" + 
                "</li>"
            );
        }
        // $(".save-article-button").on("click", function(event) {
        //     console.log("i was clicked");
            
        //     event.preventDefault();
        //     var ID = $(this).data("articleid");
        //     console.log(ID);
        // });
    });
    

    // $(".navbar-btn").on("click", function(event) {
    //     // $("#scrape-amount").text("You scraped new articles");
    //     $("#scrape-modal").modal('show');
    // });

    // $("#scrape-articles").on("click", function(event) {
    //     $.ajax({
    //         method: "GET",
    //         url: "/scrape",
    //     }).done(function(data) {
    //         console.log(data)
    //         $("#scrape-modal").modal();
    //         window.location = "/"
    //     })
    // });


});

    
 

