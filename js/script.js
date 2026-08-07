const projects = [
  {
    title: "Speech AI",
    description: "...",
    technologies: ["JavaScript", "GitHub Pages", "OpenAI"],
    url: "#"
  },
  {
    title: "Performance Dashboard",
    description: "...",
    technologies: ["HTML", "CSS", "JS"],
    url: "#"
  }
];
const projects = [
    {
        title: "Performance Dashboard",
        description:
            "Dashboard interno para centralizar indicadores operativos, productividad y seguimiento de KPIs.",
        technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
        url: "#"
    },
    {
        title: "Speech AI",
        description:
            "Solución asistida por inteligencia artificial para analizar conversaciones de WhatsApp y reducir la revisión manual.",
        technologies: ["Generative AI", "ChatGPT", "Prompt Engineering"],
        url: "#"
    },
    {
        title: "Lead Management Platform",
        description:
            "Plataforma interna para mejorar la trazabilidad, seguimiento y visibilidad de leads comerciales.",
        technologies: ["JavaScript", "REST APIs", "GitHub"],
        url: "#"
    },
    {
        title: "GitHub Internal Portal",
        description:
            "Portal interno para centralizar documentación, enlaces, herramientas y recursos operativos.",
        technologies: ["GitHub Pages", "HTML", "CSS", "JavaScript"],
        url: "#"
    }
];

const azureLabs = [
    {
        title: "Azure Virtual Machines",
        description:
            "Creación y administración de máquinas virtuales Windows y Linux en Microsoft Azure.",
        status: "Próximamente",
        url: "labs/azure-vm/"
    },
    {
        title: "Microsoft Entra ID",
        description:
            "Gestión de identidades, usuarios, grupos y acceso basado en roles.",
        status: "Próximamente",
        url: "labs/entra-id/"
    },
    {
        title: "Azure Networking",
        description:
            "Configuración de redes virtuales, subredes, NSG y conectividad.",
        status: "Próximamente",
        url: "labs/networking/"
    },
    {
        title: "Azure Storage",
        description:
            "Administración de cuentas de almacenamiento, containers y blobs.",
        status: "Próximamente",
        url: "labs/storage/"
    },
    {
        title: "RBAC",
        description:
            "Asignación y validación de permisos mediante Role-Based Access Control.",
        status: "Próximamente",
        url: "labs/rbac/"
    },
    {
        title: "Azure Monitor",
        description:
            "Supervisión de recursos, métricas, alertas y registros operativos.",
        status: "Próximamente",
        url: "labs/monitor/"
    }
];

function createTechnologyList(technologies) {
    return technologies
        .map((technology) => `<span>${technology}</span>`)
        .join("");
}

function renderProjects() {
    const projectGrid = document.querySelector("#project-grid");

    if (!projectGrid) {
        return;
    }

    projectGrid.innerHTML = projects
        .map(
            (project) => `
                <article class="project-card reveal">
                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <div class="technology-list">
                        ${createTechnologyList(project.technologies)}
                    </div>

                    <a class="card-link" href="${project.url}">
                        Ver proyecto →
                    </a>
                </article>
            `
        )
        .join("");
}

function renderAzureLabs() {
    const labGrid = document.querySelector("#lab-grid");

    if (!labGrid) {
        return;
    }

    labGrid.innerHTML = azureLabs
        .map(
            (lab) => `
                <article class="lab-card reveal">
                    <span class="lab-status">${lab.status}</span>

                    <h3>${lab.title}</h3>

                    <p>${lab.description}</p>

                    <a class="card-link" href="${lab.url}">
                        Ver laboratorio →
                    </a>
                </article>
            `
        )
        .join("");
}

function configureTheme() {
    const themeButton = document.querySelector("#theme-toggle");

    if (!themeButton) {
        return;
    }

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const currentTheme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);
    });
}

function configureMobileMenu() {
    const menuButton = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#nav-links");
    const navigationLinks = document.querySelectorAll("#nav-links a");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

function configureScrollEffects() {
    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {
        header?.classList.toggle("scrolled", window.scrollY > 10);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    document
        .querySelectorAll(".section, .timeline-item, .reveal")
        .forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
}

function setCurrentYear() {
    const currentYearElement = document.querySelector("#current-year");

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

function initializePortfolio() {
    renderProjects();
    renderAzureLabs();
    configureTheme();
    configureMobileMenu();
    configureScrollEffects();
    setCurrentYear();
}

document.addEventListener("DOMContentLoaded", initializePortfolio);
