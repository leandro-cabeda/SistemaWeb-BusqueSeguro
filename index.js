const app = require("./configServer/server");
const port = process.env.port || 3000;

const { Connect } = app.database.database;

Connect.authenticate()
    .then(() => {
        console.log("Conexão estabelicida com MySQL");
    })
    .catch(msgErro => {
        console.log(msgErro);
    });


app.get("/", (req, res) => {

    res.render("index");

});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}.`);
});