var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
  });

function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  getDirection: true,
  getSpeed: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// Handle footer visibility
const footer = document.querySelector('.main-footer');
ScrollTrigger.create({
  trigger: ".page6",
  scroller: ".main",
  start: "bottom bottom",
  end: "bottom top",
  onEnter: () => {
    footer.style.position = 'fixed';
    footer.style.opacity = '1';
  },
  onLeaveBack: () => {
    footer.style.position = 'fixed';
    footer.style.opacity = '0';
  }
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoScroll();

// Updated Modal and Cursor Functionality
function initModalAndCursor() {
    const cursorWrapper = document.querySelector('.cursor-wrapper');
    const modal = document.querySelector('.video-modal');
    const modalVideo = modal.querySelector('video');
    const closeBtn = document.querySelector('.close-modal');
    const page1Content = document.querySelector('.page1-content');
    const cursor = document.querySelector('.cursor');

    function handleMouseMove(e) {
        requestAnimationFrame(() => {
            cursorWrapper.style.left = e.clientX + 'px';
            cursorWrapper.style.top = e.clientY + 'px';
        });
    }    function showModal() {
        modal.style.display = 'flex';
        modalVideo.currentTime = 0;
        modalVideo.play();
        document.body.style.overflow = 'hidden';
        // Ensure we're at the correct scroll position
        window.scrollTo({
            top: cursorWrapper.offsetTop - (window.innerHeight / 2),
            behavior: 'smooth'
        });
    }

    function hideModal() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = '';
    }

    // Event Listeners
    page1Content.addEventListener('mousemove', handleMouseMove);
    
    cursorWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideModal();
        }
    });

    // Cursor effects
    page1Content.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1,
            duration: 0.3
        });
        gsap.to('.play-text', {
            opacity: 1,
            duration: 0.3
        });
    });

    page1Content.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0,
            duration: 0.3
        });
        gsap.to('.play-text', {
            opacity: 0,
            duration: 0.3
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initModalAndCursor();
});


function page2Animation(){
    gsap.from(".page2-nav h2",{
        y:20,
        stagger: 0.5,
        opacity:0,
        duration:1,
        scrollTrigger:{
            trigger:".page2-nav h2",
            scroller:".main",
            start: "top 40%",
            end: "top 37%",
            scrub:2
        }
    })

    gsap.from(".elem h1",{
        y:20,
        stagger: 0.5,
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger:".elem h1",
            scroller:".main",
            start: "top 40%",
            end: "top 37%",
            scrub:2
        }
    })
}
page2Animation();

function page3Animation(){
    gsap.from(".underlinewaladiv h2",{
        y:70,
        stagger: 0.25,
        opacity:0,
        duration:1,
        scrollTrigger:{
            trigger:".underlinewaladiv h2",
            scroller:".main",
            start: "top 40%",
            end: "top 37%",
            scrub:2
        }
    })

}
page3Animation();


function page4Animation(){
    gsap.from(".page4-nav h2",{
        y:120,
        stagger: 0.25,
        opacity:0,
        duration:1,
        scrollTrigger:{
            trigger:".page4-nav h2",
            scroller:".main",
            start: "top 40%",
            end: "top 37%",
            scrub:2
        }
    })

    gsap.from(".elem1 h1",{
        y:120,
        stagger: 0.25,
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger:".elem1 h1",
            scroller:".main",
            start: "top 40%",
            end: "top 37%",
            scrub:2
        }
    })
}
page4Animation();



var tl = gsap.timeline();
tl.from(".loader h3",{
    x:60,
    opacity:0,
    delay:0.5,
    duration:1,
    stagger:.1
})
tl.to(".loader h3",{
    y:-60,
    opacity:0,
    duration:1,
    stagger:.1,
    delay: 1
})

tl.to(".loader",{
    opacity:0,
    duration: 0.5,
    delay: 0.5
})

tl.from(".page1-content h1 span",{
    y:200,
    opacity:0,
    duration:.6,
    stagger:.1,
    delay:-.3
})

tl.to(".loader",{
    display: "none"
})

// Navbar scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and adjust background opacity based on scroll position
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});



