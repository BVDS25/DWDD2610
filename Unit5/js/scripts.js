  document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("menuList");

    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !expanded);
      menuButton.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Optional: close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  });

// Reviews fetch & render


  (function () {
    const REVIEWS_JSON = '/data/reviews.js'; // update path if different
    const grid = document.getElementById('reviewsGrid');
    const loadMoreBtn = document.getElementById('loadMoreReviews');

    // render star SVG (filled star)
    function starSVG() {
      return `<svg class="star" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="M10 1.6l1.9 4.2 4.6.4-3.4 2.9.9 4.6L10 12.8 5.9 14.7l.9-4.6L3.4 7.2l4.6-.4L10 1.6z"></path>
      </svg>`;
    }

    // create initials from name
    function initials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).slice(0,2).join('');
    }

    // sanitize text to avoid XSS (simple approach)
    function escapeHtml(str) {
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    // render single review card
    function renderReview(r) {
      const wrapper = document.createElement('article');
      wrapper.className = 'review-card';
      wrapper.setAttribute('role','listitem');
      wrapper.tabIndex = 0; // keyboard focus affordance

      // Avatar
      const avatar = document.createElement('div');
      avatar.className = 'review-avatar';
      if (r.avatar && r.avatar.trim()) {
        const img = document.createElement('img');
        img.src = r.avatar;
        img.alt = `${escapeHtml(r.name)} avatar`;
        avatar.appendChild(img);
      } else {
        avatar.textContent = initials(r.name || 'A');
        avatar.setAttribute('aria-hidden','true');
      }

      // Body
      const body = document.createElement('div');
      body.className = 'review-body';

      const meta = document.createElement('div');
      meta.className = 'review-meta';

      const name = document.createElement('div');
      name.className = 'reviewer-name';
      name.innerHTML = escapeHtml(r.name || 'Anonymous');

      const location = document.createElement('div');
      location.className = 'reviewer-location';
      location.innerHTML = escapeHtml(r.location || '');

      meta.appendChild(name);
      if (location.textContent) {
        meta.appendChild(location);
      }

      // Stars
      const stars = document.createElement('div');
      stars.className = 'stars';
      const rating = Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0)));
      for (let i=0;i<rating;i++) stars.innerHTML += starSVG();

      // Quote
      const quote = document.createElement('p');
      quote.className = 'review-quote';
      quote.innerHTML = escapeHtml(r.quote || '');

      // Assemble
      body.appendChild(meta);
      body.appendChild(stars);
      body.appendChild(quote);

      wrapper.appendChild(avatar);
      wrapper.appendChild(body);

      return wrapper;
    }

    // main fetch & render
    fetch(REVIEWS_JSON, {cache: "no-cache"})
      .then(resp => {
        if (!resp.ok) throw new Error('Network response was not ok');
        return resp.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          grid.innerHTML = `<div class="reviews-error" role="status">No reviews available at this time.</div>`;
          return;
        }

        // render first N or all — currently render all (you can implement pagination)
        data.forEach(review => {
          const node = renderReview(review);
          grid.appendChild(node);
        });

        // If you want to implement load more / pagination in future:
        // if (data.length > 6) { loadMoreBtn.hidden = false; }
      })
      .catch(err => {
        console.error('Failed to load reviews:', err);
        grid.innerHTML = `<div class="reviews-error" role="alert">Sorry — we couldn’t load customer reviews right now. Please try again later.</div>`;
      });

  })();
