import { getSavedTasks, setSavedTasks } from "../storage.js";
import { loadTypeList, typeList } from "./filter.js";
import { modalInfo } from "./../utils.js"

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
    Swal.fire({
        icon: "question",
        text: '¿Desea cambiar el estado de la tarea?',
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "Aceptar",
    }).then((result) => {
        if (result.isConfirmed) {
            const savedTasks = getSavedTasks();
            savedTasks.forEach((task) => {
                if (task.id === id) {
                    task.estado = !task.estado;
                }
            });
            localStorage.removeItem("savedTasks");
            setSavedTasks(savedTasks);
            loadTypeList(typeList);
            modalInfo("success", "Cambio realizado");
        } else if (result.isDenied) {
            modalInfo("info", "No hizo cambios");
        }
    });
}
  
export function deleteTask(id) {
     Swal.fire({
        icon: "question",
        text: '¿Desea eliminar la tarea?',
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "Aceptar",
    }).then((result) => {
        if (result.isConfirmed) {
            const savedTasks = getSavedTasks();
            const resultado = savedTasks.filter((item) => item.id !== id);
            localStorage.removeItem("savedTasks");
            setSavedTasks(resultado);
            if (resultado.length === 0) {
                emptyTaksList();
            }
            loadTypeList(typeList);
            modalInfo("success", "Tarea eliminada");
        } else if (result.isDenied) {
            modalInfo("info", "No hizo cambios");
        }
    });
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
