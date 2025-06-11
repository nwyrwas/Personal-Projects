// Grab DOM elements for later use
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-tasks");

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks when page loads
renderTasks();

// Add new task when "Add Task" button is clicked
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();  // Remove whitespace from input
  if (taskText === "") return;           // Don't add empty tasks

  tasks.push({ text: taskText, completed: false });  // Add new task object
  input.value = "";                      // Clear input field
  saveTasks();                          // Save tasks to localStorage
  renderTasks();                        // Update task list UI
});

// Clear all tasks when "Clear All Tasks" button is clicked
clearBtn.addEventListener("click", () => {
  tasks = [];      // Empty the tasks array
  saveTasks();     // Save empty array to localStorage
  renderTasks();   // Clear the UI list
});

// Function to display tasks on the page
function renderTasks() {
  taskList.innerHTML = "";  // Clear current list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Create the text span for each task
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;

    // If task is completed, add CSS class for line-through
    if (task.completed) taskSpan.classList.add("completed");

    // Toggle task completion when clicking on the text
    taskSpan.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Create delete button for each task
    const del = document.createElement("button");
    del.textContent = "❌";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);  // Remove task from array
      saveTasks();
      renderTasks();
    });

    // Append the task text and delete button to the list item
    li.appendChild(taskSpan);
    li.appendChild(del);

    // Append the list item to the task list
    taskList.appendChild(li);
  });
}

// Save tasks array to localStorage as a JSON string
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ------------------------------
// Particle background animation
// ------------------------------
window.onload = () => {
  const canvas = document.getElementById('background');
  const ctx = canvas.getContext('2d');

  let width, height;

  // Resize canvas to full window size
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: width / 2, y: height / 2 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      this.followMouse = Math.random() < 0.2; // 20% chance to follow mouse
    }

    update() {
      if (this.followMouse) {
        // Move gently towards mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        this.x += dx * 0.02;
        this.y += dy * 0.02;
      } else {
        // Move normally
        this.x += this.speedX;
        this.y += this.speedY;
      }

      // Wrap around edges
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
};
