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
const priorityFilter = document.getElementById("priority-filter");
const taskSearch = document.getElementById("task-search");
const sortFilter = document.getElementById("sort-filter");
const dailyTitle = document.getElementById("daily-title");
const currentDate = document.getElementById("current-date");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const taskCounter = document.getElementById("task-counter");
const statTotal = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statProgress = document.getElementById("stat-progress");
const statFolders = document.getElementById("stat-folders");
const statProgressRing = document.getElementById("stat-progress-ring");
const resetFilters = document.getElementById("reset-filters");
const timelineList = document.getElementById("timeline-list");
const filterLabel = document.getElementById("filter-label");
const categoryList = document.getElementById("category-list");
const openTaskModal = document.getElementById("open-task-modal");
const closeTaskModal = document.getElementById("close-task-modal");
const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskEditorModal = document.getElementById("task-editor-modal");
const closeTaskEditorModal = document.getElementById("close-task-editor-modal");
const taskEditorTitle = document.getElementById("task-editor-title");
const taskEditorMeta = document.getElementById("task-editor-meta");
const taskEditorContent = document.getElementById("task-editor-content");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const taskCategoryName = document.getElementById("task-category-name");
const taskCategoryColor = document.getElementById("task-category-color");
const taskTempo = document.getElementById("task-tempo");
const taskPriority = document.getElementById("task-priority");
const taskStatus = document.getElementById("task-status");
const taskNotes = document.getElementById("task-notes");
const createChoiceModal = document.getElementById("create-choice-modal");
const closeCreateChoiceModal = document.getElementById("close-create-choice-modal");
const createCardOption = document.getElementById("create-card-option");
const createFolderOption = document.getElementById("create-folder-option");
const cancelCreateChoice = document.getElementById("cancel-create-choice");
const folderModal = document.getElementById("folder-modal");
const closeFolderModal = document.getElementById("close-folder-modal");
const folderForm = document.getElementById("folder-form");
const folderName = document.getElementById("folder-name");
const folderColor = document.getElementById("folder-color");
const folderViewModal = document.getElementById("folder-view-modal");
const closeFolderViewModal = document.getElementById("close-folder-view-modal");
const folderViewTitle = document.getElementById("folder-view-title");
const folderViewContent = document.getElementById("folder-view-content");
const themeToggle = document.getElementById("theme-toggle");
const sidebarThemeToggle = document.getElementById("sidebar-theme-toggle");
const sidebarThemeIcon = document.getElementById("sidebar-theme-icon");
const sidebarToggle = document.getElementById("sidebar-toggle");
const workspaceMenu = document.getElementById("workspace-menu");
const routinesMenu = document.getElementById("routines-menu");
const dailyHeader = document.getElementById("daily-header");
const dailyTimeline = document.getElementById("daily-timeline");
const routinesView = document.getElementById("routines-view");
const routinePrevWeek = document.getElementById("routine-prev-week");
const routineNextWeek = document.getElementById("routine-next-week");
const routineToday = document.getElementById("routine-today");
const routineCalendarToggle = document.getElementById("routine-calendar-toggle");
const routineCalendarPanel = document.getElementById("routine-calendar-panel");
const routineCalendarClose = document.getElementById("routine-calendar-close");
const routineMonthLabel = document.getElementById("routine-month-label");
const routineMonthGrid = document.getElementById("routine-month-grid");
const routineCalendarTooltip = document.getElementById("routine-calendar-tooltip");
const routineDayTabs = document.getElementById("routine-day-tabs");
const routineWeekGrid = document.getElementById("routine-week-grid");
const routineDetailPanel = document.getElementById("routine-detail-panel");
const routineDetailClose = document.getElementById("routine-detail-close");
const routineDetailType = document.getElementById("routine-detail-type");
const routineDetailTitle = document.getElementById("routine-detail-title");
const routineDetailContent = document.getElementById("routine-detail-content");

const sidebarUserTrigger = document.getElementById("sidebar-user-trigger");
const sidebarAvatar = document.querySelector(".sidebar-avatar");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsModal = document.getElementById("close-settings-modal");
const settingsForm = document.getElementById("settings-form");
const settingsName = document.getElementById("settings-name");
const settingsEmail = document.getElementById("settings-email");
const settingsPassword = document.getElementById("settings-password");
const settingsTheme = document.getElementById("settings-theme");
const settingsAvatar = document.getElementById("settings-avatar");
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
let activeSearch = "";
let activeSort = "chronological";
let expandedTaskId = null;
let pendingAvatarImage = "";
let activeView = "workspace";
let routineWeekStart = getStartOfWeek(new Date(`${getTodayDate()}T12:00:00`));
let selectedRoutineDate = getTodayDate();
let highlightedRoutineDate = "";
let activeRoutineId = "";
let isCreatingTask = false;
let activeFolderId = "";
let activeSidebarFolderId = "";
let pendingTargetFolderId = "";
let suppressCalendarClickUntil = 0;
const collapsedFolderIds = new Set();

const holidays = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalho",
  "06-12": "Dia dos Namorados",
  "09-07": "Independência do Brasil",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "12-25": "Natal",
};

const tempoOptions = [
  "Apagar após a data",
  "Deixar marcado",
  "Relembrar até desativar manualmente",
];

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

function confirmAction() {
  return confirm("Você tem certeza?");
}

function readAppState() {
  const rawState = localStorage.getItem(APP_KEY);

  if (!rawState) {
    return migrateLegacyState();
  }

  try {
    return normalizeAppState({
      ...cloneDefaultState(),
      ...JSON.parse(rawState),
    });
  } catch {
    return cloneDefaultState();
  }
}

function migrateLegacyState() {
  const legacyTasks = localStorage.getItem(LEGACY_TASKS_KEY);
  const legacyName = localStorage.getItem(LEGACY_USER_NAME_KEY);
  const legacyTheme = localStorage.getItem(LEGACY_THEME_KEY);

  if (!legacyTasks && !legacyName) {
    return cloneDefaultState();
  }

  let tasks = [];

  try {
    tasks = JSON.parse(legacyTasks || "[]").map(normalizeTask);
  } catch {
    tasks = [];
  }

  const user = {
    id: createId(),
    name: legacyName || "Usuário",
    email: "usuario@local.app",
    password: "123456",
    settings: {
      theme: legacyTheme || "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
      collapsedFolders: {},
    },
    avatarImage: "",
    tasks,
    folders: [],
  };

  return {
    users: [user],
    currentUserId: null,
  };
}

function saveAppState() {
  localStorage.setItem(APP_KEY, JSON.stringify(appState));
}

function normalizeAppState(state) {
  const users = Array.isArray(state.users) ? state.users.map(normalizeUser) : [];
  const currentUserExists = users.some((user) => user.id === state.currentUserId);

  return {
    users,
    currentUserId: currentUserExists ? state.currentUserId : null,
  };
}

function cloneDefaultState() {
  if (typeof structuredClone === "function") {
    return structuredClone(defaultState);
  }

  return JSON.parse(JSON.stringify(defaultState));
}

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCurrentUser() {
  const user = appState.users.find((item) => item.id === appState.currentUserId);
  return user ? normalizeUser(user) : null;
}

function updateCurrentUser(updater) {
  appState.users = appState.users.map((user) => {
    if (user.id !== appState.currentUserId) {
      return user;
    }

    return normalizeUser(updater(normalizeUser(user)));
  });

  saveAppState();
}

function resetSessionViewState() {
  activeCategory = "all";
  activePriority = "all";
  activeSearch = "";
  activeSort = "chronological";
  expandedTaskId = null;
  highlightedRoutineDate = "";
  activeRoutineId = "";
  activeView = "workspace";
  selectedRoutineDate = getTodayDate();
  routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));

  if (priorityFilter) {
    priorityFilter.value = "all";
    syncPriorityFilterColor();
  }

  if (taskSearch) taskSearch.value = "";
  if (sortFilter) sortFilter.value = "chronological";
  if (selectedDate) selectedDate.value = getTodayDate();
  if (taskDate) taskDate.value = selectedDate.value;
}

function resetWorkspaceFilters() {
  activeCategory = "all";
  activePriority = "all";
  activeSearch = "";
  activeSort = "chronological";
  expandedTaskId = null;
  priorityFilter.value = "all";
  taskSearch.value = "";
  sortFilter.value = "chronological";
  syncPriorityFilterColor();
  renderDashboard();
}

function normalizeUser(user) {
  const tasks = normalizeTaskList(user.tasks || []);

  return {
    ...user,
    avatarImage: user.avatarImage || "",
    settings: {
      theme: "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
      collapsedFolders: {},
      ...(user.settings || {}),
    },
    tasks,
    folders: normalizeFolderList(user.folders || [], tasks),
  };
}

function normalizeFolderList(folders, tasks = []) {
  const taskIds = new Set((tasks || []).map((task) => task.id).filter(Boolean));
  const usedIds = new Set();

  return (folders || []).map((folder) => {
    const normalizedFolder = normalizeFolder(folder, taskIds);

    if (!usedIds.has(normalizedFolder.id)) {
      usedIds.add(normalizedFolder.id);
      return normalizedFolder;
    }

    const uniqueFolder = {
      ...normalizedFolder,
      id: createId(),
      createdAt: normalizedFolder.createdAt || new Date().toISOString(),
    };

    usedIds.add(uniqueFolder.id);
    return uniqueFolder;
  });
}

function normalizeFolder(folder, taskIds = new Set()) {
  const ids = Array.isArray(folder.taskIds) ? folder.taskIds : [];
  const uniqueTaskIds = Array.from(new Set(ids)).filter((id) => !taskIds.size || taskIds.has(id));

  return {
    id: folder.id || createId(),
    name: folder.name || "Nova pasta",
    color: folder.color || "#00b4d8",
    createdAt: folder.createdAt || new Date().toISOString(),
    taskIds: uniqueTaskIds,
  };
}

function normalizeTaskList(tasks) {
  const usedIds = new Set();

  return tasks.map((task) => {
    const normalizedTask = normalizeTask(task);

    if (!usedIds.has(normalizedTask.id)) {
      usedIds.add(normalizedTask.id);
      return normalizedTask;
    }

    const uniqueTask = {
      ...normalizedTask,
      id: createId(),
      createdAt: normalizedTask.createdAt || new Date().toISOString(),
    };

    usedIds.add(uniqueTask.id);
    return uniqueTask;
  });
}

function normalizeTask(task) {
  const status = task.status || (task.isCompleted ? "Concluída" : "Pendente");
  const tempo = task.tempo || task.etiqueta || "Deixar marcado";

  return {
    id: task.id || createId(),
    createdAt: task.createdAt || task.id || new Date().toISOString(),
    title: task.title || "Sem título",
    description: task.description || "",
    date: task.date || getTodayDate(),
    time: task.time || "09:00",
    categoryName: task.categoryName || "Geral",
    categoryColor: task.categoryColor || "#00b4d8",
    tempo,
    etiqueta: task.etiqueta || tempo,
    priority: task.priority || "Média",
    status,
    notes: task.notes || "",
    routineChecklist: task.routineChecklist || [],
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
  return formatIsoDate(new Date());
}

function formatDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  return `${day}/${month}/${year}`;
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStartOfWeek(date) {
  const result = new Date(date);
  const dayOffset = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - dayOffset);
  result.setHours(12, 0, 0, 0);
  return result;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(12, 0, 0, 0);
  return result;
}

function getRoutineWeekDates() {
  return Array.from({ length: 7 }, (_, index) => addDays(routineWeekStart, index));
}

function getRoutineMonthLabel(date) {
  const month = new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return `${month} ${String(date.getFullYear()).slice(-2)}`;
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
  sidebarThemeIcon.textContent = theme === "dark" ? "☾" : "☀";
  sidebarThemeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
  sidebarThemeToggle.dataset.tooltip = theme === "dark" ? "Tema claro" : "Tema escuro";
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

  currentDate.textContent = `Vamos organizar sua rotina hoje • ${formatter.format(new Date(`${selectedDate.value}T12:00:00`))}`;
}

function syncPriorityFilterColor() {
  priorityFilter.classList.remove("is-low", "is-medium", "is-high");

  if (priorityFilter.value === "Baixa") {
    priorityFilter.classList.add("is-low");
  }

  if (priorityFilter.value === "Média") {
    priorityFilter.classList.add("is-medium");
  }

  if (priorityFilter.value === "Alta") {
    priorityFilter.classList.add("is-high");
  }
}

function applySidebarState() {
  const user = getCurrentUser();
  const isCollapsed = Boolean(user?.settings.sidebarCollapsed);

  dashboardScreen.classList.toggle("is-sidebar-collapsed", isCollapsed);
  sidebarToggle.setAttribute("aria-pressed", String(isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral");
}

function syncCollapsedFoldersFromUser() {
  const user = getCurrentUser();
  const collapsedFolders = user?.settings.collapsedFolders || {};

  collapsedFolderIds.clear();
  Object.entries(collapsedFolders).forEach(([folderId, isCollapsed]) => {
    if (isCollapsed) collapsedFolderIds.add(folderId);
  });
}

function toggleSidebar() {
  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      sidebarCollapsed: !user.settings.sidebarCollapsed,
    },
  }));

  applySidebarState();
}

function renderUserAvatar(user) {
  sidebarAvatar.innerHTML = "";

  if (user?.avatarImage) {
    const image = document.createElement("img");
    image.src = user.avatarImage;
    image.alt = "";
    sidebarAvatar.append(image);
    return;
  }

  sidebarAvatar.textContent = user?.name ? getInitials(user.name) : "";
}

function sortTasks(tasks) {
  const priorityRanking = {
    alta: 0,
    alto: 0,
    media: 1,
    média: 1,
    medio: 1,
    médio: 1,
    baixa: 2,
    baixo: 2,
  };

  const normalizeText = (value) => String(value || "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const getPriorityRank = (priority) => priorityRanking[normalizeText(priority)] ?? 3;
  const getChronologicalValue = (task) => `${task.date || ""}T${task.time || "00:00"}`;
  const getAlphabeticalValue = (task) => normalizeText(task.title);
  const getCreationValue = (task) => `${task.createdAt || ""}-${task.id || ""}`;

  return [...tasks].sort((a, b) => {
    if (activeSort === "priority") {
      return getPriorityRank(a.priority) - getPriorityRank(b.priority)
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    if (activeSort === "alphabetical") {
      return getAlphabeticalValue(a).localeCompare(getAlphabeticalValue(b), "pt-BR")
        || getChronologicalValue(a).localeCompare(getChronologicalValue(b))
        || getCreationValue(a).localeCompare(getCreationValue(b));
    }

    return getChronologicalValue(a).localeCompare(getChronologicalValue(b))
      || getCreationValue(a).localeCompare(getCreationValue(b));
  });
}

function sortFolderTasks(tasks) {
  const priorityRanking = {
    alta: 0,
    alto: 0,
    media: 1,
    média: 1,
    medio: 1,
    médio: 1,
    baixa: 2,
    baixo: 2,
  };
  const normalizeText = (value) => String(value || "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const getPriorityRank = (priority) => priorityRanking[normalizeText(priority)] ?? 3;

  return [...tasks].sort((a, b) => (
    `${a.date || ""}T${a.time || "00:00"}`.localeCompare(`${b.date || ""}T${b.time || "00:00"}`)
      || getPriorityRank(a.priority) - getPriorityRank(b.priority)
      || `${a.createdAt || ""}-${a.id || ""}`.localeCompare(`${b.createdAt || ""}-${b.id || ""}`)
  ));
}

function isGeneralCategory(name) {
  return String(name || "").trim().toLocaleLowerCase("pt-BR") === "geral";
}

function taskMatchesActiveFilters(task) {
  return (activeCategory === "all" || task.categoryName === activeCategory)
    && (activePriority === "all" || task.priority === activePriority)
    && task.title.toLowerCase().includes(activeSearch);
}

function getVisibleTasks() {
  const user = getCurrentUser();
  const tasks = user?.tasks || [];

  const filteredTasks = tasks.filter(taskMatchesActiveFilters);

  return sortTasks(filteredTasks);
}

function getFolderTasks(folder, options = {}) {
  const user = getCurrentUser();
  const taskMap = new Map((user?.tasks || []).map((task) => [task.id, task]));
  const tasks = (folder.taskIds || [])
    .map((taskId) => taskMap.get(taskId))
    .filter(Boolean);

  return sortFolderTasks(options.applyFilters ? tasks.filter(taskMatchesActiveFilters) : tasks);
}

function getVisibleFolders() {
  const user = getCurrentUser();
  const folders = user?.folders || [];

  if (activeCategory === "all" && activePriority === "all" && !activeSearch) {
    return folders;
  }

  return folders.filter((folder) => {
    const matchesName = folder.name.toLowerCase().includes(activeSearch);
    const hasMatchingTask = getFolderTasks(folder, { applyFilters: true }).length > 0;
    return matchesName || hasMatchingTask;
  });
}

function getFolderedTaskIds(user = getCurrentUser()) {
  return new Set((user?.folders || []).flatMap((folder) => folder.taskIds || []));
}

function getUnfolderedTasks() {
  const folderedTaskIds = getFolderedTaskIds();
  return getVisibleTasks().filter((task) => !folderedTaskIds.has(task.id));
}

function updateProgress() {
  const user = getCurrentUser();
  const tasks = user?.tasks || [];
  const folders = user?.folders || [];
  const total = tasks.length;
  const completed = tasks.filter((task) => task.isCompleted).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressLabel.textContent = `${completed}/${total} Concluídas - ${percent}%`;
  taskCounter.textContent = `${total} ${total === 1 ? "tarefa" : "tarefas"} no total`;
  progressFill.style.width = `${percent}%`;
  statTotal.textContent = String(total);
  statCompleted.textContent = String(completed);
  statProgress.textContent = `${percent}%`;
  statFolders.textContent = String(folders.length);
  statProgressRing.style.setProperty("--progress-value", `${percent}%`);
}

function renderCategoryFilters() {
  const user = getCurrentUser();
  const folders = user?.folders || [];
  const categories = Array.from(
    new Map((user?.tasks || [])
      .filter((task) => !isGeneralCategory(task.categoryName))
      .map((task) => [task.categoryName, task.categoryColor])),
  );

  categoryList.innerHTML = [
    `<button class="category-filter ${activeCategory === "all" ? "is-active" : ""}" type="button" data-category="all" data-tooltip="Todas">
      <span class="category-dot" style="--dot-color: #a0aec0"></span>
      Todas
    </button>`,
    folders.length ? `<span class="sidebar-inline-label">Pastas</span>` : "",
    ...folders.map((folder) => {
      const tasks = getFolderTasks(folder);
      const isOpen = activeSidebarFolderId === folder.id;
      return `
        <div class="sidebar-folder-group">
          <button class="category-filter sidebar-folder-filter ${isOpen ? "is-active" : ""}" type="button" data-sidebar-folder="${folder.id}" data-tooltip="${escapeHtml(folder.name)}">
            <span class="nav-icon" aria-hidden="true">▣</span>
            <span class="sidebar-folder-name">${escapeHtml(folder.name)}</span>
            <span class="sidebar-folder-count">${tasks.length}</span>
          </button>
          <div class="sidebar-folder-popover" ${isOpen ? "" : "hidden"}>
            ${
              tasks.length
                ? tasks.map((task) => `
                  <button type="button" data-sidebar-task="${task.id}">
                    <span aria-hidden="true">→</span>
                    ${escapeHtml(task.title)}
                  </button>
                `).join("")
                : `<span class="sidebar-folder-empty">Sem cartões</span>`
            }
          </div>
        </div>
      `;
    }),
    categories.length ? `<span class="sidebar-inline-label">Categorias</span>` : "",
    ...categories.map(([name, color]) => `
      <button class="category-filter ${activeCategory === name ? "is-active" : ""}" type="button" data-category="${encodeURIComponent(name)}" data-tooltip="${escapeHtml(name)}">
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
        <span>Tempo</span>
        <select name="tempo">
          ${tempoOptions.map((option) => `
            <option value="${escapeHtml(option)}" ${task.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
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

function getTaskFolderId(taskId) {
  const user = getCurrentUser();
  return user?.folders.find((folder) => folder.taskIds.includes(taskId))?.id || "";
}

function renderFolderOptions(selectedFolderId = "") {
  const user = getCurrentUser();
  return [
    `<option value="" ${selectedFolderId ? "" : "selected"}>Nenhuma pasta</option>`,
    ...(user?.folders || []).map((folder) => `
      <option value="${folder.id}" ${selectedFolderId === folder.id ? "selected" : ""}>${escapeHtml(folder.name)}</option>
    `),
  ].join("");
}

function renderTaskEditorForm(task) {
  const folderId = getTaskFolderId(task.id);
  const holidayText = getHolidayText(task.date);

  return `
    <form class="task-editor-form" data-edit-form="${task.id}">
      <section class="editor-section editor-section-wide">
        <div class="editor-section-title">
          <span>Informações</span>
          <small>${escapeHtml(holidayText)}</small>
        </div>
        <label>
          <span>Título</span>
          <input type="text" name="title" value="${escapeHtml(task.title)}" required>
        </label>
        <label>
          <span>Descrição</span>
          <textarea name="description" rows="4">${escapeHtml(task.description)}</textarea>
        </label>
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>Data e horário</span>
        </div>
        <label>
          <span>Data</span>
          <input type="date" name="date" value="${task.date}" required>
        </label>
        <label>
          <span>Horário</span>
          <input type="time" name="time" value="${task.time}" required>
        </label>
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>Organização</span>
        </div>
        <label>
          <span>Categoria</span>
          <input type="text" name="categoryName" value="${escapeHtml(task.categoryName)}">
        </label>
        <label>
          <span>Pasta</span>
          <select name="folderId">${renderFolderOptions(folderId)}</select>
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
      </section>

      <section class="editor-section">
        <div class="editor-section-title">
          <span>Personalização</span>
        </div>
        <label>
          <span>Cor</span>
          <input class="color-input" type="color" name="categoryColor" value="${task.categoryColor}">
        </label>
        <label>
          <span>Tempo</span>
          <select name="tempo">
            ${tempoOptions.map((option) => `
              <option value="${escapeHtml(option)}" ${task.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
            `).join("")}
          </select>
        </label>
      </section>

      <section class="editor-section editor-section-wide">
        <div class="editor-section-title">
          <span>Observações</span>
        </div>
        <label>
          <span>Anotações</span>
          <textarea name="notes" rows="5">${escapeHtml(task.notes)}</textarea>
        </label>
      </section>

      <div class="task-editor-actions">
        <button class="task-delete-button" type="button" data-delete-task="${task.id}">Excluir cartão</button>
        <button class="task-save-button" type="submit">Salvar alterações</button>
      </div>
    </form>
  `;
}

function openTaskEditor(taskId) {
  const task = getCurrentUser()?.tasks.find((item) => item.id === taskId);
  if (!task) return;

  expandedTaskId = taskId;
  taskEditorTitle.textContent = task.title;
  taskEditorMeta.textContent = `${formatDate(task.date)} • ${task.time} • ${task.priority} • ${task.status}`;
  taskEditorContent.innerHTML = renderTaskEditorForm(task);
  taskEditorModal.hidden = false;
}

function closeTaskEditor() {
  taskEditorModal.hidden = true;
  taskEditorContent.innerHTML = "";
}

function renderTimeline() {
  const looseTasks = getUnfolderedTasks();
  const visibleFolders = getVisibleFolders();
  filterLabel.textContent = activeCategory === "all" ? "Todas as categorias" : activeCategory;

  const createCard = `
    <button class="create-ghost-card" type="button" data-open-create-choice>
      <span aria-hidden="true">+</span>
      <strong>Criar novo</strong>
      <small>Cartão ou pasta</small>
    </button>
  `;
  const looseColumn = looseTasks.length
    ? renderBoardColumn({
      id: "unfiled",
      title: "Cartões",
      color: "#8b8fa3",
      tasks: looseTasks,
    })
    : "";
  const folderColumns = visibleFolders.map((folder) => renderFolderColumn(folder)).join("");

  timelineList.innerHTML = `
    <div class="workspace-board">
      ${looseColumn}
      ${folderColumns}
      <section class="board-column board-create-column">
        ${createCard}
      </section>
    </div>
  `;

  updateProgress();
}

function renderTaskCard(task) {
  const completedClass = task.isCompleted ? " is-completed" : "";
  const expandedClass = expandedTaskId === task.id ? " is-expanded" : "";
  const checkedMark = task.isCompleted ? "✓" : "";
  const holidayText = getHolidayText(task.date);

  return `
    <article class="task-card board-task-card${completedClass}${expandedClass}" style="--category-color: ${task.categoryColor}" data-card-id="${task.id}" data-task-drag-id="${task.id}" draggable="true">
      <div class="task-card-summary">
        <button class="task-check-button" type="button" data-task-id="${task.id}" aria-label="Alternar conclusão">
          ${checkedMark}
        </button>
        <div class="task-body">
          <span class="task-time">${task.time}</span>
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          <p class="task-date">${formatDate(task.date)}</p>
          <p class="task-description">${escapeHtml(task.description)}</p>
          <p class="task-etiqueta">${escapeHtml(task.tempo)} • ${escapeHtml(task.priority)} • ${escapeHtml(task.status)}</p>
          <p class="task-holiday">${escapeHtml(holidayText)}</p>
          ${task.notes ? `<p class="task-description">${escapeHtml(task.notes)}</p>` : ""}
        </div>
        <div class="task-meta">
          <span class="task-badge">${escapeHtml(task.categoryName)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderBoardColumn({ id, title, color, tasks, actions = "" }) {
  return `
    <section class="board-column" id="board-column-${id}" style="--folder-color: ${color}" data-folder-drop-id="${id}">
      <header class="board-column-header">
        <div>
          <span class="folder-icon" aria-hidden="true">▣</span>
          <strong>${escapeHtml(title)}</strong>
          <small>${tasks.length}</small>
        </div>
      </header>
      <div class="board-card-stack">
        ${
          tasks.length
            ? tasks.map(renderTaskCard).join("")
            : `<div class="board-empty-drop">Arraste cartões para cá</div>`
        }
      </div>
      ${actions ? `<div class="board-column-actions">${actions}</div>` : ""}
    </section>
  `;
}

function renderFolderColumn(folder) {
  const tasks = getFolderTasks(folder, { applyFilters: true });
  const isCollapsed = collapsedFolderIds.has(folder.id);
  return `
    <section class="board-column${isCollapsed ? " is-collapsed" : ""}" id="board-column-${folder.id}" style="--folder-color: ${folder.color}" data-folder-drop-id="${folder.id}">
      <header class="board-column-header">
        <button class="board-column-title" type="button" data-toggle-folder="${folder.id}" aria-expanded="${String(!isCollapsed)}">
          <span class="folder-toggle-icon" aria-hidden="true">${isCollapsed ? "▸" : "▾"}</span>
          <span class="folder-icon" aria-hidden="true">▣</span>
          <strong>${escapeHtml(folder.name)}</strong>
          <small>${tasks.length}</small>
        </button>
        <div class="folder-actions" aria-label="Ações da pasta">
          <button type="button" data-rename-folder="${folder.id}">Renomear</button>
          <button type="button" data-delete-folder="${folder.id}">Excluir</button>
        </div>
      </header>
      <div class="board-card-stack">
        ${
          tasks.length
            ? tasks.map(renderTaskCard).join("")
            : `<div class="board-empty-drop">Solte cartões nesta pasta</div>`
        }
      </div>
      <button class="board-add-card" type="button" data-add-card-folder="${folder.id}">+ Adicionar cartão</button>
    </section>
  `;
}

function renderDashboard() {
  renderCategoryFilters();
  renderTimeline();
}

function setActiveSidebarView(view) {
  activeView = view;
  workspaceMenu.classList.toggle("is-active", view === "workspace");
  routinesMenu.classList.toggle("is-active", view === "routines");
  dailyHeader.hidden = view !== "workspace";
  dailyTimeline.hidden = view !== "workspace";
  routinesView.hidden = view !== "routines";
  openTaskModal.hidden = true;
}

function showWorkspaceView() {
  setActiveSidebarView("workspace");
  closeRoutineDetail();
  routineCalendarPanel.hidden = true;
  renderDashboard();
}

function showRoutinesView() {
  setActiveSidebarView("routines");
  renderRoutineWeek();
  renderRoutineCalendar();
}

function getRoutinesByDate(dateValue) {
  return getUserRoutineItems().filter((routine) => routine.date === dateValue);
}

function getRoutineColor(routine) {
  return routine.categoryColor || "#14b8a6";
}

function getUserRoutineItems() {
  const user = getCurrentUser();
  return (user?.tasks || []).map((task) => ({
    id: task.id,
    date: task.date,
    type: task.status || "Pendente",
    time: task.time || "09:00",
    title: task.title,
    category: task.categoryName || "Geral",
    categoryColor: task.categoryColor || "#00b4d8",
    location: task.description || "Sem descrição",
    responsible: task.notes || task.priority || "Sem observação",
    priority: task.priority || "Média",
    status: task.status || "Pendente",
    description: task.description || "",
    notes: task.notes || "",
    checklist: task.routineChecklist.length ? task.routineChecklist : [
      `Prioridade: ${task.priority || "Média"}`,
      `Status: ${task.status || "Pendente"}`,
      `Tempo: ${task.tempo || "Deixar marcado"}`,
    ],
    tempo: task.tempo || "Deixar marcado",
    icon: "□",
  }));
}

function renderRoutineWeek() {
  const weekDates = getRoutineWeekDates();
  routineMonthLabel.textContent = getRoutineMonthLabel(routineWeekStart);

  routineDayTabs.innerHTML = weekDates
    .map((date) => {
      const dateValue = formatIsoDate(date);
      const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).slice(0, 1).toUpperCase();
      const selectedClass = selectedRoutineDate === dateValue ? " is-selected" : "";
      return `
        <button class="routine-day-tab${selectedClass}" type="button" data-routine-date="${dateValue}">
          ${weekday} ${date.getDate()}
        </button>
      `;
    })
    .join("");

  routineWeekGrid.innerHTML = weekDates
    .map((date) => {
      const dateValue = formatIsoDate(date);
      const routines = getRoutinesByDate(dateValue);
      const firstRoutine = routines[0];
      const color = firstRoutine ? getRoutineColor(firstRoutine) : "#cbd5e1";
      const hasRoutineClass = routines.length ? " has-routine" : "";
      const highlightClass = highlightedRoutineDate === dateValue ? " is-highlighted" : "";
      const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);

      return `
        <article class="routine-day-card${hasRoutineClass}${highlightClass}" id="routine-day-${dateValue}" style="--routine-color: ${color}">
          <div class="routine-day-heading">
            <span>${weekday}</span>
            <strong>${formatDate(dateValue)}</strong>
          </div>
          ${
            routines.length
              ? routines.map(renderRoutineCard).join("")
              : `<div class="routine-empty">Nenhuma rotina marcada para este dia.</div>`
          }
        </article>
      `;
    })
    .join("");
}

function renderRoutineCard(routine) {
  return `
    <button class="routine-item-card" type="button" data-routine-id="${routine.id}" style="--routine-color: ${getRoutineColor(routine)}">
      <div class="routine-item-top">
        <span>${escapeHtml(routine.type)}</span>
        <span class="routine-item-icon" aria-hidden="true">${escapeHtml(routine.icon)}</span>
      </div>
      <span class="routine-item-time">${escapeHtml(routine.time)}</span>
      <h3 class="routine-item-title">${escapeHtml(routine.title)}</h3>
      <p>${escapeHtml(routine.location)}</p>
      <p>${escapeHtml(routine.responsible)}</p>
      <p>${escapeHtml(routine.tempo)}</p>
    </button>
  `;
}

function renderRoutineCalendar() {
  const year = routineWeekStart.getFullYear();
  const monthNames = Array.from({ length: 12 }, (_, index) => (
    new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(new Date(year, index, 1)).replace(".", "")
  ));

  routineMonthGrid.innerHTML = monthNames
    .map((monthName, monthIndex) => {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const firstDay = new Date(year, monthIndex, 1).getDay();
      const blanks = Array.from({ length: firstDay }, () => `<span class="routine-mini-day" aria-hidden="true"></span>`).join("");
      const days = Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const dateValue = formatIsoDate(new Date(year, monthIndex, dayIndex + 1, 12));
        const routines = getRoutinesByDate(dateValue);
        const holidayName = getHolidayName(dateValue);
        const routine = routines[0];
        const hasRoutineClass = routines.length ? " has-routine" : "";
        const holidayClass = holidayName ? " has-holiday" : "";
        const multipleClass = routines.length > 1 || (routines.length && holidayName) ? " has-multiple" : "";
        const color = routine ? getRoutineColor(routine) : "#f59e0b";
        const isMarked = routines.length || holidayName;
        const disabled = isMarked ? "" : "disabled";
        const labelParts = [
          formatDate(dateValue),
          routines.length ? `${routines.length} evento${routines.length > 1 ? "s" : ""}` : "",
          holidayName ? `Feriado: ${holidayName}` : "",
        ].filter(Boolean);

        return `
          <button class="routine-mini-day${hasRoutineClass}${holidayClass}${multipleClass}" type="button" data-calendar-date="${dateValue}" data-calendar-marked="${isMarked ? "true" : "false"}" aria-describedby="${isMarked ? "routine-calendar-tooltip" : ""}" aria-label="${escapeHtml(labelParts.join(". "))}" style="--routine-color: ${color}" ${disabled}>
            ${dayIndex + 1}
          </button>
        `;
      }).join("");

      return `
        <section class="routine-month-card">
          <h3>${monthName}</h3>
          <div class="routine-mini-days">${blanks}${days}</div>
        </section>
      `;
    })
    .join("");
}

function renderCalendarTooltipContent(dateValue) {
  const routines = getRoutinesByDate(dateValue);
  const holidayName = getHolidayName(dateValue);
  const visibleRoutines = routines.slice(0, 3);
  const extraCount = Math.max(routines.length - visibleRoutines.length, 0);

  return `
    <div class="calendar-tooltip-heading">
      <span>${formatDate(dateValue)}</span>
      ${holidayName ? `<strong>Feriado: ${escapeHtml(holidayName)}</strong>` : ""}
    </div>
    <div class="calendar-tooltip-list">
      ${
        visibleRoutines.length
          ? visibleRoutines.map((routine) => `
            <div class="calendar-tooltip-item" style="--routine-color: ${getRoutineColor(routine)}">
              <span class="calendar-tooltip-color" aria-hidden="true"></span>
              <div>
                <time>${escapeHtml(routine.time)}</time>
                <strong>${escapeHtml(routine.title)}</strong>
                <small>${escapeHtml(routine.priority || "Média")} prioridade • ${escapeHtml(routine.status || "Pendente")}</small>
              </div>
            </div>
          `).join("")
          : `<div class="calendar-tooltip-empty">Nenhum evento cadastrado.</div>`
      }
      ${extraCount ? `<div class="calendar-tooltip-more">+${extraCount} eventos</div>` : ""}
    </div>
  `;
}

function positionCalendarTooltip(target) {
  const targetRect = target.getBoundingClientRect();
  const tooltipRect = routineCalendarTooltip.getBoundingClientRect();
  const gap = 12;
  const viewportPadding = 12;
  let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
  let top = targetRect.top - tooltipRect.height - gap;

  if (left < viewportPadding) left = viewportPadding;
  if (left + tooltipRect.width > window.innerWidth - viewportPadding) {
    left = window.innerWidth - tooltipRect.width - viewportPadding;
  }

  if (top < viewportPadding) {
    top = targetRect.bottom + gap;
  }

  routineCalendarTooltip.style.left = `${left}px`;
  routineCalendarTooltip.style.top = `${top}px`;
}

function showCalendarTooltip(target) {
  const dateValue = target?.dataset.calendarDate;
  if (!dateValue || target.dataset.calendarMarked !== "true") return;

  routineCalendarTooltip.innerHTML = renderCalendarTooltipContent(dateValue);
  routineCalendarTooltip.hidden = false;
  routineCalendarTooltip.classList.remove("is-visible");
  positionCalendarTooltip(target);

  window.requestAnimationFrame(() => {
    routineCalendarTooltip.classList.add("is-visible");
  });
}

function hideCalendarTooltip() {
  routineCalendarTooltip.classList.remove("is-visible");
  window.setTimeout(() => {
    if (!routineCalendarTooltip.classList.contains("is-visible")) {
      routineCalendarTooltip.hidden = true;
      routineCalendarTooltip.innerHTML = "";
    }
  }, 180);
}

function goToRoutineDate(dateValue) {
  selectedRoutineDate = dateValue;
  highlightedRoutineDate = dateValue;
  routineWeekStart = getStartOfWeek(new Date(`${dateValue}T12:00:00`));
  routineCalendarPanel.hidden = true;
  renderRoutineWeek();

  document.getElementById(`routine-day-${dateValue}`)?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

  window.setTimeout(() => {
    highlightedRoutineDate = "";
    renderRoutineWeek();
  }, 1400);
}

function openRoutineDetail(routineId) {
  const routine = getUserRoutineItems().find((item) => item.id === routineId);
  if (!routine) return;

  activeRoutineId = routineId;
  routineDetailType.textContent = routine.type;
  routineDetailTitle.textContent = routine.title;
  routineDetailContent.innerHTML = `
    <div class="routine-detail-list">
      ${renderRoutineDetailRow("Data", formatDate(routine.date))}
      ${renderRoutineDetailRow("Horário", routine.time)}
      ${renderRoutineDetailRow("Categoria", routine.category)}
      ${renderRoutineDetailRow("Tipo", routine.type)}
      ${renderRoutineDetailRow("Tempo", routine.tempo)}
      ${renderRoutineDetailRow("Descrição", routine.description)}
      ${renderRoutineDetailRow("Local", routine.location)}
      ${renderRoutineDetailRow("Observações", routine.notes)}
      <div class="routine-detail-row">
        <span>Checklist</span>
        <ul class="routine-checklist">
          ${routine.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="routine-detail-actions">
      <button class="routine-edit-button" type="button" data-routine-edit="${routine.id}">Editar</button>
      <button class="routine-delete-button" type="button" data-routine-delete="${routine.id}">Excluir</button>
    </div>
  `;
  routineDetailPanel.hidden = false;
}

function renderRoutineDetailRow(label, value) {
  return `
    <div class="routine-detail-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function closeRoutineDetail() {
  routineDetailPanel.hidden = true;
  activeRoutineId = "";
}

function openRoutineEdit(routineId) {
  const routine = getUserRoutineItems().find((item) => item.id === routineId);
  if (!routine) return;

  routineDetailType.textContent = "Editar";
  routineDetailTitle.textContent = "Editar rotina";
  routineDetailContent.innerHTML = `
    <form class="routine-edit-form" data-routine-edit-form="${routine.id}">
      <label>
        <span>Título</span>
        <input name="title" type="text" value="${escapeHtml(routine.title)}" required>
      </label>
      <label>
        <span>Data</span>
        <input name="date" type="date" value="${escapeHtml(routine.date)}" required>
      </label>
      <label>
        <span>Horário</span>
        <input name="time" type="text" value="${escapeHtml(routine.time)}" required>
      </label>
      <label>
        <span>Categoria</span>
        <input name="category" type="text" value="${escapeHtml(routine.category)}">
      </label>
      <label>
        <span>Tipo</span>
        <select name="status">
          ${["Pendente", "Em andamento", "Concluída"].map((status) => `
            <option value="${escapeHtml(status)}" ${routine.type === status ? "selected" : ""}>${escapeHtml(status)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Tempo</span>
        <select name="tempo">
          ${tempoOptions.map((option) => `
            <option value="${escapeHtml(option)}" ${routine.tempo === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>
      <label>
        <span>Descrição</span>
        <textarea name="description">${escapeHtml(routine.description)}</textarea>
      </label>
      <label>
        <span>Local</span>
        <input name="location" type="text" value="${escapeHtml(routine.location)}">
      </label>
      <label>
        <span>Observações</span>
        <textarea name="notes">${escapeHtml(routine.notes)}</textarea>
      </label>
      <label>
        <span>Checklist</span>
        <textarea name="checklist">${escapeHtml(routine.checklist.join("\n"))}</textarea>
      </label>
      <div class="routine-edit-actions">
        <button class="task-save-button" type="submit">Salvar alterações</button>
        <button class="routine-cancel-button" type="button" data-routine-cancel-edit="${routine.id}">Cancelar</button>
      </div>
    </form>
  `;
}

function saveRoutineEdit(form) {
  const formData = new FormData(form);
  const routineId = form.dataset.routineEditForm;

  if (!confirmAction()) return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== routineId) return task;
      const tempo = formData.get("tempo");

      return normalizeTask({
        ...task,
        title: formData.get("title").trim(),
        date: formData.get("date"),
        time: formData.get("time").trim(),
        categoryName: formData.get("category").trim(),
        status: formData.get("status"),
        tempo,
        etiqueta: tempo,
        description: formData.get("description").trim(),
        notes: formData.get("notes").trim(),
        routineChecklist: formData.get("checklist")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      });
    }),
  }));

  selectedRoutineDate = formData.get("date");
  routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));

  renderRoutineWeek();
  renderRoutineCalendar();
  renderDashboard();
  openRoutineDetail(routineId);
}

function showDashboard() {
  const user = getCurrentUser();
  authScreen.hidden = true;
  dashboardScreen.hidden = false;
  dashboardUserName.textContent = user?.name || "Usuário";
  dailyTitle.textContent = `Olá, ${user?.name || "Usuário"}!`;
  renderUserAvatar(user);
  setCurrentDate();
  applyTheme();
  applySidebarState();
  syncCollapsedFoldersFromUser();
  setActiveSidebarView(activeView);
  if (activeView === "routines") {
    renderRoutineWeek();
    renderRoutineCalendar();
  } else {
    renderDashboard();
  }
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

function openCreateChoice() {
  createChoiceModal.hidden = false;
}

function closeCreateChoice() {
  createChoiceModal.hidden = true;
}

function openModal(targetFolderId = "") {
  pendingTargetFolderId = targetFolderId;
  taskForm.reset();
  taskCategoryColor.value = "#00b4d8";
  taskTempo.value = "Deixar marcado";
  taskPriority.value = "Média";
  taskStatus.value = "Pendente";
  taskModal.hidden = false;
  taskDate.value = getTodayDate();
  taskTitle.focus();
}

function closeModal() {
  taskModal.hidden = true;
  pendingTargetFolderId = "";
  taskForm.reset();
  taskCategoryColor.value = "#00b4d8";
  taskTempo.value = "Deixar marcado";
  taskPriority.value = "Média";
  taskStatus.value = "Pendente";
}

function openFolderModal() {
  folderForm.reset();
  folderColor.value = "#00b4d8";
  folderModal.hidden = false;
  folderName.focus();
}

function closeFolderDialog() {
  folderModal.hidden = true;
  folderForm.reset();
  folderColor.value = "#00b4d8";
}

function closeFolderView() {
  folderViewModal.hidden = true;
  activeFolderId = "";
}

function createFolder() {
  if (!confirmAction()) return;

  const folder = normalizeFolder({
    id: createId(),
    name: folderName.value.trim(),
    color: folderColor.value,
    createdAt: new Date().toISOString(),
    taskIds: [],
  });

  updateCurrentUser((user) => ({
    ...user,
    folders: [...user.folders, folder],
  }));

  closeFolderDialog();
  renderDashboard();
}

function createTask() {
  if (isCreatingTask) return;

  isCreatingTask = true;

  try {
    if (!confirmAction()) return;

    const newTask = normalizeTask({
      id: createId(),
      createdAt: new Date().toISOString(),
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      date: taskDate.value,
      time: taskTime.value,
      categoryName: taskCategoryName.value.trim(),
      categoryColor: taskCategoryColor.value,
      tempo: taskTempo.value,
      etiqueta: taskTempo.value,
      priority: taskPriority.value,
      status: taskStatus.value,
      notes: taskNotes.value.trim(),
      isCompleted: taskStatus.value === "Concluída",
    });

    const targetFolderId = pendingTargetFolderId;

    updateCurrentUser((user) => ({
      ...user,
      tasks: [...user.tasks, newTask],
      folders: targetFolderId
        ? user.folders.map((folder) => (
          folder.id === targetFolderId
            ? { ...folder, taskIds: [...folder.taskIds.filter((id) => id !== newTask.id), newTask.id] }
            : folder
        ))
        : user.folders,
    }));

    activeCategory = "all";
    activePriority = "all";
    activeSearch = "";
    priorityFilter.value = "all";
    taskSearch.value = "";
    syncPriorityFilterColor();
    pendingTargetFolderId = "";
    closeModal();
    renderDashboard();
    renderRoutineWeek();
    renderRoutineCalendar();
  } finally {
    pendingTargetFolderId = "";
    isCreatingTask = false;
  }
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
  let updatedTask = null;

  if (!confirmAction()) return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.map((task) => {
      if (task.id !== taskId) return task;
      const status = formData.get("status");
      updatedTask = normalizeTask({
        ...task,
        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        date: formData.get("date"),
        time: formData.get("time"),
        categoryName: formData.get("categoryName").trim(),
        categoryColor: formData.get("categoryColor"),
        tempo: formData.get("tempo"),
        etiqueta: formData.get("tempo"),
        priority: formData.get("priority"),
        status,
        notes: formData.get("notes").trim(),
        isCompleted: status === "Concluída",
      });
      return updatedTask;
    }),
    folders: formData.has("folderId")
      ? user.folders.map((folder) => {
        const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);
        const selectedFolderId = formData.get("folderId");

        if (folder.id !== selectedFolderId) {
          return {
            ...folder,
            taskIds: nextTaskIds,
          };
        }

        return {
          ...folder,
          taskIds: [...nextTaskIds, taskId],
        };
      })
      : user.folders,
  }));

  if (updatedTask) {
    activeCategory = "all";
    activePriority = "all";
    activeSearch = "";
    priorityFilter.value = "all";
    taskSearch.value = "";
    syncPriorityFilterColor();
  }

  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
  if (!taskEditorModal.hidden) openTaskEditor(taskId);
}

function deleteTask(taskId) {
  if (!confirmAction()) return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.filter((task) => task.id !== taskId),
    folders: user.folders.map((folder) => ({
      ...folder,
      taskIds: folder.taskIds.filter((id) => id !== taskId),
    })),
  }));

  if (expandedTaskId === taskId) expandedTaskId = null;
  if (activeRoutineId === taskId) closeRoutineDetail();
  if (!taskEditorModal.hidden) closeTaskEditor();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
}

function moveTaskToFolder(taskId, folderId) {
  updateCurrentUser((user) => ({
    ...user,
    folders: user.folders.map((folder) => {
      const nextTaskIds = folder.taskIds.filter((id) => id !== taskId);

      if (folderId === "unfiled") {
        return {
          ...folder,
          taskIds: nextTaskIds,
        };
      }

      if (folder.id !== folderId) {
        return {
          ...folder,
          taskIds: nextTaskIds,
        };
      }

      return {
        ...folder,
        taskIds: [...nextTaskIds, taskId],
      };
    }),
  }));

  renderDashboard();
  if (activeFolderId) openFolderView(activeFolderId);
}

function focusBoardColumn(folderId) {
  const column = document.getElementById(`board-column-${folderId}`);
  column?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function toggleFolderCollapse(folderId) {
  const shouldCollapse = !collapsedFolderIds.has(folderId);

  if (shouldCollapse) collapsedFolderIds.add(folderId);
  else collapsedFolderIds.delete(folderId);

  updateCurrentUser((user) => ({
    ...user,
    settings: {
      ...user.settings,
      collapsedFolders: {
        ...(user.settings.collapsedFolders || {}),
        [folderId]: shouldCollapse,
      },
    },
  }));

  renderDashboard();
  focusBoardColumn(folderId);
}

function removeTaskFromFolder(taskId, folderId) {
  updateCurrentUser((user) => ({
    ...user,
    folders: user.folders.map((folder) => (
      folder.id === folderId
        ? { ...folder, taskIds: folder.taskIds.filter((id) => id !== taskId) }
        : folder
    )),
  }));

  renderDashboard();
  openFolderView(folderId);
}

function renameFolder(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  if (!folder) return;

  const nextName = prompt("Novo nome da pasta", folder.name);
  if (!nextName?.trim()) return;
  if (!confirmAction()) return;

  updateCurrentUser((currentUser) => ({
    ...currentUser,
    folders: currentUser.folders.map((item) => (
      item.id === folderId ? { ...item, name: nextName.trim() } : item
    )),
  }));

  renderDashboard();
  if (activeFolderId === folderId) openFolderView(folderId);
}

function deleteFolder(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  const taskIdsToDelete = new Set(folder?.taskIds || []);
  const { [folderId]: removedCollapsedFolder, ...nextCollapsedFolders } = user?.settings.collapsedFolders || {};

  if (!confirm("Tem certeza que deseja excluir esta pasta?")) return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: user.tasks.filter((task) => !taskIdsToDelete.has(task.id)),
    folders: user.folders.filter((folder) => folder.id !== folderId),
    settings: {
      ...user.settings,
      collapsedFolders: nextCollapsedFolders,
    },
  }));

  collapsedFolderIds.delete(folderId);
  if (activeFolderId === folderId) closeFolderView();
  if (taskIdsToDelete.has(expandedTaskId)) {
    expandedTaskId = null;
    closeTaskEditor();
  }
  if (taskIdsToDelete.has(activeRoutineId)) closeRoutineDetail();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
}

function openFolderView(folderId) {
  const user = getCurrentUser();
  const folder = user?.folders.find((item) => item.id === folderId);
  if (!folder) return;

  activeFolderId = folderId;
  const tasks = getFolderTasks(folder);
  folderViewTitle.textContent = folder.name;
  folderViewContent.innerHTML = `
    <div class="folder-view-summary" style="--folder-color: ${folder.color}">
      <span class="folder-icon" aria-hidden="true">▣</span>
      <strong>${tasks.length} ${tasks.length === 1 ? "cartão acumulado" : "cartões acumulados"}</strong>
    </div>
    <div class="folder-view-actions">
      <button type="button" class="routine-edit-button" data-rename-folder="${folder.id}">Renomear</button>
      <button type="button" class="routine-delete-button" data-delete-folder="${folder.id}">Excluir pasta</button>
    </div>
    <div class="folder-task-list">
      ${
        tasks.length
          ? tasks.map((task) => `
            <article class="folder-task-row" style="--category-color: ${task.categoryColor}" data-folder-view-card="${task.id}">
              <div>
                <span>${escapeHtml(task.time)} • ${formatDate(task.date)}</span>
                <strong>${escapeHtml(task.title)}</strong>
                <small>${escapeHtml(task.priority)} • ${escapeHtml(task.status)}</small>
              </div>
              <button type="button" data-remove-folder-task="${task.id}" data-folder-id="${folder.id}">Remover da pasta</button>
            </article>
          `).join("")
          : `<div class="empty-state">Nenhum cartão dentro desta pasta.</div>`
      }
    </div>
  `;
  folderViewModal.hidden = false;
}

function createAccount() {
  const email = signupEmail.value.trim().toLowerCase();
  const exists = appState.users.some((user) => user.email === email);

  if (exists) {
    setFeedback("Este email já está cadastrado.");
    return;
  }

  const user = {
    id: createId(),
    name: signupName.value.trim(),
    email,
    password: signupPassword.value,
    settings: {
      theme: "dark",
      defaultViewDate: "today",
      notificationsEnabled: true,
      sidebarCollapsed: false,
    },
    avatarImage: "",
    tasks: [],
    folders: [],
  };

  appState.users = [...appState.users, user];
  appState.currentUserId = user.id;
  saveAppState();
  resetSessionViewState();
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
  resetSessionViewState();
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
  pendingAvatarImage = "";
  settingsAvatar.value = "";
  settingsModal.hidden = false;
  settingsName.focus();
}

function closeSettings() {
  settingsModal.hidden = true;
  settingsForm.reset();
  pendingAvatarImage = "";
  resetPasswordVisibility(settingsPassword);
}

async function saveSettings() {
  const email = settingsEmail.value.trim().toLowerCase();
  const currentUser = getCurrentUser();
  const duplicate = appState.users.some(
    (user) => user.email === email && user.id !== appState.currentUserId,
  );

  if (duplicate) {
    setFeedback("Este email já pertence a outro usuário.");
    return;
  }

  if (!confirmAction()) return;

  const selectedAvatarFile = settingsAvatar.files?.[0];
  const loadedAvatarImage = selectedAvatarFile ? await readAvatarFile(selectedAvatarFile) : "";
  const avatarImage = selectedAvatarFile
    ? loadedAvatarImage || currentUser?.avatarImage || ""
    : pendingAvatarImage || currentUser?.avatarImage || "";

  updateCurrentUser((user) => ({
    ...user,
    name: settingsName.value.trim(),
    email,
    password: settingsPassword.value || user.password,
    avatarImage,
    settings: {
      ...user.settings,
      theme: settingsTheme.value,
      notificationsEnabled: settingsNotifications.checked,
    },
  }));

  closeSettings();
  showDashboard();
}

function handleAvatarSelection() {
  const file = settingsAvatar.files?.[0];
  if (!file) {
    pendingAvatarImage = "";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    pendingAvatarImage = String(reader.result || "");
  });
  reader.readAsDataURL(file);
}

function readAvatarFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => resolve(""));
    reader.readAsDataURL(file);
  });
}

function clearCurrentUserTasks() {
  if (!confirmAction()) return;

  updateCurrentUser((user) => ({
    ...user,
    tasks: [],
    folders: user.folders.map((folder) => ({ ...folder, taskIds: [] })),
  }));
  closeSettings();
  closeRoutineDetail();
  closeFolderView();
  renderDashboard();
  renderRoutineWeek();
  renderRoutineCalendar();
}

function confirmLogout() {
  if (confirmAction()) {
    showLogin();
  }
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

  dashboardLogout.addEventListener("click", confirmLogout);
  themeToggle.addEventListener("click", toggleTheme);
  sidebarThemeToggle.addEventListener("click", toggleTheme);
  resetFilters.addEventListener("click", resetWorkspaceFilters);
  sidebarToggle.addEventListener("click", toggleSidebar);
  workspaceMenu.addEventListener("click", showWorkspaceView);
  routinesMenu.addEventListener("click", showRoutinesView);
  sidebarUserTrigger.addEventListener("click", openSettings);
  closeSettingsModal.addEventListener("click", closeSettings);
  clearUserTasks.addEventListener("click", clearCurrentUserTasks);
  settingsAvatar.addEventListener("change", handleAvatarSelection);
  settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettings();
  });

  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) closeSettings();
  });
  closeTaskEditorModal.addEventListener("click", closeTaskEditor);
  taskEditorModal.addEventListener("click", (event) => {
    if (event.target === taskEditorModal) closeTaskEditor();
  });
  taskEditorContent.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-task]");
    if (!deleteButton) return;
    deleteTask(deleteButton.dataset.deleteTask);
  });
  taskEditorContent.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form]");
    if (!form) return;
    event.preventDefault();
    updateTask(form);
  });

  openTaskModal.addEventListener("click", openModal);
  closeCreateChoiceModal.addEventListener("click", closeCreateChoice);
  cancelCreateChoice.addEventListener("click", closeCreateChoice);
  createChoiceModal.addEventListener("click", (event) => {
    if (event.target === createChoiceModal) closeCreateChoice();
  });
  createCardOption.addEventListener("click", () => {
    closeCreateChoice();
    openModal();
  });
  createFolderOption.addEventListener("click", () => {
    closeCreateChoice();
    openFolderModal();
  });
  closeFolderModal.addEventListener("click", closeFolderDialog);
  folderModal.addEventListener("click", (event) => {
    if (event.target === folderModal) closeFolderDialog();
  });
  folderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    createFolder();
  });
  closeFolderViewModal.addEventListener("click", closeFolderView);
  folderViewModal.addEventListener("click", (event) => {
    if (event.target === folderViewModal) closeFolderView();
  });
  folderViewContent.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-folder-task]");
    const renameButton = event.target.closest("[data-rename-folder]");
    const deleteButton = event.target.closest("[data-delete-folder]");
    const folderViewCard = event.target.closest("[data-folder-view-card]");

    if (removeButton) {
      removeTaskFromFolder(removeButton.dataset.removeFolderTask, removeButton.dataset.folderId);
      return;
    }

    if (renameButton) {
      renameFolder(renameButton.dataset.renameFolder);
      return;
    }

    if (deleteButton) {
      deleteFolder(deleteButton.dataset.deleteFolder);
      return;
    }

    if (folderViewCard) {
      closeFolderView();
      openTaskEditor(folderViewCard.dataset.folderViewCard);
    }
  });
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

  priorityFilter.addEventListener("change", () => {
    activePriority = priorityFilter.value;
    syncPriorityFilterColor();
    expandedTaskId = null;
    renderDashboard();
  });

  taskSearch.addEventListener("input", () => {
    activeSearch = taskSearch.value.trim().toLowerCase();
    expandedTaskId = null;
    renderDashboard();
  });

  sortFilter.addEventListener("change", () => {
    activeSort = sortFilter.value;
    expandedTaskId = null;
    renderDashboard();
  });

  routinePrevWeek.addEventListener("click", () => {
    routineWeekStart = addDays(routineWeekStart, -7);
    selectedRoutineDate = formatIsoDate(routineWeekStart);
    renderRoutineWeek();
    renderRoutineCalendar();
  });

  routineNextWeek.addEventListener("click", () => {
    routineWeekStart = addDays(routineWeekStart, 7);
    selectedRoutineDate = formatIsoDate(routineWeekStart);
    renderRoutineWeek();
    renderRoutineCalendar();
  });

  routineToday.addEventListener("click", () => {
    selectedRoutineDate = getTodayDate();
    routineWeekStart = getStartOfWeek(new Date(`${selectedRoutineDate}T12:00:00`));
    renderRoutineWeek();
    renderRoutineCalendar();
  });

  routineCalendarToggle.addEventListener("click", () => {
    routineCalendarPanel.hidden = !routineCalendarPanel.hidden;
    hideCalendarTooltip();
    if (!routineCalendarPanel.hidden) renderRoutineCalendar();
  });

  routineCalendarClose.addEventListener("click", () => {
    hideCalendarTooltip();
    routineCalendarPanel.hidden = true;
  });

  routineDayTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-routine-date]");
    if (!button) return;
    selectedRoutineDate = button.dataset.routineDate;
    renderRoutineWeek();
  });

  routineWeekGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-routine-id]");
    if (!card) return;
    openRoutineDetail(card.dataset.routineId);
  });

  routineMonthGrid.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    if (Date.now() < suppressCalendarClickUntil) return;
    if (!getRoutinesByDate(dayButton.dataset.calendarDate).length) return;
    goToRoutineDate(dayButton.dataset.calendarDate);
  });

  routineMonthGrid.addEventListener("mouseover", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    showCalendarTooltip(dayButton);
  });

  routineMonthGrid.addEventListener("mouseout", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton || dayButton.contains(event.relatedTarget)) return;
    hideCalendarTooltip();
  });

  routineMonthGrid.addEventListener("focusin", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    showCalendarTooltip(dayButton);
  });

  routineMonthGrid.addEventListener("focusout", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton) return;
    hideCalendarTooltip();
  });

  routineMonthGrid.addEventListener("touchstart", (event) => {
    const dayButton = event.target.closest("[data-calendar-date]");
    if (!dayButton || dayButton.dataset.calendarMarked !== "true") return;
    event.preventDefault();
    suppressCalendarClickUntil = Date.now() + 450;
    showCalendarTooltip(dayButton);
  }, { passive: false });

  document.addEventListener("pointerdown", (event) => {
    if (
      routineCalendarTooltip.hidden
      || routineCalendarTooltip.contains(event.target)
      || event.target.closest("[data-calendar-date]")
    ) {
      return;
    }

    hideCalendarTooltip();
  });

  window.addEventListener("resize", hideCalendarTooltip);
  window.addEventListener("scroll", hideCalendarTooltip, true);

  routineDetailClose.addEventListener("click", closeRoutineDetail);
  routineDetailContent.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-routine-edit]");
    const deleteButton = event.target.closest("[data-routine-delete]");
    const cancelButton = event.target.closest("[data-routine-cancel-edit]");

    if (editButton) {
      openRoutineEdit(editButton.dataset.routineEdit);
      return;
    }

    if (deleteButton) {
      deleteTask(deleteButton.dataset.routineDelete);
      return;
    }

    if (cancelButton) {
      openRoutineDetail(cancelButton.dataset.routineCancelEdit);
    }
  });

  routineDetailContent.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-routine-edit-form]");
    if (!form) return;
    event.preventDefault();
    saveRoutineEdit(form);
  });

  timelineList.addEventListener("click", (event) => {
    const createButton = event.target.closest("[data-open-create-choice]");
    const addCardFolderButton = event.target.closest("[data-add-card-folder]");
    const toggleFolderButton = event.target.closest("[data-toggle-folder]");
    const openFolderButton = event.target.closest("[data-open-folder]");
    const renameFolderButton = event.target.closest("[data-rename-folder]");
    const deleteFolderButton = event.target.closest("[data-delete-folder]");
    const checkButton = event.target.closest("[data-task-id]");
    const deleteButton = event.target.closest("[data-delete-task]");
    const card = event.target.closest("[data-card-id]");
    const interactive = event.target.closest("input, button, textarea, select, label");

    if (addCardFolderButton) {
      openModal(addCardFolderButton.dataset.addCardFolder);
      return;
    }
    if (toggleFolderButton) {
      toggleFolderCollapse(toggleFolderButton.dataset.toggleFolder);
      return;
    }
    if (createButton) {
      pendingTargetFolderId = "";
      openCreateChoice();
      return;
    }
    if (openFolderButton) {
      openFolderView(openFolderButton.dataset.openFolder);
      return;
    }
    if (renameFolderButton) {
      renameFolder(renameFolderButton.dataset.renameFolder);
      return;
    }
    if (deleteFolderButton) {
      deleteFolder(deleteFolderButton.dataset.deleteFolder);
      return;
    }
    if (checkButton) {
      toggleTask(checkButton.dataset.taskId);
      return;
    }
    if (deleteButton) {
      deleteTask(deleteButton.dataset.deleteTask);
      return;
    }
    if (card && !interactive) {
      openTaskEditor(card.dataset.cardId);
    }
  });

  timelineList.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-task-drag-id]");
    if (!card) return;
    event.dataTransfer.setData("text/plain", card.dataset.taskDragId);
    event.dataTransfer.effectAllowed = "move";
  });

  timelineList.addEventListener("dragover", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder) return;
    event.preventDefault();
    folder.classList.add("is-drag-over");
    if (folder.classList.contains("is-collapsed")) {
      folder.classList.add("is-drag-preview");
    }
  });

  timelineList.addEventListener("dragleave", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder || folder.contains(event.relatedTarget)) return;
    folder.classList.remove("is-drag-over");
    folder.classList.remove("is-drag-preview");
  });

  timelineList.addEventListener("drop", (event) => {
    const folder = event.target.closest("[data-folder-drop-id]");
    if (!folder) return;
    event.preventDefault();
    folder.classList.remove("is-drag-over");
    folder.classList.remove("is-drag-preview");
    const taskId = event.dataTransfer.getData("text/plain");
    if (taskId) moveTaskToFolder(taskId, folder.dataset.folderDropId);
  });

  timelineList.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-edit-form]");
    if (!form) return;
    event.preventDefault();
    updateTask(form);
  });

  categoryList.addEventListener("click", (event) => {
    const folderButton = event.target.closest("[data-sidebar-folder]");
    const sidebarTaskButton = event.target.closest("[data-sidebar-task]");
    if (sidebarTaskButton) {
      openTaskEditor(sidebarTaskButton.dataset.sidebarTask);
      expandedTaskId = sidebarTaskButton.dataset.sidebarTask;
      activeSidebarFolderId = "";
      renderDashboard();
      document.querySelector(`[data-card-id="${expandedTaskId}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      return;
    }
    if (folderButton) {
      activeSidebarFolderId = activeSidebarFolderId === folderButton.dataset.sidebarFolder
        ? ""
        : folderButton.dataset.sidebarFolder;
      renderCategoryFilters();
      focusBoardColumn(folderButton.dataset.sidebarFolder);
      return;
    }

    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category === "all" ? "all" : decodeURIComponent(button.dataset.category);
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
  syncPriorityFilterColor();
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
