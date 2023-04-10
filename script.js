// Cria um array para armazenar as tarefas da lista
let lista = JSON.parse(localStorage.getItem('lista') || '[]') // Obtém o array salvo no localStorage ou cria um novo array vazio

// Adiciona um evento para o botão de envio do formulário
$('#form').submit(function (event) {
	event.preventDefault() // Previne envio padrão do formulário
	let valor = $('#valor').val() // Obtém o valor inserido pelo usuário
	lista.push(valor) // Adiciona o valor ao array de tarefas
	localStorage.setItem('lista', JSON.stringify(lista)) // Salva o array no localStorage
	mostrarLista() // Atualiza a lista na página
})

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
	let newValue = prompt('Editar item:', value) // Pede ao usuário para digitar o novo valor
	if (newValue !== null) {
		// Verifica se o usuário digitou um valor
		lista[index] = newValue // Atualiza o valor da tarefa no array
		localStorage.setItem('lista', JSON.stringify(lista)) // Salva o array no localStorage
		mostrarLista() // Atualiza a lista na página
	}
})

// Adiciona um evento de clique para o botão de excluir
$('#lista').on('click', '[data-action="delete"]', function () {
	let index = $(this).data('id') // Obtém o índice da tarefa selecionada
	lista.splice(index, 1) // Remove a tarefa do array
	localStorage.setItem('lista', JSON.stringify(lista)) // Salva o array no localStorage
	mostrarLista() // Atualiza a lista na página
})
