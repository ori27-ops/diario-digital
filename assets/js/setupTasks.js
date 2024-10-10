import { createTask, onGetTask, deleteTask, updateTask, getTask,} from "./firebase.js"
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");
const tasksContainer = document.querySelector("#tasks-container")

//Variables para la edición 
let editStatus = false
let editId ="";


export const setupTasks = () => {
    
   taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = taskForm["title"].value;
        const description = taskForm["description"].value;

        try {
            if (!editStatus) {
              // Crear tarea
              await createTask(title, description);
              // Mostrar mensaje de éxito
              showMessage("Tarea creada", "success");
              // Limpiar el formulario
            } else {
              // Actualizar tarea
              await updateTask(editId, { title, description });
              // Mostrar mensaje de éxito
              showMessage("Tarea actualizada", "success");
      
              // Cambiar el estado de edición
              editStatus = false;
              // Cambiar el id de edición
              editId = "";
      
              // Cambiamos lo que muestra el formulario
              document.getElementById("form-title").innerHTML =
                "Agregar una nueva tarea";
              taskForm["btn-agregar"].value = "Crear tarea";
            }
      
            taskForm.reset();
          } catch (error) {
            // Mostrar mensaje de error
            showMessage(error.code, "error");
          }
        });
        
    onGetTask((querySnapshot) => {
        let tasksHtml = "";

       querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        tasksHtml += `
      <article class="task-container border border-2 rounded-2 p-3 my-3">
        <header class="d-flex justify-content-between">
          <h4>${data.title}</h4>
          <div>
            <button class="btn btn-info btn-editar" data-id="${doc.id}"><i class="bi bi-pencil-fill"></i> Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id= "${doc.id}"><i class="bi bi-trash3-fill"></i> Eliminar</button>
          </div>
        </header>
        <hr />
        <p>${data.description}</p>
      </article>
      `;

       });
       tasksContainer.innerHTML = tasksHtml;
        
    //UPDATE 
       const btnsEditar = document.querySelectorAll(".btn-editar");

       btnsEditar.forEach((btn) => {
        btn.addEventListener("click", async ({target: { dataset} }) => {
            const doc = await getTask(dataset.id);

            const task = doc.data();

            taskForm["title"].value = task.title;
            taskForm["description"].value = task.description;

            editStatus = true;
            editId = doc.id;

            document.getElementById("form-title").innerHTML = "Editar tarea";
            taskForm["btn-agregar"].value = "Guardar cambios";
        })
       })
    //DELETE
    //obtenemos los botones de eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    //Iterar sobre botones
    btnsEliminar.forEach((btn) => {
        btn.addEventListener("click", ({ target: { dataset } }) => { 
        deleteTask(dataset.id);
        showMessage("tarea eliminada", "success");
        });
      });
    });
};

