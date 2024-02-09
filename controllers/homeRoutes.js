const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    const studentData = await Student.findAll({
      attributes: { exclude: ['password'] },
    });
    
    const students = studentData.map((student) => student.get({ plain: true }));
    res.render('homepage', {
      students,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/search');
    return;
  }

    res.render('login');
  });

router.get('/search', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  } else {
    res.render('search');
  }
});

router.get('/signup', async (req, res) => {
    res.render('signup');
  });

  module.exports = router;