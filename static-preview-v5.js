(() => {
  const disciplines = [
    {
      subtitle: "קונסטרוקציה, סככות ומבנים",
      title: "מבני תעשייה",
      description:
        "מבני תעשייה, סככות, מחסנים, מבנים ניידים ויבילים, קונסטרוקציות ובנייה קלה.",
      image: "/media/project-structure.jpg",
      alt: "קונסטרוקציית מתכת של חירות תעשיות מסגרות",
      links: ["קונסטרוקציה", "סככות", "בניית מחסן", "בנייה קלה"],
    },
    {
      subtitle: "מתכת שפוגשת אדריכלות",
      title: "מדרגות ומעקות",
      description:
        "מדרגות ומעקות לפנים ולחוץ, בהתאמה למרחב, לחומר ולשפה האדריכלית.",
      image: "/media/project-stairs.jpg",
      alt: "מדרגות מתכת של חירות תעשיות מסגרות",
      links: ["מדרגות פנים", "מדרגות חוץ", "מעקות", "תכנון מדרגות"],
    },
    {
      subtitle: "נוכחות, הגנה ותנועה",
      title: "שערים וגידור",
      description:
        "שערים, גדרות וסורגים לבית, לעסק ולמתחמים, בהתאמה לצורך ולסביבה.",
      image: "/media/project-gate.jpg",
      alt: "שער מתכת של חירות תעשיות מסגרות",
      links: ["שערים חשמליים", "שערי חניה", "גידור", "סורגים"],
    },
    {
      subtitle: "מענה לעבודות מורכבות",
      title: "פתרונות תעשייה",
      description:
        "עבודות מסגרות, החלפת וקירוי גגות, גגות איסכורית, רשתות צל, מרזבים ותעלות ניקוז.",
      image: "/media/industrial-roof.jpg",
      alt: "פתרון קירוי תעשייתי של חירות תעשיות מסגרות",
      links: ["עבודות מסגרות", "קירוי גגות", "איסכורית", "מרזבים"],
    },
  ];

  const heroLabels = ["קירוי וקונסטרוקציה", "שערים וגידור", "מדרגות ומעקות"];
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
        menuButton.setAttribute("aria-label", "פתיחת תפריט");
      });
    });
  }

  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  const heroButtons = Array.from(document.querySelectorAll(".hero-pagination button"));
  const heroCaption = document.querySelector(".hero-media-caption span");

  function selectHero(index) {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });
    heroButtons.forEach((button, buttonIndex) => {
      button.setAttribute("aria-current", String(buttonIndex === index));
    });
    if (heroCaption) heroCaption.textContent = heroLabels[index];
  }

  heroButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectHero(index));
  });

  const disciplineButtons = Array.from(
    document.querySelectorAll(".discipline-list [role='tab']"),
  );
  const disciplineCard = document.querySelector(".discipline-card");

  function selectDiscipline(index) {
    const item = disciplines[index];
    if (!item || !disciplineCard) return;

    disciplineButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });

    const image = disciplineCard.querySelector(".discipline-photo img");
    const subtitle = disciplineCard.querySelector(".discipline-copy small");
    const title = disciplineCard.querySelector(".discipline-copy h2");
    const description = disciplineCard.querySelector(".discipline-copy p");
    const list = disciplineCard.querySelector(".discipline-copy ul");

    if (image) {
      image.src = item.image;
      image.alt = item.alt;
    }
    if (subtitle) subtitle.textContent = item.subtitle;
    if (title) title.textContent = item.title;
    if (description) description.textContent = item.description;
    if (list) {
      list.replaceChildren(
        ...item.links.map((text) => {
          const listItem = document.createElement("li");
          listItem.textContent = text;
          return listItem;
        }),
      );
    }
  }

  disciplineButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectDiscipline(index));
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      button.addEventListener("mouseenter", () => selectDiscipline(index));
    }
  });

  document.querySelectorAll(".faq-rows article").forEach((article) => {
    const button = article.querySelector("button");
    if (!button) return;
    button.addEventListener("click", () => {
      const open = article.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const cookieBanner = document.querySelector(".cookie-banner");
  const cookieButtons = cookieBanner
    ? Array.from(cookieBanner.querySelectorAll("button"))
    : [];
  const privacyButton = Array.from(document.querySelectorAll(".footer-base button")).find(
    (button) => button.textContent?.includes("העדפות פרטיות"),
  );

  function showCookieBanner(show) {
    if (!cookieBanner) return;
    cookieBanner.hidden = !show;
    cookieBanner.style.display = show ? "" : "none";
  }

  try {
    if (window.localStorage.getItem("masgeria-cookie-choice")) showCookieBanner(false);
  } catch {
    showCookieBanner(true);
  }

  cookieButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      try {
        window.localStorage.setItem(
          "masgeria-cookie-choice",
          index === 0 ? "essential" : "accepted",
        );
      } catch {
        // The choice still closes the local notice when storage is unavailable.
      }
      showCookieBanner(false);
    });
  });

  privacyButton?.addEventListener("click", () => showCookieBanner(true));

  const shareButton = document.querySelector("[aria-label='שיתוף האתר']");
  shareButton?.addEventListener("click", async () => {
    const shareData = {
      title: "חירות תעשיות מסגרות",
      text: "עבודות מתכת לבית, לעסק ולתעשייה.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        const label = shareButton.querySelector("strong");
        if (label) {
          label.textContent = "הקישור הועתק";
          window.setTimeout(() => {
            label.textContent = "שיתוף";
          }, 2200);
        }
      }
    } catch {
      // Closing the native share sheet is not an error state for the visitor.
    }
  });

  const accessibilityButton = document.querySelector(
    "[aria-controls='accessibility-panel']",
  );
  let accessibilityPanel;

  function closeAccessibility() {
    accessibilityPanel?.remove();
    accessibilityPanel = undefined;
    accessibilityButton?.setAttribute("aria-expanded", "false");
    accessibilityButton?.setAttribute("aria-label", "פתיחת כלי נגישות");
  }

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
      <header><strong>התאמת תצוגה</strong><button type="button" aria-label="סגירת אפשרויות נגישות">×</button></header>
      <button type="button" data-class="a11y-large-text">טקסט גדול</button>
      <button type="button" data-class="a11y-contrast">ניגודיות גבוהה</button>
      <button type="button" data-class="a11y-reduce-motion">הפחתת תנועה</button>
      <button type="button" data-reset="true">איפוס התאמות</button>
    `;
    document.querySelector("main")?.append(accessibilityPanel);
    accessibilityButton.setAttribute("aria-expanded", "true");
    accessibilityButton.setAttribute("aria-label", "סגירת כלי נגישות");

    accessibilityPanel
      .querySelector("[aria-label='סגירת אפשרויות נגישות']")
      ?.addEventListener("click", closeAccessibility);
    accessibilityPanel.querySelectorAll("[data-class]").forEach((button) => {
      button.addEventListener("click", () => {
        const className = button.getAttribute("data-class");
        if (className) body.classList.toggle(className);
      });
    });
    accessibilityPanel.querySelector("[data-reset]")?.addEventListener("click", () => {
      body.classList.remove(
        "a11y-large-text",
        "a11y-contrast",
        "a11y-reduce-motion",
      );
    });
  });
})();
