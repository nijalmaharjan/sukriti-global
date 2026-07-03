/* ============================================================
   SUKRITI GLOBAL EDUCATION CONSULTANCY - ADVANCED JS
   ============================================================ */

// ============ HEADER 3D LOAD ANIMATION ============
(function() {
  var headerEl = document.getElementById('main-header');
  if (!headerEl) return;

  headerEl.classList.add('hdr-anim');

  function fireHeader() {
    if (headerEl._hdrFired) return;
    headerEl._hdrFired = true;
    headerEl.classList.add('hdr-on');
  }

  /* Fire header immediately — preloader is hidden instantly on non-home pages */
  var pre = document.getElementById('preloader');
  var isVisible = pre && pre.style.display !== 'none';
  var delay = isVisible ? 400 : 0;
  setTimeout(fireHeader, delay);
})();

// ============ WELCOME PRELOADER ============
function hidePreloader() {
  var pre = document.getElementById('preloader');
  if (pre) {
    pre.classList.add('hidden');
    pre.style.opacity = '0';
    pre.style.visibility = 'hidden';
    pre.style.pointerEvents = 'none';
    setTimeout(function () { pre.style.display = 'none'; }, 800);
  }
}

function shouldShowWelcome() {
  var path = window.location.pathname || '';
  return path === '/' || path.endsWith('/index.html') || path === '';
}

function initPreloader() {
  var pre = document.getElementById('preloader');
  if (!pre) return;

  // Only show the welcome message on the first page load (home page)
  if (!shouldShowWelcome() || sessionStorage.getItem('welcomeShown')) {
    pre.style.display = 'none';
    return;
  }

  sessionStorage.setItem('welcomeShown', '1');

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 1500);
  } else {
    window.addEventListener('load', function () { setTimeout(hidePreloader, 1500); });
    setTimeout(hidePreloader, 3000);
  }
}

initPreloader();

// ============ HERO PARTICLES ============
(function() {
  var container = document.querySelector('.hero-particles');
  if (!container) return;
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.width = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    p.style.opacity = 0.1 + Math.random() * 0.3;
    container.appendChild(p);
  }
})();

// ============ HEADER SCROLL ============
var header = document.getElementById('main-header');
window.addEventListener('scroll', function () {
  if (header) {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  var bt = document.getElementById('back-top');
  if (bt) {
    if (window.scrollY > 400) bt.classList.add('visible');
    else bt.classList.remove('visible');
  }
});

// ============ HAMBURGER MENU ============
var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navMenu.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
}

// ============ DROPDOWN PORTAL (fixes backdrop-filter clipping) ============
(function () {
  if (window.innerWidth <= 900) return;

  document.querySelectorAll('.has-dropdown').forEach(function (li) {
    var original = li.querySelector('.dropdown');
    if (!original) return;

    // Clone and append to body
    var clone = original.cloneNode(true);
    clone.style.cssText = 'position:fixed;z-index:999999;opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity 0.25s ease,transform 0.25s ease,visibility 0.25s ease;pointer-events:none;';
    document.body.appendChild(clone);

    // Hide original
    original.style.display = 'none';

    function showDropdown() {
      if (window.innerWidth <= 900) return;
      var rect = li.getBoundingClientRect();
      clone.style.top = rect.bottom + 'px';
      clone.style.left = rect.left + 'px';
      clone.style.opacity = '1';
      clone.style.visibility = 'visible';
      clone.style.transform = 'translateY(0)';
      clone.style.pointerEvents = 'auto';
    }

    function hideDropdown() {
      clone.style.opacity = '0';
      clone.style.visibility = 'hidden';
      clone.style.transform = 'translateY(12px)';
      clone.style.pointerEvents = 'none';
    }

    li.addEventListener('mouseenter', showDropdown);
    li.addEventListener('mouseleave', function (e) {
      if (!clone.contains(e.relatedTarget)) hideDropdown();
    });
    clone.addEventListener('mouseenter', function () {
      clone.style.opacity = '1';
      clone.style.visibility = 'visible';
      clone.style.transform = 'translateY(0)';
      clone.style.pointerEvents = 'auto';
    });
    clone.addEventListener('mouseleave', function (e) {
      if (!li.contains(e.relatedTarget)) hideDropdown();
    });
  });
})();

// ============ BACK TO TOP ============
var backTop = document.getElementById('back-top');
if (backTop) {
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ HERO SLIDESHOW ============
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  var dotsContainer = document.getElementById('hero-dots');
  if (!slides.length) return;
  var current = 0;
  if (dotsContainer) {
    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var dot = document.createElement('div');
        dot.className = 'hero-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', function () { goTo(idx); });
        dotsContainer.appendChild(dot);
      })(i);
    }
  }
  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dotsContainer && dotsContainer.children[current]) dotsContainer.children[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    if (dotsContainer && dotsContainer.children[current]) dotsContainer.children[current].classList.add('active');
  }
  setInterval(function () { goTo((current + 1) % slides.length); }, 3500);
})();

// ============ COUNTER ANIMATION ============
var countersRun = false;
function animateCounters() {
  if (countersRun) return;
  countersRun = true;
  document.querySelectorAll('.stat-num').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target')) || 0;
    var duration = 2200, startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  });
}

// ============ SCROLL REVEAL (disabled) ============
// Section reveal animations were removed per design request.
// If you want them back, re-enable the code here and the related CSS classes.

// ============ STUDENTS ASSISTED COUNTER ============
var STUDENTS_BASE = 100;
function getStudentsCount() {
  return parseInt(localStorage.getItem('studentsAssisted')) || STUDENTS_BASE;
}
(function initStudentsStat() {
  var el = document.getElementById('stat-students');
  if (el) el.textContent = getStudentsCount();
})();

// ============ CONTACT FORM - WHATSAPP REDIRECT ============
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameEl = contactForm.querySelector('input[type=text]');
    var emailEl = contactForm.querySelector('input[type=email]');
    var phoneEl = contactForm.querySelector('input[type=tel]');
    var countryEl = contactForm.querySelectorAll('select')[0];
    var serviceEl = contactForm.querySelectorAll('select')[1];
    var msgEl = contactForm.querySelector('textarea');
    
    var name = nameEl ? nameEl.value.trim() : '';
    var email = emailEl ? emailEl.value.trim() : '';
    var phone = phoneEl ? phoneEl.value.trim() : '';
    var country = countryEl ? countryEl.value : '';
    var service = serviceEl ? serviceEl.value : '';
    var msg = msgEl ? msgEl.value.trim() : '';
    
    var whatsappMsg = 'New Enquiry - Sukriti Global\n\n';
    whatsappMsg += 'Name: ' + name + '\n';
    if (email) whatsappMsg += 'Email: ' + email + '\n';
    if (phone) whatsappMsg += 'Phone: ' + phone + '\n';
    if (country) whatsappMsg += 'Country: ' + country + '\n';
    if (service) whatsappMsg += 'Service: ' + service + '\n';
    if (msg) whatsappMsg += 'Message: ' + msg + '\n';
    
    var whatsappNumber = '9779851159978';
    var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMsg);
    
    var btn = contactForm.querySelector('button[type=submit]');
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fab fa-whatsapp"></i> Opening WhatsApp...';
    btn.style.background = '#25D366';
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(function () {
      btn.innerHTML = '<i class="fa fa-check"></i> Message Sent via WhatsApp!';
      setTimeout(function () { btn.innerHTML = orig; btn.style.background = ''; }, 3000);
    }, 1500);
  });
}

// ============ SERVICE DETAILS TOGGLE ============
function initServiceDetailsToggle() {
  var cards = Array.from(document.querySelectorAll('.svc-card:not(.key-req-card)'));
  if (!cards.length) return;

  var activeCard = null;

  function closeCard(card) {
    if (!card || !card.classList.contains('open')) return;
    var details = card.querySelector('.svc-details');
    if (details) {
      details.style.maxHeight = details.scrollHeight + 'px';
      requestAnimationFrame(function() {
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        details.style.padding = '0';
      });
    }
    card.classList.remove('open');
    var t = card.querySelector('.svc-toggle');
    if (t) t.innerHTML = 'More details <i class="fa fa-chevron-down"></i>';
  }

  function openCard(card) {
    var toggle = card.querySelector('.svc-toggle');
    if (!toggle) return;
    card.classList.add('open');
    toggle.innerHTML = 'Less details <i class="fa fa-chevron-down"></i>';
    activeCard = card;
    var details = card.querySelector('.svc-details');
    if (details) {
      details.style.maxHeight = details.scrollHeight + 'px';
      details.style.opacity = '1';
      details.style.padding = '18px 18px 14px';
      details.addEventListener('transitionend', function onEnd() {
        if (card.classList.contains('open')) details.style.maxHeight = 'none';
        details.removeEventListener('transitionend', onEnd);
      });
    }
  }

  cards.forEach(function (card) {
    var toggle = card.querySelector('.svc-toggle');
    if (!toggle) return;

    card.addEventListener('mouseenter', function () {
      if (activeCard && activeCard !== card) closeCard(activeCard);
      openCard(card);
    });

    card.addEventListener('mouseleave', function () {
      closeCard(card);
      if (activeCard === card) activeCard = null;
    });

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = card.classList.contains('open');
      if (isOpen) {
        closeCard(card);
        activeCard = null;
      } else {
        if (activeCard && activeCard !== card) closeCard(activeCard);
        openCard(card);
      }
    });
  });

  // All cards start closed; moving the mouse over a card shows details.

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.svc-card')) {
      if (activeCard) closeCard(activeCard);
      activeCard = null;
    }
  });
}
initServiceDetailsToggle();

// ============ CTA ANIMATION ON SCROLL ============
function checkCTA() {
  document.querySelectorAll('.cta-sec .anim-fadeup').forEach(function (el, i) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.style.animationDelay = (i * 0.2) + 's';
      el.style.animationPlayState = 'running';
    }
  });
}
document.querySelectorAll('.cta-sec .anim-fadeup').forEach(function (el) {
  el.style.animationPlayState = 'paused';
});
window.addEventListener('scroll', checkCTA);

// ============ ADVANCED LEAFLET WORLD MAP ============
(function () {
  var mapElement = document.getElementById('world-map');
  if (!mapElement || typeof L === 'undefined') return;

  if (!mapElement.style.height || mapElement.offsetHeight < 100) {
    mapElement.style.height = '520px';
  }

  var map = L.map('world-map', {
    center: [25, 40],
    zoom: 2,
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    touchZoom: true,
    doubleClickZoom: true,
    boxZoom: false,
    keyboard: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 10
  });

  // Colorful map tiles — OpenStreetMap hot style covers all regions with warm colors
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    subdomains: 'abc'
  }).addTo(map);

  // Boost saturation so pale/arctic areas look vivid; set ocean background
  var mapCss = document.createElement('style');
  mapCss.textContent =
    '#world-map, #world-map .leaflet-container { background: #a8d5e8 !important; }' +
    '.leaflet-tile-pane { filter: saturate(1.7) contrast(1.06) brightness(1.02); }';
  document.head.appendChild(mapCss);

  // Destinations — real flag images via flagcdn.com (code = ISO 3166-1 alpha-2)
  var destinations = [
    { name: 'Nepal',     code: 'np', coords: [27.7172,  85.3240], info: 'Origin - Kathmandu',              isOrigin: true,  color: '#FFD700' },
    { name: 'Australia', code: 'au', coords: [-33.8688, 151.2093],info: 'Sydney, Melbourne, Brisbane',      isOrigin: false, color: '#FF6B35' },
    { name: 'USA',       code: 'us', coords: [40.7128,  -74.0060],info: 'New York, California, Boston',     isOrigin: false, color: '#3498DB' },
    { name: 'UK',        code: 'gb', coords: [51.5074,  -0.1278], info: 'London, Manchester, Birmingham',   isOrigin: false, color: '#9B59B6' },
    { name: 'Japan',     code: 'jp', coords: [35.6762,  139.6503],info: 'Tokyo, Osaka, Kyoto',              isOrigin: false, color: '#E74C3C' },
    { name: 'New Zealand', code: 'nz', coords: [-36.8485, 174.7633], info: 'Auckland, Wellington, Christchurch', isOrigin: false, color: '#27AE60' }
  ];

  // CSS for map elements
  var markerStyle = document.createElement('style');
  markerStyle.textContent = [
    '.custom-marker, .plane-marker { background:transparent!important; border:none!important; }',
    /* Origin pin — gold ring, flag fills circle */
    '.origin-pin { width:58px; height:58px; border-radius:50%; overflow:hidden; border:4px solid #FFD700; outline:3px solid #fff; box-shadow:0 0 0 7px rgba(255,215,0,0.3),0 4px 22px rgba(0,0,0,0.5); animation:originPulse 2s ease-in-out infinite; cursor:pointer; }',
    '.origin-pin img { width:100%; height:100%; object-fit:cover; display:block; }',
    /* Dest pin — colored ring, flag fills circle */
    '.dest-pin { width:50px; height:50px; border-radius:50%; overflow:hidden; border:3px solid #fff; box-shadow:0 4px 18px rgba(0,0,0,0.4); animation:destPulseAnim 2.5s ease-in-out infinite; cursor:pointer; position:relative; }',
    '.dest-pin img { width:100%; height:100%; object-fit:cover; display:block; }',
    '.dest-pin::after { content:""; position:absolute; inset:-10px; border-radius:50%; border:2.5px solid rgba(255,255,255,0.55); animation:ringExpand 2.5s ease-out infinite; pointer-events:none; }',
    '.country-label { font-family:Poppins,sans-serif; font-weight:700; font-size:11px; color:#fff; background:rgba(0,20,60,0.9); padding:5px 12px; border-radius:20px; white-space:nowrap; text-align:center; backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.18); box-shadow:0 4px 14px rgba(0,0,0,0.4); letter-spacing:0.4px; pointer-events:none; display:flex; align-items:center; gap:5px; }',
    '.country-label img { width:16px; height:11px; object-fit:cover; border-radius:2px; flex-shrink:0; }',
    '@keyframes originPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 7px rgba(255,215,0,0.3),0 4px 22px rgba(0,0,0,0.5);} 50%{transform:scale(1.13);box-shadow:0 0 0 13px rgba(255,215,0,0.1),0 6px 28px rgba(0,0,0,0.55);} }',
    '@keyframes destPulseAnim { 0%,100%{transform:scale(1)} 50%{transform:scale(1.11)} }',
    '@keyframes ringExpand { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.7);opacity:0} }',
    '.plane-marker { pointer-events:none; z-index:1000!important; }',
    '.plane-marker svg { filter:drop-shadow(3px 4px 8px rgba(0,0,0,0.7)); }',
    '.leaflet-popup-content-wrapper { border-radius:16px; font-family:Poppins,sans-serif; box-shadow:0 12px 40px rgba(0,0,0,0.25); border-top:4px solid #CC0000; padding:0; overflow:hidden; }',
    '.leaflet-popup-content { margin:0; }',
    '.leaflet-popup-tip { background:white; }',
    '.flight-path { animation:dashMove 25s linear infinite; }',
    '@keyframes dashMove { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }',
    '.contrail-line { pointer-events:none; }'
  ].join('\n');
  document.head.appendChild(markerStyle);

  var FLAG_BASE = 'https://flagcdn.com/';

  function createOriginIcon(code) {
    return L.divIcon({
      html: '<div class="origin-pin"><img src="' + FLAG_BASE + 'w80/' + code + '.png" alt="' + code + '"></div>',
      className: 'custom-marker',
      iconSize: [58, 58], iconAnchor: [29, 29], popupAnchor: [0, -34]
    });
  }

  function createDestIcon(code, color, name) {
    return L.divIcon({
      html: '<div class="dest-pin" style="outline:3px solid ' + color + ';box-shadow:0 0 0 6px ' + color + '44,0 4px 18px rgba(0,0,0,0.4)">' +
              '<img src="' + FLAG_BASE + 'w80/' + code + '.png" alt="' + name + '">' +
            '</div>',
      className: 'custom-marker',
      iconSize: [50, 50], iconAnchor: [25, 25], popupAnchor: [0, -30]
    });
  }

  // Add markers + country labels
  destinations.forEach(function (dest) {
    var icon = dest.isOrigin ? createOriginIcon(dest.code) : createDestIcon(dest.code, dest.color, dest.name);
    var marker = L.marker(dest.coords, { icon: icon }).addTo(map);
    marker.bindPopup(
      '<div style="font-family:Poppins,sans-serif;min-width:180px">' +
        '<img src="' + FLAG_BASE + 'w320/' + dest.code + '.png" alt="' + dest.name + '" style="width:100%;height:90px;object-fit:cover;display:block">' +
        '<div style="padding:10px 14px">' +
          '<b style="font-size:15px;color:#003F78">' + dest.name + '</b>' +
          '<p style="color:#666;font-size:12px;margin:4px 0 0">' + dest.info + '</p>' +
        '</div>' +
      '</div>'
    );
    marker.on('mouseover', function () { this.openPopup(); });
    marker.on('mouseout', function () { this.closePopup(); });

    // Country label — centered below the pin using transform
    var labelIcon = L.divIcon({
      html: '<div style="transform:translateX(-50%);white-space:nowrap;display:inline-flex;align-items:center;gap:5px;' +
              'background:rgba(0,20,60,0.9);color:#fff;padding:5px 11px;border-radius:20px;' +
              'font-family:Poppins,sans-serif;font-weight:700;font-size:11px;letter-spacing:0.3px;' +
              'border:1px solid rgba(255,255,255,0.2);box-shadow:0 3px 12px rgba(0,0,0,0.4);' +
              'pointer-events:none">' +
              '<img src="' + FLAG_BASE + 'w40/' + dest.code + '.png" alt="" ' +
                'style="width:16px;height:11px;object-fit:cover;border-radius:2px;flex-shrink:0">' +
              '<span>' + dest.name + '</span>' +
            '</div>',
      className: 'custom-marker',
      iconSize: [1, 1],
      iconAnchor: [0, -34]
    });
    L.marker(dest.coords, { icon: labelIcon, interactive: false }).addTo(map);
  });

  // Routes — colors match their destination marker
  var routes = [
    { name: 'Australia', from: [27.7172, 85.3240], to: [-33.8688, 151.2093], color: '#FF6B35', delay: 0 },
    { name: 'USA',       from: [27.7172, 85.3240], to: [40.7128,  -74.0060], color: '#3498DB', delay: 2500 },
    { name: 'UK',        from: [27.7172, 85.3240], to: [51.5074,  -0.1278],  color: '#9B59B6', delay: 5000 },
    { name: 'Japan',       from: [27.7172, 85.3240], to: [35.6762,  139.6503], color: '#E74C3C', delay: 7500 },
    { name: 'New Zealand', from: [27.7172, 85.3240], to: [-36.8485, 174.7633], color: '#27AE60', delay: 10000 }
  ];

  function generateArcPoints(from, to, numPoints, arcHeight) {
    var points = [];
    for (var i = 0; i <= numPoints; i++) {
      var t = i / numPoints;
      var lat = from[0] + (to[0] - from[0]) * t;
      var lng = from[1] + (to[1] - from[1]) * t;
      var arc = arcHeight * Math.sin(Math.PI * t);
      lat += arc;
      points.push([lat, lng]);
    }
    return points;
  }

  // Draw colorful dashed route lines
  routes.forEach(function (route) {
    var arcH = 7;
    var pts = generateArcPoints(route.from, route.to, 80, arcH);
    
    // Glow line
    L.polyline(pts, {
      color: route.color,
      weight: 8,
      opacity: 0.18,
      lineCap: 'round',
      className: 'flight-path'
    }).addTo(map);

    // Main dashed line
    L.polyline(pts, {
      color: route.color,
      weight: 3,
      opacity: 0.9,
      dashArray: '12, 8',
      className: 'flight-path',
      lineCap: 'round'
    }).addTo(map);
  });

  // Realistic plane SVG
  function createPlaneIcon(color, angle) {
    var id1 = 'bg' + Math.random().toString(36).substr(2, 6);
    return L.divIcon({
      html: '<div style="transform:rotate(' + angle + 'deg);transform-origin:center;width:44px;height:44px">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="44" height="44">' +
        '<defs><linearGradient id="' + id1 + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
        '<stop offset="0%" stop-color="#e8eef5"/><stop offset="50%" stop-color="#ffffff"/><stop offset="100%" stop-color="#c8d4e4"/>' +
        '</linearGradient></defs>' +
        '<ellipse cx="32" cy="32" rx="24" ry="7.5" fill="url(#' + id1 + ')" stroke="#aaa" stroke-width="0.6"/>' +
        '<path d="M56 32 Q62 32 56 28.5 L56 35.5 Q62 32 56 32Z" fill="#e0e8f2" stroke="#aaa" stroke-width="0.4"/>' +
        '<path d="M8 32 Q4 32 6 28 L10 30 Z" fill="#c8d4e4" stroke="#aaa" stroke-width="0.4"/>' +
        '<path d="M8 32 Q4 32 6 36 L10 34 Z" fill="#c8d4e4" stroke="#aaa" stroke-width="0.4"/>' +
        '<path d="M28 32 L16 8 L19 8 L35 28 Z" fill="#d8e4f2" stroke="#99a" stroke-width="0.6" opacity="0.9"/>' +
        '<path d="M28 32 L16 56 L19 56 L35 36 Z" fill="#d8e4f2" stroke="#99a" stroke-width="0.6" opacity="0.9"/>' +
        '<rect x="15" y="7" width="3.5" height="2" rx="1" fill="#cc0000" transform="rotate(-12,16.5,8)"/>' +
        '<rect x="15" y="55" width="3.5" height="2" rx="1" fill="#cc0000" transform="rotate(12,16.5,56)"/>' +
        '<path d="M14 32 L9 21 L11 21 L16 30 Z" fill="#d0dce8" stroke="#99a" stroke-width="0.5" opacity="0.85"/>' +
        '<path d="M14 32 L9 43 L11 43 L16 34 Z" fill="#d0dce8" stroke="#99a" stroke-width="0.5" opacity="0.85"/>' +
        '<path d="M12 32 Q8 25 12 23 L15 28 Z" fill="#003580" stroke="#002060" stroke-width="0.4"/>' +
        '<ellipse cx="24" cy="21" rx="5.5" ry="2.5" fill="#2a2a2a" stroke="#111" stroke-width="0.4"/>' +
        '<ellipse cx="24" cy="43" rx="5.5" ry="2.5" fill="#2a2a2a" stroke="#111" stroke-width="0.4"/>' +
        '<ellipse cx="20" cy="21" rx="2.2" ry="2" fill="#444"/>' +
        '<ellipse cx="20" cy="43" rx="2.2" ry="2" fill="#444"/>' +
        '<ellipse cx="29" cy="21" rx="2" ry="1.4" fill="#ff7700" opacity="0.8"/>' +
        '<ellipse cx="29" cy="43" rx="2" ry="1.4" fill="#ff7700" opacity="0.8"/>' +
        '<path d="M12 29 L52 29 L52 30.5 L12 30.5 Z" fill="#003580" opacity="0.75"/>' +
        '<path d="M12 33.5 L52 33.5 L52 35 L12 35 Z" fill="#CC0000" opacity="0.75"/>' +
        '<ellipse cx="52" cy="30" rx="2.8" ry="1.8" fill="#87CEEB" stroke="#789" stroke-width="0.3" opacity="0.9"/>' +
        '<ellipse cx="52" cy="34" rx="2.8" ry="1.8" fill="#87CEEB" stroke="#789" stroke-width="0.3" opacity="0.9"/>' +
        '<g opacity="0.75">' +
        '<rect x="22" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="26" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="30" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="34" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="38" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="42" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '<rect x="46" y="27" width="2.2" height="1.4" rx="0.5" fill="#87CEEB"/>' +
        '</g>' +
        '</svg></div>',
      className: 'plane-marker',
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  }

  // Animate planes
  function animatePlaneOnRoute(route) {
    var arcH = 7;
    var totalPoints = 140;
    var arcPts = generateArcPoints(route.from, route.to, totalPoints, arcH);
    var arcPtsBack = arcPts.slice().reverse();
    var allPts = arcPts.concat(arcPtsBack);
    var plane = null;
    var contrailPoints = [];
    var contrailLayer = null;
    var speed = 0.45;
    var lastTimestamp = null;
    var fractIdx = 0;
    var totalLen = allPts.length;

    function getAngle(p1, p2) {
      if (!p1 || !p2) return 0;
      return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI - 90;
    }

    function step(ts) {
      if (!lastTimestamp) lastTimestamp = ts;
      var delta = ts - lastTimestamp;
      lastTimestamp = ts;
      fractIdx += speed * (delta / 16.67);
      if (fractIdx >= totalLen - 1) fractIdx = 0;
      var i = Math.floor(fractIdx);
      var i2 = (i + 1) % totalLen;
      var t = fractIdx - i;
      var p1 = allPts[i], p2 = allPts[i2];
      var lat = p1[0] + (p2[0] - p1[0]) * t;
      var lng = p1[1] + (p2[1] - p1[1]) * t;
      var angle = getAngle(p1, p2);

      var newIcon = createPlaneIcon(route.color, angle);
      if (!plane) {
        plane = L.marker([lat, lng], { icon: newIcon, zIndexOffset: 1000 }).addTo(map);
      } else {
        plane.setLatLng([lat, lng]);
        plane.setIcon(newIcon);
      }

      contrailPoints.push([lat, lng]);
      if (contrailPoints.length > 22) contrailPoints.shift();
      if (contrailLayer) map.removeLayer(contrailLayer);
      if (contrailPoints.length > 2) {
        contrailLayer = L.polyline(contrailPoints, {
          color: 'rgba(255,255,255,0.6)',
          weight: 2,
          opacity: 0.4,
          lineCap: 'round',
          className: 'contrail-line'
        }).addTo(map);
      }
      requestAnimationFrame(step);
    }
    setTimeout(function () { requestAnimationFrame(step); }, route.delay);
  }

  routes.forEach(function (route) { animatePlaneOnRoute(route); });

  var allCoords = destinations.map(function (d) { return d.coords; });
  map.fitBounds(allCoords, { padding: [50, 50] });

  // ============ REQUIREMENTS ACCORDION ==========
  var requirementCards = document.querySelectorAll('.svc-card');
  if (requirementCards.length) {
    requirementCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var isOpen = card.classList.contains('open');
        requirementCards.forEach(function (c) { c.classList.remove('open'); });
        if (!isOpen) card.classList.add('open');
      });
    });
  }
})();

/* ============================================================
   SITE-WIDE ANIMATION ENGINE
   ============================================================ */
(function () {
  'use strict';

  /* ── Page progress bar ── */
  var progressBar = document.createElement('div');
  progressBar.id = 'page-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', function () {
    var pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── Scroll-reveal with IntersectionObserver ── */
  var revSelectors = [
    '.rv','.rv-up','.rv-left','.rv-right','.rv-scale','.rv-flip','.rv-zoom',
    '.anim-grid','.anim-fadeup','.reveal-left','.reveal-right','.reveal-card',
    '.framework-card','.fw-card','.why-card','.country-card',
    '.svc-card','.stat-item','.step-item',
    '.two-col > *'
  ].join(',');

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(revSelectors).forEach(function (el) {
        el.classList.add('on');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          /* handle anim-grid children */
          if (e.target.classList.contains('anim-grid')) {
            Array.from(e.target.children).forEach(function (child, i) {
              setTimeout(function () {
                child.style.opacity = '1';
                child.style.transform = 'none';
              }, i * 80);
            });
          }
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(revSelectors).forEach(function (el) {
      /* skip if already visible */
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('on');
        return;
      }
      /* add reveal class if not already in CSS */
      if (!el.classList.contains('rv') && !el.classList.contains('rv-up') &&
          !el.classList.contains('rv-left') && !el.classList.contains('rv-right')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(36px)';
        el.style.transition = 'opacity .7s ease, transform .7s ease';
      }
      io.observe(el);
    });

    /* footer 3D animation */
    var footerGrid = document.querySelector('.footer-grid');
    if (footerGrid) {
      var footerEl = footerGrid.closest('.footer');
      if (footerEl) footerEl.classList.add('footer-anim'); /* initial hidden state */

      function showFooter() {
        if (!footerEl || footerEl._ftFired) return;
        footerEl._ftFired = true;
        footerEl.classList.add('footer-anim-on');
      }

      if ('IntersectionObserver' in window) {
        var fObs = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { showFooter(); fObs.disconnect(); }
        }, { threshold: 0.05 });
        fObs.observe(footerGrid);
      } else {
        showFooter();
      }
      /* safety fallback */
      setTimeout(showFooter, 3500);
    }

    /* reviews 3D animation */
    var reviewsSec = document.querySelector('.reviews-sec');
    if (reviewsSec) {
      reviewsSec.classList.add('reviews-sec-anim');

      function showReviews() {
        if (reviewsSec._rvFired) return;
        reviewsSec._rvFired = true;
        reviewsSec.classList.add('rv-on');
      }

      if ('IntersectionObserver' in window) {
        var rvObs = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) { showReviews(); rvObs.disconnect(); }
        }, { threshold: 0.1 });
        rvObs.observe(reviewsSec);
      } else {
        showReviews();
      }
      /* safety fallback */
      setTimeout(showReviews, 4000);
    }

    /* CTA section 3D animation */
    var ctaSec = document.querySelector('.cta-sec');
    if (ctaSec) {
      ctaSec.classList.add('cta-sec-anim');

      function showCTA() {
        if (ctaSec._ctaFired) return;
        ctaSec._ctaFired = true;
        ctaSec.classList.add('cta-on');
      }

      if ('IntersectionObserver' in window) {
        var ctaObs = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) { showCTA(); ctaObs.disconnect(); }
        }, { threshold: 0.15 });
        ctaObs.observe(ctaSec);
      } else {
        showCTA();
      }
      setTimeout(showCTA, 4500);
    }
  }
  initReveal();

  /* ── 3D mouse-tilt on all cards ── */
  function initTilt() {
    var cards = document.querySelectorAll(
      '.fw-card,.why-card,.country-card,.svc-card,.rev-card,.framework-card,.f-col'
    );
    cards.forEach(function (card) {
      card.classList.add('card-3d');
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width  - 0.5;
        var y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = 'translateY(-10px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }
  initTilt();

  /* ── Ripple effect on all buttons ── */
  function initRipple() {
    document.querySelectorAll('.btn-primary,.btn-white,.btn-consult,.btn-outline-white').forEach(function (btn) {
      btn.classList.add('btn-ripple');
      btn.addEventListener('click', function (e) {
        var rpl = document.createElement('span');
        rpl.className = 'rpl';
        var r = btn.getBoundingClientRect();
        var size = Math.max(r.width, r.height) * 2;
        rpl.style.cssText = 'width:' + size + 'px;height:' + size + 'px;' +
          'left:' + (e.clientX - r.left - size / 2) + 'px;' +
          'top:'  + (e.clientY - r.top  - size / 2) + 'px;';
        btn.appendChild(rpl);
        setTimeout(function () { rpl.remove(); }, 700);
      });
    });
  }
  initRipple();

  /* ── Shimmer on service/country cards ── */
  document.querySelectorAll('.country-card,.svc-card,.framework-card,.fw-card').forEach(function (c) {
    c.classList.add('shimmer-card');
  });

  /* ── Animated section background orbs (auto-inject) ── */
  function addOrbs(section, colors) {
    if (section.querySelector('.orb-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'orb-wrap';
    colors.forEach(function (cfg, i) {
      var orb = document.createElement('div');
      orb.className = 'orb-' + ['a','b','c'][i % 3];
      orb.style.cssText = 'width:' + cfg.size + 'px;height:' + cfg.size + 'px;' +
        'background:radial-gradient(circle,' + cfg.color + ' 0%,transparent 70%);' +
        'top:' + cfg.top + ';left:' + cfg.left + ';' +
        'animation-duration:' + (10 + i * 3) + 's;animation-delay:-' + (i * 2.5) + 's;';
      wrap.appendChild(orb);
    });
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    section.insertBefore(wrap, section.firstChild);
  }

  /* inject orbs into plain white/gray sections */
  document.querySelectorAll('.section:not(.page-hero)').forEach(function (sec, i) {
    var bg = window.getComputedStyle(sec).background;
    addOrbs(sec, [
      { size:500, color:'rgba(0,61,153,.06)',  top:'-150px', left:'-100px' },
      { size:380, color:'rgba(204,0,0,.05)',   top:'40%',    left:'60%'   },
      { size:280, color:'rgba(0,120,255,.04)', top:'70%',    left:'10%'   }
    ]);
  });

  /* ── Animated counters (trigger on scroll) ── */
  var countersDone = false;
  function runCounters() {
    if (countersDone) return;
    var els = document.querySelectorAll('[data-target]');
    if (!els.length) return;
    countersDone = true;
    els.forEach(function (el) {
      var target = +el.getAttribute('data-target') || 0;
      var dur = 2000, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(step);
    });
  }
  var statsSection = document.querySelector('.stats-sec,.va-stats,.stat-item,[data-target]');
  if (statsSection) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { runCounters(); }
    }, { threshold: 0.3 }).observe(statsSection);
  }

  /* ── Animated underline on section h2/h3 ── */
  document.querySelectorAll('.section h2,.va-why h2,.sec-h2,.intro-h2,.why-h2').forEach(function (h) {
    h.classList.add('anim-underline');
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { h.classList.add('on'); }
    }, { threshold: 0.5 }).observe(h);
  });

  /* ── Section dividers ── */
  document.querySelectorAll('.section + .section, .va-why + .va-fw, .va-intro + .va-why').forEach(function (sec) {
    var hr = document.createElement('hr');
    hr.className = 'section-divider';
    sec.parentNode.insertBefore(hr, sec);
  });

  /* ── Pulse on CTA buttons ── */
  document.querySelectorAll('.cta-sec .btn-white, .cta-sec .btn-primary').forEach(function (b) {
    b.classList.add('pulse-btn');
  });

  /* ── Float animation on badges/icons ── */
  document.querySelectorAll('.va-img-badge,.hero-badge,.framework-badge,.fw-badge').forEach(function (el) {
    el.classList.add('float-anim');
  });

  /* ── Particle canvas on hero sections ── */
  function initParticles() {
    var hero = document.querySelector('.hero,.page-hero');
    if (!hero) return;
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.4';
    hero.style.position = 'relative';
    hero.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var particles = [];
    var W, H;

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (var i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(0.3 + Math.random() * 0.6),
        r:  1 + Math.random() * 2.5,
        a:  0.1 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? 'rgba(255,255,255,' : 'rgba(204,0,0,'
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.a + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
  initParticles();

  /* ── Mouse parallax on page-hero orbs ── */
  var pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    pageHero.addEventListener('mousemove', function (e) {
      var orbs = pageHero.querySelectorAll('.orb-wrap > *, [style*="orbFloat"]');
      var cx = pageHero.offsetWidth  / 2;
      var cy = pageHero.offsetHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      orbs.forEach(function (orb, i) {
        var depth = (i + 1) * 12;
        orb.style.transform = 'translate(' + (dx * depth) + 'px,' + (dy * depth) + 'px)';
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Nav link active highlight on scroll ── */
  var sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    var navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function () {
      var pos = window.scrollY + 120;
      sections.forEach(function (sec) {
        var top = sec.offsetTop, bot = top + sec.offsetHeight;
        if (pos >= top && pos < bot) {
          var id = sec.getAttribute('id');
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { passive: true });
  }

  /* ── Tag labels bounce-in ── */
  document.querySelectorAll('.tag-label,.sec-label,.intro-tag,.why-tag,.section-tag').forEach(function (el) {
    el.classList.add('bounce-in');
  });

})(); /* end animation engine */

/* ════════════════════════════════════════════════════
   UNIVERSAL 3D ANIMATION ENGINE
   Runs on EVERY page — no HTML changes needed
   ════════════════════════════════════════════════════ */
(function() {

  /* ── 1. Mouse-tracking 3D tilt for ALL card types ── */
  var TILT_MAP = [
    { sel:'.reveal-card',     max:12, sc:1.04 },
    { sel:'.svc-card',        max:12, sc:1.04 },
    { sel:'.country-card',    max:10, sc:1.03 },
    { sel:'.stat-box',        max:8,  sc:1.06 },
    { sel:'.goal-item',       max:8,  sc:1.03 },
    { sel:'.why-card',        max:10, sc:1.04 },
    { sel:'.fw-card',         max:10, sc:1.03 },
    { sel:'.step-card',       max:8,  sc:1.03 },
    { sel:'.rev-card',        max:6,  sc:1.02 },
    { sel:'.ci-item',         max:8,  sc:1.03 },
    { sel:'.va-img-wrap',     max:6,  sc:1.02 },
    { sel:'.col-img',         max:5,  sc:1.01 }
  ];

  TILT_MAP.forEach(function(t) {
    document.querySelectorAll(t.sel).forEach(function(card) {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange     = 'transform';
      card.addEventListener('mousemove', function(e) {
        var r  = card.getBoundingClientRect();
        var x  = (e.clientX - r.left)  / r.width  - 0.5;
        var y  = (e.clientY - r.top)   / r.height - 0.5;
        var rx = (-y * t.max).toFixed(2);
        var ry = ( x * t.max).toFixed(2);
        card.style.transition = 'transform .08s ease, box-shadow .3s ease';
        card.style.transform  = 'perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) scale('+t.sc+')';
        card.style.boxShadow  = '0 '+(Math.abs(y)*40+16)+'px '+(Math.abs(x)*50+30)+'px rgba(0,31,77,.2)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease';
        card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow  = '';
      });
    });
  });

  /* ── 2. Universal scroll-reveal with 3D variants ── */
  var variants = ['s3d-flip','s3d-flipY','s3d-rise','s3d-zoom','s3d-swing','s3d-left','s3d-right','s3d-up'];

  /* Auto-assign 3D reveal classes to every card/item that doesn't already have one */
  var AUTO_3D = [
    '.reveal-card','.svc-card','.country-card','.stat-box','.goal-item',
    '.why-card','.fw-card','.step-card','.zz-card','.ci-item',
    '.sec-header','.two-col','.va-img-wrap','.intro-grid','.step-item'
  ];

  AUTO_3D.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el, idx) {
      if (variants.some(function(v){ return el.classList.contains(v); })) return;
      if (el.classList.contains('on') || el.classList.contains('rv')) return;
      var v = variants[idx % variants.length];
      el.classList.add(v);
      el.style.transitionDelay = (idx % 6) * 0.09 + 's';
    });
  });

  /* Observe all 3D reveal elements */
  var revealEls = document.querySelectorAll('.s3d-flip,.s3d-flipY,.s3d-rise,.s3d-zoom,.s3d-swing,.s3d-left,.s3d-right,.s3d-up');
  if (revealEls.length) {
    var revIO = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          revIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el) { revIO.observe(el); });
  }

  /* Also trigger existing .rv classes ── */
  document.querySelectorAll('.rv,.rv-up,.rv-left,.rv-right,.rv-scale,.rv-flip,.rv-zoom').forEach(function(el) {
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { entries[0].target.classList.add('on'); }
    }, { threshold: 0.1 }).observe(el);
  });

  /* ── 3. Auto grid-3d stagger on card grids ── */
  var GRID_SELS = ['.services-grid','.countries-grid','.stats-grid','.why-grid','.zz-grid','.mvs-grid','.ssw-fields-grid'];
  GRID_SELS.forEach(function(sel) {
    var grids = document.querySelectorAll(sel);
    grids.forEach(function(g) {
      g.classList.add('grid-3d');
      new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { g.classList.add('on'); }
      }, { threshold: 0.1 }).observe(g);
    });
  });

  /* ── 4. 3D parallax floating orbs injected into every hero/banner ── */
  var ORB_TARGETS = ['.page-hero','.hero','.cta-sec','.stats-bar','.va-why','.va-intro'];
  ORB_TARGETS.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(hero) {
      if (hero.querySelector('.u3d-orb')) return; /* already added */
      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0';
      var orbDefs = [
        { w:350, h:350, t:'-100px', l:'5%',  bg:'rgba(255,255,255,.05)', dur:'11s', delay:'0s'  },
        { w:220, h:220, t:'55%',    l:'80%', bg:'rgba(255,215,0,.07)',   dur:'14s', delay:'2s'  },
        { w:160, h:160, t:'30%',    l:'60%', bg:'rgba(204,0,0,.06)',     dur:'8s',  delay:'4s'  },
        { w:120, h:120, t:'75%',    l:'12%', bg:'rgba(0,180,255,.06)',   dur:'16s', delay:'1s'  },
        { w:90,  h:90,  t:'10%',    l:'45%', bg:'rgba(255,255,255,.04)', dur:'9s',  delay:'3s'  }
      ];
      orbDefs.forEach(function(o, i) {
        var orb = document.createElement('div');
        orb.className = 'u3d-orb';
        orb.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;filter:blur(38px);'
          +'width:'+o.w+'px;height:'+o.h+'px;top:'+o.t+';left:'+o.l+';'
          +'background:radial-gradient(circle,'+o.bg+' 0%,transparent 70%);'
          +'animation:orbDrift'+(1+i%3)+' '+o.dur+' ease-in-out infinite '+o.delay;
        wrap.appendChild(orb);
      });
      if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
      hero.insertBefore(wrap, hero.firstChild);
    });
  });

  /* ── 5. Section headings — 3D entrance when scrolled in ── */
  document.querySelectorAll('h2,h3').forEach(function(h) {
    if (h.dataset.anim3d) return;
    h.dataset.anim3d = '1';
    h.style.transition = 'opacity .7s ease, transform .7s ease';
    h.style.opacity    = '0';
    h.style.transform  = 'perspective(700px) rotateX(22deg) translateY(30px)';
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        h.style.opacity   = '1';
        h.style.transform = 'perspective(700px) rotateX(0deg) translateY(0)';
      }
    }, { threshold: 0.25 }).observe(h);
  });

  /* ── 6. Floating 3D animation on images ── */
  document.querySelectorAll('.col-img img, .goals-imgs img, .va-img-wrap img').forEach(function(img, i) {
    img.style.animation = (i % 2 === 0 ? 'float3dA' : 'float3dB') + ' ' + (5 + i) + 's ease-in-out infinite';
    img.style.borderRadius = img.style.borderRadius || '16px';
  });

  /* ── 7. Stats bar icons — spin-in when visible ── */
  var statsBar = document.querySelector('.stats-bar,.stats-sec');
  if (statsBar) {
    new IntersectionObserver(function(entries) {
      if (!entries[0].isIntersecting) return;
      statsBar.querySelectorAll('.stat-ico,.stat-box .svc-icon').forEach(function(ico, i) {
        ico.style.animation = 'none';
        setTimeout(function() {
          ico.style.animation = 'spinY3d 0.7s cubic-bezier(.34,1.56,.64,1) forwards';
        }, i * 130);
      });
    }, { threshold: 0.3 }).observe(statsBar);
  }

  /* ── 8. Mouse parallax depth on section backgrounds ── */
  document.querySelectorAll('.section, .va-why, .va-intro, .va-fw').forEach(function(sec) {
    sec.addEventListener('mousemove', function(e) {
      var r  = sec.getBoundingClientRect();
      var dx = (e.clientX - r.left  - r.width  / 2) / r.width;
      var dy = (e.clientY - r.top   - r.height / 2) / r.height;
      sec.querySelectorAll('.u3d-orb').forEach(function(orb, i) {
        var d = (i + 1) * 18;
        orb.style.transform = 'translate('+(dx*d)+'px,'+(dy*d)+'px)';
      });
    });
    sec.addEventListener('mouseleave', function() {
      sec.querySelectorAll('.u3d-orb').forEach(function(orb) {
        orb.style.transform = '';
      });
    });
  });

  /* ── 9. 3D depth bounce on CTA buttons ── */
  document.querySelectorAll('.btn-primary,.btn-white,.btn-consult,.btn-outline-white').forEach(function(btn) {
    btn.style.transformStyle = 'preserve-3d';
    btn.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease';
    btn.addEventListener('mouseenter', function() {
      btn.style.transform  = 'perspective(500px) rotateX(-8deg) translateY(-4px) scale(1.06)';
      btn.style.boxShadow  = '0 16px 36px rgba(0,31,77,.25), 0 6px 12px rgba(0,0,0,.15)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform  = 'perspective(500px) rotateX(0) translateY(0) scale(1)';
      btn.style.boxShadow  = '';
    });
  });

  /* ── 10. Shimmer on service & reveal cards ── */
  document.querySelectorAll('.svc-card,.reveal-card,.why-card').forEach(function(card) {
    card.classList.add('shimmer-card');
  });

})(); /* end universal 3D engine */

// ============ WHY CHOOSE US — SLIDE IN FROM SIDES ============
(function() {
  var targets = document.querySelectorAll('.slide-from-left, .slide-from-right');
  if (!targets.length || !window.IntersectionObserver) {
    targets.forEach(function(el) { el.classList.add('in-view'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = el.classList.contains('slide-from-right') ? 150 : 0;
        setTimeout(function() { el.classList.add('in-view'); }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(function(el) { observer.observe(el); });
})();
