const xlsx = require('xlsx');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = xlsx.readFile(path.resolve(__dirname, '../Serino-Mini-Project-Data.xlsx'));
    const worksheet = workbook.Sheets['users'];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const usersData = jsonData.map(row => ({
      id: row['id'],
      name: row['name'],
      age: row['age'],
      password: row['password'],
      email: row['email'],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
