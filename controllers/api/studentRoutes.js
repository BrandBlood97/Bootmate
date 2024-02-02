const router = require('express').Router();
const { student } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const studentData = await student.findAll({
        attributes: { exclude: ['password'] },
        });
        res.json(studentData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

router.get('/:id', async (req, res) => {
    try {
        const userData = await student.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        });
        if (!studentData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
        }
        res.json(studentData);
    } catch (err) {
        res.status(500).json(err);
    }
});