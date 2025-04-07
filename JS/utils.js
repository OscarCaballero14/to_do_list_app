export const generateId = () => 
    Math.random().toString(36).substring(2, 18);

export const expressions = {
    nameTask: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{4,40}$/,
    descTask: /^[a-zA-ZÀ-ÿ0-9\s_\-.,()¿?¡!:;"']{5,1500}$/,
    searchTe: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{4,16}$/
};

export const modalError = (text) =>{
    Swal.fire({
        icon: "error",
        title: "Error",
        text: text,
        showConfirmButton: true,
    });
}

export const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
};