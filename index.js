//Variables
const ocAddTodoItem = document.getElementById('ocAddTodoItem')
const ocAddTodoTitle = document.getElementById('ocAddTodoTitle')
const ocAddTodoSaveButton = document.getElementById('ocAddTodoSaveButton')
const ocAddTodoItemsList = document.getElementById('ocAddTodoItemsList')
const todoListBody = document.getElementById('todoListBody')
let ocAddTodoItems = []
let todos = []

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
            <button type="button" class="btn btn-secondary btn-sm mr-1">Edit</button>
            <button type="button" class="btn btn-danger btn-sm">Remove</button>
        </td>
    </tr>
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
const populateTheList = () => {
    const html = todos.map((todo, index) => todoListItem(todo, index))
    todoListBody.innerHTML = html.join('')
}


//DOM Listen
window.addEventListener('DOMContentLoaded', () => {
    ocAddTodoItem.addEventListener('click', addItem)
    ocAddTodoSaveButton.addEventListener('click', ocAddTodoSave)
})