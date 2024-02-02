const sequelize = require('../config/connection');
const { Class, Student } = require('../models');

const StudentData = require('./Studentdata.json');
const ClassData = require('./Classdata.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const student = await Student.bulkCreate(StudentData, {
    individualHooks: true,
    returning: true,
  });

  const classes = await Class.bulkCreate(ClassData)

  process.exit(0);
};

seedDatabase();