$(document).ready(function() {


  
  //function that changes the background color randomly.
  var colorize = function() {
    var colors = ['rgb(220, 244, 210)', 'rgb(247, 212, 246)', 'rgb(244, 235, 186)', 'rgb(209, 214, 252)', 'rgb(158, 247, 241)', 'rgb(165, 244, 164)', 'rgb(255, 210, 210)', 'rgb(255, 239, 191)', 'rgb(198, 244, 239)'];
    var number = Math.floor(Math.random() * 10);
    $('body').css('background-color', colors[number]);
  };

  colorize();

  // getting the first quote with getJSON
  $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
    var quoteText = data.quoteText;
    var quoteAuthor = data.quoteAuthor;
    $('#quote').text('" ' + quoteText + '"');
    if (quoteAuthor.length === 0) {
      $('#author').text('- Anonymous');
    } else {
      $('#author').text('- ' + quoteAuthor);
    }

  });

  // getting a new quote on click
  $('#newQuoteButton').on('click', function() {
    // hiding the alert div
    $('.alert').addClass('hidden');
    colorize();
    $.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(data) {
      var quoteText = data.quoteText;
      var quoteAuthor = data.quoteAuthor;
      $('#quote').text('" ' + quoteText + '"');
      if (quoteAuthor.length === 0) {
        $('#author').text('- Anonymous');
      } else {
        $('#author').text('- ' + quoteAuthor);
      }
    });
  });

  // tweeting the quote on click
  $('#tweetButton').on('click', function(event) {
      var textToTweet = $('#quote').text() + $('#author').text();
      console.log(textToTweet.length);
      // if tweet is longer than 140 chars, alert sent with materialize toast component.
      if (textToTweet.length > 140) {
        event.preventDefault();
        //Materialize.toast('Your tweet is longer than 140 characters !', 6000);
        // or alert it on the page in an alert div:
        $('.alert').removeClass('hidden').html('Your tweet is longer than 140 characters !');
      } else {
      // if it's < 140 chars, tweeting out.
        $('#tweetButton').attr('href', 'https://twitter.com/intent/tweet?text=' + textToTweet + '');
      }

  });

});
