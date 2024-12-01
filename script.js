// Sound Management
const soundToggle = document.getElementById('soundToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isSoundOn = false;

soundToggle.addEventListener('click', () => {
    const icon = soundToggle.querySelector('i');
    if (isSoundOn) {
        backgroundMusic.pause();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        backgroundMusic.play();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }
    isSoundOn = !isSoundOn;
});

// Animated Counter
const counter = document.querySelector('.counter');
const target = parseInt(counter.textContent);
let current = 0;

function updateCounter() {
    const increment = Math.ceil(target / 100);
    if (current < target) {
        current += increment;
        if (current > target) current = target;
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(updateCounter);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('counter')) {
                updateCounter();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.tokenomics-item, .roadmap-item, .step, .counter').forEach(el => {
    observer.observe(el);
});

// Banana hover effect
const banana = document.querySelector('.banana');
banana.addEventListener('mouseover', () => {
    banana.style.transform = 'rotate(-5deg) scale(1.1)';
});

banana.addEventListener('mouseout', () => {
    banana.style.transform = 'rotate(-15deg) scale(1)';
});

// Random banana facts
const bananaPuns = [
    "Why did the banana go to the doctor? Because it wasn't peeling well!",
    "What's a banana's favorite dance? The banana split!",
    "Why don't bananas like winter? Because they slip on ice!",
    "What did the banana say to the dog? Nothing, bananas can't talk!",
    "Why did the banana investor HODL? Because they found it very a-peeling!"
];

function displayRandomPun() {
    const memeText = document.querySelector('.meme-text');
    const randomPun = bananaPuns[Math.floor(Math.random() * bananaPuns.length)];
    memeText.textContent = randomPun;
}

// Change pun every 10 seconds
setInterval(displayRandomPun, 10000);

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if it's just '#'
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Update active section on scroll
function updateActiveSection() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(section => {
        if (!section.id) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar scroll hide/show functionality
let lastScrollTop = 0;
const scrollThreshold = 100; // Minimum scroll amount before showing/hiding
let isScrollingTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear the timeout if we're still scrolling
    clearTimeout(isScrollingTimeout);
    
    // Update navbar appearance
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
        
        // Hide/show based on scroll direction
        if (currentScroll > lastScrollTop && !navbar.classList.contains('nav-hidden')) {
            // Scrolling down
            navbar.classList.add('nav-hidden');
        } else if (currentScroll < lastScrollTop && navbar.classList.contains('nav-hidden')) {
            // Scrolling up
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('nav-hidden');
    }
    
    // Set a timeout to show navbar after scrolling stops
    isScrollingTimeout = setTimeout(() => {
        navbar.classList.remove('nav-hidden');
    }, 1500);
    
    lastScrollTop = currentScroll;
    updateActiveSection();
});

// Show navbar when hovering near top of screen
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 60) {
        navbar.classList.remove('nav-hidden');
    }
});

// Navbar scroll effect and active section update
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveSection();
});

// Initial active section check
document.addEventListener('DOMContentLoaded', updateActiveSection);

// Falling Bananas Animation
function createFallingBanana() {
    const banana = document.createElement('div');
    banana.className = 'banana-fall';
    
    // Random starting position
    banana.style.left = Math.random() * 100 + '%';
    
    // Random duration between 3 and 6 seconds
    const duration = Math.random() * 3 + 3;
    banana.style.animationDuration = duration + 's';
    
    // Random delay
    banana.style.animationDelay = Math.random() * 2 + 's';
    
    // Random size between 20px and 40px
    const size = Math.random() * 20 + 20;
    banana.style.width = size + 'px';
    banana.style.height = size + 'px';
    
    document.querySelector('.falling-bananas').appendChild(banana);
    
    // Remove banana after animation
    setTimeout(() => {
        banana.remove();
    }, duration * 1000);
}

// Create new bananas periodically
function startFallingBananas() {
    // Create initial bananas
    for (let i = 0; i < 10; i++) {
        createFallingBanana();
    }
    
    // Add new bananas every 500ms
    setInterval(createFallingBanana, 500);
}

// Start the animation when the about section is in view
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startFallingBananas();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

aboutObserver.observe(aboutSection);

// Contract Address Copy Function
function copyContract() {
    const contractAddress = '0x123...abc'; // Replace with actual contract address
    navigator.clipboard.writeText(contractAddress).then(() => {
        const copyIcon = document.querySelector('.copy-icon');
        const originalText = copyIcon.textContent;
        copyIcon.textContent = '✓';
        
        setTimeout(() => {
            copyIcon.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Update countdown timer
function updateCountdown() {
    const christmas = new Date('December 25, 2023 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = christmas - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.countdown').innerText = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// NFT Slider functionality
let currentSlideIndex = 1;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides(n) {
    if (!slides.length) return;

    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }

    // Hide all slides first
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show the current slide and activate its dot
    slides[currentSlideIndex - 1].style.display = 'block';
    dots[currentSlideIndex - 1].classList.add('active');
}

function moveSlide(n) {
    showSlides(currentSlideIndex += n);
}

// Next/previous controls
function nextSlide() {
    moveSlide(1);
}

function prevSlide() {
    moveSlide(-1);
}

// Dot controls
function currentSlide(n) {
    showSlides(currentSlideIndex = n);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    showSlides(currentSlideIndex);
    
    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add touch support
    const slider = document.querySelector('.slider-container');
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeLength = touchEndX - touchStartX;

    if (Math.abs(swipeLength) > swipeThreshold) {
        if (swipeLength > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

// NFT Carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dotsNav = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        const targetIndex = slides.findIndex(slide => slide === targetSlide);
        track.style.transform = 'translateX(-' + targetIndex * slideWidth + 'px)';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };

    // Next button click
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        const currentDot = dotsNav.querySelector('.active');
        const nextDot = currentDot.nextElementSibling || dots[0];
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    // Previous button click
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        const currentDot = dotsNav.querySelector('.active');
        const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
        
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    // Dot indicators click
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.active');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // Auto advance slides
    setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        const currentDot = dotsNav.querySelector('.active');
        const nextDot = currentDot.nextElementSibling || dots[0];
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }, 5000);

    // Initialize first slide
    slides[0].classList.add('current-slide');
    dots[0].classList.add('active');
});

// Initialize Owl Carousel
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 2
            },
            1000:{
                items: 3
            }
        },
        navText: ['❮', '❯']
    });
});
