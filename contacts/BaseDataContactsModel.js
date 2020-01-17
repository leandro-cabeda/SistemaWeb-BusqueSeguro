module.exports = app => {

    const {Connect, Sequelize} = app.database.database;
  
  
      const Contacts = Connect.define ('contacts', {
  
        email: {
          type: Sequelize.STRING,
          allowNull: true, 
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf :{
          type: Sequelize.STRING,
          allowNull: false,
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: true, 
        },
        data_nascimento: {
          type: Sequelize.DATEONLY,
          allowNull: true, 
        }
  
      });
  
      
      Contacts.sync({force:false});
  
      return { Contacts };
  
  };