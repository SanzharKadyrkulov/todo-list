const API = 'http://localhost:8000/todos';

const list = document.querySelector('.todo-body');
const addForm = document.querySelector('#add-form');
const addInputName = document.querySelector('#add-input');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('#close-modal');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');

getTodos();

async function getTodos() {
	const res = await fetch(API);
	const data = await res.json();
	render(data);
}

async function addTodo(todo) {
	await fetch(API, {
		method: 'POST',
		body: JSON.stringify(todo),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	getTodos();
}

async function deleteTodo(id) {
	await fetch(`${API}/${id}`, {
		method: 'DELETE',
	});
	getTodos();
}

async function getOneTodo(id) {
	const res = await fetch(`${API}/${id}`);
	const data = await res.json();
	return data;
}

async function editTodo(id, editedTodo) {
	await fetch(`${API}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(editedTodo),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	getTodos();
}

function render(arr) {
	list.innerHTML = '';
	arr.forEach((item) => {
		list.innerHTML += `
			<div class="todo-item">
				<div class="todo-text">${item.title}</div>
				<div class="btns">
					<button id="${item.id}" class="todo-edit">edit</button>
					<button id="${item.id}" class="todo-delete">Delete</button>
				</div>
			</div>`;
	});
}

addForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!addInput.value.trim()) return;

	const todo = {
		name: addInputNAme.value,
		number: addInputPhone.value,
	};
	addTodo(todo);

	addInput.value = '';
});

document.addEventListener('click', (e) => {
	if (e.target.classList.contains('todo-delete')) {
		deleteTodo(e.target.id);
	}
});

let id = null;
document.addEventListener('click', async (e) => {
	if (e.target.classList.contains('todo-edit')) {
		id = e.target.id;
		modal.style.visibility = 'visible';
		const todo = await getOneTodo(e.target.id);
		editInput.value = todo.title;
		editInput.focus();
	}
});

closeModalBtn.addEventListener('click', () => {
	modal.style.visibility = 'hidden';
});

editForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!editInput.value.trim()) return;

	const editedTodo = {
		title: editInput.value,
	};
	editTodo(id, editedTodo);
	modal.style.visibility = 'hidden';
});

console.log('some changes')
