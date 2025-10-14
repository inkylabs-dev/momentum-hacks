// Inject Indie10k branding into mdBook sidebar
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Avoid duplicate insertions on hot reloads
    if (sidebar.querySelector('.indie10k-header')) return;

    var header = document.createElement('div');
    header.className = 'indie10k-header';

    // Link to site root; uses Next.js public/logo.png
    var link = document.createElement('a');
    link.href = '/';
    link.setAttribute('aria-label', 'Indie10k Home');

    var logo = document.createElement('img');
    logo.src = '/logo.png';
    logo.alt = 'Indie10k Logo';
    logo.className = 'indie10k-logo';

    var titleWrap = document.createElement('div');
    titleWrap.className = 'indie10k-title';

    var name = document.createElement('span');
    name.className = 'indie10k-name';
    name.textContent = 'Indie10k';

    var subtitle = document.createElement('span');
    subtitle.className = 'indie10k-subtitle';
    subtitle.textContent = 'Momentum Hacks';

    titleWrap.appendChild(name);
    titleWrap.appendChild(subtitle);
    link.appendChild(logo);
    link.appendChild(titleWrap);
    header.appendChild(link);

    // Links row: Sign In / Sign Up
    var links = document.createElement('div');
    links.className = 'indie10k-links';

    var signIn = document.createElement('a');
    signIn.href = '/login';
    signIn.textContent = 'Sign In';

    var signUp = document.createElement('a');
    signUp.href = '/register';
    signUp.textContent = 'Sign Up';
    signUp.className = 'signup';

    links.appendChild(signIn);
    links.appendChild(signUp);
    header.appendChild(links);

    // Insert at the top of the sidebar, before the scrollbox
    var scrollbox = sidebar.querySelector('.sidebar-scrollbox');
    if (scrollbox && scrollbox.parentNode) {
      sidebar.insertBefore(header, scrollbox);
    } else {
      // Fallback: prepend into sidebar
      sidebar.insertBefore(header, sidebar.firstChild);
    }

    // Adjust scroll area top dynamically to exact header height
    try {
      var h = header.getBoundingClientRect().height;
      if (h && scrollbox) {
        scrollbox.style.top = h + 'px';
      }
    } catch (_) {}
  });
})();

// Inject CTA below content asking users to try Indie10k
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var content = document.querySelector('#content main');
    if (!content) return;
    if (document.querySelector('.indie10k-cta')) return;

    var cta = document.createElement('section');
    cta.className = 'indie10k-cta';

    var h = document.createElement('h1');
    h.textContent = 'Ready to start your indie journey?';

    var p = document.createElement('p');
    p.textContent = 'Join thousands of developers building their path to $10k';

    var a = document.createElement('a');
    a.href = '/register';
    a.className = 'indie10k-cta-btn';
    a.textContent = 'Try Indie10k Free';

    cta.appendChild(h);
    cta.appendChild(p);
    cta.appendChild(a);

    content.appendChild(cta);
  });
})();
