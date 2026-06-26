class Tarea {
    constructor(id, titulo, completada) {
        this.id = id;
        this.titulo = titulo;
        this.completada = typeof completada === "boolean" ? completada : false;
    }
    toggleEstado() {
        this.completada = !this.completada;
    }
}

class GestorTareas {
    constructor(tareasIniciales = []) {
        this.tareas = tareasIniciales;
        this.id = tareasIniciales.length + 1;
    }
    agregarTarea(titulo) {
        const id = this.id++;
        const nuevaTarea = new Tarea(id, titulo);
        this.tareas.push(nuevaTarea);
    }
    listarTareas() {
        this.tareas.forEach(tarea => {
            const estado = tarea.completada ? "completada" : "no completada";
            console.log("Tarea con ID: " + tarea.id + ", nombre: " + tarea.titulo + ", está en estado: " + estado);
        })
    }
    buscarPorTitulo(titulo) {
        const busqueda = this.tareas.find(tarea => tarea.titulo === titulo);
        //console.log(busqueda);
        return busqueda;
    }
    listarCompletadas() {
        const completadas = this.tareas.filter(tarea => tarea.completada);
        //console.log(completadas);
        return completadas;
    }
}


function cargarTareas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                new Tarea(1, "Tarea 1", true),
                new Tarea(2, "Tarea 2", false),
                new Tarea(3, "Tarea 3", true)
            ]);
        }, 2000);
    })
}

//No hace nada relevante, solo para el Extra opcional
function cargarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Usuario 5', 'Usuario 6']);
        }, 2000);
    })
}

async function main() {
    const [tareasIniciales, usuarios] = await Promise.all([
        cargarTareas(),
        cargarUsuarios()
    ]);
    const gestor = new GestorTareas(tareasIniciales);
    console.log("Tareas cargadas correctamente");
    gestor.listarTareas();
    gestor.agregarTarea("Tarea 4");
    console.log("Tarea agregada correctamente. Lista actualizada:");
    gestor.listarTareas();
    console.log("Tareas completadas:");
    gestor.listarCompletadas().forEach(tareaCompletada => {
        console.log("Tarea con ID: " + tareaCompletada.id + ", nombre: " + tareaCompletada.titulo);
    });

    const titulos = gestor.tareas.map(tarea => tarea.titulo);
    console.log("Títulos: " + titulos.join(", "));

    console.log("Usuarios Extra irrelevantes: " + usuarios.join(", "));
}

main();