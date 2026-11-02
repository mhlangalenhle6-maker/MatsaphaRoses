(function () {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  if (!form) return;

  const inbox = (window.MR_DATA && window.MR_DATA.club && window.MR_DATA.club.email) || "admin@matsapharosesfc.com";
  form.action = "https://formsubmit.co/" + inbox;

  const submitButton = form.querySelector('[type="submit"]');

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    const emailField = form.querySelector('[name="email"]');
    if (emailField && !form.querySelector('[name="_replyto"]')) {
      const replyTo = document.createElement("input");
      replyTo.type = "hidden";
      replyTo.name = "_replyto";
      replyTo.value = emailField.value;
      form.appendChild(replyTo);
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    if (status) {
      status.hidden = false;
      status.textContent = "Sending your enquiry to " + inbox + "…";
    }
  });
})();
