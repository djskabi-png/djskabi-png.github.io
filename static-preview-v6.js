(() => {
  const body = document.body;
  const navigation = document.querySelector(".navigation");
  const menuButton = document.querySelector(".nav-toggle");

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("revealed");
  });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
    });
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  });

  const heroLabels = [
    "קירוי וקונסטרוקציה",
    "שערים וגידור",
    "מדרגות ומעקות",
  ];
  const heroSlides = [...document.querySelectorAll(".hero-slide")];
  const heroPrevious = document.querySelector('[data-hero="prev"]');
  const heroNext = document.querySelector('[data-hero="next"]');
  const heroCounter = document.querySelector(".hero-counter");
  const heroCaption = document.querySelector(".hero-media-caption span");
  let heroIndex = 0;
  function showHeroSlide(nextIndex) {
    if (!heroSlides.length) return;
    heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === heroIndex);
    });
    if (heroCaption) heroCaption.textContent = heroLabels[heroIndex];
    if (heroCounter) {
      heroCounter.textContent = `${heroIndex + 1} / ${heroSlides.length}`;
    }
  }
  heroPrevious?.addEventListener("click", () => showHeroSlide(heroIndex - 1));
  heroNext?.addEventListener("click", () => showHeroSlide(heroIndex + 1));

  const disciplines = [
    {
      subtitle: "קונסטרוקציה, סככות ומבנים",
      title: "מבני תעשייה",
      description:
        "מבני תעשייה, סככות, מחסנים, מבנים ניידים ויבילים, קונסטרוקציות ובנייה קלה.",
      image: "/media/project-structure.webp",
      alt: "קונסטרוקציית מתכת של חירות תעשיות מסגרות",
      links: [
        ["קונסטרוקציה", "/קונסטרוקציה.html"],
        ["סככות", "/סככה.html"],
        ["בניית מחסן", "/בניית-מחסן.html"],
        ["בנייה קלה", "/בניה-קלה.html"],
      ],
    },
    {
      subtitle: "מתכת שפוגשת אדריכלות",
      title: "מדרגות ומעקות",
      description:
        "מדרגות ומעקות לפנים ולחוץ, בהתאמה למרחב, לחומר ולשפה האדריכלית.",
      image: "/media/project-stairs.webp",
      alt: "מדרגות מתכת של חירות תעשיות מסגרות",
      links: [
        ["מדרגות פנים", "/מדרגות-פנים.html"],
        ["מדרגות חוץ", "/מדרגות-חוץ.html"],
        ["מעקות", "/מעקות.html"],
        ["תכנון מדרגות", "/תכנון-מדרגות.html"],
      ],
    },
    {
      subtitle: "נוכחות, הגנה ותנועה",
      title: "שערים וגידור",
      description:
        "שערים, גדרות וסורגים לבית, לעסק ולמתחמים, בהתאמה לצורך ולסביבה.",
      image: "/media/project-gate.webp",
      alt: "שער מתכת של חירות תעשיות מסגרות",
      links: [
        ["שערים חשמליים", "/שערים-חשמליים.html"],
        ["שערי חניה", "/שערים-לחניה.html"],
        ["גידור", "/גידור.html"],
        ["סורגים", "/סורגים.html"],
      ],
    },
    {
      subtitle: "מענה לעבודות מורכבות",
      title: "פתרונות תעשייה",
      description:
        "עבודות מסגרות, החלפת וקירוי גגות, גגות איסכורית, רשתות צל, מרזבים ותעלות ניקוז.",
      image: "/media/industrial-roof.webp",
      alt: "פתרון קירוי תעשייתי של חירות תעשיות מסגרות",
      links: [
        ["עבודות מסגרות", "/עבודות-מסגרות.html"],
        ["קירוי גגות", "/קירוי-גג.html"],
        ["איסכורית", "/גג-איסכורית.html"],
        ["מרזבים", "/מרזבים.html"],
      ],
    },
  ];
  const disciplineButtons = [
    ...document.querySelectorAll(".discipline-list [role='tab']"),
  ];
  const disciplineCard = document.querySelector(".discipline-card");
  disciplineButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = disciplines[index];
      if (!item || !disciplineCard) return;
      disciplineButtons.forEach((tab, tabIndex) => {
        tab.classList.toggle("active", tabIndex === index);
        tab.setAttribute("aria-selected", String(tabIndex === index));
      });
      const image = disciplineCard.querySelector(".discipline-photo img");
      if (image) {
        image.src = item.image;
        image.alt = item.alt;
      }
      disciplineCard.querySelector(".discipline-copy small").textContent =
        item.subtitle;
      disciplineCard.querySelector(".discipline-copy h2").textContent = item.title;
      disciplineCard.querySelector(".discipline-copy p").textContent =
        item.description;
      const list = disciplineCard.querySelector(".discipline-copy ul");
      if (list) {
        list.replaceChildren(
          ...item.links.map(([label, href]) => {
            const row = document.createElement("li");
            const link = document.createElement("a");
            link.href = href;
            link.textContent = label;
            row.append(link);
            return row;
          }),
        );
      }
    });
  });

  document.querySelectorAll(".faq-rows article").forEach((article) => {
    const button = article.querySelector("button");
    button?.addEventListener("click", () => {
      const open = !article.classList.contains("open");
      document.querySelectorAll(".faq-rows article").forEach((row) => {
        row.classList.remove("open");
        row.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
      article.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const shareButton = document.querySelector(
    '[aria-label^="שיתוף האתר"],[aria-label^="שיתוף העמוד"]',
  );
  shareButton?.addEventListener("click", async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "חירות תעשיות מסגרות",
          text: "עבודות מתכת לבית, לעסק ולתעשייה.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        const label = shareButton.querySelector("strong");
        if (label) label.textContent = "הועתק";
      }
    } catch {
      // Closing the native share sheet is not an error.
    }
  });

  const accessibilityButton = document.querySelector(
    '[aria-controls="accessibility-panel"]',
  );
  const accessibilityRoot = document.documentElement;
  const accessibilityStorageKey = "masgeria-a11y-preferences";
  const accessibilityOptions = [
    {
      className: "a11y-large-text",
      label: "טקסט גדול",
      description: "הגדלת הטקסט בכל האתר",
    },
    {
      className: "a11y-contrast",
      label: "ניגודיות גבוהה",
      description: "חיזוק צבעים, קווים וטקסט",
    },
    {
      className: "a11y-reduce-motion",
      label: "הפחתת תנועה",
      description: "צמצום אנימציות ומעברים",
    },
  ];
  let accessibilityPanel;

  function getAccessibilityPreferences() {
    return accessibilityOptions
      .filter(({ className }) => accessibilityRoot.classList.contains(className))
      .map(({ className }) => className);
  }

  function saveAccessibilityPreferences() {
    try {
      window.localStorage.setItem(
        accessibilityStorageKey,
        JSON.stringify(getAccessibilityPreferences()),
      );
    } catch {
      // Accessibility controls still work when browser storage is unavailable.
    }
  }

  function restoreAccessibilityPreferences() {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(accessibilityStorageKey) || "[]",
      );
      if (!Array.isArray(saved)) return;
      accessibilityOptions.forEach(({ className }) => {
        accessibilityRoot.classList.toggle(className, saved.includes(className));
      });
    } catch {
      // Ignore invalid or unavailable browser storage.
    }
  }

  function updateAccessibilityControls(message = "") {
    accessibilityOptions.forEach(({ className }) => {
      const control = accessibilityPanel?.querySelector(
        `[data-class="${className}"]`,
      );
      if (!control) return;
      control.setAttribute(
        "aria-pressed",
        String(accessibilityRoot.classList.contains(className)),
      );
    });
    const status = accessibilityPanel?.querySelector('[role="status"]');
    if (status) status.textContent = message;
  }

  function closeAccessibility({ restoreFocus = true } = {}) {
    accessibilityPanel?.remove();
    accessibilityPanel = undefined;
    accessibilityButton?.setAttribute("aria-expanded", "false");
    accessibilityButton?.setAttribute("aria-label", "פתיחת כלי נגישות");
    if (restoreFocus) accessibilityButton?.focus();
  }

  restoreAccessibilityPreferences();

  accessibilityButton?.addEventListener("click", () => {
    if (accessibilityPanel) {
      closeAccessibility();
      return;
    }
    accessibilityPanel = document.createElement("aside");
    accessibilityPanel.className = "accessibility-panel";
    accessibilityPanel.id = "accessibility-panel";
    accessibilityPanel.setAttribute("aria-label", "אפשרויות נגישות");
    accessibilityPanel.innerHTML = `
      <header><strong>התאמת תצוגה</strong><button type="button" data-close="true" aria-label="סגירת אפשרויות נגישות">×</button></header>
      <p class="a11y-panel-intro">אפשר להפעיל כמה התאמות יחד. הבחירה תישמר גם במעבר בין עמודים.</p>
      <div class="a11y-options" role="group" aria-label="התאמות תצוגה">
        ${accessibilityOptions
          .map(
            ({ className, label, description }) => `
              <button type="button" class="a11y-option" data-class="${className}" aria-pressed="false">
                <span><strong>${label}</strong><small>${description}</small></span>
              </button>
            `,
          )
          .join("")}
      </div>
      <button type="button" class="a11y-reset" data-reset="true">איפוס כל ההתאמות</button>
      <p class="a11y-status" role="status" aria-live="polite"></p>
    `;
    document.body.append(accessibilityPanel);
    accessibilityButton.setAttribute("aria-expanded", "true");
    accessibilityButton.setAttribute("aria-label", "סגירת כלי נגישות");
    updateAccessibilityControls();
    accessibilityPanel
      .querySelector("[data-close]")
      ?.addEventListener("click", closeAccessibility);
    accessibilityPanel.querySelectorAll("[data-class]").forEach((button) => {
      button.addEventListener("click", () => {
        const option = accessibilityOptions.find(
          ({ className }) => className === button.dataset.class,
        );
        if (!option) return;
        const active = accessibilityRoot.classList.toggle(option.className);
        saveAccessibilityPreferences();
        updateAccessibilityControls(
          `${option.label} ${active ? "הופעל" : "כובה"}.`,
        );
      });
    });
    accessibilityPanel
      .querySelector("[data-reset]")
      ?.addEventListener("click", () => {
        accessibilityOptions.forEach(({ className }) => {
          accessibilityRoot.classList.remove(className);
        });
        saveAccessibilityPreferences();
        updateAccessibilityControls("כל התאמות הנגישות אופסו.");
      });
    window.requestAnimationFrame(() => {
      accessibilityPanel?.querySelector("[data-close]")?.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && accessibilityPanel) {
      closeAccessibility();
    }
  });

  let cookieBanner = document.querySelector(".cookie-banner");
  if (!cookieBanner) {
    cookieBanner = document.createElement("aside");
    cookieBanner.className = "cookie-banner";
    cookieBanner.setAttribute("role", "dialog");
    cookieBanner.setAttribute("aria-label", "העדפות פרטיות");
    cookieBanner.innerHTML = `
      <div><strong>הפרטיות שלכם חשובה.</strong><p>האתר אינו מפעיל כלי מעקב או פרסום. נשמרת בדפדפן רק בחירת הפרטיות שלכם.</p></div>
      <div class="cookie-actions"><button type="button">חיוני בלבד</button><button type="button">אישור</button></div>
    `;
    document.querySelector("main")?.append(cookieBanner);
  }
  try {
    if (window.localStorage.getItem("masgeria-cookie-choice")) {
      cookieBanner.hidden = true;
      cookieBanner.style.display = "none";
    }
  } catch {
    cookieBanner.hidden = false;
    cookieBanner.style.display = "";
  }
  function openPrivacyPreferences() {
    cookieBanner.hidden = false;
    cookieBanner.style.display = "";
    window.requestAnimationFrame(() => {
      cookieBanner.querySelector("button")?.focus();
    });
  }
  document.querySelectorAll(".footer-base button").forEach((button) => {
    if (button.textContent?.includes("העדפות פרטיות")) {
      button.addEventListener("click", openPrivacyPreferences);
    }
  });
  cookieBanner.querySelectorAll("button").forEach((button, index) => {
    button.addEventListener("click", () => {
      try {
        window.localStorage.setItem(
          "masgeria-cookie-choice",
          index === 0 ? "essential" : "accepted",
        );
      } catch {
        // The banner can still close if storage is blocked.
      }
      cookieBanner.hidden = true;
      cookieBanner.style.display = "none";
    });
  });
})();
