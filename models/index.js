const Student = require('./Students');
const Class = require('./Classes');

Student.belongsTo(Class, {
    foreignKey: 'class_id'
  });

  module.exports = { Class, Student};