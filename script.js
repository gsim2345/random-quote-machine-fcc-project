$(document).ready(function () {

    /** function that changes the background color randomly. */
    var colorize = function () {
        var colors = ["#258EA6", "#759FBC", "#90C3C8", "#B9B8D3", "#59A96A", "#9BDEAC", "#B4E7CE", "#AC80A0", "#DCC9B6", "#ABC4AB", "#68C5DB"];
        var number = Math.floor(Math.random() * 10);
        $('body').css("background-color", colors[number]);
        $('button').css("background-color", colors[number]);
    };
    /** function that gets the data from the API, and displays it on the page */
    var getData = function () {
        $('#quote').html('<img src="status.gif" alt="preloader gif">');
        $('#author').html('');
        $('.quoteDislay').css('background-color', 'white');
        var quoteURL = "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous";
        $.ajax(quoteURL, {
                format: "json",
                dataType: "json",
                headers: {       
                    "X-Mashape-Key": "b0DsW1320PmshFs2hPsFt0YTel9Hp1zVzqYjsnlGiKZMsnAqM2"      
                },
                method: "POST"
            })
            .done(function (data) {
                $('.quoteDislay').css('background-color', 'rgb(248, 248, 248)');
                var quoteText = data.quote;
                var quoteAuthor = data.author;
                /** inserting the data on the page */
                $('#quote').text('" ' + quoteText + '"');
                if (quoteAuthor.length === 0) {
                    $('#author').text('- Anonymous');
                } else {
                    $('#author').text('- ' + quoteAuthor);
                }
                /** getting the background color */
                colorize();
            })
            .fail(function () {
                $('#quote').text('Error occured. Not getting any quotes from the source.');
            });
    };

    /** getting the first quote with the getData function */
    getData();



    /** getting a new quote on click */
    $('#newQuoteButton').on('click', function() {
        /** hiding the alert div, in case it was used earlier because of long tweet */
        $('.alert').addClass('hidden');
        getData();

    });

    /** tweeting the quote on click */
    $('#tweetButton').on('click', function(event) {
        var textToTweet = $('#quote').text() + $('#author').text();
        /** if tweet is longer than 140 chars, alert sent. */
        if (textToTweet.length > 140) {
            event.preventDefault();
            /** alert it on the page in an alert div. */
            $('.alert').removeClass('hidden').html('Your tweet is longer than 140 characters !');
        } else {
            /** if quote'length is  < 140 chars, tweeting out. */
            $('#tweetButton').attr('href', 'https://twitter.com/intent/tweet?text=' + textToTweet + '');
        }

    });

});
