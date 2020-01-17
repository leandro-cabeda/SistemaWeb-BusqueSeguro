
const { check, validationResult } = require('express-validator');

const ValidationCheck = () => {
  return [

    check('nome',"Nome é obrigatório").trim().not().isEmpty(),
    check('cpf',"CPF é obrigatório").trim().not().isEmpty(),
    check('cpf',"CPF inválido").isLength({ min: 14 })

  ]
}

const Functions=()=>{
  return {
    ValidationCheck,
    validationResult
  }
}

module.exports=Functions;