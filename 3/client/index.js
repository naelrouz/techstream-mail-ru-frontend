const {UserService, Block, Form, Scoreboard} = window;

const userService = new UserService();

const menuItems = [
  {sectionId: 'login', name: 'Вход'},
  {sectionId: 'profile', name: 'Профайл'},
  {sectionId: 'about', name: 'Об игре'},
];

const app = new Block(document.querySelector('#app'));
const nav = new Block(document.getElementById('navigation'));

const signupForm = new Form([
  {
    classes: [],
    attributes: {
      name: 'username',
      type: 'text',
      placeholder: 'Имя',
      required: 'required',
    },
  },
  {
    classes: [],
    attributes: {
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      required: 'required',
    },
  },
  {
    classes: [],
    attributes: {
      name: 'age',
      type: 'text',
      placeholder: 'Возраст',
      required: 'required',
    },
  },
  {
    classes: [],
    attributes: {type: 'submit', value: 'Регистрация'},
  },
]);

app.append(signupForm);

signupForm.onSubmit(data => {
  console.log('signupForm.onSubmit.data: ', data);
});

const scoresTable = new Scoreboard();

scoresTable.update([
  {username: 'User1', email: 'E-mail', score: 303},
  {username: 'User2', email: 'E-mail', score: 302},
  {username: 'User3', email: 'E-mail', score: 530},
  {username: 'User4', email: 'E-mail', score: 303, me: true},
  {username: 'User5', email: 'E-mail', score: 730},
  {username: 'User6', email: 'E-mail', score: 300},
]);

app.append(scoresTable);

// menuItems.forEach(menuItem => {
//   const button = Block.Create('input', ['nav__item'], {
//     type: 'button',
//     'data-section': menuItem.sectionId,
//     value: menuItem.name,
//   });
//
//   nav.append(button);
// });
//
// // const navItems = document.querySelectorAll('.nav__item');
//
// const sectionsHTMLC = app.getElementsByTagName('section');
//
// const usernameElement = new Block(document.querySelector('.profile__username'));
// const emailElement = new Block(document.querySelector('.profile__email'));
//
// usernameElement.textContent = 'Guest';
//
// console.log('usernameElement: ', usernameElement);
//
// nav.on('click', event => {
//   // e.preventDefault();
//
//   const {target} = event;
//
//   Array.from(sectionsHTMLC).forEach(sectionsItem => {
//     const section = sectionsItem;
//     section.hidden = true;
//     return null;
//   });
//
//   target.style.color = 'red';
//   const sectionId = target.getAttribute('data-section');
//
//   if (sectionId === 'profile') {
//     userService.userData((err, userdata) => {
//
//       // console.log('userdata: ', userdata);
//
//       usernameElement.setText(userdata.username)
//       emailElement.setText(userdata.email)
//
//     }, true);
//   }
//
//   const section = document.getElementById(sectionId);
//
//   section.hidden = false;
//
//   // console.log(e);
// });
//
// // sections.reduce(section => {});
//
// const loginForm = document.querySelector('.login_form');
//
// loginForm.addEventListener('submit', event => {
//   console.log('login_form -> login_form');
//
//   event.preventDefault();
//   const form = event.target;
//
//   const user = {};
//
//   user.email = form.elements.email.value;
//   user.username = form.elements.username.value;
//
//
//   userService.auth(user, (err, res) => {
//     if (err) {
//       console.error('err: ', err);
//
//       return false;
//     }
//
//     form.reset();
//
//     console.log('res: ', res);
//
//     return true;
//   });
// });
