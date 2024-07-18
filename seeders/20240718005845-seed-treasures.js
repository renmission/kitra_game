const xlsx = require('xlsx');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = xlsx.readFile(path.resolve(__dirname, '../Serino-Mini-Project-Data.xlsx'));
    const worksheet = workbook.Sheets['treasures'];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const treasuresData = jsonData.map(row => ({
      id: row['id'],
      latitude: parseFloat(row['latitude']),
      longitude: parseFloat(row['longitude']),
      name: row['name'],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Treasures', treasuresData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Treasures', null, {});
  }
};
