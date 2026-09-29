/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'equipe-marcello-vespri-siciliani',
    /* niente WhatsApp finché non confermano che il cellulare lo è: il fisso, il cellulare (chiamata) e Treatwell */
    whatsapp: {
      number: '',
      message: '',
      ids: [],
    },
    /* Google = la loro vetrina (29/9/2026): da martedì a sabato 9:30–19; domenica e lunedì chiuso (Treatwell: 10–19) */
    hours: {
      0: [],
      1: [],
      2: [['09:30', '19:00']],
      3: [['09:30', '19:00']],
      4: [['09:30', '19:00']],
      5: [['09:30', '19:00']],
      6: [['09:30', '19:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1040,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Equipe Marcello: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.mestieri": "Hair and lashes",
      "n.salone": "The salon",
      "n.dicono": "Reviews",
      "n.orari": "Hours and where",
      "n.domande": "Questions",
      "t.chiama": "Call",
      "t.prenota": "Book on Treatwell",
      "t.prenotabreve": "Book",
      "t.indicazioni": "Directions",
      "h.titolo": "One <em>at</em> a time.",
      "h.testo": "Hair and lashes at Via Vespri Siciliani 30, a short walk from M4 Tolstoj. Marcello has been applying lash extensions one to one, one lash at a time, for twenty years; there are two of them in the salon, and every cut starts with a consultation.",
      "h.servizi": "The services, as on the shop window",
      "h.s1": "Blow-dry, short hair",
      "h.s2": "Blow-dry, long hair",
      "h.s3": "Cut",
      "h.s4": "Colour",
      "h.s5": "Perm",
      "h.s6": "Balayage and shatush",
      "h.s7": "Lash extensions",
      "h.treatwell": "on Treatwell, 248 reviews",
      "h.google": "on Google, 54 reviews",
      "h.piccolo": "Opening hours: Tuesday to Saturday, 9:30 am to 7 pm · booking preferred",
      "f.titolo": "The lash map",
      "f.desc": "A chart like the ones lash stylists use: a closed eyelid, the white pad underneath, the lengths in millimetres zone by zone, from 8 to 12; a pair of tweezers places the extensions one at a time, one on each lash.",
      "f.testa": "LASH MAP",
      "f.mm": "lengths in mm",
      "f.d0": "One to one: one extension on each natural lash, one at a time.",
      "f.d1": "2D: two fine extensions fanned out on each lash.",
      "f.d2": "3D: three extensions fanned out on each lash, for a fuller look.",
      "f.d3": "Mini: from the centre of the eye outwards, fanned out, to open up the eye.",
      "f.modi": "The type of application",
      "s.etichetta": "Hair and lashes",
      "s.titolo": "Two crafts, one shop window",
      "s.sotto": "The glass says “Hair & Lash Stylist”: hair on one side, lashes on the other. Here are the services as they describe them on Treatwell, where you will also find the prices and can book.",
      "s.capelli": "Hair",
      "s.ciglia": "Lashes",
      "s.fonte": "on Google, about the extensions she had done",
      "a.taglio": "Marcello’s hands with the comb and scissors on a brown lock; the client is seen from behind, with a zebra-print clip in her hair.",
      "a.vassoio": "Their lash tray: a box of coloured extensions, purple, red, blue, green and yellow, the orange, yellow and light-blue silicone cups and the tweezers, on the red towel.",
      "c.1": "Women’s cut",
      "c.1d": "starts with a consultation, to find the cut that best suits the shape of the face",
      "c.2": "Men’s cut",
      "c.2d": "and styling, with the shampoo chosen for the hair",
      "c.3": "Blow-dry",
      "c.3d": "for short or long hair, with shampoo, conditioner and finish",
      "c.4": "Colour",
      "c.4d": "also balayage, shatush, contouring and colour play",
      "c.5": "Soft perm",
      "c.5d": "soft movement, without using straighteners or curling irons every day",
      "c.6": "Treatments",
      "c.6d": "botox hair, restructuring treatment, tannin smoothing keratin",
      "l.1d": "one extension on each lash · 2 hours",
      "l.2d": "two extensions fanned out on each lash · 1 hour 30",
      "l.3d": "three extensions fanned out · 1 hour 45",
      "l.4d": "from the centre of the eye outwards · 1 hour",
      "l.5d": "mixed technique, one to one with 2D or 3D · 2 hours",
      "l.6": "Lash lift",
      "l.6d": "the curl of the natural lashes, without extensions · 45 minutes",
      "l.7": "Brow lamination",
      "l.7d": "to reshape them and add colour",
      "v.etichetta": "The salon",
      "v.titolo": "Behind the shop window",
      "v.sotto": "Mirrors between white columns, black chairs, honey-coloured parquet; on the left, by the window, the reclining lash chair with its lamp.",
      "a.salone": "The salon: on the left the black reclining lash chair with its lamp, then the hair stations with black chairs, the mirrors between white columns, red flowers and the parquet floor.",
      "c.salone": "The lash chair and, next to it, the stations.",
      "a.piega": "A blow-dry with a round brush and a purple hairdryer on long brown hair; the client is seen from behind.",
      "c.piega": "The blow-dry.",
      "a.viola": "A bright purple bob, seen from behind, on the pavement in front of their shop window with the words Hair & Lash.",
      "c.viola": "One of their colour plays, in front of the shop window.",
      "a.colore": "Colour: a hand with a brush applies the dye to dark strands, between sheets of aluminium foil.",
      "c.colore": "Colour, with foils.",
      "a.ricci": "Soft blonde curls, seen from behind, in the salon.",
      "c.ricci": "Curls, from behind.",
      "a.lavatesta": "The washbasins: three white basins with black chairs, in a row on the parquet, and a folding door at the back.",
      "c.lavatesta": "The washbasins.",
      "d.etichetta": "Reviews",
      "d.titolo": "Patience, care and a coffee",
      "d.treatwell": "on Treatwell, 248 reviews",
      "d.google": "on Google, 54 reviews",
      "d.g7a": "Google, 7 years ago",
      "d.g6a": "Google, 6 years ago",
      "d.g1a": "Google, a year ago",
      "d.g3a": "Google, 3 years ago",
      "d.nota": "From the reviews on Google, as they were written (in Italian); cuts are marked […].",
      "d.tutte": "All the reviews on Google",
      "o.etichetta": "Hours and where",
      "o.titolo": "Tuesday to Saturday",
      "o.cap": "Opening hours",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "g.chiuso": "closed",
      "o.nota": "Open all day; booking is better.",
      "o.mappa": "Map: Equipe Marcello, Via Vespri Siciliani 30, Milan",
      "o.dove": "Where",
      "o.dovev": "Via Vespri Siciliani 30, 20146 Milan (Giambellino–Lorenteggio)",
      "o.metro": "By metro",
      "o.metrov": "M4 Tolstoj, about 130 metres away",
      "o.tram": "By tram",
      "o.tramv": "The 14, Via Giambellino – Via Tolstoj stop, about 200 metres away",
      "o.bus": "By bus",
      "o.busv": "The 58, Tolstoj M4 stop, about 110 metres away",
      "o.tel": "Phone",
      "o.cell": "Mobile",
      "o.email": "Email",
      "o.social": "Social",
      "q.etichetta": "Questions",
      "q.titolo": "Before you book",
      "q.1": "How do I book?",
      "q.1r": "By phone on +39 02 4895 0928 or on the mobile +39 320 455 7910, or online on Treatwell. The shop window says “booking preferred”.",
      "q.2": "What is the difference between one to one, 2D and 3D?",
      "q.2r": "One to one: one extension on each natural lash. 2D and 3D: two or three fine extensions fanned out on each lash, for a fuller look. The mini starts from the centre of the eye and goes outwards, fanned out. You can try all four on the map at the top.",
      "q.3": "How long does the application take?",
      "q.3r": "From their list: the mini one hour, 2D an hour and a half, 3D an hour and three quarters, one to one and the full set two hours; the lash lift 45 minutes.",
      "q.4": "Do you also do men’s cuts?",
      "q.4r": "Yes: cut and styling, with the shampoo chosen for the hair.",
      "q.5": "Are you open on Mondays?",
      "q.5r": "No: they work from Tuesday to Saturday, 9:30 am to 7 pm, all day. Closed on Sunday and Monday.",
      "q.6": "How do I get there?",
      "q.6r": "Via Vespri Siciliani 30. M4 Tolstoj is about 130 metres away; tram 14 stops at Via Giambellino – Via Tolstoj, about 200 metres away; bus 58 at the Tolstoj M4 stop, about 110 metres away.",
      "f.orario": "Tuesday to Saturday 9:30 am–7 pm · closed on Sunday and Monday",
      "f.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · the photos are theirs, from their Treatwell page, their Google listing and their Facebook page; hours, services and reviews from Google and Treatwell (September 2026). We drew the lash map ourselves: the four types are the ones in their list, the lengths are indicative.",
      "f.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ EQUIPE MARCELLO — «Una alla volta.» ══════════
     La pagina è la loro vetrina: vetro scuro, «HAIR & LASH STYLIST», le luci del salone dietro il vetro.
     la FIRMA — la mappa delle ciglia: su una scheda bianca una palpebra chiusa, il cuscinetto, 26 ciglia naturali e le lunghezze della
     mappa; una pinzetta a L posa le extension una alla volta (la loro tecnica one to one). Quattro modi, quelli del loro listino:
     One to one, 2D, 3D, Mini. Lo stato è il modo M, P (quante ciglia fatte, nell'ordine del modo), Q (quanto del filo che si sta
     posando, 0…1), la punta della pinzetta (x, y) e V (l'opacità dei fili posati mentre la mappa si svuota).
     Senza JS e alla fine: M = One to one, P = 26, la pinzetta a riposo (l'HTML). L'attesa (classe nell'head): i fili nascosti, la
     pinzetta a riposo, cioè P = 0 nello stesso posto. L'intro posa le 26 extension una per una: la pinzetta va sulla ciglia, il filo
     si disegna dalla base alla punta mentre la pinzetta scende di poco, poi la ciglia dopo; alla fine torna a riposo. Un modo: i fili
     di prima svaniscono e la pinzetta rifà la mappa (più svelta). Reduced-motion: tutto subito. rAF a tempo, guardia 1,5 s, IO al
     60 %, resize solo se cambia la larghezza; un gesto durante l'animazione la ferma dov'è (#244). I dati vengono da _eqm_firma.mjs. */
  var DATI = {"vb":[560,412],"n":26,"riposo":{"x":462,"y":366},"tempi":{"inizio":300,"vola":260,"sposta":55,"posa":60,"rientra":420,"svuota":240,"spostaV":38,"posaV":42,"volaV":220,"rientraV":360},"zoneMm":[8,9,10,11,12,12,11],"modi":[{"nome":"One to one","n":1,"ordine":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"d":[["M103.5 180 Q101 204.5 88.1 220.4","M103.5 180 Q101 204.5 88.1 220.4","M103.5 180 Q101 204.5 88.1 220.4"],["M113.6 186.4 Q112.1 211 99.8 227.3","M113.6 186.4 Q112.1 211 99.8 227.3","M113.6 186.4 Q112.1 211 99.8 227.3"],["M124.6 192.2 Q124.1 216.8 112.3 233.6","M124.6 192.2 Q124.1 216.8 112.3 233.6","M124.6 192.2 Q124.1 216.8 112.3 233.6"],["M136.3 197.5 Q136.8 222.1 125.7 239.4","M136.3 197.5 Q136.8 222.1 125.7 239.4","M136.3 197.5 Q136.8 222.1 125.7 239.4"],["M148.9 202.2 Q150.4 229.8 138.8 249.7","M148.9 202.2 Q150.4 229.8 138.8 249.7","M148.9 202.2 Q150.4 229.8 138.8 249.7"],["M162 206.3 Q164.7 233.9 153.8 254.2","M162 206.3 Q164.7 233.9 153.8 254.2","M162 206.3 Q164.7 233.9 153.8 254.2"],["M175.8 209.9 Q179.5 237.3 169.4 258.1","M175.8 209.9 Q179.5 237.3 169.4 258.1","M175.8 209.9 Q179.5 237.3 169.4 258.1"],["M190.1 212.9 Q195.4 243.2 185.1 266.7","M190.1 212.9 Q195.4 243.2 185.1 266.7","M190.1 212.9 Q195.4 243.2 185.1 266.7"],["M204.8 215.3 Q211.3 245.4 202 269.2","M204.8 215.3 Q211.3 245.4 202 269.2","M204.8 215.3 Q211.3 245.4 202 269.2"],["M220 217.1 Q227.6 246.9 219.2 271.1","M220 217.1 Q227.6 246.9 219.2 271.1","M220 217.1 Q227.6 246.9 219.2 271.1"],["M235.4 218.3 Q244.3 247.8 236.8 272.3","M235.4 218.3 Q244.3 247.8 236.8 272.3","M235.4 218.3 Q244.3 247.8 236.8 272.3"],["M251.1 218.9 Q262.1 251 254.9 278.2","M251.1 218.9 Q262.1 251 254.9 278.2","M251.1 218.9 Q262.1 251 254.9 278.2"],["M267.1 219 Q279.3 250.5 273.1 278","M267.1 219 Q279.3 250.5 273.1 278","M267.1 219 Q279.3 250.5 273.1 278"],["M283.1 218.4 Q296.5 249.4 291.5 277.2","M283.1 218.4 Q296.5 249.4 291.5 277.2","M283.1 218.4 Q296.5 249.4 291.5 277.2"],["M299.2 217.1 Q313.8 247.7 309.8 275.6","M299.2 217.1 Q313.8 247.7 309.8 275.6","M299.2 217.1 Q313.8 247.7 309.8 275.6"],["M315.2 215.3 Q332.5 247.9 329.3 278.5","M315.2 215.3 Q332.5 247.9 329.3 278.5","M315.2 215.3 Q332.5 247.9 329.3 278.5"],["M331.2 212.8 Q349.7 244.8 347.7 275.4","M331.2 212.8 Q349.7 244.8 347.7 275.4","M331.2 212.8 Q349.7 244.8 347.7 275.4"],["M347 209.7 Q366.7 240.9 366 271.6","M347 209.7 Q366.7 240.9 366 271.6","M347 209.7 Q366.7 240.9 366 271.6"],["M362.6 205.9 Q383.5 236.3 384 267","M362.6 205.9 Q383.5 236.3 384 267","M362.6 205.9 Q383.5 236.3 384 267"],["M377.9 201.5 Q400 231.1 401.7 261.7","M377.9 201.5 Q400 231.1 401.7 261.7","M377.9 201.5 Q400 231.1 401.7 261.7"],["M392.9 196.4 Q416.1 225.1 419 255.7","M392.9 196.4 Q416.1 225.1 419 255.7","M392.9 196.4 Q416.1 225.1 419 255.7"],["M407.4 190.6 Q431.8 218.4 435.8 248.9","M407.4 190.6 Q431.8 218.4 435.8 248.9","M407.4 190.6 Q431.8 218.4 435.8 248.9"],["M421.4 184.2 Q444.7 208.8 449.5 236.6","M421.4 184.2 Q444.7 208.8 449.5 236.6","M421.4 184.2 Q444.7 208.8 449.5 236.6"],["M434.9 177.1 Q459.2 200.8 465 228.3","M434.9 177.1 Q459.2 200.8 465 228.3","M434.9 177.1 Q459.2 200.8 465 228.3"],["M447.8 169.3 Q472.9 192 479.8 219.3","M447.8 169.3 Q472.9 192 479.8 219.3","M447.8 169.3 Q472.9 192 479.8 219.3"],["M459.9 160.9 Q485.9 182.6 493.9 209.6","M459.9 160.9 Q485.9 182.6 493.9 209.6","M459.9 160.9 Q485.9 182.6 493.9 209.6"]],"pinza":[[94.9,202.4],[105.9,209.1],[117.8,215.2],[130.5,220.7],[143.9,225.7],[158,230],[172.7,233.7],[187.9,236.8],[203.6,239.3],[219.6,241.1],[236,242.3],[252.7,242.9],[269.5,242.8],[286.5,242.1],[303.5,240.7],[320.4,238.7],[337.3,236],[354,232.6],[370.5,228.5],[386.7,223.8],[402.5,218.3],[417.9,212.2],[432.8,205.4],[447.1,197.8],[460.7,189.5],[473.7,180.6]],"posa":[[98.1,194],[108.8,200.6],[120.3,206.6],[132.7,212],[145.7,216.9],[159.5,221.1],[173.8,224.8],[188.7,227.8],[204,230.3],[219.8,232.1],[235.8,233.3],[252.1,233.9],[268.6,233.9],[285.2,233.2],[301.8,231.9],[318.5,229.9],[335,227.3],[351.4,224],[367.6,220],[383.4,215.4],[398.9,210.1],[414,204.1],[428.5,197.4],[442.5,190],[455.9,182],[468.5,173.2]]},{"nome":"2D","n":2,"ordine":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"d":[["M103.5 180 Q98.9 204.2 84.6 218.9","M103.5 180 Q103.2 204.6 91.6 221.6","M103.5 180 Q101 204.5 88.1 220.4"],["M113.6 186.4 Q110 210.8 96.2 226","M113.6 186.4 Q114.3 211 103.4 228.4","M113.6 186.4 Q112.1 211 99.8 227.3"],["M124.6 192.2 Q121.9 216.7 108.8 232.4","M124.6 192.2 Q126.2 216.8 116 234.6","M124.6 192.2 Q124.1 216.8 112.3 233.6"],["M136.3 197.5 Q134.6 222 122.1 238.3","M136.3 197.5 Q138.9 222 129.4 240.1","M136.3 197.5 Q136.8 222.1 125.7 239.4"],["M148.9 202.2 Q148 229.9 134.7 248.7","M148.9 202.2 Q152.8 229.6 143 250.4","M148.9 202.2 Q150.4 229.8 138.8 249.7"],["M162 206.3 Q162.3 234 149.7 253.3","M162 206.3 Q167.1 233.6 158 254.8","M162 206.3 Q164.7 233.9 153.8 254.2"],["M175.8 209.9 Q177.1 237.6 165.3 257.3","M175.8 209.9 Q181.9 236.9 173.7 258.4","M175.8 209.9 Q179.5 237.3 169.4 258.1"],["M190.1 212.9 Q192.7 243.6 180.4 266","M190.1 212.9 Q198 242.6 189.8 266.9","M190.1 212.9 Q195.4 243.2 185.1 266.7"],["M204.8 215.3 Q208.7 245.8 197.3 268.8","M204.8 215.3 Q213.9 244.7 206.7 269.3","M204.8 215.3 Q211.3 245.4 202 269.2"],["M220 217.1 Q225 247.5 214.5 270.8","M220 217.1 Q230.2 246.1 223.9 271","M220 217.1 Q227.6 246.9 219.2 271.1"],["M235.4 218.3 Q241.7 248.5 232.1 272.2","M235.4 218.3 Q246.8 246.9 241.5 272","M235.4 218.3 Q244.3 247.8 236.8 272.3"],["M251.1 218.9 Q259.3 251.8 249.8 278.3","M251.1 218.9 Q264.9 249.9 260.1 277.7","M251.1 218.9 Q262.1 251 254.9 278.2"],["M267.1 219 Q276.5 251.5 268 278.4","M267.1 219 Q282 249.4 278.3 277.3","M267.1 219 Q279.3 250.5 273.1 278"],["M283.1 218.4 Q293.7 250.5 286.3 277.7","M283.1 218.4 Q299.2 248.1 296.6 276.2","M283.1 218.4 Q296.5 249.4 291.5 277.2"],["M299.2 217.1 Q311.1 248.8 304.7 276.3","M299.2 217.1 Q316.4 246.3 314.9 274.4","M299.2 217.1 Q313.8 247.7 309.8 275.6"],["M315.2 215.3 Q329.5 249.3 323.8 279.5","M315.2 215.3 Q335.2 246.3 334.8 277","M315.2 215.3 Q332.5 247.9 329.3 278.5"],["M331.2 212.8 Q346.8 246.2 342.2 276.6","M331.2 212.8 Q352.4 243 353.1 273.7","M331.2 212.8 Q349.7 244.8 347.7 275.4"],["M347 209.7 Q363.9 242.5 360.5 273","M347 209.7 Q369.4 239 371.3 269.7","M347 209.7 Q366.7 240.9 366 271.6"],["M362.6 205.9 Q380.8 238 378.6 268.7","M362.6 205.9 Q386.1 234.4 389.2 265","M362.6 205.9 Q383.5 236.3 384 267"],["M377.9 201.5 Q397.4 232.9 396.3 263.6","M377.9 201.5 Q402.5 229 406.8 259.4","M377.9 201.5 Q400 231.1 401.7 261.7"],["M392.9 196.4 Q413.5 227 413.7 257.7","M392.9 196.4 Q418.5 222.9 424 253.2","M392.9 196.4 Q416.1 225.1 419 255.7"],["M407.4 190.6 Q429.2 220.4 430.6 251.1","M407.4 190.6 Q434.1 216.2 440.8 246.2","M407.4 190.6 Q431.8 218.4 435.8 248.9"],["M421.4 184.2 Q442.5 210.7 444.8 238.8","M421.4 184.2 Q446.8 206.7 454 233.9","M421.4 184.2 Q444.7 208.8 449.5 236.6"],["M434.9 177.1 Q457 202.8 460.4 230.8","M434.9 177.1 Q461.1 198.6 469.4 225.5","M434.9 177.1 Q459.2 200.8 465 228.3"],["M447.8 169.3 Q470.8 194.1 475.4 221.9","M447.8 169.3 Q474.8 189.8 484.1 216.4","M447.8 169.3 Q472.9 192 479.8 219.3"],["M459.9 160.9 Q483.9 184.8 489.5 212.4","M459.9 160.9 Q487.7 180.2 498 206.4","M459.9 160.9 Q485.9 182.6 493.9 209.6"]],"pinza":[[94.9,202.4],[105.9,209.1],[117.8,215.2],[130.5,220.7],[143.9,225.7],[158,230],[172.7,233.7],[187.9,236.8],[203.6,239.3],[219.6,241.1],[236,242.3],[252.7,242.9],[269.5,242.8],[286.5,242.1],[303.5,240.7],[320.4,238.7],[337.3,236],[354,232.6],[370.5,228.5],[386.7,223.8],[402.5,218.3],[417.9,212.2],[432.8,205.4],[447.1,197.8],[460.7,189.5],[473.7,180.6]],"posa":[[98.1,194],[108.8,200.6],[120.3,206.6],[132.7,212],[145.7,216.9],[159.5,221.1],[173.8,224.8],[188.7,227.8],[204,230.3],[219.8,232.1],[235.8,233.3],[252.1,233.9],[268.6,233.9],[285.2,233.2],[301.8,231.9],[318.5,229.9],[335,227.3],[351.4,224],[367.6,220],[383.4,215.4],[398.9,210.1],[414,204.1],[428.5,197.4],[442.5,190],[455.9,182],[468.5,173.2]]},{"nome":"3D","n":3,"ordine":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"d":[["M103.5 180 Q97.7 204 82.6 217.8","M103.5 180 Q101 204.5 88.1 220.4","M103.5 180 Q104.5 204.6 93.8 222.1"],["M113.6 186.4 Q108.7 210.5 94.2 225","M113.6 186.4 Q112.1 211 99.8 227.3","M113.6 186.4 Q115.6 210.9 105.6 228.8"],["M124.6 192.2 Q120.6 216.5 106.7 231.5","M124.6 192.2 Q124.1 216.8 112.3 233.6","M124.6 192.2 Q127.5 216.7 118.2 234.9"],["M136.3 197.5 Q133.4 221.9 120 237.5","M136.3 197.5 Q136.8 222.1 125.7 239.4","M136.3 197.5 Q140.2 221.8 131.7 240.4"],["M148.9 202.2 Q146.6 229.8 132.3 247.9","M148.9 202.2 Q150.4 229.8 138.8 249.7","M148.9 202.2 Q154.3 229.4 145.5 250.7"],["M162 206.3 Q160.8 234 147.2 252.6","M162 206.3 Q164.7 233.9 153.8 254.2","M162 206.3 Q168.5 233.3 160.5 254.9"],["M175.8 209.9 Q175.7 237.6 162.8 256.7","M175.8 209.9 Q179.5 237.3 169.4 258.1","M175.8 209.9 Q183.3 236.6 176.2 258.5"],["M190.1 212.9 Q191.1 243.7 177.7 265.4","M190.1 212.9 Q195.4 243.2 185.1 266.7","M190.1 212.9 Q199.6 242.2 192.6 266.8"],["M204.8 215.3 Q207.1 246 194.5 268.3","M204.8 215.3 Q211.3 245.4 202 269.2","M204.8 215.3 Q215.5 244.2 209.5 269.1"],["M220 217.1 Q223.4 247.7 211.7 270.5","M220 217.1 Q227.6 246.9 219.2 271.1","M220 217.1 Q231.7 245.6 226.7 270.7"],["M235.4 218.3 Q240.1 248.8 229.2 272","M235.4 218.3 Q244.3 247.8 236.8 272.3","M235.4 218.3 Q248.3 246.3 244.3 271.6"],["M251.1 218.9 Q257.6 252.2 246.6 278.2","M251.1 218.9 Q262.1 251 254.9 278.2","M251.1 218.9 Q266.5 249.1 263.1 277.1"],["M267.1 219 Q274.8 251.9 264.9 278.3","M267.1 219 Q279.3 250.5 273.1 278","M267.1 219 Q283.5 248.5 281.3 276.6"],["M283.1 218.4 Q292.1 251 283.2 277.8","M283.1 218.4 Q296.5 249.4 291.5 277.2","M283.1 218.4 Q300.7 247.3 299.6 275.4"],["M299.2 217.1 Q309.4 249.4 301.6 276.5","M299.2 217.1 Q313.8 247.7 309.8 275.6","M299.2 217.1 Q317.9 245.3 317.9 273.5"],["M315.2 215.3 Q327.7 250 320.4 279.9","M315.2 215.3 Q332.5 247.9 329.3 278.5","M315.2 215.3 Q336.8 245.2 338 275.9"],["M331.2 212.8 Q345.1 247 338.9 277.1","M331.2 212.8 Q349.7 244.8 347.7 275.4","M331.2 212.8 Q354 241.9 356.3 272.5"],["M347 209.7 Q362.2 243.3 357.2 273.6","M347 209.7 Q366.7 240.9 366 271.6","M347 209.7 Q370.9 237.8 374.4 268.4"],["M362.6 205.9 Q379.1 238.9 375.3 269.4","M362.6 205.9 Q383.5 236.3 384 267","M362.6 205.9 Q387.6 233.1 392.3 263.5"],["M377.9 201.5 Q395.7 233.8 393.1 264.5","M377.9 201.5 Q400 231.1 401.7 261.7","M377.9 201.5 Q403.9 227.7 409.8 257.9"],["M392.9 196.4 Q411.9 228 410.5 258.7","M392.9 196.4 Q416.1 225.1 419 255.7","M392.9 196.4 Q419.9 221.6 427 251.5"],["M407.4 190.6 Q427.6 221.5 427.4 252.3","M407.4 190.6 Q431.8 218.4 435.8 248.9","M407.4 190.6 Q435.4 214.8 443.6 244.4"],["M421.4 184.2 Q441.1 211.8 442 240","M421.4 184.2 Q444.7 208.8 449.5 236.6","M421.4 184.2 Q447.9 205.3 456.5 232.1"],["M434.9 177.1 Q455.6 203.9 457.6 232","M434.9 177.1 Q459.2 200.8 465 228.3","M434.9 177.1 Q462.2 197.2 471.9 223.6"],["M447.8 169.3 Q469.5 195.3 472.6 223.3","M447.8 169.3 Q472.9 192 479.8 219.3","M447.8 169.3 Q475.8 188.3 486.5 214.4"],["M459.9 160.9 Q482.7 186 486.8 213.9","M459.9 160.9 Q485.9 182.6 493.9 209.6","M459.9 160.9 Q488.7 178.7 500.4 204.4"]],"pinza":[[94.9,202.4],[105.9,209.1],[117.8,215.2],[130.5,220.7],[143.9,225.7],[158,230],[172.7,233.7],[187.9,236.8],[203.6,239.3],[219.6,241.1],[236,242.3],[252.7,242.9],[269.5,242.8],[286.5,242.1],[303.5,240.7],[320.4,238.7],[337.3,236],[354,232.6],[370.5,228.5],[386.7,223.8],[402.5,218.3],[417.9,212.2],[432.8,205.4],[447.1,197.8],[460.7,189.5],[473.7,180.6]],"posa":[[98.1,194],[108.8,200.6],[120.3,206.6],[132.7,212],[145.7,216.9],[159.5,221.1],[173.8,224.8],[188.7,227.8],[204,230.3],[219.8,232.1],[235.8,233.3],[252.1,233.9],[268.6,233.9],[285.2,233.2],[301.8,231.9],[318.5,229.9],[335,227.3],[351.4,224],[367.6,220],[383.4,215.4],[398.9,210.1],[414,204.1],[428.5,197.4],[442.5,190],[455.9,182],[468.5,173.2]]},{"nome":"Mini","n":1,"ordine":[13,14,15,16,17,18,19,20,21,22,23,24,25],"d":[["M103.5 180 Q101 204.5 88.1 220.4","M103.5 180 Q101 204.5 88.1 220.4","M103.5 180 Q101 204.5 88.1 220.4"],["M113.6 186.4 Q112.1 211 99.8 227.3","M113.6 186.4 Q112.1 211 99.8 227.3","M113.6 186.4 Q112.1 211 99.8 227.3"],["M124.6 192.2 Q124.1 216.8 112.3 233.6","M124.6 192.2 Q124.1 216.8 112.3 233.6","M124.6 192.2 Q124.1 216.8 112.3 233.6"],["M136.3 197.5 Q136.8 222.1 125.7 239.4","M136.3 197.5 Q136.8 222.1 125.7 239.4","M136.3 197.5 Q136.8 222.1 125.7 239.4"],["M148.9 202.2 Q150.4 229.8 138.8 249.7","M148.9 202.2 Q150.4 229.8 138.8 249.7","M148.9 202.2 Q150.4 229.8 138.8 249.7"],["M162 206.3 Q164.7 233.9 153.8 254.2","M162 206.3 Q164.7 233.9 153.8 254.2","M162 206.3 Q164.7 233.9 153.8 254.2"],["M175.8 209.9 Q179.5 237.3 169.4 258.1","M175.8 209.9 Q179.5 237.3 169.4 258.1","M175.8 209.9 Q179.5 237.3 169.4 258.1"],["M190.1 212.9 Q195.4 243.2 185.1 266.7","M190.1 212.9 Q195.4 243.2 185.1 266.7","M190.1 212.9 Q195.4 243.2 185.1 266.7"],["M204.8 215.3 Q211.3 245.4 202 269.2","M204.8 215.3 Q211.3 245.4 202 269.2","M204.8 215.3 Q211.3 245.4 202 269.2"],["M220 217.1 Q227.6 246.9 219.2 271.1","M220 217.1 Q227.6 246.9 219.2 271.1","M220 217.1 Q227.6 246.9 219.2 271.1"],["M235.4 218.3 Q244.3 247.8 236.8 272.3","M235.4 218.3 Q244.3 247.8 236.8 272.3","M235.4 218.3 Q244.3 247.8 236.8 272.3"],["M251.1 218.9 Q262.1 251 254.9 278.2","M251.1 218.9 Q262.1 251 254.9 278.2","M251.1 218.9 Q262.1 251 254.9 278.2"],["M267.1 219 Q279.3 250.5 273.1 278","M267.1 219 Q279.3 250.5 273.1 278","M267.1 219 Q279.3 250.5 273.1 278"],["M283.1 218.4 Q296.8 249.3 292 277.1","M283.1 218.4 Q296.5 249.4 291.5 277.2","M283.1 218.4 Q296.5 249.4 291.5 277.2"],["M299.2 217.1 Q314.6 247.3 311.4 275.3","M299.2 217.1 Q313.8 247.7 309.8 275.6","M299.2 217.1 Q313.8 247.7 309.8 275.6"],["M315.2 215.3 Q333.9 247.1 332.1 277.8","M315.2 215.3 Q332.5 247.9 329.3 278.5","M315.2 215.3 Q332.5 247.9 329.3 278.5"],["M331.2 212.8 Q351.6 243.6 351.6 274.3","M331.2 212.8 Q349.7 244.8 347.7 275.4","M331.2 212.8 Q349.7 244.8 347.7 275.4"],["M347 209.7 Q369.2 239.2 370.8 269.9","M347 209.7 Q366.7 240.9 366 271.6","M347 209.7 Q366.7 240.9 366 271.6"],["M362.6 205.9 Q386.4 234.1 389.8 264.7","M362.6 205.9 Q383.5 236.3 384 267","M362.6 205.9 Q383.5 236.3 384 267"],["M377.9 201.5 Q403.3 228.3 408.4 258.6","M377.9 201.5 Q400 231.1 401.7 261.7","M377.9 201.5 Q400 231.1 401.7 261.7"],["M392.9 196.4 Q419.7 221.8 426.5 251.7","M392.9 196.4 Q416.1 225.1 419 255.7","M392.9 196.4 Q416.1 225.1 419 255.7"],["M407.4 190.6 Q435.6 214.5 444.1 244","M407.4 190.6 Q431.8 218.4 435.8 248.9","M407.4 190.6 Q431.8 218.4 435.8 248.9"],["M421.4 184.2 Q448.5 204.6 457.8 231.2","M421.4 184.2 Q444.7 208.8 449.5 236.6","M421.4 184.2 Q444.7 208.8 449.5 236.6"],["M434.9 177.1 Q463.1 195.9 473.9 221.9","M434.9 177.1 Q459.2 200.8 465 228.3","M434.9 177.1 Q459.2 200.8 465 228.3"],["M447.8 169.3 Q477 186.5 489.2 211.9","M447.8 169.3 Q472.9 192 479.8 219.3","M447.8 169.3 Q472.9 192 479.8 219.3"],["M459.9 160.9 Q490 176.4 503.7 201","M459.9 160.9 Q485.9 182.6 493.9 209.6","M459.9 160.9 Q485.9 182.6 493.9 209.6"]],"pinza":[[286.7,242.1],[304.1,240.6],[321.5,238.4],[338.7,235.6],[355.8,232],[372.7,227.7],[389.2,222.6],[405.3,216.9],[421,210.4],[436.1,203.2],[450.7,195.2],[464.5,186.5],[477.6,177.1]],"posa":[[285.3,233.2],[302.2,231.8],[319.1,229.8],[335.9,227],[352.5,223.6],[368.9,219.5],[385,214.7],[400.7,209.2],[415.9,203],[430.6,196.1],[444.8,188.4],[458.2,180.1],[471,171]]}]};
  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('mappa'), svgF = prendi('mappaSvg'), pinzaF = prendi('mappaPinza'), leggiF = prendi('mappaLeggi');
  var BOTTONI = [].slice.call(document.querySelectorAll('.mappa__modi button[data-modo]'));
  var GRUPPI = [].slice.call(document.querySelectorAll('#mappaSvg .ciglia'));
  var FILI = GRUPPI.map(function (g) { return [].slice.call(g.querySelectorAll('.ciglia__ext')); });
  var TF = DATI.tempi, NF = DATI.n, RIP = DATI.riposo, MODI = DATI.modi;
  /* dove sta ogni ciglia nell'ordine di ciascun modo (-1: il modo non la tocca) */
  var POS = MODI.map(function (M) { var p = []; for (var k = 0; k < NF; k++) p.push(M.ordine.indexOf(k)); return p; });
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, PF = NF, QF = 0, XF = RIP.x, YF = RIP.y, VF = 1;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var r3 = function (n) { return Math.round(n * 1000) / 1000; };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    su: function (u) { return 1 - (1 - u) * (1 - u); },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var d = document.querySelector('.mappa__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = d ? d.textContent : '';
  }
  /* il disegno dello stato: allo stato finale nessun attributo in più di quelli dell'HTML */
  function disegnaF(m, p, q, x, y, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      FILI.forEach(function (tre, k) { tre.forEach(function (el, s2) { el.setAttribute('d', MODI[m].d[k][s2]); }); });
      BOTTONI.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-modo') === m)); });
    }
    PF = p; QF = q || 0; XF = x; YF = y; VF = v === undefined ? 1 : v;
    var M = MODI[m];
    FILI.forEach(function (tre, k) {
      var j = POS[m][k];
      tre.forEach(function (el, s2) {
        var usato = j >= 0 && s2 < M.n;
        if (usato && j < p) {
          el.removeAttribute('stroke-dasharray'); el.removeAttribute('stroke-dashoffset');
          if (VF >= 1) el.removeAttribute('opacity'); else el.setAttribute('opacity', String(r3(VF)));
        } else if (usato && j === p && QF > 0 && VF >= 1) {
          el.removeAttribute('opacity');
          el.setAttribute('stroke-dasharray', '1 1');
          el.setAttribute('stroke-dashoffset', String(r3(1 - QF)));
        } else {
          el.removeAttribute('stroke-dasharray'); el.removeAttribute('stroke-dashoffset');
          el.setAttribute('opacity', '0');
        }
      });
    });
    if (Math.abs(x - RIP.x) < 1e-9 && Math.abs(y - RIP.y) < 1e-9) pinzaF.setAttribute('transform', 'translate(' + RIP.x + ' ' + RIP.y + ')');
    else pinzaF.setAttribute('transform', 'translate(' + r3(x) + ' ' + r3(y) + ')');
  }
  /* un piano: tratti { da, a, m, p, q0, q1, x0, y0, x1, y1, curva, svuota? } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var u = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](u);
    if (cur.svuota) { disegnaF(cur.m, cur.p, 0, cur.x0, cur.y0, 1 - u); return; }
    disegnaF(cur.m, cur.p, cur.q0 + (cur.q1 - cur.q0) * u, cur.x0 + (cur.x1 - cur.x0) * e, cur.y0 + (cur.y1 - cur.y0) * e);
  }
  /* posare le extension del modo m dalla ciglia «da» (nell'ordine del modo) partendo da (x0, y0), poi tornare a riposo */
  function pianoMappa(inizio, m, da, x0, y0, veloce) {
    var P = [], t = inizio, x = x0, y = y0, M = MODI[m], n = M.ordine.length;
    var vola = veloce ? TF.volaV : TF.vola, sposta = veloce ? TF.spostaV : TF.sposta, posa = veloce ? TF.posaV : TF.posa, rientra = veloce ? TF.rientraV : TF.rientra;
    for (var j = da; j < n; j++) {
      var h = M.pinza[j], b = M.posa[j], dm = j === da ? vola : sposta;
      P.push({ da: t, a: t + dm, m: m, p: j, q0: 0, q1: 0, x0: x, y0: y, x1: h[0], y1: h[1], curva: 'dolce' }); t += dm;
      P.push({ da: t, a: t + posa, m: m, p: j, q0: 0, q1: 1, x0: h[0], y0: h[1], x1: b[0], y1: b[1], curva: 'su' }); t += posa;
      x = b[0]; y = b[1];
    }
    P.push({ da: t, a: t + rientra, m: m, p: n, q0: 0, q1: 0, x0: x, y0: y, x1: RIP.x, y1: RIP.y, curva: 'dolce' }); t += rientra;
    return { piano: P, fine: t };
  }
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    var m = destinazioneF.m;
    disegnaF(m, MODI[m].ordine.length, 0, RIP.x, RIP.y);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): la mappa si ferma dov'è (#244); dall'attesa lo stato è P = 0, a riposo */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(0, 0, 0, RIP.x, RIP.y); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, PF, QF, XF, YF, VF < 1 ? VF : undefined);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: P = 0, la pinzetta a riposo */
    disegnaF(0, 0, 0, RIP.x, RIP.y);
    destinazioneF = { m: 0 };
    avviaF('intro', pianoMappa(TF.inizio, 0, 0, RIP.x, RIP.y, false));
  }
  /* il gesto: scegliere un modo. Se è quello che sta già posando, niente; altrimenti la mappa si ferma dov'è, i fili posati
     svaniscono e la pinzetta rifà la mappa del modo scelto (anche lo stesso modo, a mappa finita: la rifà). */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], dopo = 0;
    if (PF > 0 || QF > 0) { P.push({ da: 0, a: TF.svuota, m: MF, p: PF, q0: 0, q1: 0, x0: XF, y0: YF, x1: XF, y1: YF, curva: 'lineare', svuota: true }); dopo = TF.svuota; }
    var nuovo = pianoMappa(dopo, m, 0, XF, YF, true);
    avviaF('rifai', { piano: P.concat(nuovo.piano), fine: nuovo.fine });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche accanto alla settimana */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la mappa è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è
     quella del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && pinzaF && BOTTONI.length === MODI.length && GRUPPI.length === NF) {
    try { clearTimeout(window.__attesaMappa); } catch (e) {}
    window.__mappa = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, p: PF, q: QF, x: XF, y: YF, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__mappa.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la mappa sotto la piega (telefoni): parte quando se ne vede abbastanza; fino ad allora resta senza extension */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__mappa.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
