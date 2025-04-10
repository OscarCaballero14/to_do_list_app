const input_task = document.getElementById("input_task");
const text_task = document.getElementById("text_task");
const searchBox = document.querySelector(".search-box");
const searchText = document.getElementById("searchText");

export const clearFields = () => {
    input_task.value = "";
    text_task.value = "";
};

export const AddClassSearch = () => {
    searchBox.classList.add("search-box_full");
    searchText.classList.add("search-text_focus");
};

export const removeClassError = () => {
    input_task.classList.remove("error_input");
    text_task.classList.remove("error_input");
};

export const clickOutsideSearch = (event) => {
    if (!searchBox.contains(event.target)) {
      searchBox.classList.remove("search-box_full");
      searchText.classList.remove("search-text_focus");
    }
};