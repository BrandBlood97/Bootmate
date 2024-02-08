const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('homepage');
  });

router.get('/login', async (req, res) => {
    res.render('login');
  });

router.get('/search', async (req, res) => {
    res.render('search');
  });

  module.exports = router;