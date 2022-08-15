const express = require('express');
const { Stinderee } = require('../models/stinderee');

const router = express();
// READ EERSTE
router.get('/stinderees', async (req, res) => {
    await Stinderee.find()
        .then(profiles => res.json(profiles))
        .catch(error => res.status(500).json(error));
});

router.get('/stinderee/:id', async (req, res) => {
    await Stinderee.findById(req.params.id).then(profile => res.json(profile))
        .catch(error => res.status(500).json(error));
});

// CREATE TWEEDE
router.post('/stinderee', async (req, res) => {
    const profile = new Stinderee({ ...req.body });

    await profile.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error));
});

module.exports = router;