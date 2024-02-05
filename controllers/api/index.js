const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const classRoutes = require('./classRoutes');

router.use('/students', studentRoutes);
router.use('/classes', classRoutes);

module.exports = router;
