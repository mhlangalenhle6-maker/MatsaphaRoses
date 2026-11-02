(function () {
  const data = window.MR_DATA;
  const base = document.body.dataset.base || ".";
  const assetUrl = window.MR_STORE.assetUrl;
  const grid = document.querySelector("[data-member-grid]");
  const search = document.querySelector("[data-member-search]");
  const filters = document.querySelectorAll("[data-member-filter]");
  const count = document.querySelector("[data-member-count]");
  let activeFilter = "All";

  function members() {
    return window.MR_STORE ? window.MR_STORE.getMembers() : data.members;
  }

  function render() {
    const term = search.value.trim().toLowerCase();
    const results = members().filter((member) => {
      const matchesFilter = activeFilter === "All" || member.squad === activeFilter || member.role === activeFilter;
      const haystack = `${member.name} ${member.role} ${member.squad} ${member.status} ${member.number}`.toLowerCase();
      return matchesFilter && haystack.includes(term);
    });

    count.textContent = `${results.length} ${results.length === 1 ? "profile" : "profiles"}`;
    grid.innerHTML = results.length ? results.map((member) => `
      <article class="member-card member-card-large">
        <a class="member-visual ${member.photo ? "has-photo" : ""}" href="member.html?id=${member.slug}" aria-label="View ${member.name}'s profile">
          ${member.photo
            ? `<img src="${assetUrl(member.photo, base)}" alt="${member.name}">`
            : `<span class="member-monogram">${member.shortName}</span>`}
          <span class="member-number">${member.number}</span>
          <span class="member-squad">${member.squad}</span>
        </a>
        <div class="member-copy">
          <div><p class="card-kicker">${member.role}</p><h3>${member.name}</h3><p>${member.status}</p></div>
          <a class="round-link" href="member.html?id=${member.slug}" aria-label="View ${member.name}">${window.MR.icon("arrow")}</a>
        </div>
      </article>`).join("") : `
      <div class="empty-state">
        <span>00</span><h2>No profiles found</h2><p>Try a different name or squad filter.</p>
      </div>`;
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.memberFilter;
      filters.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });
  search.addEventListener("input", render);
  render();
})();
