(function () { 
  const data = window.MR_DATA; 
  const base = document.body.dataset.base || "."; 
  const current = document.body.dataset.page || ""; 
 
  const navItems = [ 
    ["home", "Home", "index.html"], 
    ["club", "Our club", "club.html"], 
    ["team", "Team", "member.html"], 
    ["news", "News", "news.html"], 
    ["gallery", "Gallery", "gallery.html"], 
    ["contact", "Contact", "contact.html"], 
  ]; 
 
  function path(file) { 
    return `${base}/${file}`; 
  } 
 
  function icon(name) { 
    const icons = { 
      arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>', 
      menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>', 
      close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>', 
      pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>', 
      mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>', 
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-6.5-4.5-8-8l2-2-2-4Z"/></svg>' 
    }; 
 
    return icons[name] || ""; 
  } 
 
  const header = document.querySelector("[data-site-header]"); 
 
  if (header) { 
    header.innerHTML = ` 
      <div class="utility-bar"> 
        <div class="shell utility-inner"> 
          <span>${icon("pin")} ${data.club.location}</span> 
          <span class="utility-motto">Faith · Growth · Excellence · Integrity · Teamwork</span> 
          <span>Est. ${data.club.founded}</span> 
        </div> 
      </div> 
 
      <header class="site-header"> 
        <div class="shell nav-shell"> 
 
          <a class="brand" href="${path("index.html")}" aria-label="Matsapha Roses home"> 
            <img src="${path("public/assets/brand/matsapha-roses-logo.jpeg")}" alt="Matsapha Roses Football Club crest"> 
            <span> 
              <strong>Matsapha</strong> 
              <small>Roses FC</small> 
            </span> 
          </a> 
 
          <nav class="main-nav" id="main-navigation" aria-label="Main navigation"> 
 
            ${navItems.map(([key, label, file]) => ` 
              <a  
                href="${path(file)}" 
                ${key === current ? 'aria-current="page"' : ""} 
              > 
                ${label} 
              </a> 
            `).join("")} 
 
            <a  
              class="button button-small button-gold"  
              href="${path("partner.html")}" 
            > 
              Partner with us ${icon("arrow")} 
            </a> 
 
          </nav> 
 
          <button  
            class="nav-toggle"  
            type="button"  
            aria-expanded="false"  
            aria-controls="main-navigation"  
            aria-label="Open navigation" 
          > 
            <span class="toggle-open">${icon("menu")}</span> 
            <span class="toggle-close">${icon("close")}</span> 
          </button> 
 
        </div> 
      </header> 
    `; 
 
    const toggle = header.querySelector(".nav-toggle"); 
    const nav = header.querySelector(".main-nav"); 
 
    toggle.addEventListener("click", function () { 
      const isOpen = toggle.getAttribute("aria-expanded") === "true"; 
 
      toggle.setAttribute("aria-expanded", String(!isOpen)); 
      nav.classList.toggle("is-open", !isOpen); 
      document.body.classList.toggle("nav-open", !isOpen); 
    }); 
  } 
 
  const sponsorsMount = document.querySelector("[data-site-sponsors]") || (() => {
    const node = document.createElement("div");
    node.setAttribute("data-site-sponsors", "");
    const footerHost = document.querySelector("[data-site-footer]");
    if (footerHost && footerHost.parentNode) {
      footerHost.parentNode.insertBefore(node, footerHost);
    } else {
      document.body.appendChild(node);
    }
    return node;
  })();

  if (sponsorsMount && Array.isArray(data.sponsors) && data.sponsors.length) {
    sponsorsMount.innerHTML = `
      <section class="sponsors-section" aria-label="Our sponsors">
        <div class="shell">
          <div class="sponsors-heading">
            <p class="eyebrow">Proudly supported by</p>
            <h2>Our <span>partners.</span></h2>
          </div>
          <div class="sponsors-grid">
            ${data.sponsors.map((sponsor) => `
              <div class="sponsor-logo" title="${sponsor.name}">
                <img src="${encodeURI(path(sponsor.logo))}" alt="${sponsor.name} logo" loading="lazy">
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  const footer = document.querySelector("[data-site-footer]"); 
 
  if (footer) { 
    footer.innerHTML = ` 
      <footer class="site-footer"> 
        <div class="shell footer-grid"> 
 
          <div class="footer-brand"> 
            <a class="brand brand-light" href="${path("index.html")}"> 
              <img src="${path("public/assets/brand/matsapha-roses-logo.jpeg")}" alt=""> 
              <span> 
                <strong>Matsapha</strong> 
                <small>Roses FC</small> 
              </span> 
            </a> 
 
            <p> 
              Developing talented players and future leaders through football, 
              mentorship, and community impact. 
            </p> 
          </div> 
 
          <div> 
            <p class="footer-heading">Explore</p> 
 
            <div class="footer-links"> 
              <a href="${path("club.html")}">Our club</a> 
              <a href="${path("members.html")}">Team profiles</a> 
              <a href="${path("news.html")}">News</a> 
              <a href="${path("gallery.html")}">Gallery</a> 
              <a href="${path("contact.html")}">Contact</a> 
            </div> 
          </div> 
 
          <div> 
            <p class="footer-heading">Contact</p> 
 
            <div class="footer-links footer-contact"> 
              <a href="tel:+26876296932"> 
                ${icon("phone")} ${data.club.phone} 
              </a> 
 
              <a href="mailto:${data.club.email}"> 
                ${icon("mail")} ${data.club.email} 
              </a> 
 
              <span> 
                ${icon("pin")} ${data.club.location} 
              </span> 
            </div> 
          </div> 
 
          <div class="footer-cta"> 
            <p class="footer-heading">Be part of the movement</p> 
 
            <p> 
              Support the next chapter of excellence, on and off the pitch. 
            </p> 
 
            <a  
              class="text-link text-link-gold"  
              href="${path("contact.html")}" 
            > 
              Start a conversation ${icon("arrow")} 
            </a> 
          </div> 
 
        </div> 
 
        <div class="shell footer-bottom"> 
          <span> 
            © <span data-current-year></span> Matsapha Roses Football Club 
          </span> 
 
          <a href="${path("admin/index.html")}"> 
            Administration 
          </a> 
        </div> 
      </footer> 
    `; 
  } 
 
  document.querySelectorAll("[data-current-year]").forEach((node) => { 
    node.textContent = new Date().getFullYear(); 
  }); 
 
  const observer = "IntersectionObserver" in window 
    ? new IntersectionObserver((entries) => { 
        entries.forEach((entry) => { 
          if (entry.isIntersecting) { 
            entry.target.classList.add("is-visible"); 
            observer.unobserve(entry.target); 
          } 
        }); 
      }, { threshold: 0.12 }) 
    : null; 
 
  document.querySelectorAll("[data-reveal]").forEach((node) => { 
    if (observer) { 
      observer.observe(node); 
    } else { 
      node.classList.add("is-visible"); 
    } 
  }); 
 
  window.MR = { path, icon }; 
})();