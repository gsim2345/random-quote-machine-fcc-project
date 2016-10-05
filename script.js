$(document).ready(function() {

  // getting the first quote with getJSON
  $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
    var quoteText = data.quoteText;
    var quoteAuthor = data.quoteAuthor;
    $('#quote').text(quoteText);
    $('#author').text(quoteAuthor);
  });

  // getting a new quote on click
  $('#newQuoteButton').on('click', function() {
    //$('#quote').text("");
    //$('#author').text("");
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
      var quoteText = data.quoteText;
      var quoteAuthor = data.quoteAuthor;
      $('#quote').text(quoteText);
      $('#author').text(quoteAuthor);
    });
  });

  // tweeting the quote on click
  $('#tweetButton').on('click', function(event) {
      var textToTweet = $('#quote').text() + $('#author').text();
      console.log(textToTweet.length);
      // if tweet is longer than 140 chars, alert sent with materialize toast component.
      if (textToTweet.length > 140) {
        event.preventDefault();
        Materialize.toast('Your tweet is longer than 140 characters !', 6000);
      } else {
      // if it's < 140 chars, tweeting out.  
        $('#tweetButton').attr('href', 'https://twitter.com/intent/tweet?text=' + textToTweet + '');
      }

  });

});
