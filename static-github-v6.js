(() => {
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest("a[href]");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("href")?.startsWith("#") ||
        link.protocol === "tel:" ||
        link.protocol === "mailto:" ||
        link.hostname !== window.location.hostname
      ) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(link.href);
    },
    true,
  );

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const data = new FormData(form);
      if (!data.get("name") || !data.get("phone")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const message = [
        "שלום, אשמח לקבל פרטים על עבודת מתכת.",
        `שם: ${String(data.get("name") || "").trim()}`,
        `טלפון: ${String(data.get("phone") || "").trim()}`,
        data.get("email")
          ? `דואר אלקטרוני: ${String(data.get("email")).trim()}`
          : "",
        data.get("message")
          ? `פרטי הבקשה: ${String(data.get("message")).trim()}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");
      const status = form.querySelector('[role="status"]');
      if (status) status.textContent = "מעבירים אתכם לוואטסאפ להשלמת הפנייה.";
      window.open(
        `https://wa.me/972525993335?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    },
    true,
  );
})();
