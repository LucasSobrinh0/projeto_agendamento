document.addEventListener('DOMContentLoaded', function () {
    // Carregar a lista de clientes
    carregarClientes();

    // Adicionar evento de submit ao formulário
    const form = document.getElementById('criarAgendamentoForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar o comportamento padrão de submissão do formulário
        const clienteSelect = document.getElementById('cliente');
        const clienteNome = clienteSelect.options[clienteSelect.selectedIndex].value; // Pegar o nome do cliente
        const dataHora = formatarDataHora(document.getElementById('dataHora').value);
        const observacoes = document.getElementById('observacoes').value;

        console.log('Cliente Nome:', clienteNome);
        console.log('Data e Hora:', dataHora);
        console.log('Observações:', observacoes);

        // Chamar a função para criar um novo agendamento
        criarAgendamento(clienteNome, dataHora, observacoes);
    });
});

function carregarClientes() {
    const url = 'http://127.0.0.1:8000/api/clientes/';

    fetchWithAuth(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar clientes');
            }
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('cliente');
            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.text = cliente.nome;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar clientes:', error);
        });
}

function criarAgendamento(clienteNome, dataHora, observacoes) {
    const url = 'http://127.0.0.1:8000/api/agendamentos/novo/';

    const data = {
        cliente: clienteNome,
        data_hora: dataHora,
        observacoes: observacoes
    };

    console.log('Dados a serem enviados:', data);

    fetchWithAuth(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                console.error('Erro na resposta da API:', errData);
                throw new Error('Erro ao criar agendamento');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Agendamento criado com sucesso:', data);
        // Limpar o formulário após o sucesso
        document.getElementById('criarAgendamentoForm').reset();
    })
    .catch(error => {
        console.error('Erro ao criar agendamento:', error);
        console.error('Detalhes do erro:', error.message); // Mostrar detalhes do erro no console
    });
}

function formatarDataHora(dataHoraInput) {
    const dataHora = new Date(dataHoraInput);
    const ano = dataHora.getFullYear();
    const mes = ('0' + (dataHora.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataHora.getDate()).slice(-2);
    const hora = ('0' + dataHora.getHours()).slice(-2);
    const minutos = ('0' + dataHora.getMinutes()).slice(-2);
    return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
}
