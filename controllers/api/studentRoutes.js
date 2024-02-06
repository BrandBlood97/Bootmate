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

router.post('/login', async (req, res) => {
    try {
        const studentData = await Student.findOne({ where: { email: req.body.email } });
        if (!studentData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password!' });
        return;
        }

        const validPassword = await studentData.checkPassword(req.body.password);
        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password!' });
        return;
        }

        req.session.save(() => {
        req.session.student_id = studentData.id;
        req.session.logged_in = true;
        res.json({ student: studentData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;