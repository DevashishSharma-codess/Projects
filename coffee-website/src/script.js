/**
 * Maple & Bean Coffee Co. - Main Web Application Script Entry Point
 * Imports and initializes all element-wise JS modules.
 */

import { initPreloader } from './preloader.js';
import { initNavigation } from './navigation.js';
import { initHeroVideo } from './hero.js';
import { initMenuTabs, initMenuOrdering } from './menu.js';
import { initCarousel } from './carousel.js';
import { initLightbox } from './lightbox.js';
import { initAccordion } from './accordion.js';
import { initContactForm } from './contact.js';
import { initBackToTop } from './back-to-top.js';

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initHeroVideo();
    initMenuTabs();
    initMenuOrdering();
    initCarousel();
    initLightbox();
    initAccordion();
    initContactForm();
    initBackToTop();
});