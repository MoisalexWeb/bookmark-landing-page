/***** VARIABLES *****/
const $hamburgerMenu = document.querySelector('.nav__hamburger'),
	$body = document.body,
	$nav = document.querySelector('.nav'),
	$form = document.querySelector('.newsletter__form'),
	$menu = document.querySelector('.nav__menu');



/***** FUNCTIONS *****/

// Function to change nav style
const changeNavStyle = () => {
	if (window.scrollY >= 200) $nav.classList.add('nav-shadow');
	else $nav.classList.remove('nav-shadow');
}

// Function for faq accordion
const accordion = element => {
	let $faqHeader, $faqAnswer;
	if (element.dataset.faq === 'header') $faqHeader = element;
	else $faqHeader = element.parentElement

	$faqAnswer = $faqHeader.nextElementSibling;
	$faqHeader.classList.toggle('active-faq');
	if ($faqHeader.classList.contains('active-faq')) $faqAnswer.style.height = `${$faqAnswer.scrollHeight}px`;
	else $faqAnswer.removeAttribute('style');
}

// Function and variables for change features
const tabContent = [
	{
		title: "Bookmark in one click",
		paragraph: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
		imgSrc: "images/illustration-features-tab-1.svg",
		imgAlt: "Dashboard"
	},
	{
		title: "Intelligent search",
		paragraph: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
		imgSrc: "images/illustration-features-tab-2.svg" ,
		imgAlt: "Dashboard with magnifying glass"
	},
	{
		title: "Share your bookmarks",
		paragraph: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
		imgSrc: "images/illustration-features-tab-3.svg", 
		imgAlt: "People waving to each other"
	}
]

const changeTabContent = index => {
	const $featureSection = document.querySelector('.feature'),
		$tabImg = document.querySelector('.feature-img'),
		$tabTitle = document.querySelector('.feature-subtitle'),
		$tabParagraph = document.querySelector('.feature-paragraph');

	$featureSection.classList.add('fade-out');
	
	setTimeout(()=> {
        $tabTitle.textContent = tabContent[index].title;
        $tabParagraph.textContent = tabContent[index].paragraph;
        $tabImg.src = tabContent[index].imgSrc;
        $tabImg.alt = tabContent[index].imgAlt;
		$featureSection.classList.remove('fade-out')
	}, 400);

}

const changeTab = tab => {
	document.querySelector('.feature-tab.active').classList.remove('active');
	tab.classList.add('active');
	changeTabContent(tab.dataset.id);
}

// Preload images for tab
const preloadImage = url => {
	new Image().src = url
}

// Function for valid email
const validEmail = input => {
	const regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),
		$emailContainer	= document.querySelector('.newsletter__input'),
		$errorMessage = document.querySelector('.invalid-email');
	if (!regExp.test(input.value)) {
		$errorMessage.textContent = "Whoops, make sure it's an email";
		$emailContainer.classList.add('email-error');
	} else {
		$emailContainer.classList.remove('email-error');
		$errorMessage.textContent = "";
	}
}

// Function to change menu on resize
const changeMenu = () => {
	const breakpoint = window.matchMedia("(min-width: 1024px)");

	const changeStyle = e => {
		if (e.matches) {
			$menu.removeAttribute('style');
			$body.classList.remove('menu-active')
		}
	}

	breakpoint.addListener(changeStyle)
}


/***** LISTENER *****/
document.addEventListener('click', e => {
	// Mobile menu
	if (e.target === $hamburgerMenu) {
		$body.classList.toggle("menu-active")
		$menu.style.transition = "all 0.3s ease-in"
	}

	else if (e.target !== $hamburgerMenu && $body.classList.contains("menu-active")) $body.classList.remove("menu-active")

	// Faq accordion
	else if (e.target.matches(".faq__header")) accordion(e.target)

	else if (e.target.matches(".faq-question") || e.target.matches(".faq-arrow"))accordion(e.target)

    else if (e.target.matches(".feature-tab")) {
        changeTab(e.target)
    }
})

$form.addEventListener('submit', e => {
	e.preventDefault();
	validEmail($form.email)
});

window.addEventListener('scroll', () => {
	changeNavStyle()
})

document.addEventListener('DOMContentLoaded', () => {
	changeNavStyle()
	changeMenu()
	preloadImage(tabContent[0].imgSrc)
	preloadImage(tabContent[1].imgSrc)
	preloadImage(tabContent[2].imgSrc)
})