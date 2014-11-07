$(function(){
	/*
	 var date = new Date();
	 $('#date').html(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" - "+date.getHours()+":"+date.getMinutes());
	*/
	var socket_youtube = io.connect('/youtube');
	socket_youtube.on('youtube_result',function(youtube_response){
		var found_content = youtube_response;
        var i=0;
        var lenght_content= found_content.items.length; 
        var selected_video;
        $('ul.video-tile').empty();
        $('#slider').css("left",0);
		for(i;i<lenght_content;i++)
		{
			var video_entry= found_content.items[i];
			var title= video_entry.snippet.title;
			var thumbnail= video_entry.snippet.thumbnails.medium.url;
			var idVideo= video_entry.id.videoId;
			var video_description = video_entry.snippet.description;
			var channel_title = video_entry.snippet.channelTitle;
			var published_time = video_entry.snippet.publishedAt;

			var video_tile = {
				number: i,
				title: title,
				thumbnail: thumbnail,
				idVideo: idVideo,
				description:video_description,
				channelTitle: channel_title,
				publishedAt: published_time
			};

			var template = $('#youtubeTpl').html(),
				html = Mustache.to_html(template, video_tile);

			$('ul.video-tile').append(html);

			if( i == 0 ){
				selected_video = $('#'+idVideo).addClass("selected_video");
			}
		}
		$('#video_information').html('<h2>'+selected_video.find('p.hidden')[0].innerHTML+'</h2>'+
									  '<p>'+selected_video.find('.video_description')[0].innerHTML+'</p>');
	});

	socket_youtube.on('loading', function(data){
		var output = data.output;
		console.log(output);
		var regex = output.match(/\d*.\d*%/);
		if(regex!=null)$('.progress-bar').width(regex[0]);
	});
});

$(document).ready(function(){
	Weather.init();
	Clock.start();	
});

var Loader = {
  loader: $('#loader'),
  show: function() {
	this.loader.siblings('div').hide();
	this.loader.show();
  },
  hide: function() {
	  this.loader.siblings('div').show();
	this.loader.hide();
  }
};

	var Clock = {
  $el : {
	digital : {
	  time : $('#time'),
	  date : $('#date')
	}
  },

  weekdays : ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
  months : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre!"],

  timeParts: function() {
	var date = new Date(),
		hour = date.getHours()%12;
		//hour = 12;
	
	return {
	  // Digital
	  day: Clock.weekdays[date.getDay()],
	  date: date.getDate(),
	  month: Clock.months[date.getMonth()],
	  hour: Clock.appendZero(hour),
	  minute: Clock.appendZero(date.getMinutes()),
	  second: Clock.appendZero(date.getSeconds()),
	};
  },

  appendZero : function(num) {
	if(num < 10) {
	  return "0" + num;
	}
	return num;
  },

  refresh: function() {
	var parts = Clock.timeParts(12);
	Clock.$el.digital.date.html(parts.day + ', ' + parts.month + ' ' + parts.date);
	Clock.$el.digital.time.html("<span class='hour'>"+parts.hour+"</span> : "+"<span class='minute'>"+parts.minute+"</span>"+" : <span class='second'>"+parts.second+"</span");
  },

  start: function() {
	if (Clock._running) {
	  clearInterval(Clock._running);
	}

	Clock._running = setInterval(function() {
	  Clock.refresh();
	}, 1000);
	Clock.refresh();
  }
};


var Weather = {
	init: function(){
		this.getWeather('c9d417b22edc92cf','CO','Medellín');
	},
	getWeather: function(key, country, city){
		var that = this;
		Loader.show();
		var url = "http://api.wunderground.com/api/"+key+"/forecast10day/q/"+country+"/"+city+".json?callback=?";
		$.getJSON(url, function(data){
			Loader.hide();
			var forecastObj = [];
			var forecast = data.forecast.simpleforecast.forecastday;
			$(forecast).each(function(key, value){
				if(key < 7){
				forecastObj = {
					"day":value.date.weekday,
					"low":value.low.celsius, 
					"high":value.high.celsius,
					"icon":that.condition(value.icon_url)};	
				
					var template = $('#weatherTpl').html(),
					    html = Mustache.to_html(template, forecastObj);
					$('ul.weather').append(html);		
					}
			});	
		});	
		
	},
	condition: function (url){
		var matcher = /\/(\w+).gif$/;
		var code = matcher.exec(url);
		if (code) {
		  code = code[1];
		} else {
		  // We can't find the code
		  code = null;
		}
		switch(code) {
	
		  case "chanceflurries":
		  case "chancesnow":
			return "p";
	
		  case "/ig/images/weather/flurries.gif":
			return "]";
	
		  case "chancesleet":
			return "4";
	
		  case "chancerain":
			return "7";
	
		  case "chancetstorms":
			return "x";
	
		  case "tstorms":
		  case "nt_tstorms":
			return "z";
	
		  case "clear":
		  case "sunny":
			return "v";
	
		  case "cloudy":
			return "`";
	
		  case "flurries":
		  case "nt_flurries":
			return "]";
	
		  case "fog":
		  case "hazy":
		  case "nt_fog":
		  case "nt_hazy":
			return "g";
	
		  case "mostlycloudy":
		  case "partlysunny":
		  case "partlycloudy":
		  case "mostlysunny":
			return "1";
	
		  case "sleet":
		  case "nt_sleet":
			return "3";
	
		  case "rain":
		  case "nt_rain":
			return "6";
	
		  case "snow":
		  case "nt_snow":
			return "o";
	
		  // Night Specific
	
		  case "nt_chanceflurries":
			return "a";
	
		  case "nt_chancerain":
			return "8";
	
		  case "nt_chancesleet":
			return "5";
	
		  case "nt_chancesnow":
			return "[";
	
		  case "nt_chancetstorms":
			return "c";
	
		  case "nt_clear":
		  case "nt_sunny":
			return "/";
	
		  case "nt_cloudy":
			return "2";
	
		  case "nt_mostlycloudy":
		  case "nt_partlysunny":
		  case "nt_partlycloudy":
		  case "nt_mostlysunny":
			return "2";
	
	
		  default:
			console.log("MISSING", code);
			_gaq.push(['_trackEvent', 'unknowweather', code]);
			return "T";
		}
	  }
}