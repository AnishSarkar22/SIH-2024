const   mobileMenu = document.getElementById('mobile-nav-menu'),
        mobileBtn = document.getElementById('mobile-nav-btn');

mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('open');
    mobileMenu.classList.toggle('flex');
    mobileMenu.classList.toggle('hidden');
    // mobileMenu.classList.toggle('open-menu');
});
