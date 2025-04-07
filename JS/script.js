import { Task } from "./Task.js";
import { setSavedTasks, getSavedTasks } from "./storage.js";
import { generateId, modalError, expressions } from "./utils.js";
import { 
  clearFields, removeClassError, clickOutsideSearch, 
  AddClassSearch
} from "./Dom/form.js";
import { search } from "./Dom/search.js";
import { loadTypeList } from "./Dom/filter.js";

const searchText = document.getElementById("searchText");
const searchBtn = document.getElementById("searchBtn");
const input_task = document.getElementById("input_task");
const text_task = document.getElementById("text_task");
const submit = document.getElementById("submit");
const radio_pendi = document.getElementById("radio_pendi");

function addNewTask() {
  const name = input_task.value.trim();
  const desc = text_task.value.trim();

  const result = validationForm(name, desc);
  if (!result) {
    return;
  }

  const newTask = new Task(generateId(), name, desc, false);

  const savedTasks = getSavedTasks();
  savedTasks.push(newTask);
  setSavedTasks(savedTasks);

  clearFields();
  removeClassError();
  loadTypeList("radio_pendi");
  radio_pendi.checked = true;
}

function validationForm(name, desc) {
  if (name === "" || desc === "") {
    if (name === "") {
      input_task.classList.add("error_input");
    }
    if (desc === "") {
      text_task.classList.add("error_input");
    }
    modalError("Debes completar todos los campos");
    return;
  }

  if (!expressions.nameTask.test(name) || !expressions.descTask.test(desc)) {
    if (!expressions.nameTask.test(name)) {
      modalError("Solo se permiten letras, guiones y guion bajo. Longitud: 4-40 caracteres para el nombre");
      input_task.classList.add("error_input");
    }
    if (!expressions.descTask.test(desc)) {
      modalError("Solo se permiten letras, guiones y guion bajo. Longitud: 5-1500 caracteres para la descripción");
      text_task.classList.add("error_input");
    }
    return;
  }

  return true;
}

loadTypeList("radio_todas");

document.addEventListener("click", (event) => {
  clickOutsideSearch(event);
});

document.querySelectorAll('input[name="state"]').forEach((radio) => {
  radio.addEventListener("click", function () {
    loadTypeList(this.id);
  });
});

searchText.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (searchText.value.trim() === "") {
            modalError("Campo vacio");
            return;
        }
        search();
    }
});

searchText.addEventListener("click", AddClassSearch);

searchBtn.addEventListener("click", search);

submit.addEventListener("click", addNewTask);
