// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
console.log(header)
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

// Require a fresh client-side CAPTCHA before allowing the resume download.
const captchaModalElement = document.getElementById('resumeCaptchaModal');
const captchaForm = document.getElementById('resumeCaptchaForm');
const captchaChallenge = document.getElementById('captchaChallenge');
const captchaAnswer = document.getElementById('captchaAnswer');
const captchaFeedback = document.getElementById('captchaFeedback');
const refreshCaptchaButton = document.getElementById('refreshCaptcha');
const captchaCharacters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
let currentCaptcha = '';

function randomCharacter() {
    const randomValue = new Uint32Array(1);
    window.crypto.getRandomValues(randomValue);
    return captchaCharacters[randomValue[0] % captchaCharacters.length];
}

function createCaptcha() {
    currentCaptcha = Array.from({ length: 5 }, randomCharacter).join('');
    captchaChallenge.replaceChildren(...currentCaptcha.split('').map((character) => {
        const span = document.createElement('span');
        span.textContent = character;
        return span;
    }));
    captchaAnswer.value = '';
    captchaFeedback.textContent = '';
    captchaFeedback.className = 'captcha-feedback';
}

captchaModalElement.addEventListener('show.bs.modal', createCaptcha);
captchaModalElement.addEventListener('shown.bs.modal', () => captchaAnswer.focus());
refreshCaptchaButton.addEventListener('click', () => {
    createCaptcha();
    captchaAnswer.focus();
});

captchaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (captchaAnswer.value.trim().toUpperCase() !== currentCaptcha) {
        captchaFeedback.textContent = 'That code does not match. Please try again.';
        captchaFeedback.className = 'captcha-feedback is-error';
        captchaAnswer.select();
        return;
    }

    captchaFeedback.textContent = 'Verified. Your download is starting…';
    captchaFeedback.className = 'captcha-feedback is-success';
    const downloadLink = document.createElement('a');
    downloadLink.href = 'assets/vinay-karthik-mb-resume.pdf';
    downloadLink.download = 'Vinay Karthik M B - Resume.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    window.setTimeout(() => {
        bootstrap.Modal.getInstance(captchaModalElement).hide();
    }, 700);
});

// Keep the story timeline controls in sync with their expanded state.
document.querySelectorAll('.story-item').forEach((item) => {
    const icon = item.querySelector('summary i');
    const updateIcon = () => {
        icon.classList.toggle('fa-plus', !item.open);
        icon.classList.toggle('fa-minus', item.open);
    };
    item.addEventListener('toggle', updateIcon);
    updateIcon();
});

// Carry the selected pricing model into the contact form.
const contactSubject = document.getElementById('contactSubject');
document.querySelectorAll('.start-project-link').forEach((link) => {
    link.addEventListener('click', () => {
        contactSubject.value = `Project enquiry: ${link.dataset.projectType}`;
        window.setTimeout(() => contactSubject.focus(), 450);
    });
});

// Reconfirm deep-link positioning after images and fonts finish loading.
window.addEventListener('load', () => {
    if (window.location.hash) {
        window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 100);
    }
});

// Theme behavior adapted from the selected multiple-page portfolio theme.
const themeToggle = document.getElementById('themeToggle');
const preferredTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const darkMode = theme === 'dark';
    themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.querySelector('i').className = darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

applyTheme(preferredTheme);
themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
});
