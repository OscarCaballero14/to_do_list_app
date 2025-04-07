export const setSavedTasks = (savedTasks) => 
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

export const getSavedTasks = () => 
    JSON.parse(localStorage.getItem("savedTasks")) || [];
