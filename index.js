//Variables
const ocAddTodoItem = document.getElementById('ocAddTodoItem')
const ocAddTodoTitle = document.getElementById('ocAddTodoTitle')
const ocAddTodoSaveButton = document.getElementById('ocAddTodoSaveButton')
const ocAddTodoItemsList = document.getElementById('ocAddTodoItemsList')
const todoListBody = document.getElementById('todoListBody')
const offcanvasEditTodoLabel = document.getElementById('offcanvasEditTodoLabel')
const ocEditTodoList = document.getElementById('ocEditTodoList')
let ocAddTodoItems = []
let todos = []
let activeTodo = {}

//HTML - Templates
const todoItem = (id, value) => {
    return `
    <div class="input-group mb-3" id="ocAddTodoItem-${id}">
        <input 
            type="text" 
            class="form-control" 
            placeholder="Item" 
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            id="ocAddTodoItemInput-${id}"
            oninput="ocAddTodoItemInputContent(event)"
            value="${value}"
        >
        <button 
            class="btn btn-danger" 
            type="button" 
            id="ocAddTodoItemButton-${id}"
            onclick="ocAddTodoRemoveItem(event)"
        >
            Remove
        </button>
    </div>
    `
}

const todoListItem = (todo, index) => {
    const completes = todo.items.map(i => i.complete)

    const status = completes.every(i => i == true)
        ? 'Complete'
        : completes.every(i => i == false)
            ? 'Pending'
            : 'Incomplete'

    return `<tr>
        <th scope="row">${index + 1}</th>
        <td>${todo.title}</td>
        <td>${status}</td>
        <td>${dayjs(todo.id).format('MMM DD, YYYY')}</td>
        <td align="right">
            <button 
                type="button" 
                class="btn btn-secondary btn-sm mr-1" 
                data-bs-toggle="offcanvas" 
                href="#offcanvasEditTodo" 
                role="button" 
                aria-controls="offcanvasEditTodo"
                onclick="setActiveTodo(${todo.id})"
            >
                Edit
            </button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
        </td>
    </tr>
    `
}

const todoEditItem = ({ id, value, complete } = item) => {
    return `
    <div class="input-group mb-3">
        <div class="input-group-text">
            <input 
                class="form-check-input mt-0" 
                type="checkbox" 
                value="${complete}"
                aria-label="Checkbox for following text input"
                ${complete ? 'checked' : ''}
                onchange="toggleComplete(${id})"
            >
        </div>
        <input 
            type="text" 
            class="form-control" 
            aria-label="Text input with checkbox" 
            data-id="${id}"
            value="${value}"
            oninput="updateInput(event)"
        >
        <button 
            class="btn btn-outline-danger" 
            type="button" 
            onclick="removeTodoItem(${id})"
        >
            Remove
        </button>
    </div>
    `
}

//HELPER FUNCTIONS
const mainItemObj = (id, value) => {
    return {
        id,
        value,
        complete: false,
        html: todoItem(id, value)
    }
}

const bringInputIntoFocus = (index) => {
    const input = ocAddTodoItemsList.children.item(index).children.item(0)
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)
}

//ADD TODO
const addItem = (e) => {
    const itemId = Date.now()

    //Main Object
    const item = mainItemObj(itemId, '')

    ocAddTodoItems.push(item)
    ocAddTodoReplaceItemsList()
    bringInputIntoFocus(ocAddTodoItems.length - 1)
}

const ocAddTodoRemoveItem = (e) => {
    const id = e.target.id.split('-')[1]
    ocAddTodoItems = ocAddTodoItems.filter(i => i.id != id)
    ocAddTodoReplaceItemsList()
}

const ocAddTodoReplaceItemsList = () => {
    ocAddTodoItemsList.innerHTML = ocAddTodoItems.map(i => i.html).join('')
}

const ocAddTodoItemInputContent = (e) => {
    const value = e.target.value
    const id = e.target.id.split('-')[1]
    const index = ocAddTodoItems.findIndex(i => i.id == id)

    ocAddTodoItems = ocAddTodoItems.map(i => {
        if (i.id == id) {
            return mainItemObj(id, value)
        }

        return i
    })

    ocAddTodoReplaceItemsList()
    bringInputIntoFocus(index)
}

const ocAddTodoSave = () => {
    const id = Date.now()
    const title = ocAddTodoTitle.value

    if (title == '') {
        return alert('Must have a title.')
    }

    if (!ocAddTodoItems.length) {
        return alert(`Must have at least one item in the ${title} todo list.`)
    }

    todos.push({
        id,
        title,
        items: ocAddTodoItems
    })

    ocAddTodoTitle.value = ''
    ocAddTodoItems = []
    ocAddTodoReplaceItemsList()
    populateTheList()
}

//MAIN TODO LIST
const renderActiveTodo = (activeTodo) => {
    ocEditTodoList.innerHTML = activeTodo.items.map(item => todoEditItem(item)).join('')
}

const populateTheList = () => {
    const html = todos.map((todo, index) => todoListItem(todo, index))
    todoListBody.innerHTML = html.join('')
}

const setActiveTodo = (id) => {
    activeTodo = todos.find(todo => todo.id == id)
    offcanvasEditTodoLabel.innerText = activeTodo.title
    renderActiveTodo(activeTodo)
}

const updateTodoList = (activeTodo) => {
    todos = todos.map(todo => {
        if (todo.id == activeTodo.id) {
            return activeTodo
        }

        return todo
    })
    populateTheList()
}

const removeTodoItem = (id) => {
    const items = activeTodo.items.filter(item => parseInt(item.id) !== id)
    activeTodo = { ...activeTodo, items }

    updateTodoList(activeTodo)
    renderActiveTodo(activeTodo)
}

const toggleComplete = (id) => {
    items = activeTodo.items.map(item => {
        if (item.id == id) {
            return { ...item, complete: !item.complete }
        }

        return item
    })

    activeTodo = { ...activeTodo, items }

    updateTodoList(activeTodo)
}

const updateInput = (event) => {
    const value = event.target.value
    const id = event.target.dataset.id

    items = activeTodo.items.map(item => {
        if (parseInt(item.id) == id) {
            return { ...item, value }
        }

        return item
    })

    activeTodo = { ...activeTodo, items }
    updateTodoList(activeTodo)
}


//DOM Listen
window.addEventListener('DOMContentLoaded', () => {
    ocAddTodoItem.addEventListener('click', addItem)
    ocAddTodoSaveButton.addEventListener('click', ocAddTodoSave)

    document.addEventListener('keypress', (event) => {
        if (
            (event.key == 'i' && event.ctrlKey || event.key == 'I' && event.ctrlKey)
        ) {
            addItem()
        }
    })
})