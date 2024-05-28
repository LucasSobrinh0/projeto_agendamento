document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o traço
    e.target.value = value;
});

document.getElementById('telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca os parênteses e espaço
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Coloca o traço após 5 dígitos (para números no formato (XX) XXXXX-XXXX)
    e.target.value = value;
});
