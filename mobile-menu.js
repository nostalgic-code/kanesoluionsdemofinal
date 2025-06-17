document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('nav-overlay');
    document.body.appendChild(mobileOverlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navCenter.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add event listeners
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking the overlay
    mobileOverlay.addEventListener('click', closeMenu);

    // Handle clicking navigation links
    const navLinks = navCenter.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Regular navigation should work normally
            setTimeout(closeMenu, 200);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navCenter.classList.contains('active') && 
            !navCenter.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
