const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const CompleteCount = document.querySelector("#complete-count")
const cancelBtn = document.querySelector("#cancel-btn")


let todos = []
let editTodoID = null


todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const todoValue = todoInput.value.trim();
    if (!todoValue) {
        return
    }

    if (editTodoID) {
        todos = todos.map((todo) => {

            if (todo.id === Number(editTodoID)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo
        })
    } else {
        //adding

        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }
        todos.push(newTodo)


    }

    cancelEdit()
    renderTodo()


})
function renderTodo() {
    todoList.innerHTML = ""
    todos.forEach((todo)=>{
        const li = document.createElement("li")
        li.dataset.id = todo.id
        li.className = `border border-gray-400 mb-2 rounded-xl hover:bg-slate-50 flex gap-3 items-center p-3`
        li.innerHTML = `
     
                    <input data-action="toogle" class="size-4" ${todo.isCompleted ? "checked" : ""} type="checkbox">
                    <p class="flex-1 ${todo.isCompleted ? "line-through text-gray-500" : ""}">  ${todo.text}</p>
                    <div class="flex gap-4 ">
                        <button data-action="edit"  class="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 rounded-lg px-2">Edit</button>
                        <button data-action="delete"  class="bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-lg px-2">Delete</button>
                    </div>
                </li>`
        todoList.append(li)  //
    })
    taskCount.textContent = `TASKS (${todos.length})`
    CompleteCount.textContent = `COMPLETED : ${todos.filter((todo) => todo.isCompleted).length}`
}
renderTodo()
//event delegation
todoList.addEventListener("click", (e) => {
    e.stopPropagation()
    let li = e.target.closest("li")
    let id = li.dataset.id

    let action = e.target.dataset.action


    if (action === "edit") {
        editTodo(id)
    }

    if (action === "delete") {
        deleteTodo(id)
        e.target.closest('li').remove()
    }
    if (action === "toogle") {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
    } renderTodo()
})
function deleteTodo(id) {
    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })
    renderTodo()
}
function editTodo(id) {
    editTodoID = id
    let currentTodo = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }
    })
    todoInput.value = currentTodo.text

    formBtn.textContent = "Update"
    formBtn.className = "px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors cursor-pointer";
    cancelBtn.classList.remove("hidden");

}
function cancelEdit() {
    todoInput.value = ""
    editTodoId = null;
    formBtn.textContent = "Add";
    formBtn.className =
        "px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer";
    cancelBtn.classList.add("hidden")
}

cancelBtn.addEventListener("click", () => {
    cancelEdit();
})