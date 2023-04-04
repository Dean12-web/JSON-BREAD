var express = require('express');
var router = express.Router();
const fs = require('node:fs')

let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata)

/* GET home page. */
router.use(express.json());
router.get('/', function (req, res, next) {
  res.render('index', { title: 'JSON-Bread', data });
});

router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Add Data' })
})

router.post('/add', (req, res) => {
  if (req.body.id === '') {
    res.status(400).send('Error: Data is empty. Cannot upload.');
  } else {
    const id = parseInt(req.body.id)
    const string = req.body.string
    const integer = parseInt(req.body.integer)
    const float = parseFloat(req.body.float)
    const date = req.body.date ? indonesianMonthString(req.body.date) : ("Kosong")
    const boolean = req.body.boolean
    data.push({
      "id": id,
      "string": string,
      "integer": integer,
      "float": float,
      "date": date,
      "boolean": boolean
    })
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
    res.redirect('/')
  }
})

router.get('/edit/:id', (req, res) => {
  const id = req.params.id
  item = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      item['id'] = data[i].id;
      item['string'] = data[i].string;
      item['integer'] = data[i].integer;
      item['float'] = data[i].float;
      item['boolean'] = data[i].boolean;
      item['date'] = indonesianMonthInt(data[i].date);
    }
  }
  res.render('edit', { title: "Edit data", item });
})

router.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const string = req.body.string
  const integer = parseInt(req.body.integer)
  const float = parseFloat(req.body.float)
  const date = req.body.date ? indonesianMonthString(req.body.date) : ("Kosong")
  const boolean = req.body.boolean
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data[i].string = string
      data[i].integer = integer
      data[i].float = float
      data[i].boolean = boolean
      data[i].date = date
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
  res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  let indexDelete = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      indexDelete = i;
    }
  }
  data.splice(indexDelete, 1);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
  res.redirect('/');
})

// Helpers
function indonesianMonthString(date) {
  let tahun = date.split('-')[0]
  let bulan = date.split('-')[1]
  let tanggal = date.split('-')[2]
  switch (bulan) {
    case '01': bulan = "Januari"; break;
    case '02': bulan = "Februari"; break;
    case '03': bulan = "Maret"; break;
    case '04': bulan = "April"; break;
    case '05': bulan = "Mei"; break;
    case '06': bulan = "Juni"; break;
    case '07': bulan = "Juli"; break;
    case '08': bulan = "Agustus"; break;
    case '09': bulan = "September"; break;
    case '10': bulan = "Oktober"; break;
    case '11': bulan = "November"; break;
    case '12': bulan = "Desember"; break;
  }
  return `${tanggal} ${bulan} ${tahun}`
}
function indonesianMonthInt(string) {
  let tahun = string.split(' ')[2]
  let bulan = string.split(' ')[1]
  let tanggal = string.split(' ')[0]
  switch (bulan) {
    case 'Januari': bulan = "01"; break;
    case 'Februari': bulan = "02"; break;
    case 'Maret': bulan = "03"; break;
    case 'April': bulan = "04"; break;
    case 'Mei': bulan = "05"; break;
    case 'Juni': bulan = "06"; break;
    case 'Juli': bulan = "07"; break;
    case 'Agustus': bulan = "08"; break;
    case 'September': bulan = "09"; break;
    case 'Oktober': bulan = "10"; break;
    case 'November': bulan = "11"; break;
    case 'Desember': bulan = "12"; break;
  }
  return `${tahun}-${bulan}-${tanggal}`
}

module.exports = router;