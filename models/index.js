const Student = require('./Student');
const Class = require('./Class');

Student.belongsTo(Class, {
    foreignKey: 'class_id'
  });

  module.exports = { Class, Student};