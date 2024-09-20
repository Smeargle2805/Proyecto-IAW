const express = require('express');
const sql = require('mssql');

const config = {
  user: 'BryanAlvarado',
  password: 'Palmaso.20',
  server: 'baserver2805.database.windows.net',
  database: 'BryanAlvaradoDB',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/data', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM TB_Proyecto');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar con la base de datos');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  


