const xlsx = require('xlsx');
const path = require('path');

// Load the Excel file
const workbook = xlsx.readFile(path.resolve(__dirname, 'Serino-Mini-Project-Data.xlsx'));

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

console.log(jsonData);
