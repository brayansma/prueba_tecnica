<template>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="table-responsive">
          <DataTable
            :data="ordenes"
            :columns="columns"
            :options="{
                      responsive: true,
                      autoWidth: false,
                      dom: 'Bfrtip',
                      language: {
                        search: 'Buscar',
                        zeroRecords: 'No hay registros para mostrar',
                        info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                        infoFiltered: '(Filtrados de _MAX_ registros)',
                        paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Último' }
                      },
                      buttons: botones,
                    }"
            class="table table-striped table-bordered display"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Fecha Orden</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';
import { confirmar } from '@/funciones';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JsZip;

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(ButtonsHtml5);
DataTable.use(print);

export default defineComponent({
  components: { DataTable },
  data() {
    return {
      apiUrl: this.$apiBaseUrl,
      ordenes: [],
      productos: [],
      moduloOrdenes: 'Ordenes',
      moduloProductos: 'Productos',
      columns: [
        { data: null, render: (data, type, row, meta) => `${meta.row + 1}` },
        { data: 'productoNombre' }, // Cambiado a 'productoNombre'
        { data: 'cantidad' },
        { data: 'fechaOrden', render: (data) => this.formatDate(data) },
        {
          data: null,
          render: (data, type, row) => `
            <button class="btn btn-warning btn-sm edit-btn" data-id="${row.id}">
              <i class="fa-solid fa-edit"></i>
            </button>
            &nbsp;
            <button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}" data-nombre="${row.productoNombre}" data-producto-id="${row.productoId}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `,
        },
      ],
      botones: [
        {
          title: 'Reporte de Ordenes por Producto',
          extend: 'excelHtml5',
          text: '<i class="fa-solid fa-file-excel"></i> Excel',
          className: 'btn btn-success',
          exportOptions: {
            columns: [0, 1, 2]
          }
        },
        {
          title: 'Reporte de Ordenes por Producto',
          extend: 'pdfHtml5',
          text: '<i class="fa-solid fa-file-pdf"></i> PDF',
          className: 'btn btn-danger',
          exportOptions: {
            columns: [0, 1, 2]
          }
        },
        {
          title: 'Reporte de Ordenes por Producto',
          extend: 'print',
          text: '<i class="fa-solid fa-print"></i> Imprimir',
          className: 'btn btn-dark',
          exportOptions: {
            columns: [0, 1, 2]
          }
        },
        {
          title: 'Reporte de Ordenes por Producto',
          extend: 'copy',
          text: '<i class="fa-solid fa-copy"></i> Copiar',
          className: 'btn btn-light',
          exportOptions: {
            columns: [0, 1, 2]
          }
        },
      ],
    };
  },
  watch: {
    ordenes: {
      handler() {
        this.$nextTick(() => {
          document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (event) => {
              const id = event.target.closest('button').dataset.id;
              this.$router.push(`/editar-ordenes/${id}`);
            });
          });
          document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (event) => {
              const id = event.target.closest('button').dataset.id;
              const productoId = event.target.closest('button').dataset.productoId;
              const nombre = event.target.closest('button').dataset.nombre;
              this.eliminarProducto(id, nombre, productoId);
            });
          });
        });
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    await this.getProductos();
    await this.getOrdenes();
  },
  methods: {
    async getProductos() {
      try {
        const response = await axios.get(`${this.apiUrl}${this.moduloProductos}`);
        this.productos = response.data;
      } catch (err) {
        console.error(err);
      }
    },
    async getOrdenes() {
      try {
        const response = await axios.get(`${this.apiUrl}${this.moduloOrdenes}`);
        this.ordenes = await Promise.all(response.data.map(async orden => {
          const productoNombre = await this.getProductoNombre(orden.productoId);
          return { ...orden, productoNombre };
        }));
      } catch (err) {
        console.error(err);
      }
    },
    async getProductoNombre(productoId) {
      if (!this.productos.length) {
        await this.getProductos();
      }
      const producto = this.productos.find(p => p.id === productoId);
      return producto ? producto.nombre : 'Producto no encontrado';
    },
    eliminarProducto(id, nombre, productoId) {
      confirmar(id, `${productoId} - ${nombre}`, 'Ordenes')
        .then(() => {
          this.getOrdenes(); 
        })
        .catch(error => {
          console.log(`Error al eliminar la orden ${productoId} - ${nombre} con ID ${id}`);
          console.log(error);
        });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-CO');
    },
  },
});
</script>

<style>
@import 'datatables.net-bs5';
</style>

  