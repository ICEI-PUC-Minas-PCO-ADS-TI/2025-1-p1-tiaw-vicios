const daysContainer = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const modal = document.getElementById("eventModal");
const eventInput = document.getElementById("eventText");
const selectedDateDisplay = document.getElementById("selectedDate");

let currentDate = new Date();
let selectedDate = null;

let events = {}; // Armazena eventos em memória

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" });

  daysContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    const hasEvent = events[fullDate];

    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    if (isToday) dayDiv.classList.add("today");
    if (hasEvent) dayDiv.classList.add("has-event");

    dayDiv.addEventListener("click", () => openModal(fullDate));

    daysContainer.appendChild(dayDiv);
  }
}

function openModal(dateStr) {
  selectedDate = dateStr;
  selectedDateDisplay.textContent = `Eventos em ${dateStr}`;
  eventInput.value = events[dateStr] || "";
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  selectedDate = null;
}

function addEvent() {
  if (selectedDate && eventInput.value.trim()) {
    events[selectedDate] = eventInput.value.trim();
    closeModal();
    renderCalendar();
  }
}

function removeEvent() {
  if (selectedDate && events[selectedDate]) {
    delete events[selectedDate];
    closeModal();
    renderCalendar();
  }
}

document.getElementById("prev").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById("next").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
