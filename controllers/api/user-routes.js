const router = require('express').Router();
//const { User, Post, Vote, Comment } = require('../../models');
const { User, Post, Comment } = require('../../models');



// GET /api/users ALL
router.get('/',  (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: {exclude : ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET /api/users/1 by id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id',
        'title',
        'post_url',
        'created_at']
      },
          // comments model includes
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



  // POST /api/users - equal to insert
router.post('/', (req, res) => {
    // expects {username: 'test', password: 'test'}
    User.create({
      username: req.body.username,
      //email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
      
        res.json(dbUserData);
      });
    })

  });


router.post('/login', (req, res) => {

    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => { // User retrived from the database
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }

      
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
        
    
      //res.json({ user: dbUserData });
  
      // Verify user
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        console.log("log in status: " +  req.session.loggedIn)
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
  
    });  
  });


// update
router.put('/:id', (req, res) => {

    User.update(req.body, {
      individualHooks: true,   
      where: {
          id: req.params.id
      }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user log logout
router.post('/logout', (req, res) => {
//console.log(req.session.loggedIn)
if (req.session.loggedIn) {
  req.session.destroy(() => {
    // Respond with json message use logged out
    console.log("User logged out");
    res.status(204).end();
    // res.status(204)
    
  });
}
else {
  res.status(404).end();
}
});


  module.exports = router;