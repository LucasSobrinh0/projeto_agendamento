document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('id');

    if (!clienteId) {
        console.error('ID do cliente não encontrado na URL.');
        return;
    }

    fetchWithAuth(`http://127.0.0.1:8000/api/clientes/${clienteId}/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return response.json();
    })
    .then(cliente => {
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('cpf').value = cliente.cpf;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('dataNascimento').value = cliente.data_nascimento;
    })
    .catch(error => {
        console.error('Erro ao carregar dados do cliente:', error);
    });

    const editarClienteForm = document.getElementById('editarClienteForm');
    editarClienteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = {
            "nome": document.getElementById('nome').value,
            "cpf": document.getElementById('cpf').value,
            "telefone": document.getElementById('telefone').value,
            "data_nascimento": document.getElementById('dataNascimento').value
        };
        

        console.log('Dados recebidos do formulário:', data);

        fetchWithAuth(`http://127.0.0.1:8000/api/clientes/${clienteId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Cliente atualizado com sucesso!');
                window.location.href = 'index.html'; // Redireciona de volta para a lista de clientes
            } else {
                console.error('Erro ao atualizar cliente:', response);
                alert('Falha ao atualizar cliente. Tente novamente.');
            }
        })
        .catch(error => console.error('Erro ao atualizar cliente:', error));
    });
});
