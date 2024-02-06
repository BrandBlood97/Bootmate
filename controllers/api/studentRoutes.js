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

router.post('/', async (req, res) => {
    try {
        const studentData = await Student.create(req.body);
        res.status(200).json(studentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;