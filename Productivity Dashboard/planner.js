// ================= DATE =================
const dateEl = document.getElementById("date");
const today = new Date();
dateEl.textContent = today.toDateString();


// ================= TASK SYSTEM =================
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskList = document.querySelector(".task-list");

function addTask() {
  const text = taskInput.value.trim();
  const level = priority.value;

  if (text === "") return;

  const task = document.createElement("div");
  task.classList.add("task-item");

  task.innerHTML = `
    <span>${text}</span>
    <small>${level}</small>
  `;

  taskList.appendChild(task);
  taskInput.value = "";
}

// BUTTON CLICK
document.querySelector(".task-row button")
  .addEventListener("click", addTask);

// ENTER KEY
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});


// ================= SAVE + SIDE PANEL =================
const savedList = document.getElementById("savedList");

document.querySelector(".save-btn").addEventListener("click", () => {

  const goals = Array.from(document.querySelectorAll(".planner-input"))
    .map(input => input.value);

  const schedule = Array.from(document.querySelectorAll(".time-row input"))
    .map(input => input.value);

  const notes = document.querySelector("textarea").value;

  const tasks = Array.from(document.querySelectorAll(".task-item span"))
    .map(t => t.textContent);

  const data = {
    date: new Date().toLocaleDateString(),
    goals,
    schedule,
    notes,
    tasks
  };

  // GET EXISTING DATA
  let allPlans = JSON.parse(localStorage.getItem("allPlans")) || [];

  // ADD NEW PLAN
  allPlans.push(data);

  // SAVE BACK
  localStorage.setItem("allPlans", JSON.stringify(allPlans));

  // RENDER UI
  renderPlans();
});


// ================= RENDER SAVED PLANS =================
function renderPlans() {
  savedList.innerHTML = "";

  const allPlans = JSON.parse(localStorage.getItem("allPlans")) || [];

  allPlans.forEach(plan => {

    const card = document.createElement("div");
    card.classList.add("saved-card");

    card.innerHTML = `
      <h4>${plan.date}</h4>

      <p><strong>Goals:</strong> ${plan.goals.filter(g => g).join(", ")}</p>

      <p><strong>Tasks:</strong> ${plan.tasks.join(", ")}</p>

      <p><strong>Schedule:</strong> 
        ${plan.schedule.filter(s => s).join(" | ")}
      </p>

      <p><strong>Notes:</strong> ${plan.notes}</p>
    `;

    savedList.appendChild(card);
  });
}


// ================= LOAD ON START =================
window.addEventListener("load", renderPlans);