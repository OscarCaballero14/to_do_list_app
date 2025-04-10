import { getSavedTasks } from "../storage.js";
import { normalizeText, modalError, expressions } from "../utils.js";
import { renderTaskBodyTable, removeDataTable, renderEmptyRow } from "./table.js";
import { renderRadioFiltro } from "./filter.js";

const searchText = document.getElementById("searchText");

export function search() {
  const result = validationSearch();
  if (!result) { return; }

  const savedTasks = getSavedTasks();
  const dato = normalizeText(searchText.value.trim().toLowerCase());

  const searchResults = savedTasks.filter((task) =>
    normalizeText(task.nombre).toLowerCase().includes(dato)
  );

  if (searchResults.length == 0) {
    removeDataTable(taskTableBody);
    renderEmptyRow();
    renderRadioFiltro();
    return;
  }

  removeDataTable(cntdEmptyRow);
  removeDataTable(taskTableBody);
  renderTaskBodyTable(searchResults, taskTableBody);
  renderRadioFiltro();
}

export function validationSearch(){
    if (searchText.value === "") {
        modalError("Campo vacio");
        return false;
    }
    
    if (!expressions.searchTe.test(searchText.value.trim())) {
        modalError("La longitud del parametro de busqueda es de 4-16 caracteres");
        return false;
    }

    return true;
}