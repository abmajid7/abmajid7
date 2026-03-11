// ── Custom Cursor ──────────────────────────────
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ── Theme Toggle ──────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeIcon.textContent = isDark ? '☀' : '☽';
    });

    // ── Hamburger Menu ────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      const spans = hamburger.querySelectorAll('span');
      if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });

    // ── Back to Top ───────────────────────────────
    const backTop = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    });

    // ── Scroll Reveal ─────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => revealObserver.observe(el));

    // ── Skill Bar Animation ──────────────────────
    const skillBars = document.querySelectorAll('.skill-bar');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const w = parseFloat(bar.style.getPropertyValue('--w') || 0.7);
          bar.style.transform = `scaleX(${w})`;
          bar.classList.add('animated');
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => barObserver.observe(bar));

    // ── Counter Animation ────────────────────────
    const counters = document.querySelectorAll('.stat-num[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + (target >= 100 ? '+' : '');
            if (current >= target) clearInterval(interval);
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // ── Nav scroll effect ─────────────────────────
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0,0,0,0.3)'
        : 'none';
    });

    // ── Active Nav Link highlight ────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current
          ? 'var(--gold)' : '';
      });
    });