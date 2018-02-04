const manuItems = [
  { sectionId: 'login', name: 'Вход' },
  { sectionId: 'profile', name: 'Профайл' },
  { sectionId: 'about', name: 'Об игре' }
];

const app = document.querySelector('#app');
const nav = document.getElementById('navigation');

for (let manuItem of manuItems) {
  const button = document.createElement('input');
  button.classList.add('nav__item');
  button.setAttribute('type', 'button');
  button.setAttribute('data-section', manuItem.sectionId);
  button.value = manuItem.name;
  nav.appendChild(button);
}

const navItems = document.querySelectorAll('.nav__item');

const sectionsHTMLC = app.getElementsByTagName('section');

console.log(sectionsHTMLC);

nav.addEventListener('click', e => {
  e.preventDefault;

  const _this = e.target;

  Array.from(sectionsHTMLC).forEach(section => {
    section.hidden = true;
  });

  _this.style.color = 'red';
  const sectionId = _this.getAttribute('data-section');

  const section = document.getElementById(sectionId);

  section.hidden = false;

  // console.log(e);
});

// sections.reduce(section => {});
