const nav = document.querySelector("nav");
const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = [...document.querySelectorAll("#primary-navigation a")];
const sections = [...document.querySelectorAll("main section, body > section")];

function closeMenu() {
	nav.classList.remove("menu-open");
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
	const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

	nav.classList.toggle("menu-open", !isExpanded);
	menuToggle.setAttribute("aria-expanded", String(!isExpanded));
	menuToggle.setAttribute(
		"aria-label",
		isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi"
	);
});

navigationLinks.forEach((link) => {
	link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
		closeMenu();
		menuToggle.focus();
	}
});

document.addEventListener("click", (event) => {
	if (!nav.contains(event.target)) {
		closeMenu();
	}
});

window.addEventListener("resize", () => {
	if (window.innerWidth > 500) {
		closeMenu();
	}
});

if ("IntersectionObserver" in window) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			const visibleSection = entries
				.filter((entry) => entry.isIntersecting)
				.sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

			if (!visibleSection) {
				return;
			}

			navigationLinks.forEach((link) => {
				const isActive = link.hash === `#${visibleSection.target.id}`;

				link.classList.toggle("nav-link-active", isActive);
				if (isActive) {
					link.setAttribute("aria-current", "page");
				} else {
					link.removeAttribute("aria-current");
				}
			});
		},
		{
			rootMargin: "-30% 0px -55% 0px",
			threshold: [0, 0.25, 0.5, 0.75, 1],
		}
	);

	sections.forEach((section) => sectionObserver.observe(section));
}