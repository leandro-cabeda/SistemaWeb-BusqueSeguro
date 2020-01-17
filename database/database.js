const Sequelize=require("sequelize");

const Connect=new Sequelize(
    "register_contacts",
    "root",
    "Sua senha",{
    host:"localhost",
    dialect:"mysql",
    timezone: "-03:00" // horário do brasil timezone
});


module.exports={
    Connect,
    Sequelize
};