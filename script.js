// script.js

// Dados iniciais
const tasks = []; // Lista de tarefas { id, name, day, week, time, completed }
let currentWeek = 1; // Semana inicial

// Atualiza o calendário
function updateCalendar() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const taskList = document.getElementById(`${day}-tasks`);
        taskList.innerHTML = ''; // Limpa as tarefas do dia
        tasks
            .filter(task => task.day === day && task.week === currentWeek)
            .forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
          ${task.time} - ${task.name}
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
        `;
                taskList.appendChild(li);
            });
    });
    updateProgress();
}

// Atualiza a barra de progresso
function updateProgress() {
    const total = tasks.filter(task => task.week === currentWeek).length;
    const completed = tasks.filter(task => task.week === currentWeek && task.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = `${percentage}% Concluído`;
}

// Alterna status da tarefa
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) task.completed = !task.completed;
    updateProgress();
}

// Navegação entre semanas
document.getElementById('prev-week').addEventListener('click', () => {
    currentWeek = Math.max(1, currentWeek - 1);
    document.getElementById('current-week').textContent = `Semana ${currentWeek}`;
    updateCalendar();
});

document.getElementById('next-week').addEventListener('click', () => {
    currentWeek++;
    document.getElementById('current-week').textContent = `Semana ${currentWeek}`;
    updateCalendar();
});

// Inicializa o calendário
updateCalendar();
