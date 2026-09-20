


// ==============================
// MOBILE MENU
// ==============================

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});


// Close mobile menu after clicking a link

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

// =========================
// LIGHT / DARK MODE
// =========================

const themeToggle = document.getElementById("themeToggle");
const mobileThemeToggle = document.getElementById("mobileThemeToggle");

const themeIcon = document.getElementById("themeIcon");
const mobileThemeIcon = document.getElementById("mobileThemeIcon");

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

        if (themeIcon) {
            themeIcon.textContent = "🌙";
        }

        if (mobileThemeIcon) {
            mobileThemeIcon.textContent = "🌙";
        }

        localStorage.setItem("theme", "light");

    } else {

        document.body.classList.remove("light-mode");

        if (themeIcon) {
            themeIcon.textContent = "☀️";
        }

        if (mobileThemeIcon) {
            mobileThemeIcon.textContent = "☀️";
        }

        localStorage.setItem("theme", "dark");
    }
}


// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark";

applyTheme(savedTheme);


// Desktop button
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.body.classList.contains("light-mode")
                ? "light"
                : "dark";

        applyTheme(currentTheme === "light" ? "dark" : "light");

    });

}


// Mobile button
if (mobileThemeToggle) {

    mobileThemeToggle.addEventListener("click", () => {

        const currentTheme =
            document.body.classList.contains("light-mode")
                ? "light"
                : "dark";

        applyTheme(currentTheme === "light" ? "dark" : "light");

    });

}