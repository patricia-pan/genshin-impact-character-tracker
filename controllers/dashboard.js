const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.
const isLoggedIn = require('../middleware/isLoggedIn.js')

// Show all character goals on dashboard.
router.get('/', isLoggedIn, (req, res) => {
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        include: [db.goal],
        order: [
            ['name', 'ASC'],
            [db.goal, 'id', 'ASC'] // How to apply order to includes: https://github.com/sequelize/sequelize/issues/4553
        ]
    }).then(myCharacters => {
        myCharacters.forEach((myChar, index) => {
            // Grab all the goals for each mycharacter.
            db.goal.findAll({
                where: {
                    myCharacterId: myChar.id
                }
                // include: [db.myCharacter]
            }).then(foundGoals => {    
            })
        }) // Where the .forEach ends.
        res.render('dashboard/dashboardView.ejs', {myCharacters: myCharacters})
    }) // Where the .then ends 
    // Outside of my character.findAll
})


// Select a character and add a new goal to it. 
router.post('/goal/add', isLoggedIn, (req, res) => {
    // console.log('🐣 character: ', req.body.myCharId)
    // console.log('🐣 goal: ', req.body.goal)
    if (req.body.goal === "") { // Don't want user to add empty string as a goal.
        res.redirect('/dashboard') 
    }
    else if (req.body.goal) {
        db.goal.create({
        myCharacterId: req.body.myCharId,
        li: req.body.goal, // li as in List Item.
        userId: req.user.id
    }).then(goal => {
        db.myCharacter.findOne({where: {id: req.body.myCharId}})
        .then(foundChar => {
            foundChar.addGoal(goal)
            // Do I need to update the goalId column in myCharacter? 
        })
        res.redirect('/dashboard') 
    }).catch(err => { console.log(err) }) // If there's an error creating a goal.
    } // End of else if.
    else { res.redirect('/dashboard') }
})

// How to have two buttons for one form: https://stackoverflow.com/questions/547821/two-submit-buttons-in-one-form
// Edit specified goal(s).

// Get redirected to 'editGoal' page when selecting 'edit goals.'
router.post('/goal/edit', isLoggedIn, (req, res) => {
    let goalIds = req.body.goalId
    // console.log('🐥🐥🐥goalIds: ', goalIds) // Returns either a string or an array of strings, if a value was selected.
    if (goalIds) { // If at least one item was selected.
        if (typeof goalIds == 'string') { 
            goalIds = [goalIds] 
        } 
        db.myCharacter.findAll({
            where: {
                userId: req.user.id
            },
            include: [db.goal],
            order: [
                ['name', 'ASC'],
                [db.goal, 'id', 'ASC'] // How to apply order to includes: https://github.com/sequelize/sequelize/issues/4553
            ]
        }).then(myCharacters => {
            res.render('dashboard/editGoal.ejs', {myCharacters: myCharacters, goalIds: goalIds})
        })
    } else {
        res.redirect('/dashboard')
    }
})


// Edit goals when submitting from 'editGoal' page.
router.put('/goal/edit', isLoggedIn, (req, res) => {
    // Look up our comment.
    // Verify that the user Id matches.
    // If it does, then redirect to an edit comment page.
    let ids = req.body.goalId
    let contents = req.body.goalContent

    if (!ids) { res.redirect('/dashboard')} // If no values to submit.

    if (typeof ids == 'string') { // If only one value.
        ids = [ids]
        contents = [contents]
    }
    ids.forEach( (id, index) => {
        db.goal.findOne({
            where: {
                id: id,
                userId: req.user.id 
            }
        }).then(foundGoal => {
            foundGoal.li = contents[index]
            foundGoal.save()
        })
    }) // End of forEach.
    function redirect() { res.redirect('/dashboard') }
    setTimeout(redirect, 100)  
})

// Delete specified goal(s). 
// How to get value of checkboxes: https://stackoverflow.com/questions/48398600/how-to-get-value-of-checkbox-in-express
router.delete('/goal/delete', isLoggedIn, (req, res) => {
    // console.log('🦀🦀Which button was pressed? ',req.body.button)
    // console.log('🦄🦄req.body.Id: ', req.body.goalId) // Returns string if 1 entry, or array of strings if multiple.
    if (req.body.goalId) { // If anything was selected.
        if (req.body.button == 'delete') { // If delete button clicked.
            let goalIds = req.body.goalId
            if (typeof goalIds == 'string') { goalIds = [goalIds] }
            goalIds.forEach(goalId => {
                db.goal.destroy({
                    where: {
                        userId: req.user.id,
                        id: goalId
                    }
                }).then(rowsDeleted => {
                })
            })
            // res.redirect('/dashboard/')
            function redirect() { res.redirect('/dashboard') }
            setTimeout(redirect, 100) // Need a delay because sometimes deleted comments don't disappear until you refresh the page.
        } // End of delete route. 
    } else { res.redirect('/dashboard/') }
})

module.exports = router


/*

// Edit each dino. 
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let myDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs', {
        myDino: myDino,
        myIndex: dinoIndex})
})

router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.body)
    dinoData[req.params.idx] = req.body
    // dinoData[req.params.idx].name = req.body.name
    // dinoData[req.params.idx].type = req.body.type
    
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})


<form action="/dinosaurs/<%= myIndex %>/?_method=PUT" method="POST">
    <label for="dinosaurName">Name</label>
    <input type="text" id="dinosaurName" value="<%= myDino.name %>" name="name">

    <label for="dinosaurType">Type</label>
    <input type="text" id="dinosaurType" name="type" value="<%= myDino.type %>">

    <input type="submit" value="Update Dino">
</label>
</form>

*/

