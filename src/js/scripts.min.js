function Slider (settings) {

	// Privates methods and properties

	var private = {};

	// Private properties

	private.settings = settings;

	private.select = {
		main: document.querySelector(private.settings.main),
		wrapper: document.querySelector(private.settings.wrapper),
		margin: private.settings.margin,
		current: private.settings.current
	};

	
	private.isTransitionEnd = false;

	/*Constructor*/
		// clone 1 and 2 elem to the end of wrapper
		// clone last and pre-last elem to the start of wrapper

	private.select.wrapper.appendChild(private.select.wrapper.children[0].cloneNode(true));
	private.select.wrapper.appendChild(private.select.wrapper.children[1].cloneNode(true));
	private.select.wrapper.insertBefore(private.select.wrapper.children[private.select.wrapper.children.length - 3].cloneNode(true), private.select.wrapper.firstChild);
	private.select.wrapper.insertBefore(private.select.wrapper.children[private.select.wrapper.children.length - 4].cloneNode(true), private.select.wrapper.firstChild);

	// Vars


	var slideIndex = 2,
		slidesLength = private.select.wrapper.children.length;
		realFirstElem = private.select.wrapper.children[2],
		realLastElem = private.select.wrapper.children[slidesLength - 3],
		firstElemCloneIndex = slidesLength - 2,
		lastElemCloneIndex = 1,
		gutter = private.select.margin * 2
		slideWidth = private.select.wrapper.firstChild.offsetWidth,
		slideWidthFull = slideWidth + gutter,
		slideOffsetWidth =  (innerWidth - slideWidthFull) / 2;
		
	

	

	private.sliderInit = function() {
		// Disable animation at initiation and add gutter
		private.select.wrapper.classList.add('no-transition');

		for(var i = 0; i < slidesLength; i++) {
			private.select.wrapper.children[i].style.margin = `0 ${private.select.margin}px`;
			private.select.wrapper.children[i].classList.add('no-transition');
		}

		slideIndex = private.select.current;

		// Moves slider to the start position and adds nav classes for controls

		private.select.wrapper.style.transform = `translateX(-${ slideWidthFull * slideIndex - slideOffsetWidth }px)`;
		
		private.select.wrapper.children[slideIndex].classList.add('current-slide');
		private.select.wrapper.children[slideIndex - 1].classList.add('prev-slide');
		private.select.wrapper.children[slideIndex + 1].classList.add('next-slide');
		

		// Marks transition end as true

		private.isTransitionEnd = true;

		console.log('slideWidthFull = ' + slideWidthFull);
		console.log('slideWidth = ' + slideWidth);
		console.log('slideIndex = ' + slideIndex);
		console.log('slideOffsetWidth = ' + slideOffsetWidth);
		console.log('result = ' + (slideWidthFull * slideIndex - slideOffsetWidth));

	}

	// Public methods

	this.wrap = private.select.wrapper;

	this.nextSlide = function() {
		if ( ! private.isTransitionEnd) {
			return;
		}

		private.isTransitionEnd = false;

		if (slideIndex < slidesLength) {
			++slideIndex;
		}

		private.select.wrapper.classList.remove('no-transition');
		for (var i = 0; i < slidesLength; i++) {
			private.select.wrapper.children[i].classList.remove('no-transition');
		}
		
		
		private.select.wrapper.style.transform = `translateX(-${ slideWidthFull * slideIndex - slideOffsetWidth }px)`;

		private.select.wrapper.addEventListener('transitionend', function() {
			if (slideIndex >= firstElemCloneIndex) {

				private.select.wrapper.classList.add('no-transition');
				slideIndex = 2;
				private.select.wrapper.style.transform = `translateX(-${ slideWidthFull * slideIndex - slideOffsetWidth }px)`;
				private.select.wrapper.children[slideIndex].classList.add('current-slide');
				private.select.wrapper.children[slideIndex - 1].classList.add('prev-slide');
				private.select.wrapper.children[slideIndex + 1].classList.add('next-slide');		
			
			}
			
			private.isTransitionEnd = true;

			});

		for (var i = 0; i < slidesLength; i++) {
			private.select.wrapper.children[i].classList.remove('current-slide');
			private.select.wrapper.children[i].classList.remove('next-slide');
			private.select.wrapper.children[i].classList.remove('prev-slide');
		}

		private.select.wrapper.children[slideIndex].classList.add('current-slide');
		private.select.wrapper.children[slideIndex - 1].classList.add('prev-slide');
		private.select.wrapper.children[slideIndex + 1].classList.add('next-slide');

		// to avoid glitchs with enable/disable transitions we should use these checkings

		if (slideIndex === firstElemCloneIndex) {
			realFirstElem.classList.add('scaled-slide');
		} else {
			realFirstElem.classList.remove('scaled-slide');
		}

		if (slideIndex === lastElemCloneIndex) {
			realLastElem.classList.add('scaled-slide');
		} else {
			realLastElem.classList.remove('scaled-slide');
		}

	}

	this.prevSlide = function() {
		if ( ! private.isTransitionEnd) {
			return;
		}

		private.isTransitionEnd = false;

		if (slideIndex >= lastElemCloneIndex) {
			--slideIndex;
		}

		private.select.wrapper.classList.remove('no-transition');
		for (var i = 0; i < slidesLength; i++) {
			private.select.wrapper.children[i].classList.remove('no-transition');
		}

		private.select.wrapper.style.transform = `translateX(-${ slideWidthFull * slideIndex - slideOffsetWidth }px)`;

		private.select.wrapper.addEventListener('transitionend', function() {
			if (slideIndex === lastElemCloneIndex) {

				private.select.wrapper.classList.add('no-transition');
				slideIndex = slidesLength - 3;
				private.select.wrapper.style.transform = `translateX(-${ slideWidthFull * slideIndex - slideOffsetWidth }px)`;
				private.select.wrapper.children[slideIndex].classList.add('current-slide');
				private.select.wrapper.children[slideIndex - 1].classList.add('prev-slide');
				private.select.wrapper.children[slideIndex + 1].classList.add('next-slide');		
			
			}
			
			private.isTransitionEnd = true;

		});

		for (var i = 0; i < slidesLength; i++) {
			private.select.wrapper.children[i].classList.remove('current-slide');
			private.select.wrapper.children[i].classList.remove('next-slide');
			private.select.wrapper.children[i].classList.remove('prev-slide');
		}

		private.select.wrapper.children[slideIndex].classList.add('current-slide');
		private.select.wrapper.children[slideIndex - 1].classList.add('prev-slide');
		private.select.wrapper.children[slideIndex + 1].classList.add('next-slide');

		// to avoid glitchs with enable/disable transitions we should use these checkings

		if (slideIndex === firstElemCloneIndex) {
			realFirstElem.classList.add('scaled-slide');
		} else {
			realFirstElem.classList.remove('scaled-slide');
		}

		if (slideIndex === lastElemCloneIndex) {
			realLastElem.classList.add('scaled-slide');
		} else {
			realLastElem.classList.remove('scaled-slide');
		}
	}

	private.refresh = function() {
		slideWidth = private.select.wrapper.firstChild.offsetWidth,
		slideWidthFull = slideWidth + gutter,
		slideOffsetWidth =  (innerWidth - slideWidthFull) / 2;

		return slideWidth, slideWidthFull, slideOffsetWidth, slideIndex;

	}

	// Controls

	

	private.sliderInit();

	/*window.addEventListener('resize', function() {
		private.refresh();
		private.sliderInit();
	});*/
}

// Enable dullscreen slider


var sliderr = document.querySelector('.slider'),
    sliderItems = document.querySelector('.slider__item'),
    sliderWraps = document.querySelector('.slider__wrapper'),
    sliderImgs = document.querySelectorAll('.slider__img'),
    cancel = document.querySelectorAll('.slider__cancel'),
    controlsBox = document.querySelector('.slider__controls'),
    FSS = {};
	

for ( var i = 0; i < sliderImgs.length; i++) {
  sliderImgs[i].onclick = getSlider;
}

for ( var i = 0; i < cancel.length; i++) {
  cancel[i].onclick = closeSlides;
}



function getSlider(){
		
  var context = this,
  contextColl = context.parentNode.children,
  contextArray = Array.prototype.slice.call(contextColl),
  index = contextArray.indexOf(context);

  sliderr.style.position = 'static';
  this.parentNode.parentNode.classList.add('fullscreenSlider');
  this.parentNode.classList.add('fullscreenSlider__wrap');
  addClasses();

  FSS = new Slider({
    main: ".fullscreenSlider",
    wrapper: ".fullscreenSlider__wrap",
    margin: 40,
    current: index + 2
  });

  for (i = 0; i < FSS.wrap.children.length; i++) {
    FSS.wrap.children[i].onclick = function(){
      if (this.classList.contains('next-slide')) {
        FSS.nextSlide();
	  }
	  if (this.classList.contains('prev-slide')) {
	    FSS.prevSlide();
	  }
    }
  }

  controlsBox.style.visibility = 'hidden';
  this.parentNode.parentNode.style.transition = '0s';
  menu.style.opacity = '0';
  this.parentNode.parentNode.style.opacity = '0';

  setTimeout(function(){
    context.parentNode.parentNode.style.transition = '.5s';
    context.parentNode.parentNode.style.opacity = '1';
    menu.style.opacity = '1';
    controlsBox.style.visibility = 'visible';
  }, 500);

  for(var i = 0; i < cancel.length; i++) {
    cancel[i].classList.add('show');
  }
}

function addClasses() {
  for(var i = 0; i < sliderImgs.length; i++)
    sliderImgs[i].classList.add('fullscreenSlider__item');	
  }	
	
function closeSlides() {

  delete FSS;

  this.classList.remove('show');

  console.log(FSS);	

  this.parentNode.classList.remove('fullscreenSlider');
  this.previousElementSibling.classList.remove('fullscreenSlider__wrap');
  this.previousElementSibling.style.transform = null;

  this.previousElementSibling.removeChild(this.previousElementSibling.children[1]);
  this.previousElementSibling.removeChild(this.previousElementSibling.children[0]);
  this.previousElementSibling.removeChild(this.previousElementSibling.children[this.previousElementSibling.children.length - 2]);
  this.previousElementSibling.removeChild(this.previousElementSibling.children[this.previousElementSibling.children.length - 1]);
			
  for(var i = 0; i < sliderImgs.length; i++) {
    sliderImgs[i].classList.remove('fullscreenSlider__item', 'no-transition', 'prev-slide', 'next-slide', 'current-slide', 'scaled-slide');
    sliderImgs[i].style.margin = null;
  }

  sliderr.style.position = 'relative';

  for (var i = 0; i < sliderImgs.length; i++) {
    sliderImgs[i].onclick = getSlider;
  }
}

			
//slider

var slideIndex = 1,
	controls   = document.querySelectorAll('.control');

showSlides(slideIndex);

for(var i = 0; i < controls.length; i++) {
	controls[i].onclick = function() {
		switch (this) {
			case controls[0] :
				currentSlide(1);
				break;
			case controls[1] :
				currentSlide(2);
				break;
			case controls[2] :
				currentSlide(3);
				break;
		}
	}
}

function showSlides(n) {

	if(document.body.classList.contains('hasSlider')) {
		 var slides = document.querySelectorAll('.slider__item'),
	  i;
  
  for(i = 0; i < slides.length; i++) {
  	slides[i].style.display = 'none'
  }

  for(i = 0; i < controls.length; i++) {
  	controls[i].classList.remove('active');
  }

  if (n > slides.length) {
  	slideIndex = 1;
  }

  if (n < 1) {
  	slideIndex = slides.length;
  }

  slides[slideIndex - 1].style.display = 'flex';
  controls[slideIndex - 1].classList.add('active');
} else {
	return;
}

 

}

function currentSlide(n) {
	showSlides(slideIndex = n);
}


var navBtn = document.querySelector('.navBtn'),
	navClose = document.querySelector('.navClose'),
	menu = document.querySelector('.header'),
	content = document.querySelector('.mainBlock');

navBtn.onclick = function() {
	menu.classList.add('offCanvas');
	content.classList.add('offCanvas');	
}

navClose.onclick = function() {
	menu.classList.remove('offCanvas');
	content.classList.remove('offCanvas');	
}







	


	
