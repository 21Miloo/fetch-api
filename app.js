document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#searchInput"); // Seleccionamos el input del HTML.
  const userList = document.querySelector("#users"); //Seleccionamos la lista de Usuarios

  let users = []; // Creamos un Array "users" donde se guardaran la info de la api.

  window.addEventListener("DOMContentLoaded", async () => { // 
    userList.innerHTML = "<h1> Loading... </h1>"; // Agreguemos a la lista un h1 "loading".

    const data = await loadUsers();  // Guardamos en "data" los datos enviados por la api.
    console.log(data.data); //Mostramos la data recibida por consola!
    users = data.data; // le asignamos la data recibida, al array que creamos antes. "users"

    renderUsers(users); // le pasamos el array "users" a la funcion renderUsers().
  });

  // La siguiente funcion guarda en una constante "response" la informacion que devuelve la api, usando el metodo "fetch" capturamos esos datos y los retornamos en formato json.
  async function loadUsers() {
    const response = await fetch(
      "https://fakerapi.it/api/v1/users?_quantity=1000"
    );
    return await response.json();
  }

  
  input.addEventListener("keyup", (e) => {
    console.log(input.value);// Le asignamos una escucha al input para poder que cuando lo seleccionen, se imprima por consola el valor que están digitando.

  // Creamos una constante "searchedUser" que guarda los usuarios comparados del array "users" con el input.value que digita el usuario. algo asi como:   searchedUser = users === input.value
    const searchedUser = users.filter((user) =>` ${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase()));
    renderUsers(searchedUser); // Le pasamos searchedUser a la funcion renderUsers().
  });

  
  const createUserItems = (users) =>
    users.map((user) => `<li class="bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer" >${user.firstname} 
    ${user.lastname}</li>`).join("");

 
  function renderUsers(users) {
    const itemsStrings = createUserItems(users);
    userList.innerHTML = itemsStrings; // Agregamos a la userList los itemsString Guardados!
  }
});

//Documentacion funcion createUserItems()---------------------------------------------------------------------------

// createUserItems(users: Array<Object>): string
// Esta función toma un array de objetos de usuarios como parámetro y devuelve una cadena HTML que representa una lista de elementos de usuario.

// Parámetros:
// users (Array de objetos): Un array que contiene objetos de usuarios, donde cada objeto tiene propiedades como firstname y lastname.
// Devolución:
// string: Una cadena HTML que representa una lista de usuarios.
// Descripción:
// Esta función utiliza el método map para iterar sobre cada objeto de usuario en el array users. Para cada usuario, crea un elemento de lista <li> con la clase de estilo especificada. La información del usuario (nombre y apellido) se agrega a este elemento de lista. Luego, utiliza el método join para combinar todos los elementos de la lista en una sola cadena HTML.

// Documentacion funcion renderUsers()------------------------------------------------------------------------------

// renderUsers(users: Array<Object>): void
// Esta función actualiza la interfaz de usuario con la lista de usuarios proporcionada.

// Parámetros:
// users (Array de objetos): Un array que contiene objetos de usuarios, donde cada objeto tiene propiedades como firstname y lastname.
// Devolución:
// void: Esta función no devuelve nada.
// Descripción:
// La función renderUsers utiliza createUserItems(users) para obtener la cadena HTML que representa la lista de usuarios. Luego, asigna esa cadena HTML a la propiedad innerHTML del elemento HTML con el id users. En resumen, esta función actualiza la interfaz de usuario con la lista de usuarios proporcionada.