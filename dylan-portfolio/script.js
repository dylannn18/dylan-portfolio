const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", event => {
  event.preventDefault();
  status.textContent = "";
  let valid = true;

  const fields = [
    { input: document.getElementById("name"), message: "Please enter at least 2 characters." , test: value => value.trim().length >= 2 },
    { input: document.getElementById("email"), message: "Please enter a valid email address.", test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) },
    { input: document.getElementById("message"), message: "Please enter at least 10 characters.", test: value => value.trim().length >= 10 }
  ];

  fields.forEach(({ input, message, test }) => {
    const error = input.parentElement.querySelector(".error");
    if (!test(input.value)) {
      error.textContent = message;
      input.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      error.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  });

  if (valid) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    status.textContent = "Opening your email app…";
    window.location.href = `mailto:dylannn.work18@gmail.com?subject=${subject}&body=${body}`;
  }
});
