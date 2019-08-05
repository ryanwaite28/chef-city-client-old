const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 7600;
const app = express();

const staticPath = path.join(__dirname, './_static');
const buildPath = path.join(__dirname, './build');

app.use('/static', express.static(staticPath));
app.use(express.static(buildPath));

// production mode
if(process.env.NODE_ENV === 'production') {
  try {
    app.get('*', (req, res) => {
      try {
        // res.sendFile(path.join(__dirname = './build/index.html'));
        res.sendFile(path.join(__dirname, './build/index.html'));
      } catch(err) {
        console.log(err);
        res.json({ error: true, msg: 'could not send file...' });
      }
    })
  } catch(e) {
    console.log({
      error: e,
      message: 'could not'
    });
  }
}

/* --- */


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
