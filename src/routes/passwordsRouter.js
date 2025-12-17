const express = require('express');
const router = express.Router();
const c = require('../controllers/passwordsController');

router.get('/', c.getAll);
router.get('/add', c.getAddForm);
router.post('/add', c.postAdd);
router.get('/edit/:id', c.getEditForm);
router.post('/edit/:id', c.postEdit);
router.post('/delete/:id', c.deletePassword);
router.get('/passwords/:id', c.getDetails);

module.exports = router;
