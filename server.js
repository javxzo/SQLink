const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path'); // Add this

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Serve the HTML file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to run SQL queries
app.post('/run-sql', (req, res) => {
  const sql = req.body.sql;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Initialize the database and tables
const createTables = () => {
  db.run(`
    CREATE TABLE PhoneRecords (
      record_id INTEGER PRIMARY KEY,
      person_id INTEGER,
      timestamp TEXT,
      phone_number TEXT,
      call_duration INTEGER,
      call_type TEXT
    );
  `);

  db.run(`
    CREATE TABLE Clues (
      clue_id INTEGER PRIMARY KEY,
      description TEXT,
      is_discovered INTEGER
    );
  `);

  db.run(`
    CREATE TABLE Relationships (
      relationship_id INTEGER PRIMARY KEY,
      person1_id INTEGER,
      person2_id INTEGER,
      description TEXT
    );
  `);

  db.run(`
    CREATE TABLE Persons (
      person_id INTEGER PRIMARY KEY,
      name TEXT,
      role TEXT,
      profile TEXT
    );
  `);

  db.run(`
    CREATE TABLE CaseDetails (
      case_id INTEGER PRIMARY KEY,
      description TEXT,
      murder_weapon TEXT,
      crime_scene_description TEXT,
      forensic_evidence TEXT
    );
  `);

  db.run(`
    CREATE TABLE Alibis (
      alibi_id INTEGER PRIMARY KEY,
      person_id INTEGER,
      alibi TEXT,
      is_verified INTEGER
    );
  `);

  db.run(`
    CREATE TABLE Interviews (
      interview_id INTEGER PRIMARY KEY,
      person_id INTEGER,
      transcript TEXT
    );
  `);

  db.run(`
    CREATE TABLE CameraFootage (
      footage_id INTEGER PRIMARY KEY,
      timestamp TEXT,
      location TEXT,
      person_id INTEGER,
      description TEXT
    );
  `);

  db.run(`
    CREATE TABLE SecurityLog (
      log_id INTEGER PRIMARY KEY,
      timestamp TEXT,
      person_id INTEGER,
      action TEXT,
      description TEXT
    );
  `);

  db.run(`
    CREATE TABLE Artifacts (
      artifact_id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      location TEXT,
      is_damaged INTEGER
    );
  `);
};

const insertInitialData = () => {
  fs.readFile('storyline.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading storyline.txt:', err);
      return;
    }

    db.exec(data, (err) => {
      if (err) {
        console.error('Error executing initial data:', err.message);
      } else {
        console.log('Initial data inserted successfully.');
      }
    });
  });
};

db.serialize(() => {
  createTables();
  insertInitialData();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

app.post('/execute-sql', (req, res) => {
    const sql = req.body.sql;
    console.log("Received SQL:", sql); // Log received SQL
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("SQL Error:", err.message); // Log SQL errors
        res.status(400).json({ error: err.message });
        return;
      }
      console.log("SQL Result:", rows); // Log SQL results
      res.json({
        message: 'success',
        rows: rows
      });
    });
  });
  
