document.addEventListener('DOMContentLoaded', function() {
  function carregarClientes() {
    fetchWithAuth('http://127.0.0.1:8000/api/clientes/')
      .then(response => {
        if (!response.ok) throw new Error('Falha na requisição');
        return response.json();
      })
      .then(clientes => {
        exibirClientes(clientes);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }

  function exibirClientes(clientes) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
  
    clientes.forEach(cliente => {
      const nomeCliente = document.createElement('li');
      nomeCliente.textContent = `Nome: ${cliente.nome}`;
      listaClientes.appendChild(nomeCliente);
  
      const cpfCliente = document.createElement('li');
      cpfCliente.textContent = `CPF: ${cliente.cpf}`;
      listaClientes.appendChild(cpfCliente);
  
      const telefoneCliente = document.createElement('li');
      telefoneCliente.textContent = `Telefone: ${cliente.telefone}`;
      listaClientes.appendChild(telefoneCliente);
  
      const dataNascimentoCliente = document.createElement('li');
      dataNascimentoCliente.textContent = `Data de Nascimento: ${cliente.data_nascimento}`;
      listaClientes.appendChild(dataNascimentoCliente);
  
      const acoesCliente = document.createElement('li');
  
      const editarButton = document.createElement('button');
      editarButton.textContent = 'Editar';
      editarButton.dataset.clienteId = cliente.id;
      acoesCliente.appendChild(editarButton);
  
      const removerButton = document.createElement('button');
      removerButton.textContent = 'Remover';
      removerButton.dataset.clienteId = cliente.id;
      removerButton.classList.add('remover-button');
      acoesCliente.appendChild(removerButton);
  
      listaClientes.appendChild(acoesCliente);
  
      editarButton.addEventListener('click', function() {
        editarCliente(cliente.id);
      });
  
      removerButton.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja remover este cliente?')) {
          removerCliente(cliente.id);
        }
      });
    });
  }
  
  function editarCliente(clienteId) {
    window.location.href = `editar_cliente.html?id=${clienteId}`;
  }
  

  function removerCliente(clienteId) {
    fetchWithAuth(`http://127.0.0.1:8000/api/clientes/${clienteId}/excluir/`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          const item = document.querySelector(`li[data-cliente-id="${clienteId}"]`);
          if (item) {
            item.remove();
          }
          alert('Cliente removido com sucesso!');
        } else {
          console.error('Erro ao remover cliente:', response);
          alert('Falha ao remover cliente. Tente novamente.');
        }
      })
      .catch(error => console.error('Erro ao remover cliente:', error));
  }

  carregarClientes();
});
