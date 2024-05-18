document.addEventListener('DOMContentLoaded', function () {
  function carregarAgendamentos() {
    fetchWithAuth('http://127.0.0.1:8000/api/agendamentos/')
      .then(response => {
        if (!response.ok) throw new Error('Falha na requisição');
        return response.json();
      })
      .then(agendamentos => {
        exibirAgendamentos(agendamentos);
      })
      .catch(error => {
        console.error('Erro ao buscar agendamentos:', error);
      });
  }

  function exibirAgendamentos(agendamentos) {
    const listaAgendamentos = document.getElementById('listaAgendamentos');
    listaAgendamentos.innerHTML = '';

    agendamentos.forEach(agendamento => {
        // Nova requisição para obter o nome do cliente
        fetchWithAuth(`http://127.0.0.1:8000/api/clientes/${agendamento.cliente}/`)
            .then(response => {
                if (!response.ok) throw new Error('Falha ao obter nome do cliente');
                return response.json();
            })
            .then(cliente => {
                const agendamentoItem = document.createElement('li');
                agendamentoItem.innerHTML = `
                    <li>Nome: ${cliente.nome}</li>
                    <li>Data e Hora: ${agendamento.data_hora}</li>
                    <li>Observações: ${agendamento.observacoes}</li>
                    <li>
                        <button data-agendamento-id="${agendamento.id}" class="editar-button">Editar</button>
                        <button data-agendamento-id="${agendamento.id}" class="remover-button">Remover</button>
                    </li>
                `;
                listaAgendamentos.appendChild(agendamentoItem);

                agendamentoItem.querySelector('.editar-button').addEventListener('click', function() {
                    editarAgendamento(agendamento.id);
                });

                agendamentoItem.querySelector('.remover-button').addEventListener('click', function() {
                    if (confirm('Tem certeza que deseja remover este agendamento?')) {
                        removerAgendamento(agendamento.id);
                    }
                });
            })
            .catch(error => {
                console.error('Erro ao buscar nome do cliente:', error);
            });
    });
}


  function editarAgendamento(agendamentoId) {
    window.location.href = `editar_agendamento.html?id=${agendamentoId}`;
  }

  function removerAgendamento(agendamentoId) {
    fetchWithAuth(`http://127.0.0.1:8000/api/agendamentos/${agendamentoId}/excluir/`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          document.querySelector(`button[data-agendamento-id="${agendamentoId}"]`).closest('li').remove();
          alert('Agendamento removido com sucesso!');
        } else {
          console.error('Erro ao remover agendamento:', response);
          alert('Falha ao remover agendamento. Tente novamente.');
        }
      })
      .catch(error => console.error('Erro ao remover agendamento:', error));
  }

  carregarAgendamentos();
});
