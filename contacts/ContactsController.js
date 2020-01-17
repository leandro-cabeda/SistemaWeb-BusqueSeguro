module.exports = app => {

    const { ValidationCheck, validationResult } = app.functions.functions;
    const { Contacts } = app.contacts.BaseDataContactsModel;

    app.get("/admin/contacts", (req, res) => {

        Contacts.findAll({
            raw: true, order: [
                ["id", "desc"]
            ]
        })
            .then(contacts => {

                res.status(200).render("admin/contacts/index", { errs: [], contacts });

            }).catch(err => {
                res.status(500).render("admin/contacts/index", { errs: [{ msg: "Ocorreu falha durante a conexão do banco " + err }], contacts: [] });
            });

    });

    app.get("/admin/contacts/new", (req, res) => {
        res.status(200).render("admin/contacts/new", { errs: [], contact: {} });
    });

    app.route("/admin/contacts/save")
    .post(ValidationCheck(), (req, res) => {

            const erros = validationResult(req);
            const contact = req.body;

            if (!erros.isEmpty()) {

                const errs = erros.errors;

                return res.status(400).render('admin/contacts/new', { errs, contact });
            }

            Contacts.findOne({
                where: {
                    cpf: contact.cpf
                }
            }).then(contac => {

                if (contac != undefined) {

                    res.status(400).render('admin/contacts/new', { errs: [{ msg: "Este cpf já está cadastrado no banco" }], contact });
                }
                else {

                    Contacts.create({
                        email: contact.email,
                        nome: contact.nome,
                        cpf: contact.cpf,
                        telefone: contact.telefone,
                        data_nascimento : contact.data_nascimento || null

                    }).then(() => {
                        res.status(200).redirect("/admin/contacts");
                    }).catch(err => {
                        res.status(500).render("admin/contacts/new", { errs: [{ msg: "Ocorreu falha durante a conexão do banco " + err }], contact });
                    });
                }

            }).catch(err => {
                res.status(500).render("admin/contacts/new", { errs: [{ msg: "Ocorreu falha durante a conexão do banco " + err }], contact });
            });



        }).get((req, res) => {

            res.status(200).redirect("/admin/contacts");
        });

    app.route("/admin/contacts/update")
        .post(ValidationCheck(), (req, res) => {

            const erros = validationResult(req);
            const contact = req.body;

            if (!erros.isEmpty()) {

                const errs = erros.errors;

                return res.status(400).render('admin/contacts/edit', { errs, contact });
            }

            Contacts.update({
                email: contact.email,
                nome: contact.nome,
                cpf: contact.cpf,
                telefone: contact.telefone,
                data_nascimento: contact.data_nascimento || null
            },
                {
                    where: {
                        id: contact.id
                    }

                }).then(() => {
                    res.status(200).redirect("/admin/contacts");
                }).catch(err => {

                    res.status(500).render("admin/contacts/edit", { errs: [{ msg: "Ocorreu falha durante a conexão do banco " + err }], contact });
                });
        }).get((req, res) => {

            res.status(200).redirect("/admin/contacts");
        });

    app.get("/admin/contacts/edit/:id", (req, res) => {

        const id = req.params.id;

        if (isNaN(id) || id == undefined) {
            return res.status(400).redirect("/admin/contacts");
        }

        Contacts.findByPk(id)
            .then(contact => {
                if (contact != undefined) {
                    res.status(200).render("admin/contacts/edit", { errs: [], contact });
                }
                else {
                    res.status(400).redirect("/admin/contacts");
                }
            })
            .catch(err => {

                res.status(500).redirect("/admin/contacts");

            });

    });

    app.get("/admin/contacts/delete/:id", (req, res) => {

        const id = req.params.id;

        if (isNaN(id) || id == undefined) {

            return res.status(400).redirect("/admin/contacts");
        }

        Contacts.destroy({
            where: { id }
        }).then(() => {

            res.status(200).redirect("/admin/contacts");

        }).catch(err => {

            res.status(500).redirect("/admin/contacts");
        });

    });



}