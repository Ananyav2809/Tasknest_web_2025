const ctx1 = document.getElementById('taskChart').getContext('2d');
new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{
      label: 'Tasks Completed',
      data: [2, 4, 3, 5, 6, 4, 2],
      fill: true,
      borderColor: '#0051ff',
      backgroundColor: 'rgba(0,81,255,0.1)',
      tension: 0.4
    }]
  },
  options: { plugins: { legend: { display: false } } }
});

const ctx2 = document.getElementById('priorityChart').getContext('2d');
new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks',
      data: [5, 3, 4],
      backgroundColor: ['#ff4c4c', '#ffa500', '#4caf50']
    }]
  },
  options: { plugins: { legend: { display: false } } }
});

const calendarGrid = document.getElementById("calendar-grid");
const dateText = document.getElementById("date-text");
const today = new Date();
const month = today.toLocaleString("default", { month: "long" });
const year = today.getFullYear();
dateText.textContent = `${month} ${year}`;

const taskData = {}; 

const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
const firstDay = new Date(year, today.getMonth(), 1).getDay();

for (let i = 0; i < firstDay; i++) {
  const blank = document.createElement("div");
  calendarGrid.appendChild(blank);
}

for (let day = 1; day <= daysInMonth; day++) {
  const cell = document.createElement("div");
  cell.textContent = day;
  cell.classList.add("day");
  cell.addEventListener("click", () => openPopup(day));
  calendarGrid.appendChild(cell);
}

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupTasks = document.getElementById("popupTasks");
const closePopup = document.getElementById("closePopup");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const taskPriority = document.getElementById("taskPriority");
let selectedDay = null;

function openPopup(day) {
  selectedDay = day;
  popupTitle.textContent = `Tasks for ${month} ${day}, ${year}`;
  renderTasks(day);
  popup.style.display = "flex";
}

function renderTasks(day) {
  popupTasks.innerHTML = "";
  const tasks = taskData[day] || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority);
    li.innerHTML = `
      <strong>${task.name}</strong> - ${task.description}
      <button class="deleteBtn" onclick="deleteTask(${day}, ${index})">🗑</button>
    `;
    popupTasks.appendChild(li);
  });
  updateCalendarColors();
}

function updateCalendarColors() {
  document.querySelectorAll(".calendar-grid .day").forEach(cell => {
    const day = parseInt(cell.textContent);
    cell.classList.remove("high","medium","low");
    const tasks = taskData[day];
    if (tasks && tasks.length > 0) {
      const hasHigh = tasks.some(t => t.priority === "high");
      const hasMedium = tasks.some(t => t.priority === "medium");
      if (hasHigh) cell.classList.add("high");
      else if (hasMedium) cell.classList.add("medium");
      else cell.classList.add("low");
    }
  });
}

addTaskBtn.onclick = () => {
  const name = taskName.value.trim();
  const desc = taskDesc.value.trim();
  const priority = taskPriority.value;

  if (!name || !desc) return alert("Please fill all fields");

  if (!taskData[selectedDay]) taskData[selectedDay] = [];
  taskData[selectedDay].push({ name, description: desc, priority });

  taskName.value = "";
  taskDesc.value = "";
  renderTasks(selectedDay);
};

window.deleteTask = function(day, index) {
  taskData[day].splice(index, 1);
  if (taskData[day].length === 0) delete taskData[day];
  renderTasks(day);
};

closePopup.onclick = () => popup.style.display = "none";
window.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };
