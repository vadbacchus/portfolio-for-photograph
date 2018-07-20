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