const ocAddTodoItem = document.getElementById('ocAddTodoItem')

window.addEventListener('DOMContentLoaded', () => {
    ocAddTodoItem.addEventListener('click', (e) => {
        console.log(e.target.innerText)
    })
})