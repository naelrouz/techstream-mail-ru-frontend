const auth = (username, email, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/auth', true);
  xhr.withCredentials = true;

  const user = { username, email };
  const body = JSON.stringify(user);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return null;
    }
    if (xhr.status !== 200) {
      return cb(xhr, null);
    }

    const res = JSON.parse(xhr.responseText);

    cb(null, res);

    return true;
  };
  xhr.send(body);
};

const whoami = cb => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/me', true);
  xhr.withCredentials = true;

  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return null;
    }
    if (xhr.status !== 200) {
      return cb(xhr, null);
    }

    const res = JSON.parse(xhr.responseText);

    cb(null, res);

    return true;
  };
  xhr.send();
};

const manuItems = [
  { sectionId: 'login', name: 'Вход' },
  { sectionId: 'profile', name: 'Профайл' },
  { sectionId: 'about', name: 'Об игре' }
];

const app = document.querySelector('#app');
const nav = document.getElementById('navigation');

manuItems.forEach(menuItem => {
  const button = document.createElement('input');
  button.classList.add('nav__item');
  button.setAttribute('type', 'button');
  button.setAttribute('data-section', menuItem.sectionId);
  button.value = menuItem.name;
  nav.appendChild(button);
});

// const navItems = document.querySelectorAll('.nav__item');

const sectionsHTMLC = app.getElementsByTagName('section');

const usernameElement = document.querySelector('.profile__username');
const emailElement = document.querySelector('.profile__email');

usernameElement.textContent = 'Guest';

console.log('usernameElement: ', usernameElement);

nav.addEventListener('click', event => {
  // e.preventDefault();

  const { target } = event;

  Array.from(sectionsHTMLC).forEach(sectionsItem => {
    const section = sectionsItem;
    section.hidden = true;
    return null;
  });

  target.style.color = 'red';
  const sectionId = target.getAttribute('data-section');

  if (sectionId === 'profile') {
    whoami((err, res) => {
      if (err) {
        console.log('err: ', err);
        return null;
      }
      console.log('res: ', res);

      const { username, email } = res;

      usernameElement.textContent = username;
      emailElement.textContent = email;

      return null;
    });
  }

  const section = document.getElementById(sectionId);

  section.hidden = false;

  // console.log(e);
});

// sections.reduce(section => {});

const loginForm = document.querySelector('.login_form');

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;

  const email = form.elements.email.value;

  const username = form.elements.username.value;

  auth(username, email, (err, res) => {
    if (err) {
      // alert(`AUTH Error: ${err.status}`);
      console.log('err: ', err);

      return false;
    }

    form.reset();

    console.log('res: ', res);

    return true;
  });
});
