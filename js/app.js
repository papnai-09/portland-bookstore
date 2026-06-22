
const ctaBtn = document.getElementById("ctaBtn");

if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    document.getElementById("registration").scrollIntoView({
      behavior: "smooth"
    });
  });
}

const eventData = {
  eventName: "Literary Nexus Gala",
  eventDate: "2026-12-31T19:00:00"
};

const eventTitle = document.getElementById("eventTitle");

if (eventTitle) {
  eventTitle.textContent = eventData.eventName;
}

const eventDate = new Date(eventData.eventDate);

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  const countdown = document.getElementById("countdown");

  if (!countdown) return;

  if (diff <= 0) {
    countdown.innerHTML = `
      <div class="count-box">
        LIVE
        <span>Event Started</span>
      </div>
    `;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    <div class="count-box">
      ${days}
      <span>Days</span>
    </div>

    <div class="count-box">
      ${hours}
      <span>Hours</span>
    </div>

    <div class="count-box">
      ${minutes}
      <span>Minutes</span>
    </div>

    <div class="count-box">
      ${seconds}
      <span>Seconds</span>
    </div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const authorGrid = document.getElementById("authorGrid");

if (authorGrid) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
      authorGrid.innerHTML = "";

      users.slice(0, 6).forEach(user => {
        const card = document.createElement("div");

        card.className = "author-card";

        card.innerHTML = `
          <img
            src="https://i.pravatar.cc/300?img=${user.id}"
            alt="${user.name}"
          >

          <h3>${user.name}</h3>

          <p>${user.company.catchPhrase}</p>

          <button
            class="cta-btn view-profile-btn"
            data-name="${user.name}"
            data-bio="${user.company.bs}"
          >
            View Full Profile
          </button>
        `;

        authorGrid.appendChild(card);
      });

      attachProfileEvents();
    })
    .catch(() => {
      authorGrid.innerHTML = `
        <p>Unable to load author profiles.</p>
      `;
    });
}

function attachProfileEvents() {
  const buttons = document.querySelectorAll(".view-profile-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      openModal(
        button.dataset.name,
        button.dataset.bio
      );
    });
  });
}

function openModal(name, bio) {
  const modal = document.createElement("div");

  modal.className = "author-modal";

  modal.innerHTML = `
    <div class="author-modal-content">
      <span class="close-modal">&times;</span>
      <h2>${name}</h2>
      <p>${bio}</p>
    </div>
  `;

  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,.75)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";

  document.body.appendChild(modal);

  const content =
    modal.querySelector(".author-modal-content");

  content.style.background = "#fff";
  content.style.padding = "40px";
  content.style.borderRadius = "20px";
  content.style.maxWidth = "600px";
  content.style.width = "90%";

  modal.querySelector(".close-modal")
    .addEventListener("click", () => {
      modal.remove();
    });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", e => {
    e.preventDefault();

    alert(
      "RSVP Confirmed! We look forward to seeing you."
    );

    rsvpForm.reset();
  });
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  navbar.style.boxShadow =
    window.scrollY > 50
      ? "0 10px 30px rgba(0,0,0,.08)"
      : "0 2px 20px rgba(0,0,0,.05)";
});

