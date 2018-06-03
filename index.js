const app = require('./server/server');
const port = 4000;
app.listen(port, () => {
  console.log('Listening on '+port);
});
