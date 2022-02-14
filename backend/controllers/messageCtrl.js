//Imports
const db = require("../models")

//Midellware

//Création d'un message
exports.createMessage = (req, res) => {

    const message = db.Message.create({  
           
        title: req.body.title,
        content: req.body.content,        
    })
    .then((message) => res.status(201).json({message}))
    .catch(error => res.status(400).json({error}))
    console.log(db.Message.id);
}

exports.getAllMessages = (req, res) => {
    db.Message.findAll()
    .then((messages) => res.status(200).json({messages}))
    .catch(error => res.status(400).json({error}))
}

exports.getOneMessage = (req, res) => {
    
}

exports.updateMessage = (req, res) => {
    
}

exports.deleteMessage = (req, res) => {
    
}