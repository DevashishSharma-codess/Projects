// const input = document.getElementById("todo-input");
// const addBtn = document.getElementById("add-btn");
// const list = document.getElementById("todo-list");

// // Load from localStorage
// let todos = JSON.parse(localStorage.getItem("todos")) || [];

// // Save to localStorage
// function saveTodos() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// // Render todos
// function renderTodos() {
//   list.innerHTML = "";

//   todos.forEach((todo, index) => {
//     const div = document.createElement("div");
//     div.classList.add("todo-item");
//     if (todo.completed) div.classList.add("completed");

//     div.innerHTML = `
//       <input type="checkbox" ${todo.completed ? "checked" : ""}>
//       <p>${todo.text}</p>
//       <span class="delete">✕</span>
//     `;

//     // Toggle complete
//     div.querySelector("input").addEventListener("change", () => {
//       todos[index].completed = !todos[index].completed;
//       saveTodos();
//       renderTodos();
//     });

//     // Delete task
//     div.querySelector(".delete").addEventListener("click", () => {
//       todos.splice(index, 1);
//       saveTodos();
//       renderTodos();
//     });

//     list.appendChild(div);
//   });
// }

// // Add todo
// function addTodo() {
//   const text = input.value.trim();
//   if (text === "") return;

//   todos.push({ text, completed: false });
//   input.value = "";

//   saveTodos();
//   renderTodos();
// }

// // Button click
// addBtn.addEventListener("click", addTodo);

// // Enter key support
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") addTodo();
// });

// // Initial render
// renderTodos();



// const input = document.getElementById("todo-input");
// const addBtn = document.getElementById("add-btn");
// const list = document.getElementById("todo-list");



// let todos = JSON.parse(localStorage.getItem("todos")) || [];


// function saveTodos(){
//     localStorage.setItem("todos" , JSON.stringify(todos));
// }


// function renderTodos(){
//     list.innerHTML = "";
//     todos.forEach( (todo , index) => {
//         let div = document.createElement("div");
//        div.classList.add("todo-item");
//         if(todo.completed) div.classList.add("completed");
//         div.innerHTML = `
//         <input type="checkbox" ${todo.completed ? "checked" : ""}>
//         <p>${todo.text}</p>
//           <span class="delete">✕</span>
//         `
//        div.querySelector("input").addEventListener("change" , function(){
//         todos[index].completed = !todos[index].completed 
//         saveTodos();
//         renderTodos();
//        })
        
//        div.querySelector(".delete").addEventListener("click" , function(){
//         todos.splice(index, 1);
//         saveTodos();
//         renderTodos();
//        })

//        list.appendChild(div);
//     });
// }


//   function addTodo(){
//     let text = input.value.trim();
//     if (text == "") return;
//     todos.push({text , completed:false});
//     input.value = "";
//     saveTodos();
//     renderTodos();
//   }

//   addBtn.addEventListener("click" , addTodo);

//   input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") addTodo();
// });

// renderTodos();