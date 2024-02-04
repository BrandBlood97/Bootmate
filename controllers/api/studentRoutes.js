const router = require('express').Router();
const { Student } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const studentData = await Student.findAll({
        attributes: { exclude: ['password'] },
        });
        res.json(studentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const studentData = await Student.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        });
        if (!studentData) {
        res.status(404).json({ message: 'No student found with this id!' });
        return;
        }
        res.json(studentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;