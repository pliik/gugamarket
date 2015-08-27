function changeBackground() {
	var path = '/images/bgpics-small/';
	var images = [
	"city-group-hip-hop-1370-830x550.jpg",
	"bicycle-bike-driving-526-825x550.jpg",
"bird-bird-house-flight-854-828x550.jpg",
'animal-dog-funny-1173-825x550.jpg',
//'animal-hippo-hippopotamus-2457-825x550.jpg',
//'animals-hill-sheep-2404-733x550.jpg',
//'artist-circus-clown-476-825x550.jpg',
'bar-chat-chatting-2286-825x550.jpg',
'bicycle-bike-eco-22424-825x550.jpg',
'boat-sail-sailboat-2447-825x550.jpg',
'california-fun-holiday-572-830x550.jpg',
//'chalk-dust-finger-2296-770x550.jpg',
//'clown-crazy-emotions-1990-945x550.jpg',
//'crazy-emotion-face-2015-825x550.jpg',
//'eat-food-grimace-2261-825x550.jpg',
//'fashion-girl-hat-1654-825x550.jpg',
//'freedom-fun-girl-2201-824x550.jpg',
'funny-launderette-laundromat-2371-825x550.jpg',
'garden-gardening-growth-2259-825x550.jpg'
/*
	'animal-dog-funny-1173.jpg',
	'bird-bird-house-flight-854.jpg',
	'black-and-white-classic-concert-1601.jpg',
	'clown-crazy-emotions-1990.jpg',
	'crazy-emotion-face-2015.jpg',
	'fashion-girl-hat-1654.jpg'*/
	];
	$('#loading-mask').css({'background-image': 'url(' + path 
		+ (images[Math.floor(Math.random() * images.length)] ) + ')'});

	// window.setTimeout(changeBackground, 15000);

	BackgroundCheck.init({
	  targets: '.lettering',
	  images: '#loading-mask'
	});

	$.adaptiveBackground.run({

		cb : function(){

			$(".lettering").css('backgroundColor',$("#loading-mask").css('backgroundColor'));
		}
	});
	
}


