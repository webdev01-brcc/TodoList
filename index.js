//Variables
const ocAddTodoItem = document.getElementById('ocAddTodoItem')
const ocAddTodoItemsList = document.getElementById('ocAddTodoItemsList')
let ocAddTodoItems = []

//HTML - Templates
const todoItem = (id) => {
    return `
    <div class="input-group mb-3" id="ocAddTodoItem-${id}">
        <input 
            type="text" 
            class="form-control" 
            placeholder="Item" 
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            id="ocAddTodoItemInput-${id}"
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

//Functions
const addItem = (e) => {
    const itemId = Date.now()
    const item = {
        id: itemId,
        html: todoItem(itemId)
    }
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

window.addEventListener('DOMContentLoaded', () => {
    ocAddTodoItem.addEventListener('click', addItem)
})