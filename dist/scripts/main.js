"use strict";$(function(){function a(a){a.forEach(function(a){var t=r.replace(":image:",a.image.medium).replace(":name:",a.name).replace(":summary:",a.summary).replace(":img alt:",a.name+"Banner"),s=$(t);s.hide(),e.append(s.fadeIn(2500))})}var e=$("#tv-shows"),t=e.find(".loader"),r='<article class="tv-show clearfix"><div class="col-md-6 text-center"><img src=":image:" alt=":img alt:"></div><div class="caption col-md-6"><h3>:name:</h3><p>:summary:</p></div></article>';$("#search").find("form").submit(function(r){r.preventDefault();var s=$(this).find('input[type="text"]').val();$.ajax({url:"http://api.tvmaze.com/search/shows",data:{q:s},success:function(r){t.remove(),e.find(".tv-show").remove();var s=r.map(function(a){return a.show});a(s)}})}),localStorage.shows?(t.remove(),a(JSON.parse(localStorage.shows))):$.ajax("http://api.tvmaze.com/shows").then(function(e){t.remove(),localStorage.shows=JSON.stringify(e),a(e)})});