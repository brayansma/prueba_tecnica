<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Editar Ordenes</div>
                <div class="card-body">
                    <form @submit.prevent="guardarOrdenes">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fab fa-product-hunt"></i></span>
                            <select id="productoId" v-model="productoId_orden" class="form-select" required>
                                <option disabled value="">Seleccione un producto</option>
                                <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                                    {{ producto.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fas fa-sort-numeric-up-alt"></i></span>
                            <input type="number" id="cantidad" v-model="cantidad_orden" class="form-control" placeholder="Cantidad" step="0.01" required>
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
            modulo: 'Ordenes',
            moduloProductos: 'Productos',
            id: useRoute().params.id,
            productoId_orden: '',
            cantidad_orden: '',
            productos: []
        }
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url = this.apiUrl + this.modulo + '/' + this.id;
        this.getOrdenes();
        this.getProductos();
    },
    methods: {
        getOrdenes() {
            axios.get(this.url).then(response => {
                if (response.status === 200) {
                    this.orden = response.data;
                    this.productoId_orden = this.orden.productoId;
                    this.cantidad_orden = this.orden.cantidad;
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
        getProductos() {
            axios.get(`${this.apiUrl}${this.moduloProductos}`).then(response => {
                this.productos = response.data;
            }).catch(err => {
                console.error(err);
            });
        },
        guardarOrdenes() {
            // Valida los campos antes de enviar la solicitud
            if (!this.productoId_orden) {
                show_alerta('Seleccione un producto', 'warning', 'productoId');
                return;
            }
            if (!this.cantidad_orden.toString().trim()) {
                show_alerta('Ingresa la cantidad', 'warning', 'cantidad');
                return;
            }

            let parametros = {
                id: this.id,
                productoId: this.productoId_orden,
                cantidad: this.cantidad_orden.toString().trim()
            };

            enviarSolicitud('PUT', parametros, `${this.url}`, `Producto Actualizado`)
                .then(res => {
                    if (res && (res.status === 204 || res.status === 201)) {
                        this.productoId_orden = '';
                        this.cantidad_orden = '';
                        this.$router.push('/mostrar-ordenes');
                    }
                })
                .catch(err => {
                    console.error('Error en la solicitud:', err);
                });
        }
    }
};
</script>
