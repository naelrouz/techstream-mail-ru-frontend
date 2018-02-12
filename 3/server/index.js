const app = require('./server');
const colors = require('colors');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(colors.green.bold(`APP start on http://localhost:${port}`));
});
