const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
});

// Verifique o estado do local storage para manter o modo escuro se o usuário já o tiver definido anteriormente
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }
});

// Salve o estado do modo escuro no local storage
darkModeToggle.addEventListener("change", () => {
  localStorage.setItem("darkMode", darkModeToggle.checked);
});
