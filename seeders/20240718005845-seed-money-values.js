const xlsx = require('xlsx');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = xlsx.readFile(path.resolve(__dirname, '../Serino-Mini-Project-Data.xlsx'));
    const worksheet = workbook.Sheets['money_values'];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const moneyValuesData = jsonData.map((row, index) => ({
      id: index + 1,
      treasure_id: row['treasure_id'],
      amt: row['amt'],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('MoneyValues', moneyValuesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MoneyValues', null, {});
  }
};
