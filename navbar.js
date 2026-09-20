/* ==============================================================
   GRIAHSATHI SHARED NAVBAR
   ==============================================================
   This file controls the navbar on all pages.

   Customer Profile is visible ONLY on:
     - index.html
     - services.html
     - find-worker.html
     - booking.html
     - about.html
     - contact.html

   And only when a customer is logged in.

   Multi-customer storage:
     griahsathi-customers
     griahsathi-current-customer
================================================================ */

(function () {
  "use strict";

  const CURRENT_PAGE =
    (location.pathname.split("/").pop() || "index.html").toLowerCase();


  /* ==============================================================
     PAGES WHERE CUSTOMER PROFILE SHOULD BE VISIBLE
  ============================================================== */

  const PROFILE_PAGES = [
    "index.html",
    "services.html",
    "find-worker.html",
    "booking.html",
    "about.html",
    "contact.html"
  ];


  /* ==============================================================
     MAIN NAVIGATION
  ============================================================== */

  const NAV_ITEMS = [
    {
      href: "index.html",
      label: "Home"
    },

    {
      href: "services.html",
      label: "Services"
    },

    {
      href: "about.html",
      label: "About"
    },

    {
      href: "contact.html",
      label: "Contact"
    }
  ];


  /* ==============================================================
     ACTIVE PAGE
  ============================================================== */

  const isActive = (href) => {
    return CURRENT_PAGE === href;
  };


  /* ==============================================================
     CHECK WHETHER PROFILE LINK SHOULD BE SHOWN
  ============================================================== */

  function shouldShowCustomerProfile() {

    /*
      Profile is allowed only on the selected pages.
    */

    if (!PROFILE_PAGES.includes(CURRENT_PAGE)) {
      return false;
    }


    /*
      Read the current customer session.
    */

    const customer =
      getLoggedInCustomer();


    return !!(
      customer &&
      typeof customer === "object" &&
      (
        customer.id ||
        customer.email ||
        customer.phone
      )
    );
  }


  /* ==============================================================
     GET CURRENT LOGGED-IN CUSTOMER
  ============================================================== */

  function getLoggedInCustomer() {

    /*
      1. New multi-customer session.
    */

    try {

      const current =
        JSON.parse(
          localStorage.getItem(
            "griahsathi-current-customer"
          ) || "null"
        );


      if (
        current &&
        typeof current === "object"
      ) {

        /*
          Try to get the freshest version
          from all customer accounts.
        */

        const customers =
          JSON.parse(
            localStorage.getItem(
              "griahsathi-customers"
            ) || "[]"
          );


        if (
          Array.isArray(customers) &&
          customers.length
        ) {

          /*
            Best match = unique customer ID.
          */

          if (current.id) {

            const byId =
              customers.find(
                customer =>
                  String(customer.id) ===
                  String(current.id)
              );


            if (byId) {
              return byId;
            }
          }


          /*
            Email fallback.
          */

          if (current.email) {

            const email =
              String(
                current.email
              )
                .trim()
                .toLowerCase();


            const byEmail =
              customers.find(
                customer =>
                  String(
                    customer.email || ""
                  )
                    .trim()
                    .toLowerCase() === email
              );


            if (byEmail) {
              return byEmail;
            }
          }


          /*
            Phone fallback.
          */

          if (current.phone) {

            const phone =
              String(
                current.phone
              ).replace(
                /\D/g,
                ""
              );


            const byPhone =
              customers.find(
                customer =>
                  String(
                    customer.phone || ""
                  ).replace(
                    /\D/g,
                    ""
                  ) === phone
              );


            if (byPhone) {
              return byPhone;
            }
          }
        }


        /*
          Even if the account cannot be found
          in the array, return the active session.
        */

        return current;
      }

    } catch (error) {

      console.warn(
        "Griahsathi: unable to read current customer session.",
        error
      );
    }


    /*
      2. Try the GS core helper.
    */

    try {

      if (
        window.GS &&
        typeof GS.currentLoggedInCustomer ===
          "function"
      ) {

        const customer =
          GS.currentLoggedInCustomer();


        if (customer) {
          return customer;
        }
      }

    } catch (error) {

      console.warn(
        "Griahsathi: GS customer lookup failed.",
        error
      );
    }


    /*
      3. Legacy compatibility.
    */

    try {

      const loggedIn =
        JSON.parse(
          localStorage.getItem(
            "griahsathi-logged-in"
          ) || "null"
        );


      const legacyCustomer =
        JSON.parse(
          localStorage.getItem(
            "griahsathi-customer"
          ) || "null"
        );


      if (
        loggedIn &&
        legacyCustomer
      ) {

        if (
          (
            loggedIn.email &&
            legacyCustomer.email &&
            String(loggedIn.email)
              .trim()
              .toLowerCase() ===
            String(legacyCustomer.email)
              .trim()
              .toLowerCase()
          )
          ||
          (
            loggedIn.phone &&
            legacyCustomer.phone &&
            String(loggedIn.phone)
              .replace(/\D/g, "") ===
            String(legacyCustomer.phone)
              .replace(/\D/g, "")
          )
        ) {

          return legacyCustomer;
        }
      }

    } catch (error) {

      console.warn(
        "Griahsathi: legacy customer lookup failed.",
        error
      );
    }


    return null;
  }


  /* ==============================================================
     DESKTOP NAVIGATION LINK
  ============================================================== */

  const desktopLink = ({
    href,
    label
  }) => {

    const cls =
      isActive(href)

        ? "text-sm font-medium text-green-400 transition hover:text-green-300"

        : "text-sm font-medium text-gray-300 transition hover:text-white";


    return `
      <a
        href="${href}"
        class="${cls}"
      >
        ${label}
      </a>
    `;
  };


  /* ==============================================================
     MOBILE NAVIGATION LINK
  ============================================================== */

  const mobileLink = ({
    href,
    label
  }) => {

    const cls =
      isActive(href)

        ? "text-sm font-semibold text-green-400"

        : "text-gray-200 transition hover:text-green-400";


    return `
      <a
        href="${href}"
        class="${cls}"
      >
        ${label}
      </a>
    `;
  };


  /* ==============================================================
     CUSTOMER PROFILE LINK
  ============================================================== */

  function desktopProfileLink() {

    if (!shouldShowCustomerProfile()) {
      return "";
    }


    return `
      <a
        href="customer-profile.html"
        id="desktopProfileLink"
        class="rounded-xl border border-green-400/30
               bg-green-400/10 px-4 py-2.5
               text-sm font-semibold text-green-300
               transition
               hover:border-green-300/60
               hover:bg-green-400/20"
      >
        👤 
      </a>
    `;
  }


  function mobileProfileLink() {

    if (!shouldShowCustomerProfile()) {
      return "";
    }


    return `
      <a
        href="customer-profile.html"
        id="mobileProfileLink"
        class="rounded-xl border
               border-green-400/30
               bg-green-400/10
               px-4 py-3
               text-center
               font-semibold
               text-green-300
               transition
               hover:border-green-300/60
               hover:bg-green-400/20"
      >
        👤 My Profile
      </a>
    `;
  }


  /* ==============================================================
     NAVBAR HTML
  ============================================================== */

  function buildNavbar() {

    return `

      <header
        class="
          fixed
          top-0
          left-0
          z-50
          w-full
          border-b
          border-white/10
          bg-[#080B10]/85
          backdrop-blur-xl
        "
      >

        <nav
          class="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-5
            py-4
            lg:px-8
          "
        >

          <!-- ==================================================
               LOGO
          =================================================== -->

          <a
            href="index.html"
            class="flex items-center gap-3"
          >

            <div
              class="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-green-400/30
                bg-green-400/10
              "
            >

              <span
                class="
                  text-lg
                  font-bold
                  text-green-400
                "
              >
                G
              </span>

            </div>


            <span
              class="
                text-xl
                font-bold
                tracking-tight
              "
            >
              Griahsathi
            </span>

          </a>


          <!-- ==================================================
               DESKTOP NAVIGATION
          =================================================== -->

          <div
            class="
              hidden
              items-center
              gap-8
              md:flex
            "
          >

            ${NAV_ITEMS
              .map(desktopLink)
              .join("\n")}

          </div>


          <!-- ==================================================
               DESKTOP ACTIONS
          =================================================== -->

          <div
            class="
              hidden
              items-center
              gap-3
              md:flex
            "
          >

            <!-- My Profile -->
            ${desktopProfileLink()}


            <!-- Theme -->
            <button
              id="themeToggle"
              type="button"
              class="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-lg
                transition
                hover:border-green-400/40
                hover:bg-white/10
              "
              aria-label="Toggle light and dark mode"
            >

              <span id="themeIcon">
                ☀️
              </span>

            </button>


            <!-- Language -->
            <button
              id="gs-language-switcher"
              type="button"
              class="
                rounded-xl
                border
                border-green-400/30
                bg-green-400/10
                px-3
                py-2.5
                text-xs
                font-extrabold
                text-green-300
                transition
                hover:border-green-300/60
                hover:bg-green-400/20
              "
              title="Switch language"
              aria-label="Switch language"
            >
              EN / हिंदी
            </button>


            <!-- Find Worker -->
            <a
              href="find-worker.html"
              class="
                rounded-xl
                border
                border-white/10
                px-4
                py-2.5
                text-sm
                font-semibold
                text-gray-200
                transition
                hover:border-green-400/40
                hover:bg-white/5
              "
            >
              Find a Worker
            </a>


            <!-- Auth -->
            <div id="desktopAuth">

              <a
                href="login.html"
                class="
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-200
                  transition
                  hover:border-green-400/40
                  hover:bg-white/5
                "
              >
                Login / Sign Up
              </a>

            </div>


            <!-- Worker -->
            <a
              href="worker-auth.html"
              class="
                rounded-xl
                bg-green-500
                px-4
                py-2.5
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-green-400
                hover:shadow-lg
                hover:shadow-green-500/20
              "
            >
              Become a Griah Sathi
            </a>

          </div>


          <!-- ==================================================
               MOBILE MENU BUTTON
          =================================================== -->

          <button
            id="menuButton"
            class="
              rounded-lg
              border
              border-white/10
              p-2
              text-gray-300
              transition
              hover:bg-white/5
              md:hidden
            "
            aria-label="Open menu"
            aria-expanded="false"
          >

            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />

            </svg>

          </button>

        </nav>


        <!-- ====================================================
             MOBILE MENU
        ===================================================== -->

        <div
          id="mobileMenu"
          class="
            hidden
            border-t
            border-white/10
            bg-[#080B10]
            px-5
            py-5
            md:hidden
          "
        >

          <div
            class="
              flex
              flex-col
              gap-4
            "
          >

            <!-- Theme -->
            <button
              id="mobileThemeToggle"
              type="button"
              class="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                font-semibold
                text-gray-200
                transition
                hover:border-green-400/40
                hover:bg-white/10
              "
            >

              <span id="mobileThemeIcon">
                ☀️
              </span>

              <span>
                Light / Dark Mode
              </span>

            </button>


            <!-- Language -->
            <button
              id="gs-language-switcher-mobile"
              type="button"
              class="
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-green-400/30
                bg-green-400/10
                px-4
                py-3
                font-extrabold
                text-green-300
                transition
                hover:border-green-300/60
                hover:bg-green-400/20
              "
            >
              EN / हिंदी
            </button>


            <!-- Normal navigation -->
            ${NAV_ITEMS
              .map(mobileLink)
              .join("\n")}


            <hr
              class="border-white/10"
            >


            <!-- Customer Profile -->
            ${mobileProfileLink()}


            <!-- Find Worker -->
            <a
              href="find-worker.html"
              class="
                rounded-xl
                border
                border-white/10
                px-4
                py-3
                text-center
                font-semibold
              "
            >
              Find a Worker
            </a>


            <!-- Customer Auth -->
            <div id="mobileAuth">

              <a
                href="login.html"
                class="
                  block
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-3
                  text-center
                  font-semibold
                  text-gray-200
                "
              >
                Login / Sign Up
              </a>

            </div>


            <!-- Worker -->
            <a
              href="worker-auth.html"
              class="
                rounded-xl
                bg-green-500
                px-4
                py-3
                text-center
                font-semibold
                text-black
              "
            >
              Become a Griah Sathi
            </a>

          </div>

        </div>

      </header>

    `;
  }


  /* ==============================================================
     MOBILE MENU
  ============================================================== */

  function initMobileMenu() {

    const menuButton =
      document.getElementById(
        "menuButton"
      );


    const mobileMenu =
      document.getElementById(
        "mobileMenu"
      );


    if (
      !menuButton ||
      !mobileMenu
    ) {
      return;
    }


    menuButton.addEventListener(
      "click",
      () => {

        const isHidden =
          mobileMenu.classList.contains(
            "hidden"
          );


        mobileMenu.classList.toggle(
          "hidden"
        );


        menuButton.setAttribute(
          "aria-expanded",
          String(isHidden)
        );

      }
    );


    mobileMenu
      .querySelectorAll("a")
      .forEach(
        link => {

          link.addEventListener(
            "click",
            () => {

              mobileMenu.classList.add(
                "hidden"
              );


              menuButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }
          );

        }
      );
  }


  /* ==============================================================
     THEME SYSTEM
  ============================================================== */

  function initTheme() {

    const themeToggle =
      document.getElementById(
        "themeToggle"
      );


    const mobileThemeToggle =
      document.getElementById(
        "mobileThemeToggle"
      );


    const themeIcon =
      document.getElementById(
        "themeIcon"
      );


    const mobileThemeIcon =
      document.getElementById(
        "mobileThemeIcon"
      );


    function applyTheme(theme) {

      const isLight =
        theme === "light";


      document.body.classList.toggle(
        "light-mode",
        isLight
      );


      if (themeIcon) {

        themeIcon.textContent =
          isLight
            ? "🌙"
            : "☀️";
      }


      if (mobileThemeIcon) {

        mobileThemeIcon.textContent =
          isLight
            ? "🌙"
            : "☀️";
      }


      /*
        Keep the existing navbar theme key
        compatible with your project.
      */

      localStorage.setItem(
        "theme",
        theme
      );


      /*
        Also synchronize the core theme key.
      */

      localStorage.setItem(
        "griahsathi-theme",
        theme
      );
    }


    const savedTheme =
      localStorage.getItem(
        "griahsathi-theme"
      )
      ||
      localStorage.getItem(
        "theme"
      )
      ||
      "dark";


    applyTheme(
      savedTheme
    );


    function toggle() {

      const isLight =
        document.body.classList.contains(
          "light-mode"
        );


      applyTheme(
        isLight
          ? "dark"
          : "light"
      );
    }


    themeToggle?.addEventListener(
      "click",
      toggle
    );


    mobileThemeToggle?.addEventListener(
      "click",
      toggle
    );
  }


  /* ==============================================================
     ESCAPE HTML
  ============================================================== */

  function escapeHtml(value) {

    const el =
      document.createElement(
        "div"
      );


    el.textContent =
      value ?? "";


    return el.innerHTML;
  }


  /* ==============================================================
     LOGOUT CUSTOMER
  ============================================================== */

  function logoutCustomer() {

    /*
      Remove ONLY the active customer session.

      DO NOT delete:
        griahsathi-customers
        griahsathi-bookings
    */

    localStorage.removeItem(
      "griahsathi-current-customer"
    );


    /*
      Keep compatibility with
      older authentication code.
    */

    localStorage.removeItem(
      "griahsathi-logged-in"
    );


    window.location.href =
      "index.html";
  }


  /* ==============================================================
     CUSTOMER ACCOUNT DISPLAY
  ============================================================== */

  function renderCustomerAccount() {

    const customer =
      getLoggedInCustomer();


    const desktopAuth =
      document.getElementById(
        "desktopAuth"
      );


    const mobileAuth =
      document.getElementById(
        "mobileAuth"
      );


    if (
      !desktopAuth ||
      !mobileAuth
    ) {
      return;
    }


    /*
      No customer logged in.
    */

    if (
      !customer ||
      !customer.name
    ) {
      return;
    }


    const firstName =
      escapeHtml(
        String(
          customer.name
        )
          .trim()
          .split(/\s+/)[0]
      );


    /* ==========================================================
       DESKTOP CUSTOMER ACCOUNT
    =========================================================== */

    desktopAuth.innerHTML = `

      <div
        class="
          flex
          items-center
          gap-2
        "
      >

        <span
          class="
            whitespace-nowrap
            text-sm
            font-semibold
            text-green-400
          "
        >
          Hi, ${firstName} 👋
        </span>


        <button
          id="desktopLogout"
          type="button"
          class="
            rounded-xl
            border
            border-white/10
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-200
            transition
            hover:border-red-400/40
            hover:bg-red-400/10
            hover:text-red-300
          "
        >
          Logout
        </button>

      </div>

    `;


    /* ==========================================================
       MOBILE CUSTOMER ACCOUNT
    =========================================================== */

    mobileAuth.innerHTML = `

      <div
        class="
          rounded-xl
          border
          border-green-400/20
          bg-green-400/10
          px-4
          py-3
          text-center
        "
      >

        <p
          class="
            font-semibold
            text-green-400
          "
        >
          Hi, ${firstName} 👋
        </p>


        <button
          id="mobileLogout"
          type="button"
          class="
            mt-2
            text-sm
            font-semibold
            text-gray-200
            transition
            hover:text-red-300
          "
        >
          Logout
        </button>

      </div>

    `;


    document
      .getElementById(
        "desktopLogout"
      )
      ?.addEventListener(
        "click",
        logoutCustomer
      );


    document
      .getElementById(
        "mobileLogout"
      )
      ?.addEventListener(
        "click",
        logoutCustomer
      );
  }


  /* ==============================================================
     LANGUAGE BUTTONS
  ============================================================== */

  function initLanguageButtons() {

    const desktopLanguage =
      document.getElementById(
        "gs-language-switcher"
      );


    const mobileLanguage =
      document.getElementById(
        "gs-language-switcher-mobile"
      );


    function triggerLanguage() {

      /*
        Use the existing language system
        when available.
      */

      if (
        typeof window.toggleLanguage ===
        "function"
      ) {

        window.toggleLanguage();

        return;
      }


      if (
        typeof window.switchLanguage ===
        "function"
      ) {

        window.switchLanguage();

        return;
      }


      /*
        If griahsathi-language.js handles
        the buttons by ID, simply dispatch
        the click to the known handler.
      */

      document.dispatchEvent(
        new CustomEvent(
          "griahsathi-language-toggle"
        )
      );
    }


    desktopLanguage?.addEventListener(
      "click",
      triggerLanguage
    );


    mobileLanguage?.addEventListener(
      "click",
      triggerLanguage
    );
  }


  /* ==============================================================
     INSERT NAVBAR
  ============================================================== */

  function injectNavbar() {

    const mount =
      document.getElementById(
        "site-header"
      );


    if (!mount) {

      console.warn(
        'navbar.js: no <div id="site-header"></div> found on this page — navbar not injected.'
      );

      return;
    }


    /*
      Build navbar AFTER checking:
        - current page
        - current customer
    */

    mount.outerHTML =
      buildNavbar();


    initMobileMenu();

    initTheme();

    renderCustomerAccount();

    initLanguageButtons();
  }


  /* ==============================================================
     BOOT
  ============================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      injectNavbar
    );

  } else {

    injectNavbar();

  }

})();