//Variables
const ocAddTodoItem = document.getElementById('ocAddTodoItem')
const ocAddTodoItemsList = document.getElementById('ocAddTodoItemsList')
let ocAddTodoItems = []

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

//Functions
const mainObj = (id, value) => {
    return {
        id,
        value,
        html: todoItem(id, value)
    }
}
const addItem = (e) => {
    const itemId = Date.now()

    //Main Object
    const item = mainObj(itemId, '')

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

    ocAddTodoItems = ocAddTodoItems.map(i => {
        if (i.id == id) {
            return mainObj(id, value)
        }

        return i
    })

    ocAddTodoReplaceItemsList()
}

//DOM Listen
window.addEventListener('DOMContentLoaded', () => {
    ocAddTodoItem.addEventListener('click', addItem)
})