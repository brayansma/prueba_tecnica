<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Crear Producto</div>
        <div class="card-body">
          <form @submit.prevent="guardarProductos">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input type="text" id="nombre" v-model="nombre_producto" class="form-control" maxlength="50" placeholder="Nombre" required>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span> 
              <input type="number" id="precio" v-model="precio_producto" class="form-control" placeholder="Precio" step="0.01" required>
            </div>
            <div class="d-grid col-6 mx-auto">
              <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { show_alerta, enviarSolicitud } from '@/funciones';

export default {
  data() {
    return {
      apiUrl: this.$apiBaseUrl,  // Asegúrate de que esta variable esté definida en tu configuración global
      modulo: 'Productos',
      nombre_producto: '',
      precio_producto: '',
    }
  },
  methods: {
    guardarProductos() {
      // Valida los campos antes de enviar la solicitud
      if (!this.nombre_producto.trim()) {
        show_alerta('Escribe el Nombre', 'warning', 'nombre');
        return;
      }
      if (!this.precio_producto.toString().trim()) {
        show_alerta('Ingresa el Precio', 'warning', 'precio');
        return;
      }

      let parametros = {
        nombre: this.nombre_producto.trim(),
        precio: this.precio_producto.toString().trim()
      };
      
      enviarSolicitud('POST', parametros, this.apiUrl + this.modulo, `${this.modulo} Guardado`)
        .then(res => {
          //console.log(res);
          if (res && (res.status === 204 || res.status === 201)) {
            this.nombre_producto = '';
            this.precio_producto = '';
          }
        })
        .catch(err => {
          console.error('Error en la solicitud:', err);
        });
    }
  }
};
</script>
