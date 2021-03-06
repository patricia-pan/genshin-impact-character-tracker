/* TERMINAL COMMANDS  
// Install npm and sequelize
npm i sequelize pg

sequelize model:create --name user --attributes name:string,email:string,password:string,UID:integer,forumId:integer
// Associations: 
    models.stockCharacter.hasMany(models.myCharacter)
    models.myCharacter.hasMany(models.goal)

sequelize model:create --name myCharacter --attributes name:string,vision:string;weapon:string,level:integer,maxLevel:integer,aaLevel:integer,eLevel:integer,qLevel:integer,maxTalentLevel:integer,constellation:integer,userId:integer,goalId:integer,stockCharacterId:integer
// Associations: 
    models.myCharacter.belongsTo(models.user)
    models.myCharacter.belongsTo(models.stockCharacter)
    models.myCharacter.hasMany(models.goal)

sequelize model:create --name goal --attributes li:text,myCharacterId:integer,userId:integer
// Associations: 
    models.goal.belongsTo(models.myCharacter)
    models.myCharacter.belongsTo(models.user)

sequelize model:create --name stockCharacter --attributes name:string,description:text,rarity:integer,vision:string,weapon:string,region:string,ascStat:string,headUrl:text,portraitUrl:text,wishUrl:text,myCharacterId:integer
// Associations: 
    models.stockCharacter.hasMany(models.myCharacter)

sequelize db:migrate
sequelize db:migrate:undo (Run this command in your VSCode terminal as many times as you need to; models get migrated one by one.)

/////////////////////// SQL SHORTCUTS /////////////////////////////
DROP TABLE "stockCharacters"; ...to delete a table. Double quotes to escape capitalized letters, where SQL otherwise only accepts single quotes in commands.
SELECT COUNT(*) FROM table_name; ...to get count of rows.
DELETE FROM table_name; ...to clear a table's contents but retain its schema.

*/ 
const db = require('./models')

/*
db.stockCharacter.findOne({
    where: {
        name: 'Keqing'
    }
})
.then(stockChar => {
    console.log('🐷stockChar: ', stockChar)
})
*/

db.myCharacter.findAll({
    where: {
        userId: 1
        // req.user.id
    },
    include: [db.goal]
}).then(foundCharacters => {
    forEachconsole.log('🐯 db.goal: ', db.goal)
    // myChar.goals = foundGoals // We add this to our JavaScript object but don't save it to our SQL database.
    // goal.charId = myChar.id
    // goal.goals = foundGoals // I think this is an array.
    
})