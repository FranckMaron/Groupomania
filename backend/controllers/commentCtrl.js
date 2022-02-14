//Imports
const db = require("../models")

//Midellware

//Création d'un commentaire
exports.createComment = (req, res) => {

    const message = db.Message.create({  
           
        title: req.body.title,
        content: req.body.content,        
    })
    .then((message) => res.status(201).json({message}))
    .catch(error => res.status(400).json({error}))
    console.log(db.Message.id);
}

exports.getAllComments = (req, res) => {
    db.Message.findAll()
    .then((messages) => res.status(200).json({messages}))
    .catch(error => res.status(400).json({error}))
}

exports.getOneComment = (req, res) => {
    
}

exports.updateComment = (req, res) => {
    
}

exports.deleteComment = (req, res) => {
    
}