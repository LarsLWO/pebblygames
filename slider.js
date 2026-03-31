const sliders = document.querySelectorAll("[data-slider]");

for (const slider of sliders) {
  const rail = slider.querySelector("[data-slider-rail]");
  const slides = Array.from(slider.querySelectorAll("[data-slide]"));
  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const dots = Array.from(slider.querySelectorAll("[data-slide-to]"));

  if (!rail || slides.length === 0) {
    continue;
  }

  const updateState = () => {
    const slideWidth = slides[0].getBoundingClientRect().width || 1;
    const activeIndex = Math.round(rail.scrollLeft / slideWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });

    if (prevButton) {
      prevButton.disabled = activeIndex <= 0;
    }

    if (nextButton) {
      nextButton.disabled = activeIndex >= slides.length - 1;
    }
  };

  const scrollToIndex = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides[clampedIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  prevButton?.addEventListener("click", () => {
    const slideWidth = slides[0].getBoundingClientRect().width || 1;
    const activeIndex = Math.round(rail.scrollLeft / slideWidth);
    scrollToIndex(activeIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    const slideWidth = slides[0].getBoundingClientRect().width || 1;
    const activeIndex = Math.round(rail.scrollLeft / slideWidth);
    scrollToIndex(activeIndex + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      scrollToIndex(Number(dot.dataset.slideTo));
    });
  });

  rail.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateState);
  });

  window.addEventListener("resize", updateState);
  updateState();
}
