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

  const heroLabels = [
    "קירוי וקונסטרוקציה",
    "שערים וגידור",
    "מדרגות ומעקות",
  ];
  const heroSlides = [...document.querySelectorAll(".hero-slide")];
  const heroButtons = [...document.querySelectorAll(".hero-pagination button")];
  const heroCaption = document.querySelector(".hero-media-caption span");
  heroButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === index);
      });
      heroButtons.forEach((item, buttonIndex) => {
        item.setAttribute("aria-current", String(buttonIndex === index));
      });
      if (heroCaption) heroCaption.textContent = heroLabels[index];
    });
  });

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
  let accessibilityPanel;
  function closeAccessibility() {
    accessibilityPanel?.remove();
    accessibilityPanel = undefined;
    accessibilityButton?.setAttribute("aria-expanded", "false");
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
    accessibilityPanel
      .querySelector('[aria-label="סגירת אפשרויות נגישות"]')
      ?.addEventListener("click", closeAccessibility);
    accessibilityPanel.querySelectorAll("[data-class]").forEach((button) => {
      button.addEventListener("click", () => {
        body.classList.toggle(button.dataset.class);
      });
    });
    accessibilityPanel
      .querySelector("[data-reset]")
      ?.addEventListener("click", () => {
        body.classList.remove(
          "a11y-large-text",
          "a11y-contrast",
          "a11y-reduce-motion",
        );
      });
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
