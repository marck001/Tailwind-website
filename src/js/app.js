const btnSun = document.querySelector(".btn-sun");
const btnMoon = document.querySelector(".btn-moon");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const userTheme = localStorage.getItem("theme");

document.addEventListener('alpine:init', () => {
  Alpine.store('accordion', {
    tab: 0
  });
  Alpine.data('accordion', (idx) => ({
    init() {
      this.idx = idx;
    },
    idx: -1,
    handleClick() {
      this.$store.accordion.tab = this.$store.accordion.tab === this.idx ? 0 : this.idx;
    },
    handleRotate() {
      return this.$store.accordion.tab === this.idx ? '-rotate-180' : '';
    },
    handleToggle() {
      return this.$store.accordion.tab === this.idx ? `max-height: ${this.$refs.tab.scrollHeight}px` : '';
    }
  }));
})

const iconToggle = () => {
  btnMoon.classList.toggle("hidden")
  btnSun.classList.toggle("hidden")
  console.log("working icon")
}

const themeCheck = () => {
  console.log("User Theme:", userTheme);
  console.log("Prefers Dark Scheme:", prefersDarkScheme);
  if (userTheme === "dark" || (!userTheme && prefersDarkScheme)) {
    document.documentElement.classList.add("dark");
    btnMoon.classList.add("hidden");
    //btnSun.classList.remove("hidden");
    return
  }
  btnSun.classList.add("hidden");
  //btnMoon.classList.remove("hidden");
};

const themeSwitch = () => {
  if (document.body.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle()
    console.log(userTheme)
    return
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark")
  iconToggle();
  console.log("working theme")
  console.log(userTheme)
}

btnSun?.addEventListener("click", themeSwitch);
btnMoon?.addEventListener("click", themeSwitch);

themeCheck();