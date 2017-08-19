$(document).ready(function() {
	var isChrome = !!window.chrome; 
	var isIE = /*@cc_on!@*/false;
	if( isChrome ) {
		$("#homeVideo").replaceWith($('<video id="homeVideo" class="video-background" autoplay loop><source src="louvre.webm" type="video/webm"></video>'));
	}
	if( isIE ) {
		//$("#homeVideo").replaceWith($('<img id="homeVideo" class="video-background" src="louvre.gif" />'));
	}
	
	$('.slider-item img').each(function() {
		$(this).load(function() {
			$(this).parent().addClass('loaded');
		});
	});
	
	setInterval(function() {
		var active = $('.slider-item.active');
		$('.slider-item').removeClass('active');
		if(active.next('.loaded').length)
			active.next().addClass('active');
		else
			$('.slider-item').first().addClass('active');
	}, 5000);
	
	new WOW().init();
	
	//$(window).load(function() {
		setTimeout(function() {
			$('.preLoading').fadeOut('slow');
			$("body").removeClass('loading');
			/*$("body").niceScroll({
				cursorcolor: '#8C8C8C',
				background: '#EAEAEA',
				autohidemode: false
			});*/
		}, 3000);
	//});
	$('.go-down a').click(function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#sticky-header').offset().top
		}, 500);
	});
	$('.dropdown').css('max-height', ($(window).height() - $('#sticky-header').height()));
	$('.dropdown').niceScroll({
		cursorcolor: '#8C8C8C',
		background: '#EAEAEA',
		autohidemode: false
	});
	
	$('.nav-btn').click(function() {
		$(this).toggleClass('tcon-transform');
		$('.nav-container').css('height', ($(window).height() - $('#sticky-header').height())).slideToggle();
		/*$('.nav-container').niceScroll({
			cursorcolor: '#8C8C8C',
			background: '#EAEAEA',
			autohidemode: false
		});*/
	});
	
	$(window).bind('scroll', function() {
		if($(window).scrollTop() > 40)
			$('.go-down a').fadeOut('fast');
		else
			$('.go-down a').fadeIn('fast');
		
		var logoTop = $('.video-logo').offset().top + ($(window).height() / 2);
		if(logoTop >= $('header').offset().top) {
			$('.video-container .video-logo').hide();
			$('.logo-conatiner').show();
		} else {
			$('.video-logo').show();
			$('.logo-conatiner').hide();
		}
		
		if(($(window).scrollTop() + $(window).height()) >= $('.load-more').offset().top)
			$('.go-top').fadeIn();
		else
			$('.go-top').fadeOut();
	});
	$('.go-top').click(function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});
		
	var cloneItems = $('#gallery-four .grid-container').html();
	var options = {
		layoutMode: 'grid',
		rewindNav: true,
		scrollByPage: false,
		defaultFilter: '*',
		animationType: 'scaleSides',
		gapHorizontal: 40,
		gapVertical: 20,
		gridAdjustment: 'responsive',
		caption: false,
		displayType: 'bottomToTop',
		displayTypeSpeed: 200,
		mediaQueries: [{
				width: 1000,
				cols: 4
			}, {
				width: 500,
				cols: 2
			}, {
				width: 400,
				cols: 1
			}],
		// lightbox
		lightboxDelegate: '.cbp-lightbox',
		lightboxGallery: true,
		lightboxTitleSrc: 'data-title',
		lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
		
		// singlePage popup
		singlePageDelegate: '.cbp-singlePage',
		singlePageDeeplinking: true,
		singlePageStickyNavigation: true,
		singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
		
		// single page inline
		singlePageInlineDelegate: '.cbp-singlePageInline',
		singlePageInlinePosition: 'above',
		singlePageInlineInFocus: true,
		singlePageInlineCallback: function(url, element) {
			// to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
		}
	};
	
	$('#gallery-two .grid-container, #gallery-four .grid-container').cubeportfolio(options);
	options.mediaQueries = [{
			width: 1000,
			cols: 3
		}, {
			width: 500,
			cols: 2
		}, {
			width: 320,
			cols: 1
		}];
	options.gapHorizontal = 100;
	options.gapVertical = 100;
	$('#gallery-one .grid-container').cubeportfolio(options);
	
	options.mediaQueries = [{
			width: 1000,
			cols: 2
		}, {
			width: 500,
			cols: 2
		}, {
			width: 320,
			cols: 1
		}];
	options.gapHorizontal = 300;
	options.gapVertical = 300;
	//$('#gallery-three .grid-container').cubeportfolio(options);
	$('.load-more a').click(function(e) {
		e.preventDefault();
		$('#gallery-four .grid-container').cubeportfolio('appendItems', cloneItems);
	});
	try {
		$("#sticky-header").sticky({
			topSpacing: 0,
			className: 'sticky'
		});
		
	} catch (err) {
	
	}
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '/' + (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
	$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			dayNamesShort: false,
			//defaultDate: '2016-08-04',
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'All Day Event',
					start: '2016-08-01'
				},
				{
					title: 'Long Event',
					start: '2016-08-07',
					end: '2016-08-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-08-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-08-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2016-08-11',
					end: '2016-08-13'
				},
				{
					title: 'Meeting',
					start: '2016-08-12T10:30:00',
					end: '2016-08-12T12:30:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					start: '2016-08-12T12:00:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					start: '2016-08-12T14:30:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					start: '2016-08-12T17:30:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					start: '2016-08-12T20:00:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					start: '2016-08-13T07:00:00'
				},
				{
					title: 'Workshop 10:00 Drawing Comics',
					/*url: 'http://google.com/',*/
					start: '2016-08-28'
				}
			]
		});
});