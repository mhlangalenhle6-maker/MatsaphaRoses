(function () {
  const store = window.MR_STORE;
  const data = window.MR_DATA;

  const views = document.querySelectorAll("[data-admin-view]");
  const navLinks = document.querySelectorAll("[data-admin-nav]");
  const title = document.querySelector("[data-admin-title]");
  const rows = document.querySelector("[data-admin-player-rows]");
  const form = document.querySelector("[data-admin-player-form]");
  const formTitle = document.querySelector("[data-admin-form-title]");
  const formStatus = document.querySelector("[data-admin-form-status]");
  const inventory = document.querySelector("[data-admin-inventory]");
  const sponsorsGrid = document.querySelector("[data-admin-sponsors]");
  const photoSelect = document.querySelector("[data-admin-photo-select]");
  const photoPreview = document.querySelector("[data-admin-photo-preview]");

  const titles = {
    dashboard: "Dashboard",
    players: "Players",
    sponsors: "Sponsors"
  };

  function photoUrl(photo) {
    return store.assetUrl(photo, "..");
  }

  function syncPhotoPreview() {
    const value = photoSelect?.value || "";
    if (!photoPreview) return;
    if (!value) {
      photoPreview.hidden = true;
      return;
    }
    photoPreview.hidden = false;
    photoPreview.querySelector("img").src = photoUrl(value);
  }

  function populatePhotoOptions(selected) {
    if (!photoSelect) return;
    const photos = data.memberPhotos || [];
    photoSelect.innerHTML = `<option value="">No photo</option>` + photos.map((photo) => {
      const label = photo.split("/").pop();
      return `<option value="${photo.replace(/"/g, "&quot;")}">${label}</option>`;
    }).join("");
    photoSelect.value = selected || "";
    syncPhotoPreview();
  }

  function showStatus(message, isError) {
    if (!formStatus) return;
    formStatus.hidden = false;
    formStatus.textContent = message;
    formStatus.classList.toggle("is-error", Boolean(isError));
  }

  function setView(name) {
    const key = titles[name] ? name : "dashboard";
    views.forEach((view) => view.classList.toggle("is-active", view.dataset.adminView === key));
    navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.adminNav === key));
    if (title) title.textContent = titles[key];
    if (location.hash !== "#" + key) {
      history.replaceState(null, "", "#" + key);
    }
  }

  function syncCounts(members) {
    const players = members.filter((item) => item.role === "Player").length;
    const counts = {
      members: members.length,
      players,
      sponsors: (data.sponsors || []).length,
      news: (data.news || []).length
    };

    Object.entries(counts).forEach(([key, value]) => {
      const target = document.querySelector(`[data-admin-count="${key}"]`);
      if (target) target.textContent = value;
    });

    if (inventory) {
      const squads = members.reduce((acc, member) => {
        acc[member.squad] = (acc[member.squad] || 0) + 1;
        return acc;
      }, {});

      inventory.innerHTML = Object.keys(squads).length
        ? Object.entries(squads).map(([squad, count]) => `
            <div><span>${squad}</span><strong>${count}</strong></div>
          `).join("")
        : "<div><span>No profiles yet</span><strong>0</strong></div>";
    }
  }

  function resetForm() {
    form.reset();
    form.slug.value = "";
    formTitle.textContent = "Add player";
    formStatus.hidden = true;
    populatePhotoOptions("");
  }

  function fillForm(member) {
    form.slug.value = member.slug;
    form.name.value = member.name;
    form.role.value = member.role;
    form.squad.value = member.squad;
    form.number.value = member.number === "—" ? "" : member.number;
    form.shortName.value = member.shortName;
    form.status.value = member.status;
    form.bio.value = member.bio;
    form.highlights.value = (member.highlights || []).join(", ");
    populatePhotoOptions(member.photo || "");
    formTitle.textContent = "Edit player";
    formStatus.hidden = true;
    setView("players");
    form.name.focus();
  }

  function renderPlayers() {
    const members = store.getMembers();
    syncCounts(members);

    rows.innerHTML = members.length ? members.map((member) => `
      <tr>
        <td>
          <div class="admin-player-thumb ${member.photo ? "has-photo" : ""}">
            ${member.photo
              ? `<img src="${photoUrl(member.photo)}" alt="">`
              : `<span>${member.shortName}</span>`}
          </div>
        </td>
        <td>${member.number}</td>
        <td>
          <strong>${member.name}</strong>
          <small class="admin-slug">${member.slug}</small>
        </td>
        <td>${member.role}</td>
        <td>${member.squad}</td>
        <td>${member.status}</td>
        <td class="admin-row-actions">
          <button type="button" data-edit="${member.slug}">Edit</button>
          <button type="button" class="is-danger" data-delete="${member.slug}">Delete</button>
        </td>
      </tr>
    `).join("") : `
      <tr>
        <td colspan="7">No players yet. Use the form to add the first profile.</td>
      </tr>
    `;
  }

  function renderSponsors() {
    if (!sponsorsGrid) return;
    const sponsors = data.sponsors || [];
    sponsorsGrid.innerHTML = sponsors.map((sponsor) => `
      <article class="admin-sponsor-card">
        <img src="${photoUrl(sponsor.logo)}" alt="${sponsor.name} logo">
        <strong>${sponsor.name}</strong>
        <span>Shown on every public page</span>
      </article>
    `).join("");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setView(link.dataset.adminNav);
    });
  });

  document.querySelector("[data-admin-new-player]")?.addEventListener("click", () => {
    resetForm();
    setView("players");
    form.name.focus();
  });

  document.querySelector("[data-admin-cancel]")?.addEventListener("click", resetForm);

  document.querySelector("[data-admin-reset]")?.addEventListener("click", () => {
    if (!confirm("Reset all players to the default starter profiles?")) return;
    store.resetMembers();
    resetForm();
    renderPlayers();
    showStatus("Players restored to defaults.");
  });

  rows.addEventListener("click", (event) => {
    const editSlug = event.target.getAttribute("data-edit");
    const deleteSlug = event.target.getAttribute("data-delete");

    if (editSlug) {
      const member = store.getMembers().find((item) => item.slug === editSlug);
      if (member) fillForm(member);
      return;
    }

    if (deleteSlug) {
      const member = store.getMembers().find((item) => item.slug === deleteSlug);
      if (!member) return;
      if (!confirm(`Delete ${member.name} from the squad directory?`)) return;
      store.deleteMember(deleteSlug);
      if (form.slug.value === deleteSlug) resetForm();
      renderPlayers();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    if (!name) {
      showStatus("Name is required.", true);
      form.name.focus();
      return;
    }

    store.upsertMember({
      name,
      role: form.role.value,
      squad: form.squad.value,
      number: form.number.value.trim() || "—",
      shortName: form.shortName.value.trim(),
      status: form.status.value.trim() || "Active",
      photo: form.photo.value,
      bio: form.bio.value.trim(),
      highlights: form.highlights.value
    }, form.slug.value || undefined);

    resetForm();
    renderPlayers();
    showStatus("Player saved. It now appears on the public team pages.");
  });

  window.addEventListener("hashchange", () => {
    setView((location.hash || "#dashboard").slice(1));
  });

  photoSelect?.addEventListener("change", syncPhotoPreview);

  populatePhotoOptions("");
  renderPlayers();
  renderSponsors();
  setView((location.hash || "#dashboard").slice(1));
})();
