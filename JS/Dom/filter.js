import { getSavedTasks } from "../storage.js";
import { renderTaskBodyTable, removeDataTable } from "./table.js";

const cntd_options = document.getElementById("cntd_options");
const taskTableBody = document.getElementById("taskTableBody");

export let typeList;

export function renderRadioFiltro() {
    removeDataTable(cntd_options);
  
    const div = document.createElement("div");
    div.innerHTML = `
          <button class="btn btn_back">
              <span>&#10157;<span>
          </button>
          <div class="item_option">
              <input type="radio" name="state" value="filtrado" id="radio_filtr" checked>
              <label for="radio_filtr">Filtrado</label>
          </div>
      `;
  
    const btn_back = div.querySelector(".btn_back");
    btn_back.addEventListener("click", () => {
      location.reload();
    });
  
    cntd_options.appendChild(div);
}

export function loadTypeList(value) {
    typeList = value;
    switch (value) {
      case "radio_todas":
        taskList();
        break;
  
      case "radio_comple":
        listCompletedTask();
        break;
  
      case "radio_pendi":
        listTaskpending();
        break;
    }
}

export function taskList() {
    const savedTasks = getSavedTasks();
  
    removeDataTable(taskTableBody);
    renderTaskBodyTable(savedTasks, taskTableBody);
}
  
export function listCompletedTask() {
    const savedTasks = getSavedTasks();
    const completedTask = savedTasks.filter((task) => task.estado === true);
  
    removeDataTable(taskTableBody);
    renderTaskBodyTable(completedTask, taskTableBody);
}
  
export function listTaskpending() {
    const savedTasks = getSavedTasks();
    const completedPending = savedTasks.filter((task) => task.estado === false);
  
    removeDataTable(taskTableBody);
    renderTaskBodyTable(completedPending, taskTableBody);
}