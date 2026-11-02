(function () {
  const data = window.MR_DATA;
  const base = document.body.dataset.base || ".";
  const assetUrl = window.MR_STORE.assetUrl;

  const members = document.querySelector("[data-member-preview]");
  if (members) {
    const list = (window.MR_STORE ? window.MR_STORE.getMembers() : data.members)
      .filter((member) => member.role === "Player" && member.photo)
      .slice(0, 6);

    members.innerHTML = list.map((member) => `
      <article class="member-card">
        <a class="member-visual ${member.photo ? "has-photo" : ""}" href="member.html?id=${member.slug}" aria-label="View ${member.name}'s profile">
          ${member.photo
            ? `<img src="${assetUrl(member.photo, base)}" alt="${member.name}">`
            : `<span class="member-monogram">${member.shortName}</span>`}
          <span class="member-number">${member.number}</span>
          <span class="member-squad">${member.squad}</span>
        </a>
        <div class="member-copy">
          <div><p class="card-kicker">${member.role}</p><h3>${member.name}</h3></div>
          <a class="round-link" href="member.html?id=${member.slug}" aria-label="View ${member.name}">${window.MR.icon("arrow")}</a>
        </div>
      </article>`).join("");
  }
})();
