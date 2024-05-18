document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const agendamentoId = urlParams.get('id');

    if (!agendamentoId) {
        console.error('ID do agendamento não encontrado na URL.');
        return;
    }

    fetchWithAuth(`http://127.0.0.1:8000/api/agendamentos/${agendamentoId}/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição');
        }
        return response.json();
    })
    .then(agendamento => {
        console.log('Dados do agendamento:', agendamento);

        // Formata a data e hora para o formato correto
        const dataHora = new Date(agendamento.data_hora);
        const dataHoraFormatada = `${dataHora.getFullYear()}-${(dataHora.getMonth() + 1).toString().padStart(2, '0')}-${dataHora.getDate().toString().padStart(2, '0')}T${dataHora.getHours().toString().padStart(2, '0')}:${dataHora.getMinutes().toString().padStart(2, '0')}:00`;

        // Atualiza o valor do campo de data e hora
        document.getElementById('dataHora').value = dataHoraFormatada;

        document.getElementById('observacoes').value = agendamento.observacoes;

        // Busca o nome do cliente
        fetchWithAuth(`http://127.0.0.1:8000/api/clientes/${agendamento.cliente}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao obter nome do cliente');
            }
            return response.json();
        })
        .then(cliente => {
            // Atualiza o nome do cliente
            document.getElementById('nomeCliente').textContent = cliente.nome;
        })
        .catch(error => {
            console.error('Erro ao buscar nome do cliente:', error);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar dados do agendamento:', error);
    });

    const editarAgendamentoForm = document.getElementById('editarAgendamentoForm');
    editarAgendamentoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = {
            "data_hora": document.getElementById('dataHora').value,
            "observacoes": document.getElementById('observacoes').value
        };

        console.log('Dados a serem enviados:', data);
        fetchWithAuth(`http://127.0.0.1:8000/api/agendamentos/${agendamentoId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Agendamento atualizado com sucesso!');
                window.location.href = 'listar_agendamentos.html'; // Redireciona de volta para a lista de agendamentos
            } else {
                console.error('Erro ao atualizar agendamento:', response);
                alert('Falha ao atualizar agendamento. Tente novamente.');
            }
        })
        .catch(error => console.error('Erro ao atualizar agendamento:', error));
    });
});
