const router = require('express').Router();

const Firefly = require('../models/fireflies');
const mw = require('../middleware/firefly-middleware');

//err messages
const error = (sts, msg, res) => {
  res.status(sts).json({ error: `${msg}` })
}

//CRUD requests
//Get actions
router.get('/', (req, res) => {
  Firefly
  .find()
  .then(flies => {
    res.status(200).json(flies);
  })
  .catch(err => {
    error(500, err, res);
  });
});

//By id
router.get('/:_id', mw.validateFireflyId, (req, res) => {
  //Establish an ID for checking
  const { _id } = req.params;

  Firefly
  .findById(_id)
  .then(flies => {
    res.status(200).json(flies);
  })
  .catch(err => {
    error(500, err, res);
  });
});

//Post actions
router.post('/', mw.checkFireflyObj, mw.validateChildId, (req, res) => {
  const firefly = new Firefly({
    //Enter the fireflies name
    child_id: req.body.child_id,
    firefly_name: req.body.firefly_name || null
  });

  firefly
  .save()
  .then(newFly => {
    res.status(201).json(newFly)
  }) 
  .catch(err => {
    error(500, err, res);
  });
});

//Put actions
router.put('/:_id', mw.validateFireflyId, mw.checkFireflyObj, mw.validateChildId, (req, res) => {
  //Set an ID to check and grab changes from the body
  const { _id } = req.params;
  const metamorphasis = req.body;

  Firefly
  .findByIdAndUpdate(_id, metamorphasis)
  .then(ogFireflyObj => {
    Firefly.findById(_id)
    .then(change => {
      res.status(202).json(change)
    })
    .catch(err => {
      error(500, err, res);
    });
  })
  .catch(err => {
    error(500, err, res);
  });
});

//Delete actions
router.delete('/:_id', mw.validateFireflyId, (req, res) => {
  const { _id } = req.params;

  Firefly
  .findByIdAndDelete(_id)
  .then(deadFly => {
    res.status(200).json(deadFly)
  })
  .catch(err => {
    error(500, err, res);
  });
});

module.exports = router;