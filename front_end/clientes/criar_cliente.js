document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('criarClienteForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const data_nascimento = document.getElementById('data_nascimento').value;

        fetchWithAuth('http://localhost:8000/api/clientes/novo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                data_nascimento: data_nascimento
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente criado com sucesso!');
                form.reset();
            } else {
                throw new Error('Erro ao criar cliente');
            }
        })
        .catch(error => {
            alert(error.message);
        });
    });
});