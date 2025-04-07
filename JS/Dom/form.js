const searchBox = document.querySelector(".search-box");

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