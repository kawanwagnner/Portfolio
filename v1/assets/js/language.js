/*==================== LANGUAGE MODAL ====================*/
const languageModal = document.getElementById("language-modal");
const modalClose = document.getElementById("modal-close");
const langPt = document.getElementById("lang-pt");
const langEn = document.getElementById("lang-en");

// Traduções
const translations = {
  pt: {
    // Navigation
    navHome: "Início",
    navAbout: "Sobre",
    navSkills: "Habilidades",
    navCertifications: "Formações",
    navProjects: "Projetos Recentes",
    navContact: "Contato",

    // Home
    homeGreeting: "Olá,",
    homeIam: "Eu sou ",
    homeRole: "Dev FullStack.",
    homeButton: "Contato / Info",

    // About
    aboutTitle: "Apresentação",
    aboutSubtitle: "I'm Kawan Wagnner",
    aboutText:
      "Sou um desenvolvedor Full Stack com experiência na criação de aplicações web reais usando React, Node.js e tecnologias modernas de frontend. Meu foco é em código limpo, desempenho e soluções escaláveis, sempre buscando criar produtos que resolvam problemas reais e agreguem valor aos usuários. Já trabalhei em sites institucionais, dashboards e sistemas web completos, atuando tanto no desenvolvimento de frontend quanto de backend.",

    // Skills
    skillsTitle: "Habilidades",
    skillsSubtitle: "Habilidades Profesionales",
    skillsText:
      "Estas são as principais tecnologias que utilizo para construir aplicações web modernas, escaláveis e de fácil manutenção, abrangendo tanto o frontend quanto o backend.",

    // Certifications
    certificationsTitle: "Formação Acadêmica",
    cert1Date: "Dez 2025 - Jun 2028",
    cert1Title: "Tecnólogo em Tecnologia da Informação",
    cert1Institution: "UFBRA",
    cert1Description:
      "Tecnólogo em Tecnologia da Informação com foco em desenvolvimento de soluções digitais, integração entre tecnologia e produto, programação orientada a valor, performance e experiência do usuário.",
    cert1Tag1: "Tecnologia da informação",
    cert1Tag2: "Desenvolvimento web",
    cert1Tag3: "Desenvolvimento de software",

    cert2Date: "Jun 2023 - Jun 2025",
    cert2Title: "Técnico em Desenvolvimento de Sistemas",
    cert2Institution: 'SENAI Cotia - Escola SENAI "Ricardo Lerner"',
    cert2Description:
      "Formação técnica orientada para o desenvolvimento completo de sistemas, com projetos práticos em lógica, algoritmos, interfaces modernas e arquitetura de software. Experiência em tecnologias Front-end (HTML, CSS, React) e Back-end (Node.js, Express, MySQL).",

    cert3Date: "Mar 2021 - Dez 2023",
    cert3Title: "Ensino Médio - Desenvolvimento Social",
    cert3Institution: "E. E. Maria Augusta de Moraes Neves",
    cert3Description:
      "Ensino de qualidade excepcional. Atividades e grupos: Itinerários formativos, basquetebol, sensos, palestras, entre outras atividades.",
    cert3Tag1: "Trabalho em equipe",
    cert3Tag2: "Programação",

    // Projects
    projectsTitle: "Projetos Recentes",
    projectsSubtitle: "(Clique para abir o projeto)",

    // Contact
    contactTitle: "Contato",
    contactName: "Nome",
    contactEmail: "Email",
    contactMessage: "Escreva aqui...",
    contactButton: "Enviar",

    // Footer
    footerRights: "Todos os direitos reservados",
  },
  en: {
    // Navigation
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navCertifications: "Education",
    navProjects: "Recent Projects",
    navContact: "Contact",

    // Home
    homeGreeting: "Hi,",
    homeIam: "I'm ",
    homeRole: "FullStack Dev.",
    homeButton: "Contact / Info",

    // About
    aboutTitle: "About Me",
    aboutSubtitle: "I'm Kawan Wagnner",
    aboutText:
      "I'm a Full Stack developer with experience in creating real web applications using React, Node.js and modern frontend technologies. My focus is on clean code, performance and scalable solutions, always seeking to create products that solve real problems and add value to users. I have worked on institutional websites, dashboards and complete web systems, working on both frontend and backend development.",

    // Skills
    skillsTitle: "Skills",
    skillsSubtitle: "Professional Skills",
    skillsText:
      "These are the main technologies I use to build modern, scalable and maintainable web applications, covering both frontend and backend.",

    // Certifications
    certificationsTitle: "Education",
    cert1Date: "Dec 2025 - Jun 2028",
    cert1Title: "Technology Degree in Information Technology",
    cert1Institution: "UFBRA",
    cert1Description:
      "Technology degree in Information Technology focused on digital solutions development, technology and product integration, value-oriented programming, performance and user experience.",
    cert1Tag1: "Information Technology",
    cert1Tag2: "Web Development",
    cert1Tag3: "Software Development",

    cert2Date: "Jun 2023 - Jun 2025",
    cert2Title: "Systems Development Technician",
    cert2Institution: 'SENAI Cotia - SENAI School "Ricardo Lerner"',
    cert2Description:
      "Technical training oriented towards complete systems development, with practical projects in logic, algorithms, modern interfaces and software architecture. Experience in Front-end technologies (HTML, CSS, React) and Back-end (Node.js, Express, MySQL).",

    cert3Date: "Mar 2021 - Dec 2023",
    cert3Title: "High School - Social Development",
    cert3Institution: "E. E. Maria Augusta de Moraes Neves",
    cert3Description:
      "Exceptional quality education. Activities and groups: Formative itineraries, basketball, surveys, lectures, among other activities.",
    cert3Tag1: "Teamwork",
    cert3Tag2: "Programming",

    // Projects
    projectsTitle: "Recent Projects",
    projectsSubtitle: "(Click to open project)",

    // Contact
    contactTitle: "Contact",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Write here...",
    contactButton: "Send",

    // Footer
    footerRights: "All rights reserved",
  },
};

// Função para definir cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Função para obter cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Função para mostrar modal
function showModal() {
  languageModal.classList.add("show");
}

// Função para esconder modal
function hideModal() {
  languageModal.classList.remove("show");
}

// Função para aplicar traduções
function applyTranslations(lang) {
  const t = translations[lang];

  // Navigation
  const navLinks = document.querySelectorAll(".nav__link");
  if (navLinks[0]) navLinks[0].textContent = t.navHome;
  if (navLinks[1]) navLinks[1].textContent = t.navAbout;
  if (navLinks[2]) navLinks[2].textContent = t.navSkills;
  if (navLinks[3]) navLinks[3].textContent = t.navCertifications;
  if (navLinks[4]) navLinks[4].textContent = t.navProjects;
  if (navLinks[5]) navLinks[5].textContent = t.navContact;

  // Home
  const homeTitle = document.querySelector(".home__title");
  if (homeTitle) {
    homeTitle.innerHTML = `${t.homeGreeting}<br />${t.homeIam}<span class="home__title-color">Kawan W.</span><br />${t.homeRole}`;
  }
  const homeButton = document.querySelector(".buttons-home .button");
  if (homeButton) homeButton.textContent = t.homeButton;

  // About
  const aboutTitle = document.querySelector("#about .section-title");
  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  const aboutSubtitle = document.querySelector(".about__subtitle");
  if (aboutSubtitle) aboutSubtitle.textContent = t.aboutSubtitle;
  const aboutText = document.querySelector(".about__text");
  if (aboutText) aboutText.textContent = t.aboutText;

  // Skills
  const skillsTitle = document.querySelector("#skills .section-title");
  if (skillsTitle) skillsTitle.textContent = t.skillsTitle;
  const skillsSubtitle = document.querySelector(".skills__subtitle");
  if (skillsSubtitle) skillsSubtitle.textContent = t.skillsSubtitle;
  const skillsText = document.querySelector(".skills__text");
  if (skillsText) skillsText.textContent = t.skillsText;

  // Certifications
  const certTitle = document.querySelector("#certifications .section-title");
  if (certTitle) certTitle.textContent = t.certificationsTitle;

  const certCards = document.querySelectorAll(".certification__card");
  if (certCards[0]) {
    certCards[0].querySelector(".certification__date").innerHTML =
      `<i class="bx bx-calendar"></i> ${t.cert1Date}`;
    certCards[0].querySelector(".certification__title").textContent =
      t.cert1Title;
    certCards[0].querySelector(".certification__institution").textContent =
      t.cert1Institution;
    certCards[0].querySelector(".certification__description").textContent =
      t.cert1Description;
    const tags0 = certCards[0].querySelectorAll(".certification__tag");
    if (tags0[0]) tags0[0].textContent = t.cert1Tag1;
    if (tags0[1]) tags0[1].textContent = t.cert1Tag2;
    if (tags0[2]) tags0[2].textContent = t.cert1Tag3;
  }
  if (certCards[1]) {
    certCards[1].querySelector(".certification__date").innerHTML =
      `<i class="bx bx-calendar"></i> ${t.cert2Date}`;
    certCards[1].querySelector(".certification__title").textContent =
      t.cert2Title;
    certCards[1].querySelector(".certification__institution").textContent =
      t.cert2Institution;
    certCards[1].querySelector(".certification__description").textContent =
      t.cert2Description;
  }
  if (certCards[2]) {
    certCards[2].querySelector(".certification__date").innerHTML =
      `<i class="bx bx-calendar"></i> ${t.cert3Date}`;
    certCards[2].querySelector(".certification__title").textContent =
      t.cert3Title;
    certCards[2].querySelector(".certification__institution").textContent =
      t.cert3Institution;
    certCards[2].querySelector(".certification__description").textContent =
      t.cert3Description;
    const tags2 = certCards[2].querySelectorAll(".certification__tag");
    if (tags2[0]) tags2[0].textContent = t.cert3Tag1;
    if (tags2[1]) tags2[1].textContent = t.cert3Tag2;
  }

  // Projects
  const projectsSection = document.querySelector("#works .section-title");
  if (projectsSection) {
    projectsSection.innerHTML = `${t.projectsTitle} <br /><span class="click-here">${t.projectsSubtitle}</span>`;
  }

  // Contact
  const contactTitle = document.querySelector("#contact .section-title");
  if (contactTitle) contactTitle.textContent = t.contactTitle;
  const contactInputs = document.querySelectorAll(".contact__input");
  if (contactInputs[0]) contactInputs[0].placeholder = t.contactName;
  if (contactInputs[1]) contactInputs[1].placeholder = t.contactEmail;
  if (contactInputs[2]) contactInputs[2].placeholder = t.contactMessage;
  const contactButton = document.querySelector(".contact__button");
  if (contactButton) contactButton.value = t.contactButton;

  // Footer
  const footerCopy = document.querySelector(".footer__copy");
  if (footerCopy) {
    footerCopy.innerHTML = `&#169; Kawan Wnn. ${t.footerRights} 2026.`;
  }

  // Update HTML lang attribute
  document.documentElement.lang = lang === "pt" ? "pt-br" : "en";
}

// Função para selecionar idioma
function selectLanguage(lang) {
  setCookie("preferredLanguage", lang, 365);
  applyTranslations(lang);
  hideModal();
}

// Event listeners
langPt.addEventListener("click", () => selectLanguage("pt"));
langEn.addEventListener("click", () => selectLanguage("en"));

modalClose.addEventListener("click", () => {
  // Se fechar sem selecionar, usa português como padrão
  setCookie("preferredLanguage", "pt", 365);
  hideModal();
});

// Fechar modal clicando no overlay
document.querySelector(".language-modal__overlay").addEventListener("click", () => {
  setCookie("preferredLanguage", "pt", 365);
  hideModal();
});

// Verificar preferência ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("preferredLanguage");

  if (savedLang) {
    // Se já tem preferência salva, aplica ela
    applyTranslations(savedLang);
  } else {
    // Se não tem preferência, mostra o modal após o loading
    setTimeout(() => {
      showModal();
    }, 3500); // Mostra após loading screen (3s) + pequeno delay
  }
});
