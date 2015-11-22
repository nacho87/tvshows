$(function(){

  var $tvShows = $('#tv-shows');
  var $loader = $tvShows.find('.loader');
  var $form = $('#search').find('form');
  var template = '<article class="tv-show clearfix">' +
                  '<div class="col-md-6 text-center">' +
                    '<img src=":image:" alt=":img alt:">' +
                  '</div>' +
                  '<div class="caption col-md-6">' +
                    '<h3>:name:</h3>' +
                    '<p>:summary:</p>'+
                  '</div>' +
                '</article>';

  /* Render Shows */

  function renderShows(shows){
    shows.forEach(function(show){
      var article = template
        .replace(':image:', show.image.medium)
        .replace(':name:', show.name)
        .replace(':summary:', show.summary)
        .replace(':img alt:', show.name + 'Banner')

      var $article = $(article);
      $article.hide();
      $tvShows.append($article.fadeIn(2500));
    });
  }

  $('#search').find('form').submit(function(event){
    event.preventDefault();

    var query = $(this).find('input[type="text"]').val();

    $.ajax({
      url: 'http://api.tvmaze.com/search/shows',
      data: {q: query},
      success: function(res){
        $loader.remove();
        $tvShows.find('.tv-show').remove();
        var shows = res.map(function(el){
          return el.show
        });
        renderShows(shows);
      }
    })
  });

  $.ajax('http://api.tvmaze.com/shows')
    .then(function(data){
      $loader.remove();
      renderShows(data);
    });
});
