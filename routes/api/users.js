const express = require('express');
const router = express.Router();
const uuid = require('uuid');

let users = require('../../users');

//obtener todos los users

router.get('/', (req, res) => {
    res.json(users);
});

//obtener users por ID

router.get('/:id', (req, res) => {
    const found = users.some( user => user.id === parseInt(req.params.id) ) 

    if(found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.sendStatus(400);
    }
   
});

//Crear new user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        lastname: req.body.lastname,
        dni: req.body.dni
    }
    if(!newUser.name || !newUser.lastname) {
        return res.sendStaus(400)
    }
    users.push(newUser)
    res.json(users)
});

//Actualizar Users
router.put("/:id", (req, res) => {
    const found = users.some( user => user.id === parseInt(req.params.id));

    if(found) {
        const updateUser = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name: user.name;
                user.lastname = updateUser.lastname ? updateUser.lastname: user.lastname;
                user.dni = updateUser.dni ? updateUser.dni: user.dni;
                res.json({msg: 'User Updated', user})
            }
        })
    } else {
        res.sendStatus(400);
    }
});

//Eliminar User

router.delete("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
      users = users.filter(user => user.id !== parseInt(req.params.id))
      res.json({
        msg: "User deleted",
        users
      });
    } else {
        res.sendStatus(400);
    }
  });

module.exports = router;