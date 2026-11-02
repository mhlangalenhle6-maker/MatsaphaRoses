(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("id") || "sandile-magagula";
  const list = window.MR_STORE ? window.MR_STORE.getMembers() : window.MR_DATA.members;
  const member = list.find((item) => item.slug === slug);
  const target = document.querySelector("[data-profile]");
  const base = document.body.dataset.base || ".";
  const assetUrl = window.MR_STORE.assetUrl;

  if (!member) {
    document.title = "Profile not found | Matsapha Roses FC";
    target.innerHTML = `<div class="shell section empty-state"><span>404</span><h1>Profile not found</h1><p>This team profile has not been published.</p><a class="button button-dark" href="members.html">View all profiles</a></div>`;
    return;
  }

  const photo = member.photo ? assetUrl(member.photo, base) : "";

  document.title = `${member.name} | Matsapha Roses FC`;
  target.innerHTML = `
    <section class="profile-hero">
      <div class="profile-field-lines" aria-hidden="true"></div>
      <div class="shell profile-hero-grid">
        <div class="profile-identity">
          <a class="back-link" href="members.html">← All team profiles</a>
          <p class="eyebrow eyebrow-light">${member.squad} · ${member.role}</p>
          <h1>${member.name}</h1>
          <p>${member.status}</p>
        </div>
        <div class="profile-portrait ${photo ? "has-photo" : ""}" aria-label="${photo ? `Photo of ${member.name}` : `Photo placeholder for ${member.name}`}">
          ${photo
            ? `<img src="${photo}" alt="${member.name}">`
            : `<span class="profile-monogram">${member.shortName}</span><small>Official photo to be added</small>`}
          <span class="profile-number">${member.number}</span>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="shell profile-body">
        <div>
          <p class="eyebrow">Profile</p>
          <h2 class="section-title section-title-small">About ${member.name}</h2>
          <p class="profile-bio">${member.bio}</p>
          <div class="tag-list">${member.highlights.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
        <aside class="profile-facts">
          <p class="card-kicker">Quick facts</p>
          ${member.stats.map((stat) => `<div><span>${stat.label}</span><strong>${stat.value}</strong></div>`).join("")}
        </aside>
      </div>
    </section>
    <section class="section section-soft">
      <div class="shell profile-placeholder-grid">
        <div><p class="eyebrow">Profile expansion</p><h2 class="section-title section-title-small">Ready for the full story.</h2></div>
        <p>The content model is prepared for biography, position, skills, qualifications, awards, match statistics, photography, video, and approved social links once verified by the club.</p>
      </div>
    </section>`;
})();
