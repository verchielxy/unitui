

// popupalert
function popupalert(options)
{
	var $popupalert=$(
	'<div class="popupalert">'+
		'<div class="popupalert-box">'+
			'<div class="popupalert-overlay"></div>'+
			'<div class="popupalert-container">'+
				'<div class="popupalert-body">'+
					'<div class="popupalert-icon-box">'+
					'</div>'+
					'<div class="popupalert-text-box">'+
						'<p>'+options.content+'</p>'+
					'</div>'+
					'<div class="popupalert-btn-box">'+
						'<a class="popupalert-btn popupalert-close" href="#"><i class="fa fa-times"></i></a>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>');

	var $box=$popupalert.find('.popupalert-box');
	var $overlay=$popupalert.find('.popupalert-overlay');
	var $container=$popupalert.find('.popupalert-container');
	var $body=$popupalert.find('.popupalert-body');
	var $iconBox=$popupalert.find('.popupalert-icon-box');
	var $textBox=$popupalert.find('.popupalert-text-box');
	var $btnBox=$popupalert.find('.popupalert-btn-box');

	if( options.type == 'warning' )
		$iconBox.addClass('bg-warning c-white').html('<i class="fa fa-exclamation"></i>');
	else if( options.type == 'error' )
		$iconBox.addClass('bg-danger c-white').html('<i class="fa fa-close"></i>');
	else if( options.type == 'confirm')
	{
		$iconBox.addClass('bg-info c-white').html('<i class="fa fa-question"></i>');
		$btnBox.html('<a class="popupalert-btn popupalert-sure" href="#"><i class="fa fa-check"></i></a><a class="popupalert-btn popupalert-cancl" href="#"><i class="fa fa-times"></i></a>');
	}
	else // success
		$iconBox.addClass('bg-green c-white').html('<i class="fa fa-lg fa-check"></i>');

	// 定义事件
	$popupalert.showAction=function(){
		$('body').append($popupalert);
		$(this).addClass('popupalert-open');

		$overlay.transition({'opacity': 1}, 300);

		if( options.animate=='svgDash' )
		{
			var svg_width=$container.width();
			var svg_height=$container.height();
			var perimeter=svg_width*2 + svg_height*2;
			// 调整偏移量
			perimeter+=150;

			var $svg=$(
					'<svg class="popupalert-animation-dash" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">'+
						'<rect x="0.3%" y="0.3%" rx="50" ry="50" fill="none" width="99.4%" height="99.4%" />'+
					'</svg>');

			$container.append($svg);

			$svg.find('rect').css({
				strokeDasharray: perimeter,
				strokeDashoffset: perimeter
			}).animate({strokeDashoffset: 0},650).transition({'opacity': 0, duration: 200});

			$body.delay(250).transition({'opacity': 1}, 650);
		}
		else if( options.animate=='slideUp' )
			$body.delay(250).css({'y':'600px'}).transition({'opacity':'1', 'y': '0', 'easing': 'snap', 'duration': 650 });
		else if( options.animate=='slideDown' )
			$body.delay(250).css({'y':'-200px'}).transition({'opacity':'1', 'y': '0', 'easing': 'snap', 'duration': 650 });
		else if( options.animate=='scale' )
			$body.delay(250).css({'transform':'scale(0.5)'}).transition({'opacity':'1', 'transform': 'scale(1)', 'easing': 'snap', 'duration': 650 });
		else
			$body.delay(250).animate({'opacity': 1}, 700);
	};

	$popupalert.hideAction=function(){
		$(this).fadeOut('400', function() { $(this).remove(); });
	};

	// position setting
	if(options.position) $box.css('verticalAlign',options.position);
	if(options.offset) $box.css('paddingTop',options.offset);
	if(options.maxWidth) $container.css('maxWidth',options.maxWidth);
	if(options.overlayBg) $overlay.css('backgroundColor',options.overlayBg);

	// 绑定事件
	$popupalert.find('.popupalert-close').click(function(event) { event.preventDefault(); $popupalert.hideAction(); });
	if( options.type != 'confirm')
		$overlay.click(function(event) { $popupalert.hideAction(); });
	$('body').keyup(function(event){ if(event.which == 27) $popupalert.hideAction(); });
	
	$popupalert.find('.popupalert-sure').click(function(event) {
		$popupalert.hideAction();
		options.confirmCallback(1);
	});
	$popupalert.find('.popupalert-cancl').click(function(event) {
		$popupalert.hideAction();
		options.confirmCallback(0);
	});

	// showAction
	$popupalert.showAction();

	// autoClose
	if( options.autoClose )
	{
		var timer=setTimeout(function(){
			$popupalert.hideAction();

			clearTimeout(timer);
		}, options.autoClose);
	}
}

// svgloader
function svgloader(options)
{
	var defaultOptions={
		type : 'gears',
		width : 200,
		height : 200,
		fill : '#ffffff',
	};

	var options=$.extend(defaultOptions,options);

	switch (options.type)
	{
		case 'gears':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gears"> <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect> <g transform="translate(-20,-20)"> <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"> <animateTransform attributeName="transform" type="rotate" from="90 50 50" to="0 50 50" dur="1s" repeatCount="indefinite"></animateTransform> </path> </g> <g transform="translate(20,20) rotate(15 50 50)"> <path d="M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"> <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform> </path> </g> </svg>';
			break;
		case 'audio':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg"> <g transform="matrix(1 0 0 -1 0 80)"> <rect width="10" height="20" rx="3"> <animate attributeName="height"begin="0s" dur="4.3s"values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="15" width="10" height="80" rx="3"> <animate attributeName="height"begin="0s" dur="2s"values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" width="10" height="50" rx="3"> <animate attributeName="height"begin="0s" dur="1.4s"values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="45" width="10" height="30" rx="3"> <animate attributeName="height"begin="0s" dur="2s"values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"repeatCount="indefinite" /> </rect> </g> </svg>';
			break;
		case 'ball-triangle':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle cx="5" cy="50" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"values="50;5;50;50"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"begin="0s" dur="2.2s"values="5;27;49;5"calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="5" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"from="5" to="5"values="5;50;50;5"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"begin="0s" dur="2.2s"from="27" to="27"values="27;49;5;27"calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="49" cy="50" r="5"> <animate attributeName="cy"begin="0s" dur="2.2s"values="50;50;5;50"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="cx"from="49" to="49"begin="0s" dur="2.2s"values="49;5;27;49"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'bars':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg"> <rect y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="60" width="15" height="140" rx="6"> <animate attributeName="height"begin="0s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="90" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="120" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> </svg>';
			break;
		case 'circles':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg"> <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"> <animateTransform attributeName="transform"type="rotate"from="0 67 67"to="-360 67 67"dur="2.5s"repeatCount="indefinite"/> </path> <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"> <animateTransform attributeName="transform"type="rotate"from="0 67 67"to="360 67 67"dur="8s"repeatCount="indefinite"/> </path> </svg>';
			break;
		case 'grid':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg"> <circle cx="12.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="0s" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="100ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="300ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity"begin="600ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity"begin="800ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity"begin="400ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="12.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="700ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="52.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="500ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="92.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity"begin="200ms" dur="1s"values="1;.2;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
			break;
		case 'hearts':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg"> <path d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="0s" dur="1.4s"values="0.5;1;0.5"calcMode="linear"repeatCount="indefinite" /> </path> <path d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" fill-opacity=".5"> <animate attributeName="fill-opacity"begin="0.7s" dur="1.4s"values="0.5;1;0.5"calcMode="linear"repeatCount="indefinite" /> </path> <path d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" /> </svg>';
			break;
		case 'oval':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="1s"repeatCount="indefinite"/> </path> </g> </g> </svg>';
			break;
		case 'puff':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="0s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="0s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="-0.9s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="-0.9s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> </g> </svg>';
			break;
		case 'rings':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" stroke="'+options.fill+'" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="1.5s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="1.5s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="1.5s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="3s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="3s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="3s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="8"> <animate attributeName="r"begin="0s" dur="1.5s"values="6;1;2;3;4;5;6"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </svg>';
			break;
		case 'spinning-circles':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"> <g fill="none" fill-rule="evenodd"> <g transform="translate(2 1)" stroke="'+options.fill+'" stroke-width="1.5"> <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="1;0;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;1;0;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;1;0;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;1;0;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;1;0;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;1;0;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;1;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="27" cy="5" r="5" fill-opacity="0" fill="'+options.fill+'"> <animate attributeName="fill-opacity"begin="0s" dur="1.3s"values="0;0;0;0;0;0;0;1" calcMode="linear"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'tail-spin':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"> <stop stop-color="'+options.fill+'" stop-opacity="0" offset="0%"/> <stop stop-color="'+options.fill+'" stop-opacity=".631" offset="63.146%"/> <stop stop-color="'+options.fill+'" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </path> <circle fill="'+options.fill+'" cx="36" cy="18" r="1"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
			break;
		case 'three-dots':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" fill="'+options.fill+'" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg"> <circle cx="15" cy="15" r="15"> <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="60" cy="15" r="9" fill-opacity="0.3"> <animate attributeName="r" from="9" to="9"begin="0s" dur="0.8s"values="9;15;9" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="0.5" to="0.5"begin="0s" dur="0.8s"values=".5;1;.5" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="105" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
			break;
		case 'squares':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-squares"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="15" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.0s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.125s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="15" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.25s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="40" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.875s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="40" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.375" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.75s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.625s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="65" width="20" height="20" fill="'+options.fill+'" class="sq"><animate attributeName="fill" from="'+options.fill+'" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.5s" values="#00cde8;#00cde8;'+options.fill+';'+options.fill+'" keyTimes="0;0.1;0.2;1"></animate></rect></svg>';
			break;
		case 'gear':	
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gear"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M75,50.5l5-1.5c-0.1-2.2-0.4-4.3-0.9-6.3l-5.2-0.1c-0.2-0.6-0.4-1.1-0.6-1.7l4-3.3c-0.9-1.9-2-3.8-3.2-5.5L69.2,34 c-0.4-0.5-0.8-0.9-1.2-1.3l2.4-4.6c-1.6-1.4-3.3-2.7-5.1-3.8l-3.7,3.6c-0.5-0.3-1.1-0.5-1.6-0.8l0.5-5.2c-2-0.7-4-1.3-6.2-1.6 l-2.1,4.8c-0.6-0.1-1.2-0.1-1.8-0.1l-1.5-5c-2.2,0.1-4.3,0.4-6.3,0.9l-0.1,5.2c-0.6,0.2-1.1,0.4-1.7,0.6l-3.3-4 c-1.9,0.9-3.8,2-5.5,3.2l1.9,4.9c-0.5,0.4-0.9,0.8-1.3,1.2l-4.6-2.4c-1.4,1.6-2.7,3.3-3.8,5.1l3.6,3.7c-0.3,0.5-0.5,1.1-0.8,1.6 l-5.2-0.5c-0.7,2-1.3,4-1.6,6.2l4.8,2.1c-0.1,0.6-0.1,1.2-0.1,1.8l-5,1.5c0.1,2.2,0.4,4.3,0.9,6.3l5.2,0.1c0.2,0.6,0.4,1.1,0.6,1.7 l-4,3.3c0.9,1.9,2,3.8,3.2,5.5l4.9-1.9c0.4,0.5,0.8,0.9,1.2,1.3l-2.4,4.6c1.6,1.4,3.3,2.7,5.1,3.8l3.7-3.6c0.5,0.3,1.1,0.5,1.6,0.8 l-0.5,5.2c2,0.7,4,1.3,6.2,1.6l2.1-4.8c0.6,0.1,1.2,0.1,1.8,0.1l1.5,5c2.2-0.1,4.3-0.4,6.3-0.9l0.1-5.2c0.6-0.2,1.1-0.4,1.7-0.6 l3.3,4c1.9-0.9,3.8-2,5.5-3.2L66,69.2c0.5-0.4,0.9-0.8,1.3-1.2l4.6,2.4c1.4-1.6,2.7-3.3,3.8-5.1l-3.6-3.7c0.3-0.5,0.5-1.1,0.8-1.6 l5.2,0.5c0.7-2,1.3-4,1.6-6.2l-4.8-2.1C74.9,51.7,75,51.1,75,50.5z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15 C65,58.3,58.3,65,50,65z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></svg>';
			break;
		case 'cube':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-cube"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(25 25)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.9" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 25)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.8" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.1s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(25 75)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.7" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.3s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g><g transform="translate(75 75)"><rect x="-20" y="-20" width="40" height="40" fill="'+options.fill+'" opacity="0.6" class="cube"><animateTransform attributeName="transform" type="scale" from="1.5" to="1" repeatCount="indefinite" begin="0.2s" dur="1s" calcMode="spline" keySplines="0.2 0.8 0.2 0.8" keyTimes="0;1"></animateTransform></rect></g></svg>';
			break;
		case 'battery':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-battery"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M65,19v-6c0-3.3-2.7-6-6-6H41c-3.3,0-6,2.7-6,6v6H65z" fill="'+options.fill+'"></path><path d="M76,17H24.1c-2.3,0-4.1,1.8-4.1,4v70c0,2.2,1.9,4,4.1,4H76c2.3,0,4-1.8,4-4V21C80,18.8,78.3,17,76,17z M72,29v54v4h-4.3 H32.4H28v-4V29v-4h4.4h35.3H72V29z" fill="'+options.fill+'"></path><rect x="35" y="72" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.1;0.3;1"></animate></rect><rect x="35" y="58" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.3;0.5;1"></animate></rect><rect x="35" y="44" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.5;0.7;1"></animate></rect><rect x="35" y="30" width="30" height="10" fill="'+options.fill+'"><animate attributeName="opacity" from="0" to="1" dur="2s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.7;0.9;1"></animate></rect></svg>';
			break;
		case 'clock':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-clock"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="30" fill="none" stroke="'+options.fill+'" stroke-width="8px"></circle><line x1="50" y1="50" x2="50" y2="30" stroke="'+options.fill+'" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite"></animateTransform></line><line x1="50" y1="50" x2="50" y2="20" stroke="'+options.fill+'" stroke-width="2px" stroke-linecap="round" opacity="1"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"></animateTransform></line></svg>';
			break;
		case 'magnify':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-magnify"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g><circle fill="none" cx="47" cy="47" r="20" opacity="0.5"></circle><path d="M77.5,69.3l-6.2-6.2c-0.7-0.7-1.3-1.2-1.9-1.6c2.6-4,4.1-8.8,4.1-14c0-14.4-11.7-26.1-26.1-26.1S21.3,33.2,21.3,47.5 S33,73.6,47.4,73.6c5.4,0,10.4-1.6,14.5-4.4c0.5,0.7,1.1,1.4,1.9,2.2l5.8,5.8c2.9,2.9,7.1,3.5,9.2,1.3C81,76.4,80.4,72.2,77.5,69.3z M47.4,66.2c-10.3,0-18.7-8.4-18.7-18.6s8.4-18.6,18.7-18.6s18.7,8.4,18.7,18.6S57.7,66.2,47.4,66.2z" fill="'+options.fill+'"></path><animateTransform attributeName="transform" type="translate" from="15 15" to="15 15" dur="1s" repeatCount="indefinite" values="15 15;-15 15;0 -10.98;15 15" keyTimes="0;0.33;0.66;1"></animateTransform></g></svg>';
			break;
		case 'gps':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gps"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="20" fill="'+options.fill+'"><animate attributeName="opacity" from="1" to="1" dur="1s" repeatCount="indefinite" values="1;1;0;0;1" keyTimes="0;0.4;0.5;0.9;1"></animate></circle><path d="M90,45h-1.3C86.4,27.5,72.5,13.6,55,11.3V10c0-2.8-2.2-5-5-5s-5,2.2-5,5v1.3C27.5,13.6,13.6,27.5,11.3,45H10 c-2.8,0-5,2.2-5,5s2.2,5,5,5h1.3C13.6,72.5,27.5,86.4,45,88.7V90c0,2.8,2.2,5,5,5s5-2.2,5-5v-1.3C72.5,86.4,86.4,72.5,88.7,55H90 c2.8,0,5-2.2,5-5S92.8,45,90,45z M55,80.6V80c0-2.8-2.2-5-5-5s-5,2.2-5,5v0.6C31.9,78.5,21.5,68.1,19.4,55H20c2.8,0,5-2.2,5-5 s-2.2-5-5-5h-0.6C21.5,31.9,31.9,21.5,45,19.4V20c0,2.8,2.2,5,5,5s5-2.2,5-5v-0.6C68.1,21.5,78.5,31.9,80.6,45H80c-2.8,0-5,2.2-5,5 s2.2,5,5,5h0.6C78.5,68.1,68.1,78.5,55,80.6z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite" values="0 50 50;90 50 50;90 50 50" keyTimes="0;0.5;1"></animateTransform></path></svg>';
			break;
		case 'ball':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ball"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(50 50)"><g><circle cx="0" cy="0" r="15" fill="'+options.fill+'" transform=""><animate attributeName="cy" calcMode="spline" dur="1s" repeatCount="indefinite" from="30" to="30" values="30;-30;30" keySplines="0.4 0.8 0.4 0.8;0.8 0.4 0.8 0.4" keyTimes="0;0.5;1"></animate></circle><animateTransform  type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"></animateTransform></g></g></svg>';
			break;
		case 'infinity':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" xmlns:xlink="http://www.w3.org/1999/xlink" class="uil-inf"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path id="uil-inf-path" d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z" fill="none" stroke="'+options.fill+'" stroke-width="1px" stroke-dasharray="5px"></path><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.12s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.25s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.37s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle><circle cx="0" cy="0" r="5" fill="'+options.fill+'"><animateMotion begin="0.5s" dur="1.5s" repeatCount="indefinite"><mpath xlink:href="#uil-inf-path"></mpath></animateMotion></circle></svg>';
			break;
		case 'triangle':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-triangle"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M34.5,52.4c-0.8,1.4-2.2,1.4-3,0L17.2,27.6C16.4,26.2,17,25,18.7,25h28.6c1.6,0,2.3,1.2,1.5,2.6L34.5,52.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 33 35" to="120 33 35" repeatCount="indefinite" dur="1s"></animateTransform></path><path d="M68.5,52.4c-0.8,1.4-2.2,1.4-3,0L51.2,27.6C50.4,26.2,51,25,52.7,25h28.6c1.7,0,2.3,1.2,1.5,2.6L68.5,52.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 67 35" to="120 67 35" repeatCount="indefinite" dur="1s"></animateTransform></path><path d="M51.5,82.4c-0.8,1.4-2.2,1.4-3,0L34.2,57.6C33.4,56.2,34,55,35.7,55h28.6c1.7,0,2.3,1.2,1.5,2.6L51.5,82.4z" fill="'+options.fill+'"><animateTransform attributeName="transform" type="rotate" from="0 50 65" to="120 50 65" repeatCount="indefinite" dur="1s"></animateTransform></path></svg>';
			break;	
		case 'ring-alt':
			var svg='<svg width="'+options.width+'" height="'+options.height+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring-alt"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="none" fill="none" stroke-width="10" stroke-linecap="round"></circle><circle cx="50" cy="50" r="40" stroke="'+options.fill+'" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg>';
			break;
	}

	return svg;
}

// pageloading
function pageloading(options)
{
	var defaultOptions={
		loader : 'gears',
		length : 200,
		backgroundColor : 'rgb(26, 188, 156)',
	};

	var options=$.extend(defaultOptions,options);

	var $overlay=$(
		'<div class="display-table" id="load-overlay">'+
			'<div class="display-tablecell center">'+
				svgloader({type:options.loader})+
			'</div>'+
		'</div>').css({
			position: 'fixed',
			left: 0,
			top: 0,
			zIndex: 999,
			height: '100%',
			width: '100%',
			backgroundColor: options.backgroundColor,
		});

	$(function(){
		$('body').prepend($overlay);
	});

	$(window).load(function() {
		$overlay.fadeOut(800,function(){
			$(this).remove();
		});
	});
}



// other plugin
(function($){
	var buttonLoading = function(element, options) {
		this.init('buttonLoading', element, options);
	};

	buttonLoading.VERSION = '1.0.0';

	buttonLoading.DEFAULTS = {
    	svg: 'oval',
    	animate: 'fade',
    	disabled: true,
    };

    buttonLoading.prototype.init = function(type, element, options) {
    	this.$element = $(element);
    	this.options = this.getOptions(options);

    	switch (this.options.svg) 
    	{
    		case 'puff':
        		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="0s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="0s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r"begin="-0.9s" dur="1.8s"values="1; 20"calcMode="spline"keyTimes="0; 1"keySplines="0.165, 0.84, 0.44, 1"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="-0.9s" dur="1.8s"values="1; 0"calcMode="spline"keyTimes="0; 1"keySplines="0.3, 0.61, 0.355, 1"repeatCount="indefinite" /> </circle> </g> </svg>';
	    		break;
	    	case 'bars':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="#fff"> <rect y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="30" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="60" width="15" height="140" rx="6"> <animate attributeName="height"begin="0s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="90" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.25s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.25s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> <rect x="120" y="10" width="15" height="120" rx="6"> <animate attributeName="height"begin="0.5s" dur="1s"values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="y"begin="0.5s" dur="1s"values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"repeatCount="indefinite" /> </rect> </svg>';
	    		break;
	    	case 'rings':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2"> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="1.5s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="1.5s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="1.5s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="6" stroke-opacity="0"> <animate attributeName="r"begin="3s" dur="3s"values="6;22"calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-opacity"begin="3s" dur="3s"values="1;0" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="stroke-width"begin="3s" dur="3s"values="2;0" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="22" cy="22" r="8"> <animate attributeName="r"begin="0s" dur="1.5s"values="6;1;2;3;4;5;6"calcMode="linear"repeatCount="indefinite" /> </circle> </g> </svg>';
	    		break;
	    	case 'tail-spin':
	    		this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"> <stop stop-color="#fff" stop-opacity="0" offset="0%"/> <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/> <stop stop-color="#fff" offset="100%"/> </linearGradient> </defs> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </path> <circle fill="#fff" cx="36" cy="18" r="1"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="0.9s"repeatCount="indefinite" /> </circle> </g> </g> </svg>';
	    		break;
	    	case 'three-dots':
	    		this.svg='<svg style="width:auto;height:100%;padding:5px 0;" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff"> <circle cx="15" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="60" cy="15" r="9" fill-opacity="0.3"> <animate attributeName="r" from="9" to="9"begin="0s" dur="0.8s"values="9;15;9" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="0.5" to="0.5"begin="0s" dur="0.8s"values=".5;1;.5" calcMode="linear"repeatCount="indefinite" /> </circle> <circle cx="105" cy="15" r="15"> <animate attributeName="r" from="15" to="15"begin="0s" dur="0.8s"values="15;9;15" calcMode="linear"repeatCount="indefinite" /> <animate attributeName="fill-opacity" from="1" to="1"begin="0s" dur="0.8s"values="1;.5;1" calcMode="linear"repeatCount="indefinite" /> </circle> </svg>';
	    		break;
	    	case 'gear':
	    		this.svg='<svg style="width:auto;height:100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-gear"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><path d="M75,50.5l5-1.5c-0.1-2.2-0.4-4.3-0.9-6.3l-5.2-0.1c-0.2-0.6-0.4-1.1-0.6-1.7l4-3.3c-0.9-1.9-2-3.8-3.2-5.5L69.2,34 c-0.4-0.5-0.8-0.9-1.2-1.3l2.4-4.6c-1.6-1.4-3.3-2.7-5.1-3.8l-3.7,3.6c-0.5-0.3-1.1-0.5-1.6-0.8l0.5-5.2c-2-0.7-4-1.3-6.2-1.6 l-2.1,4.8c-0.6-0.1-1.2-0.1-1.8-0.1l-1.5-5c-2.2,0.1-4.3,0.4-6.3,0.9l-0.1,5.2c-0.6,0.2-1.1,0.4-1.7,0.6l-3.3-4 c-1.9,0.9-3.8,2-5.5,3.2l1.9,4.9c-0.5,0.4-0.9,0.8-1.3,1.2l-4.6-2.4c-1.4,1.6-2.7,3.3-3.8,5.1l3.6,3.7c-0.3,0.5-0.5,1.1-0.8,1.6 l-5.2-0.5c-0.7,2-1.3,4-1.6,6.2l4.8,2.1c-0.1,0.6-0.1,1.2-0.1,1.8l-5,1.5c0.1,2.2,0.4,4.3,0.9,6.3l5.2,0.1c0.2,0.6,0.4,1.1,0.6,1.7 l-4,3.3c0.9,1.9,2,3.8,3.2,5.5l4.9-1.9c0.4,0.5,0.8,0.9,1.2,1.3l-2.4,4.6c1.6,1.4,3.3,2.7,5.1,3.8l3.7-3.6c0.5,0.3,1.1,0.5,1.6,0.8 l-0.5,5.2c2,0.7,4,1.3,6.2,1.6l2.1-4.8c0.6,0.1,1.2,0.1,1.8,0.1l1.5,5c2.2-0.1,4.3-0.4,6.3-0.9l0.1-5.2c0.6-0.2,1.1-0.4,1.7-0.6 l3.3,4c1.9-0.9,3.8-2,5.5-3.2L66,69.2c0.5-0.4,0.9-0.8,1.3-1.2l4.6,2.4c1.4-1.6,2.7-3.3,3.8-5.1l-3.6-3.7c0.3-0.5,0.5-1.1,0.8-1.6 l5.2,0.5c0.7-2,1.3-4,1.6-6.2l-4.8-2.1C74.9,51.7,75,51.1,75,50.5z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15 C65,58.3,58.3,65,50,65z" fill="#ffffff"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="90 50 50" dur="1s" repeatCount="indefinite"></animateTransform></path></svg>';
     			break;
    		default:
				this.svg='<svg style="width:auto;height:100%;" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform"type="rotate"from="0 18 18"to="360 18 18"dur="1s"repeatCount="indefinite"/> </path> </g> </g> </svg> ';
    			break;
    	}

    	this.text=this.$element.text();

    	this.$svgBox=$('<span class="btnloading-svg-box">'+this.svg+'</span>').css({
    		display: 'inline-block',
			position: 'absolute',
			left: '0',
			top: '0',
			width: '100%',
			height: this.$element.outerHeight(),
			textAlign: 'center',
			padding: '5px 0',
    	});

    	this.$contentBox=$('<span class="btnloading-content-box">'+this.text+'</span>').css({
    		display: 'inline-block',
    	});

    	this.$element.css({
  			position: 'relative',
  			overflow: 'hidden',
  		}).html( this.$contentBox );
    };

    buttonLoading.prototype.getDefaults = function() {
    	return buttonLoading.DEFAULTS;
	};

	buttonLoading.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);

        return options;
    };

	buttonLoading.prototype.start = function() {
		this.$element.append( this.$svgBox );

		if(this.options.disabled)
			this.$element.prop('disabled', true);

		switch (this.options.animate) 
		{
			case 'slide':
				this.$contentBox.css({y: 0}).transition({y: 40});
			this.$svgBox.css({y: -40}).transition({y: 0});
				break;
			case 'scale':
				this.$contentBox.css({scale: [1,1]}).transition({scale: [0,0]});
			this.$svgBox.css({scale: [0,0]}).transition({scale: [1,1]});
				break;
				
			default:
				this.$contentBox.css({opacity: 1}).transition({opacity: 0});
			this.$svgBox.css({opacity: 0}).transition({opacity: 1});
				break;
		}
	};

	buttonLoading.prototype.end = function() {
		switch (this.options.animate) 
		{
			case 'slide':
			this.$contentBox.css({y: 40}).transition({y: 0});
			this.$svgBox.css({y: 0}).transition({y: -40});
				break;
			case 'scale':
				this.$contentBox.css({scale: [0,0]}).transition({scale: [1,1]});
			this.$svgBox.css({scale: [1,1]}).transition({scale: [0,0]});
				break;

			default:
				this.$svgBox.css({opacity: 1}).transition({opacity: 0});
			this.$contentBox.css({opacity: 0}).transition({opacity: 1});
				break;
		}

		if(this.options.disabled)
			this.$element.prop('disabled', false);
	};


	function Plugin(option) {
    	return this.each(function() {
    		var $this = $(this);
        	var data = $this.data('unit.buttonLoading');
        	var options = typeof option == 'object' && option;

        	if (!data && /destroy|hide/.test(option)) 
        		return;

        	if (!data)
        		$this.data('unit.buttonLoading', (data = new buttonLoading(this, options)));
        	
        	if (typeof option == 'string') 
        		data[option]();
    	});
	};

	var old = $.fn.buttonLoading;

	$.fn.buttonLoading = Plugin;
	$.fn.buttonLoading.Constructor = buttonLoading;

	$.fn.buttonLoading.noConflict = function() {
    	$.fn.buttonLoading = old;
    	return this;
	}

})(jQuery);



// ready function
function ready(){

	$('body').on('click','.img_refresh',function(){
	    var $refreshEle=$($(this).data('refresh')),
	        originImgSrc=$refreshEle.data('originImgSrc');

	    if(!originImgSrc)
	    {
	        originImgSrc=$refreshEle.attr('src');
	        $refreshEle.data('originImgSrc',originImgSrc); 
	    }

	    $refreshEle.attr('src',originImgSrc+'?v='+Math.random()); 
	})

	$('body').on('mouseover mouseout','.img_hover',function(){
	    var tagName=$(this).prop("tagName");

	    if(tagName=='A')
	    {
	        var $imgs=$(this).find('img');
	        
	        $imgs.each(function(index, el) {
	            var dataImg=$(this).data('hover'),
	                img=$(this).attr('src');

	            $(this).attr('src',dataImg).data('hover',img);
	        });
	    }
	    else if(tagName=='IMG')
	    {
	        var dataImg=$(this).data('hover'),
	            img=$(this).attr('src');

	        $(this).attr('src',dataImg).data('hover',img);
	    }
	})

	$('body').on('focusin', '.input-group-inner input.form-control', function(event) {
		var $parent=$(this).closest('.input-group-inner');

		$parent.addClass('focus');   	
	});

	$('body').on('focusout', '.input-group-inner input.form-control', function(event) {
		var $parent=$(this).closest('.input-group-inner');

		$parent.removeClass('focus');
	});

	$('i.loader').each(function(index, el) {
		var $this=$(el);

		$(this).css({
			width : $this.attr('width'),
			height : $this.attr('height'),
			display : 'inline-block',
		}).append(svgloader({
			type : $this.attr('rel'),
			fill : $this.attr('fill'),
			width : '100%',
			height : '100%',
		}));
	});

	$.fn.dropdown.Constructor.prototype.change = function(e){
	    e.preventDefault();
	    var $item = $(e.target), $select, $checked = false, $menu, $label;
	    !$item.is('a') && ($item = $item.closest('a'));
	    $menu = $item.closest('.dropdown-menu');
	    $label = $menu.parent().find('.dropdown-label');
	    $labelHolder = $label.text();
	    $select = $item.parent().find('input');
	    $checked = $select.is(':checked');

	    if($select.is(':disabled')) 
	        return;

	    if($select.attr('type') == 'radio' && $checked) 
	        return;
	    if($select.attr('type') == 'radio') 
	        $menu.find('li').removeClass('active');

	    $item.parent().removeClass('active');
	    !$checked && $item.parent().addClass('active');
	    $select.prop("checked", !$select.prop("checked"));

	    $items = $menu.find('li > input:checked');
	    if ($items.length) 
	    {
	        $text = [];
	        $items.each(function () {
	            var $str = $(this).parent().text();
	            $str && $text.push($.trim($str));
	        });

	        $text = $text.length < 4 ? $text.join(', ') : $text.length + ' selected';
	        $label.html($text);
	    }
	    else
	    {
	        $label.html($label.data('placeholder'));
	    }
	}

	$(document).on('click.dropdown-menu', '.dropdown-select > li > a', $.fn.dropdown.Constructor.prototype.change);


}

ready();

