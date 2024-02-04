const express = require("express");
const app = express();
const sqlite = require("sqlite3").verbose();
const port = process.env.port || 3005;
const db = new sqlite.Database("./dua_main.sqlite", sqlite.OPEN_READONLY, (err) => {
    if (err) return console.error(err);
});

//app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and sqlite3' })
  })

app.get("/dua", (req, res) => {
    db.all('SELECT * FROM dua', (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ data: rows });
    });
});
app.get("/category", (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ data: rows });
    });
});
app.get("/sub-category", (req, res) => {
    db.all('SELECT * FROM sub_category', (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ data: rows });
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});