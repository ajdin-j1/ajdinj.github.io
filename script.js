// =========================================================
//  PORTFOLIO – JavaScript
//  1) meni na mobitelu   2) navigacija pri skrolanju
//  3) animacije pojavljivanja   4) brojači u heru
//  5) svjetlo koje prati miš   6) kontakt forma (WhatsApp / email)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1) Meni na mobitelu ----------
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
  });

  // zatvori meni kad se klikne na link
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // ---------- 2) Navigacija dobije pozadinu nakon skrolanja ----------
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- 3) Elementi se pojavljuju dok skrolaš ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // mali razmak između elemenata u istom redu
        const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
        entry.target.style.transitionDelay = (siblings.indexOf(entry.target) * 90) + 'ms';
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- 4) Brojači u heru (0 → broj) ----------
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = el => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? (el.dataset.suffix || '') : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  setTimeout(() => counters.forEach(animateCount), 500);

  // ---------- 5) Svjetlo u heru prati miš (samo desktop) ----------
  const glow = document.querySelector('.hero__glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 80;
      const y = (e.clientY / window.innerHeight - 0.5) * 80;
      glow.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ---------- 6) Kontakt ----------
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const waBtn = document.getElementById('waBtn');
  const phone = waBtn.dataset.phone;
  const email = form.dataset.email;

  // dugme "WhatsApp" pored forme
  waBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent('Zdravo! Vidio/la sam vašu stranicu i zanima me saradnja.')}`;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';

  // zapamti koje je dugme kliknuto (WhatsApp ili email)
  let via = 'wa';
  form.querySelectorAll('button[type="submit"]').forEach(btn =>
    btn.addEventListener('click', () => { via = btn.dataset.via; })
  );

  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.classList.remove('is-error');

    // jednostavna provjera obaveznih polja
    let ok = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.classList.toggle('is-invalid', empty);
      if (empty) ok = false;
    });
    if (!ok) {
      msg.textContent = 'Molim popunite ime i poruku.';
      msg.classList.add('is-error');
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const text =
      `Zdravo! Ja sam ${data.ime}` + (data.biznis ? ` (${data.biznis})` : '') + '.\n' +
      `Zanima me: ${data.usluga}\n\n${data.poruka}`;

    if (via === 'mail') {
      const subject = `Upit sa stranice – ${data.usluga}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      msg.textContent = 'Otvara se vaš email program…';
    } else {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      msg.textContent = 'Otvara se WhatsApp – samo kliknite "Pošalji". 👍';
    }
    form.reset();
  });

  form.querySelectorAll('input, textarea').forEach(f =>
    f.addEventListener('input', () => f.classList.remove('is-invalid'))
  );

  // ---------- Godina u footeru ----------
  document.getElementById('year').textContent = new Date().getFullYear();
});
