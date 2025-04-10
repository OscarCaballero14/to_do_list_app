import { getSavedTasks, setSavedTasks } from "../storage.js";
import { loadTypeList, typeList } from "./filter.js";

const cntdEmptyRow = document.getElementById("cntdEmptyRow");

export function renderTaskBodyTable(taskList, taskTableBody) {
    taskList.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <tr>
                  <td>${task.id}</td>
                  <td>${task.nombre}</td>
                  <td class="descTaskTd">
                      <div class="desc">${task.descripcion}</div>
                  </td>
                  <td>${task.estado === false ? "Pendiente" : "Completada"}</td>
                  <td>
                      <div class="cntd_btn">
                          <button class="btn change_state">
                              <span>${task.estado === false ? "⏳" : "✔️"}</span>
                          </button>
                          <button class="btn delete">
                              <span>🗑️</span>
                          </button>
                      </div>
                  </td>
              </tr>
          `;
  
      const changeStateBtn = row.querySelector(".change_state");
      changeStateBtn.addEventListener("click", () => changeState(task.id));
  
      const deleteBtn = row.querySelector(".delete");
      deleteBtn.addEventListener("click", () => deleteTask(task.id));
  
      taskTableBody.appendChild(row);
    });
}

export function changeState(id) {
    const savedTasks = getSavedTasks();
    savedTasks.forEach((task) => {
      if (task.id === id) {
        task.estado = !task.estado;
      }
    });
  
    localStorage.removeItem("savedTasks");
    setSavedTasks(savedTasks);
    loadTypeList(typeList);
}
  
export function deleteTask(id) {
    const savedTasks = getSavedTasks();
  
    const resultado = savedTasks.filter((item) => item.id !== id);
    localStorage.removeItem("savedTasks");
    setSavedTasks(resultado);
    if (resultado.length === 0) {
        emptyTaksList();
    }
    loadTypeList(typeList);
}

export const removeDataTable = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
};

export const renderEmptyRow = () => {
    removeDataTable(cntdEmptyRow);
    const div = document.createElement("div");
    div.innerHTML = `
        <span>
            No se encontraron tareas que coincidan con tu búsqueda
        </span>
    `;
    cntdEmptyRow.appendChild(div);
}

export const emptyTaksList = () => {
    removeDataTable(cntdEmptyRow);
    const div = document.createElement("div");
    div.innerHTML = `
        <span>
            No hay tareas registradas
        </span>
    `;
    cntdEmptyRow.appendChild(div);
}
