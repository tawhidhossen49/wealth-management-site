(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const statNumbers = document.querySelectorAll('.stat-card__number');

  /* ---- Sticky Header ---- */
  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
  }

  /* ---- Active Nav Link on Scroll ---- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 140;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ---- Mobile Navigation ---- */
  function toggleNav() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeNav() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Scroll Reveal (Intersection Observer) ---- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Stagger Reveal Delays ---- */
  function applyStaggerDelays() {
    var groups = [
      { selector: '.hero .reveal', delay: 0.12 },
      { selector: '.stats__grid .reveal', delay: 0.1 },
      { selector: '.services__grid .reveal', delay: 0.08 },
      { selector: '.testimonials__grid .reveal', delay: 0.12 },
      { selector: '.contact__details .contact__detail', delay: 0.1 }
    ];

    groups.forEach(function (group) {
      document.querySelectorAll(group.selector).forEach(function (el, i) {
        el.style.transitionDelay = i * group.delay + 's';
      });
    });
  }

  /* ---- Animated Counter for Statistics ---- */
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    var statsSection = document.getElementById('stats');
    if (!statsSection) return;

    var rect = statsSection.getBoundingClientRect();
    if (rect.top >= window.innerHeight || rect.bottom <= 0) return;

    countersAnimated = true;

    statNumbers.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target'), 10);
      var duration = 2000;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* ---- Contact Form ---- */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var valid = true;

    [name, email, message].forEach(function (field) {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = 'rgba(220, 80, 80, 0.6)';
        valid = false;
      }
    });

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = 'rgba(220, 80, 80, 0.6)';
      valid = false;
    }

    if (!valid) return;

    contactForm.querySelector('.btn--primary').textContent = 'Submitted';
    contactForm.querySelector('.btn--primary').disabled = true;
    formSuccess.hidden = false;

    setTimeout(function () {
      contactForm.reset();
      contactForm.querySelector('.btn--primary').textContent = 'Request Consultation';
      contactForm.querySelector('.btn--primary').disabled = false;
      formSuccess.hidden = true;
    }, 4000);
  });

  /* ---- Init ---- */
  applyStaggerDelays();
  initScrollReveal();
  handleScroll();
  animateCounters();

  window.addEventListener('scroll', function () {
    handleScroll();
    animateCounters();
  }, { passive: true });

  window.addEventListener('resize', closeNav);
})();
