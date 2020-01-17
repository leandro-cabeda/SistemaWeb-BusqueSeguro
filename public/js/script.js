
const verifyErrsAlert = elements => {

    elements.forEach(element => {

        if ($(element).is(":visible")) {

            setTimeout(() => {
                $(element).css("display", "none");
            }, 3000);

        }
    });

}

const elements = [
    "#errsUser",
];

verifyErrsAlert(elements);

$("#cpf").mask("999.999.999-99");
$("#telefone").mask("(99) 9999-9999");

const confirmarDelecao = (event, link, referencia) => {
    event.preventDefault();

    const decision = confirm(`Você quer deletar ${referencia}?`);

    if (decision) {

        location.replace(link.href);

    }

}




