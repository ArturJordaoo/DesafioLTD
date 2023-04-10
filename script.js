// Cria um array para armazenar as tarefas da lista
let lista = JSON.parse(localStorage.getItem('lista') || '[]') // Obtém o array salvo no localStorage ou cria um novo array vazio

$('#form').submit(function (event) {
  event.preventDefault(); // Previne envio padrão do formulário
  let valor = $('#valor').val(); // Obtém o valor inserido pelo usuário

  if (valor !== "") {
    // Verifica se o valor já está presente no array
    if (lista.indexOf(valor) === -1) {
      // Valor não encontrado no array, adiciona o valor ao array de tarefas
      lista.push(valor); // Adiciona o valor ao array de tarefas
      localStorage.setItem('lista', JSON.stringify(lista)); // Salva o array no localStorage
      mostrarLista(); // Atualiza a lista na página
      $('#valor').val(''); // Limpa o campo de texto
    } else {
      // Valor já existe no array, exibe mensagem de erro
      alert('Este valor já está presente na lista.');
    }
  } else {
    alert('Campo de texto não pode estar vazio.');
  }
});

// Função para mostrar o conteúdo do array na página HTML
function mostrarLista() {
	let listaHtml = '' // Inicia uma string vazia
	// Laço de repetição para criar um elemento <li> para cada tarefa do array e adicionar botões de editar e excluir
	for (let i = 0; i < lista.length; i++) {
		listaHtml +=
			'<li class="list-group-item">' + // Cria um novo elemento <li>
			lista[i] + // Adiciona o valor da tarefa ao elemento <li>
			'<button type="button" class="btn btn-secondary btn-m ms-2" data-id="' +
			i +
			'" data-action="edit"><i class="bi bi-pencil"></i></button >' + // Adiciona um botão de editar
			'<button type="button" class="btn btn-danger btn-m ms-2" data-id="' +
			i +
			'" data-action="delete"><i class="bi bi-trash"></i></button>' + // Adiciona um botão de excluir
			'</li>' // Fecha o elemento <li>
	}
	$('#lista').html(listaHtml) // Atualiza o conteúdo da <ul> com a lista de tarefas
}

// Adiciona um evento de clique para o botão de editar
$('#lista').on('click', '[data-action="edit"]', function () {
	let index = $(this).data('id') // Obtém o índice da tarefa selecionada
	let value = lista[index] // Obtém o valor da tarefa selecionada
	let originalValue = value // Armazena o valor original da tarefa
	$('#edit-input').val(value) // Define o valor atual da tarefa no campo de entrada
	$('#overlay').show() // Exibe a janela de popup
	$('#edit-input').focus() // Dá foco ao campo de entrada
	// Adiciona um evento de clique para o botão "Salvar"
	$('#edit-save').one('click', function () {
		let newValue = $('#edit-input').val() // Obtém o novo valor digitado pelo usuário
		if (newValue !== '') {
			// Verifica se o valor não está vazio
			let indexDuplicate = lista.indexOf(newValue)
			if (indexDuplicate !== -1 && indexDuplicate !== index) {
				alert('Valor já existente na lista')
				return
			}
			lista[index] = newValue // Atualiza o valor da tarefa no array
			localStorage.setItem('lista', JSON.stringify(lista)) // Salva o array no localStorage
			mostrarLista() // Atualiza a lista na página
			$('#overlay').hide() // Oculta a janela de popup
		}
	})
	// Adiciona um evento de clique para o botão "Cancelar"
	$('#edit-cancel').one('click', function () {
		$('#overlay').hide() // Oculta a janela de popup
	})
})

// Adiciona um evento de clique para o botão de excluir
$('#lista').on('click', '[data-action="delete"]', function () {
	let index = $(this).data('id') // Obtém o índice da tarefa selecionada
	lista.splice(index, 1) // Remove a tarefa do array
	localStorage.setItem('lista', JSON.stringify(lista)) // Salva o array no localStorage
	mostrarLista() // Atualiza a lista na página
})
mostrarLista() // chama a função logo que a página inicia
