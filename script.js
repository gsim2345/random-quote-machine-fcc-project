$(document).ready(function() {

  $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
    var quoteText = data.quoteText;
    var quoteAuthor = data.quoteAuthor;
    $('#quote').text(quoteText);
    $('#author').text(quoteAuthor);
  });

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

  $('#tweetButton').on('click', function() {

      var textToTweet = $('#quote').text() + $('#author').text();
      console.log(textToTweet.length);
      if (textToTweet.length > 140) {

      } else {
        $('#tweetButton').attr('href', 'https://twitter.com/intent/tweet?text=' + textToTweet + '');
      }

  });

});
