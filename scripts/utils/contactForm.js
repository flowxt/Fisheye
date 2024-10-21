function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("first").focus(); // Place le focus sur le premier champ
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.querySelector(".contact_button").focus(); // Retourne le focus au bouton
}

// Fermer la modale avec la touche "Escape"
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("contact_modal");
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Validation du formulaire
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("first").value.trim();
    const lastName = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Réinitialise les messages d'erreur
    document.querySelectorAll(".error-message").forEach((span) => {
      span.style.display = "none";
    });

    // Vérification des erreurs pour chaque champ
    if (!nameRegex.test(firstName)) {
      document.getElementById("first-error").textContent =
        "Le prénom doit contenir au moins 2 lettres.";
      document.getElementById("first-error").style.display = "block"; // Affiche le message
      isValid = false;
    }

    if (!nameRegex.test(lastName)) {
      document.getElementById("last-error").textContent =
        "Le nom doit contenir au moins 2 lettres.";
      document.getElementById("last-error").style.display = "block"; // Affiche le message
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "L'email n'est pas valide.";
      document.getElementById("email-error").style.display = "block"; // Affiche le message
      isValid = false;
    }

    if (message.length === 0) {
      document.getElementById("message-error").textContent =
        "Le message ne peut pas être vide.";
      document.getElementById("message-error").style.display = "block"; // Affiche le message
      isValid = false;
    }

    // Si le formulaire est valide, affiche les informations et ferme la modale
    if (isValid) {
      console.log({
        firstName,
        lastName,
        email,
        message,
      });
      closeModal();
    }
  });
