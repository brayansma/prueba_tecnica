<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Editar Producto</div>
                <div class="card-body">
                    <form @submit.prevent="guardarProductos">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input type="text" id="nombre" v-model="nombre_producto" class="form-control" maxlength="50"
                                placeholder="Nombre" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                            <input type="number" id="precio" v-model="precio_producto" class="form-control"
                                placeholder="Precio" step="0.01" required>
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            apiUrl: this.$apiBaseUrl,  
            modulo: 'Productos',
            id: useRoute().params.id,
            nombre_producto: '',
            precio_producto: '',
        }
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url = this.apiUrl + this.modulo + '/' + this.id;
        this.getProductos();
    },
    methods: {
        getProductos() {
            axios.get(this.url).then(response => {
                if (response.status === 200) {
                    this.producto = response.data;
                    this.nombre_producto = this.producto.nombre;
                    this.precio_producto = this.producto.precio;
                } else {
                    if (response.request) {
                        let { status, statusText } = response.request;
                        show_alerta(`Error en la Solicitud <br> ${status} - ${statusText}`, 'error');
                    } else {
                        console.error(response);
                        throw response;
                    }
                }
            }).catch(err => {
                if (err.request) {
                    let { status, statusText } = err.request;
                    let { data } = err.response;
                    show_alerta(`${data}`, 'error');
                    console.log(`${data} <br> ${status} - ${statusText}`, 'error');
                } else {
                    console.error(err);
                    throw err;
                }
            })
        },

        guardarProductos() {
           
            if (!this.nombre_producto.trim()) {
                show_alerta('Escribe el Nombre', 'warning', 'nombre');
                return;
            }
            if (!this.precio_producto.toString().trim()) {
                show_alerta('Ingresa el Precio', 'warning', 'precio');
                return;
            }

            let parametros = {
                id: this.id,
                nombre: this.nombre_producto.trim(),
                precio: this.precio_producto.toString().trim()
            };

            enviarSolicitud('PUT', parametros, `${this.url}`, `Producto Actualizado`)
                .then(res => {
                    if (res && (res.status === 204 || res.status === 201)) {
                        this.nombre_producto = '';
                        this.precio_producto = '';
                        this.$router.push('/mostrar-producto');
                    }
                })
                .catch(err => {
                    console.error('Error en la solicitud:', err);
                });
        }
    }
};
</script>
