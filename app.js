const APP_KEY = "routinex:app-state";
const LEGACY_TASKS_KEY = "routinex:dated-tasks";
const LEGACY_THEME_KEY = "routinex:theme";
const LEGACY_USER_NAME_KEY = "routinex:user-name";

const authTitle = document.getElementById("auth-title");
const authSubtitle = document.getElementById("auth-subtitle");
const authFeedback = document.getElementById("auth-feedback");
const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const dashboardUserName = document.getElementById("dashboard-user-name");
const dashboardLogout = document.getElementById("dashboard-logout");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const footer = document.getElementById("auth-footer");
const footerText = document.getElementById("auth-footer-text");
const modeButton = document.getElementById("auth-mode-button");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const passwordToggles = document.querySelectorAll("[data-password-toggle]");

const selectedDate = document.getElementById("selected-date");
const currentDate = document.getElementById("current-date");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const taskCounter = document.getElementById("task-counter");
const timelineList = document.getElementById("timeline-list");
const filterLabel = document.getElementById("filter-label");
const categoryList = document.getElementById("category-list");
const priorityList = document.getElementById("priority-list");
const openTaskModal = document.getElementById("open-task-modal");
const closeTaskModal = document.getElementById("close-task-modal");
const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const taskCategoryName = document.getElementById("task-category-name");
const taskCategoryColor = document.getElementById("task-category-color");
const taskEtiqueta = document.getElementById("task-etiqueta");
const taskPriority = document.getElementById("task-priority");
const taskStatus = document.getElementById("task-status");
const taskNotes = document.getElementById("task-notes");
const themeToggle = document.getElementById("theme-toggle");

const sidebarUserTrigger = document.getElementById("sidebar-user-trigger");
const sidebarAvatar = document.querySelector(".sidebar-avatar");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const settingsForm = document.getElementById("settings-form");
const settingsName = document.getElementById("settings-name");
const settingsEmail = document.getElementById("settings-email");
const settingsPassword = document.getElementById("settings-password");
const settingsTheme = document.getElementById("settings-theme");
const settingsNotifications = document.getElementById("settings-notifications");
const clearUserTasks = document.getElementById("clear-user-tasks");

const defaultState = {
  users: [],
  currentUserId: null,
};

let appState = readAppState();
let currentMode = "login";
let activeCategory = "all";
let activePriority = "all";
let expandedTaskId = null;

const holidays = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalho",
  "09-07": "Independência do Brasil",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "12-25": "Natal",
};

const screenCopy = {
  login: {
    title: "Entrar",
    subtitle: "Acesse seu painel de rotina e produtividade.",
    footer: "Novo por aqui?",
    action: "Criar conta",
  },
  signup: {
    title: "Criar conta",
    subtitle: "Preencha seus dados para preparar seu perfil visual.",
    footer: "Já tem conta?",
    action: "Já tenho conta",
  },
};

function readAppState() {
  const rawState = localStorage.getItem(APP_KEY);

  if (!rawState) {
    return migrateLegacyState();
  }

  try {
    return {
      ...structuredClone(defaultState),
      ...JSON.parse(rawState),
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function migrateLegacyState() {
  const legacyTasks = localStorage.getItem(LEGACY_TASKS_KEY);
  const legacyName = localStorage.getItem(LEGACY_USER_NAME_KEY);
  const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);

  if (!legacyTasks && !legacyName) {
    return structuredClone(defaultState);
  }

  let tasks = [];

  try {
    tasks = JSON.parse(legacyTasks || "[]").map(normalizeTask);
  } catch {
    tasks = [];
  }

  const user = {
    id: crypto.randomUUID(),
    name: legacyName || "Usuário",
    email: "usuario@local.app",
    password: "123456",
    settings: {
      theme: legacyTheme || "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
    },
    tasks,
  };

  return {
    users: [user],
    currentUserId: null,
  };
}

function saveAppState() {
  localStorage.setItem(APP_KEY, JSON.stringify(appState));
}

function getCurrentUser() {
  return appState.users.find((user) => user.id === appState.currentUserId) || null;
}

function updateCurrentUser(updater) {
  appState.users = appState.users.map((user) => {
    if (user.id !== appState.currentUserId) {
      return user;
    }

    return updater(user);
  });

  saveAppState();
}

function normalizeTask(task) {
  const status = task.status || (task.isCompleted ? "Concluída" : "Pendente");

  return {
    id: task.id || crypto.randomUUID(),
    title: task.title || "Sem título",
    description: task.description || "",
    date: task.date || getTodayDate(),
    time: task.time || "09:00",
    categoryName: task.categoryName || "Geral",
    categoryColor: task.categoryColor || "#00b4d8",
    etiqueta: task.etiqueta || "Sem etiqueta",
    priority: task.priority || "Média",
    status,
    notes: task.notes || "",
    isCompleted: status === "Concluída" || Boolean(task.isCompleted),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getHolidayName(dateValue) {
  const monthDay = dateValue?.slice(5);
  return holidays[monthDay] || null;
}

function getHolidayText(dateValue) {
  const holidayName = getHolidayName(dateValue);
  return holidayName ? `Feriado: ${holidayName}` : "Sem feriado nesta data";
}

function setFeedback(message = "", type = "default") {
  authFeedback.textContent = message;
  authFeedback.classList.toggle("is-success", type === "success");
}

function showAuthMode(mode) {
  currentMode = mode;
  const isSignup = currentMode === "signup";
  loginForm.hidden = isSignup;
  signupForm.hidden = !isSignup;
  footer.hidden = false;

  authTitle.textContent = screenCopy[currentMode].title;
  authSubtitle.textContent = screenCopy[currentMode].subtitle;
  footerText.textContent = screenCopy[currentMode].footer;
  modeButton.textContent = screenCopy[currentMode].action;

  resetAllPasswordVisibility();
  setFeedback();
}

function applyTheme() {
  const user = getCurrentUser();
  const theme = user?.settings.theme || "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☾" : "☀";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
}

function toggleTheme() {
  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      theme: user.settings.theme === "dark" ? "light" : "dark",
    },
  }));
  applyTheme();
}

function setCurrentDate() {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  currentDate.textContent = formatter.format(new Date(`${selectedDate.value}T12:00:00`));
}

function getVisibleTasks() {
  const user = getCurrentUser();
  const tasks = user?.tasks || [];

  return tasks
    .filter((task) => task.date === selectedDate.value)
    .filter((task) => activeCategory === "all" || task.categoryName === activeCategory)
    .filter((task) => activePriority === "all" || task.priority === activePriority)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function updateProgress() {
  const visibleTasks = getVisibleTasks();
  const total = visibleTasks.length;
  const completed = visibleTasks.filter((task) => task.isCompleted).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressLabel.textContent = `${completed}/${total} Concluídas - ${percent}%`;
  taskCounter.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} no dia`;
  progressFill.style.width = `${percent}%`;
}

function renderCategoryFilters() {
  const user = getCurrentUser();
  const categories = Array.from(
    new Map((user?.tasks || []).map((task) => [task.categoryName, task.categoryColor])),
  );

  categoryList.innerHTML = [
    `<button class="category-filter ${activeCategory === "all" ? "is-active" : ""}" type="button" data-category="all">
      <span class="category-dot" style="--dot-color: #a0aec0"></span>
      Todas
    </button>`,
    ...categories.map(([name, color]) => `
      <button class="category-filter ${activeCategory === name ? "is-active" : ""}" type="button" data-category="${encodeURIComponent(name)}">
        <span class="category-dot" style="--dot-color: ${color}"></span>
        ${escapeHtml(name)}
      </button>
    `),
  ].join("");
}

function renderExpandedPanel(task) {
  const holidayText = getHolidayText(task.date);

  return `
    <form class="task-expand-panel" data-edit-form="${task.id}">
      <label>
        <span>Título</span>
        <input type="text" name="title" value="${escapeHtml(task.title)}" required>
      </label>
      <label>
        <span>Descrição</span>
        <input type="text" name="description" value="${escapeHtml(task.description)}">
      </label>
      <label>
        <span>Data</span>
        <input type="date" name="date" value="${task.date}" required>
      </label>
      <label>
        <span>Horário</span>
        <input type="time" name="time" value="${task.time}" required>
      </label>
      <label>
        <span>Categoria</span>
        <input type="text" name="categoryName" value="${escapeHtml(task.categoryName)}">
      </label>
      <label>
        <span>Cor</span>
        <input class="color-input" type="color" name="categoryColor" value="${task.categoryColor}">
      </label>
      <label>
        <span>Etiqueta</span>
        <input type="text" name="etiqueta" value="${escapeHtml(task.etiqueta)}">
      </label>
      <label>
        <span>Prioridade</span>
        <select name="priority">
          <option value="Baixa" ${task.priority === "Baixa" ? "selected" : ""}>Baixa</option>
          <option value="Média" ${task.priority === "Média" ? "selected" : ""}>Média</option>
          <option value="Alta" ${task.priority === "Alta" ? "selected" : ""}>Alta</option>
        </select>
      </label>
      <label>
        <span>Status</span>
        <select name="status">
          <option value="Pendente" ${task.status === "Pendente" ? "selected" : ""}>Pendente</option>
          <option value="Em andamento" ${task.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
          <option value="Concluída" ${task.status === "Concluída" ? "selected" : ""}>Concluída</option>
        </select>
      </label>
      <label>
        <span>Observações</span>
        <input type="text" name="notes" value="${escapeHtml(task.notes)}">
      </label>
      <div class="task-holiday-panel" aria-label="Informação de feriado">
        <span>Feriado</span>
        <strong>${escapeHtml(holidayText)}</strong>
      </div>

      <div class="task-panel-actions">
        <button class="task-save-button" type="submit">Salvar Alterações</button>
        <button class="task-delete-button" type="button" data-delete-task="${task.id}">Excluir</button>
      </div>
    </form>
  `;
}

function renderTimeline() {
  const visibleTasks = getVisibleTasks();
  filterLabel.textContent = activeCategory === "all" ? "Todas as categorias" : activeCategory;

  if (visibleTasks.length === 0) {
    timelineList.innerHTML = `
      <div class="empty-state">
        Nenhuma tarefa para esta data. Clique em + Nova Tarefa para começar!
      </div>
    `;
    updateProgress();
    return;
  }

  timelineList.innerHTML = visibleTasks
    .map((task) => {
      const completedClass = task.isCompleted ? " is-completed" : "";
      const expandedClass = expandedTaskId === task.id ? " is-expanded" : "";
      const checkedMark = task.isCompleted ? "✓" : "";
      const holidayText = getHolidayText(task.date);

      return `
        <article class="task-card${completedClass}${expandedClass}" style="--category-color: ${task.categoryColor}" data-card-id="${task.id}">
          <div class="task-card-summary">
            <button class="task-check-button" type="button" data-task-id="${task.id}" aria-label="Alternar conclusão">
              ${checkedMark}
            </button>
            <div class="task-body">
              <span class="task-time">${task.time}</span>
              <h3 class="task-title">${escapeHtml(task.title)}</h3>
              <p class="task-date">${formatDate(task.date)}</p>
              <p class="task-description">${escapeHtml(task.description)}</p>
              <p class="task-etiqueta">${escapeHtml(task.etiqueta)} • ${escapeHtml(task.priority)} • ${escapeHtml(task.status)}</p>
              <p class="task-holiday">${escapeHtml(holidayText)}</p>
              ${task.notes ? `<p class="task-description">${escapeHtml(task.notes)}</p>` : ""}
            </div>
            <div class="task-meta">
              <span class="task-badge">${escapeHtml(task.categoryName)}</span>
            </div>
          </div>
          <div class="task-expand-wrap">
            ${renderExpandedPanel(task)}
          </div>
        </article>
      `;
    })
    .join("");

  updateProgress();
}

function renderDashboard() {
  renderCategoryFilters();
  renderTimeline();
}

function showDashboard() {
  const user = getCurrentUser();
  authScreen.hidden = true;
  dashboardScreen.hidden = false;
  dashboardUserName.textContent = user?.name || "Usuário";
  sidebarAvatar.textContent = user?.name ? getInitials(user.name) : "";
  setCurrentDate();
  applyTheme();
  renderDashboard();
  setFeedback();
}

function showLogin() {
  appState.currentUserId = null;
  saveAppState();
  dashboardScreen.hidden = true;
  authScreen.hidden = false;
  loginForm.reset();
  showAuthMode("login");
}

function openModal() {
  taskModal.hidden = false;
  taskDate.value = selectedDate.value;
  taskTitle.focus();
}

function closeModal() {
  taskModal.hidden = true;
  taskForm.reset();
  taskCategoryColor.value = "#00b4d8";
  taskPriority.value = "Média";
  taskStatus.value = "Pendente";
}

function createTask() {
  const newTask = normalizeTask({
    id: crypto.randomUUID(),
    title: taskTitle.value.trim(),
    description: taskDescription.value.trim(),
    date: taskDate.value,
    time: taskTime.value,
    categoryName: taskCategoryName.value.trim(),
    categoryColor: taskCategoryColor.value,
    etiqueta: taskEtiqueta.value.trim(),
    priority: taskPriority.value,
    status: taskStatus.value,
    notes: taskNotes.value.trim(),
    isCompleted: taskStatus.value === "Concluída",
  });

  updateCurrentUser((user) => ({
    ...user,
    tasks: [...user.tasks, newTask],
  }));

  activeCategory = "all";
  closeModal();
  renderDashboard();
}

function toggleTask(taskId) {
  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const nextCompleted = !task.isCompleted;
      return {
        ...task,
        isCompleted: nextCompleted,
        status: nextCompleted ? "Concluída" : "Pendente",
      };
    }),
  }));

  renderDashboard();
}

function updateTask(form) {
  const formData = new FormData(form);
  const taskId = form.dataset.editForm;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const status = formData.get("status");
      return normalizeTask({
        ...task,
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date"),
        time: formData.get("time"),
        categoryName: formData.get("categoryName").trim(),
        categoryColor: formData.get("categoryColor"),
        etiqueta: formData.get("etiqueta").trim(),
        priority: formData.get("priority"),
        status,
        notes: formData.get("notes").trim(),
        isCompleted: status === "Concluída",
      });
    }),
  }));

  renderDashboard();
}

function deleteTask(taskId) {
  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.filter((task) => task.id !== taskId),
  }));

  if (expandedTaskId === taskId) expandedTaskId = null;
  renderDashboard();
}

function createAccount() {
  const email = signupEmail.value.trim().toLowerCase();
  const exists = appState.users.some((user) => user.email === email);

  if (exists) {
    setFeedback("Este email já está cadastrado.");
    return;
  }

  const user = {
    id: crypto.randomUUID(),
    name: signupName.value.trim(),
    email,
    password: signupPassword.value,
    settings: {
      theme: "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
    },
    tasks: [],
  };

  appState.users = [...appState.users, user];
  appState.currentUserId = user.id;
  saveAppState();
  signupForm.reset();
  showDashboard();
}

function login() {
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  const user = appState.users.find((item) => item.email === email && item.password === password);

  if (!user) {
    setFeedback("Email ou senha inválidos.");
    return;
  }

  appState.currentUserId = user.id;
  saveAppState();
  loginForm.reset();
  showDashboard();
}

function openSettings() {
  const user = getCurrentUser();
  if (!user) return;

  settingsName.value = user.name;
  settingsEmail.value = user.email;
  settingsPassword.value = "";
  settingsTheme.value = user.settings.theme;
  settingsNotifications.checked = user.settings.notificationsEnabled;
  settingsModal.hidden = false;
  settingsName.focus();
}

function closeSettings() {
  settingsModal.hidden = true;
  settingsForm.reset();
  resetPasswordVisibility(settingsPassword);
}

function saveSettings() {
  const email = settingsEmail.value.trim().toLowerCase();
  const duplicate = appState.users.some(
    (user) => user.email === email && user.id !== appState.currentUserId,
  );

  if (duplicate) {
    setFeedback("Este email já pertence a outro usuário.");
    return;
  }

  updateCurrentUser((user) => ({
    ...user,
    name: settingsName.value.trim(),
    email,
    password: settingsPassword.value || user.password,
    settings: {
      ...user.settings,
      theme: settingsTheme.value,
      notificationsEnabled: settingsNotifications.checked,
    },
  }));

  closeSettings();
  showDashboard();
}

function clearCurrentUserTasks() {
  updateCurrentUser((user) => ({
    ...user,
    tasks: [],
  }));
  closeSettings();
  renderDashboard();
}

function bindEvents() {
  passwordToggles.forEach((button) => {
    button.addEventListener("click", () => togglePasswordVisibility(button));
  });

  modeButton.addEventListener("click", () => {
    showAuthMode(currentMode === "login" ? "signup" : "login");
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createAccount();
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
  });

  dashboardLogout.addEventListener("click", showLogin);
  themeToggle.addEventListener("click", toggleTheme);
  sidebarUserTrigger.addEventListener("click", openSettings);
  closeSettingsModal.addEventListener("click", closeSettings);
  clearUserTasks.addEventListener("click", clearCurrentUserTasks);
  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettings();
  });

  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) closeSettings();
  });

  openTaskModal.addEventListener("click", openModal);
  closeTaskModal.addEventListener("click", closeModal);
  taskModal.addEventListener("click", (event) => {
    if (event.target === taskModal) closeModal();
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createTask();
  });

  selectedDate.addEventListener("change", () => {
    expandedTaskId = null;
    setCurrentDate();
    renderDashboard();
  });

  timelineList.addEventListener("click", (event) => {
    const checkButton = event.target.closest("[data-task-id]");
    const deleteButton = event.target.closest("[data-delete-task]");
    const card = event.target.closest("[data-card-id]");
    const interactive = event.target.closest("input, button, textarea, select, label");

    if (checkButton) {
      toggleTask(checkButton.dataset.taskId);
      return;
    }
    if (deleteButton) {
      deleteTask(deleteButton.dataset.deleteTask);
      return;
    }
    if (card && !interactive) {
      expandedTaskId = expandedTaskId === card.dataset.cardId ? null : card.dataset.cardId;
      renderTimeline();
    }
  });

  timelineList.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form]");
    if (!form) return;
    event.preventDefault();
    updateTask(form);
  });

  categoryList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category === "all" ? "all" : decodeURIComponent(button.dataset.category);
    expandedTaskId = null;
    renderDashboard();
  });

  priorityList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-priority]");
    if (!button) return;
    activePriority = button.dataset.priority;
    priorityList.querySelectorAll("[data-priority]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    expandedTaskId = null;
    renderDashboard();
  });
}

function togglePasswordVisibility(button) {
  const input = document.getElementById(button.dataset.passwordToggle);
  if (!input) return;

  const shouldShow = input.type === "password";
  input.type = shouldShow ? "text" : "password";
  button.classList.toggle("is-visible", shouldShow);
  button.setAttribute("aria-pressed", String(shouldShow));
  button.setAttribute("aria-label", shouldShow ? "Ocultar senha" : "Revelar senha");
}

function resetPasswordVisibility(input) {
  if (!input) return;

  input.type = "password";
  const button = document.querySelector(`[data-password-toggle="${input.id}"]`);
  if (!button) return;
  button.classList.remove("is-visible");
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-label", "Revelar senha");
}

function resetAllPasswordVisibility() {
  [loginPassword, signupPassword, settingsPassword].forEach(resetPasswordVisibility);
}

function init() {
  selectedDate.value = getTodayDate();
  taskDate.value = selectedDate.value;
  setCurrentDate();
  bindEvents();

  if (getCurrentUser()) {
    showDashboard();
  } else {
    authScreen.hidden = false;
    dashboardScreen.hidden = true;
    applyTheme();
  }
}

init();
