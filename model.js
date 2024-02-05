const Sequelize = require('sequelize');
const sequelize = require('./util/database');

const user = sequelize.define("media",{
    id:{
      type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    exp:{
        type:Sequelize.TEXT('long'),
        allowNull:false
    },
    des:{
        type:Sequelize.STRING,
        allowNull:false,
        
    },
    comment: {
        type: Sequelize.STRING,
    },
    
});

(async () => {
    try {
      await user.sync(); 
      console.log('media table created successfully.');
    } catch (error) {
      console.error('Error creating media table:', error);
    }
  })();
  
module.exports = user;