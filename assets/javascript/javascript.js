$(document).ready(function() {
  var topics = [
    "Toyota",
    "Ford",
    "Chevrolet",
    "Dodge",
    "Pagani",
    "Fiat",
    "Mitsubishi"
  ];

  function btnBulider() {
    for (count = 0; count < topics.length; count++) {
      var btn = $("<button>");

      btn.text(topics[count]);
      // btn.attr("id", "gif-topics");
      btn.addClass("btn btn-default gif-topics");
      $("#btn-holder").append(btn);
    }
  }

  // var stillImg, animateImg;

  $("#btn-holder").on("click", ".gif-topics", function() {
    $(".item").remove();

    var btnTitle = $(this).text();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      btnTitle +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for (var count = 0; count < results.length; count++) {
        var imgDiv = $("<div class='item'>");
        var gifRating = results[count].rating;
        var stillImgURL = results[count].images.fixed_height_still.url;
        var animatedImgURL = results[count].images.fixed_height.url;

        var text = $("<p>").text("Rated: " + gifRating);
        var topicImg = $("<img class='gif'>");

        topicImg.attr("src", stillImgURL);
        topicImg.attr("data-state", "still");

        topicImg.attr("data-still", stillImgURL);
        topicImg.attr("data-animate", animatedImgURL);

        imgDiv.prepend(text);
        imgDiv.prepend(topicImg);
        $("#image-results").prepend(imgDiv);
      }
    });
  });

  //write a function that pauses and starts images on click
  $("#image-results").on("click", ".gif", function() {
    // console.log("in animate or pause");

    // cant get past image-results!!!!!!

    console.log("Current state: " + $(this).attr("data-state"));
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#submit").on("click", function() {
    $(".gif-topics").remove();
    var topicAdder = $("#topic-adder");
    var newTopic = topicAdder.val();
    topics.push(newTopic);
    topicAdder.val("");
    btnBulider();
  });
  // code for adding to the array3

  btnBulider();
});
