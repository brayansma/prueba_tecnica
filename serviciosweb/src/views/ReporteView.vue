<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <DataTable 
                :data="productos"
                :columns="columns" 
                :options="
                {
                    responsive:true,
                    autoWidth:false,
                    dom:'Bfrtip',
                    language:{
                        search: 'Buscar',
                        zeroRecords: 'No hay registros para mostrar',
                        info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
                      infoFiltered: '(Filtrados de _MAX_ registros)',
                      paginate: {first: 'Primero', previous: 'Anterior'},
                    },
                    buttons: botones,
                }"
                class="table table-striped table-bordered display"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>BOTONES</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </div>
    </div>
</template>
<script>import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';
import { confirmar } from '@/funciones';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

window.JSZip = JsZip;
pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTableLib);
DataTable.use(Buttons);
DataTable.use(ButtonsHtml5);
DataTable.use(print);

export default defineComponent({
  components: { DataTable },
  data() {
    return {
      apiUrl: this.$apiBaseUrl,
      productos: [],
      modulo: 'Productos',
      columns: [
        {
          data: null, 
          render: (data, type, row, meta) => {
            return `${meta.row + 1}`;
          }
        },
        { data: 'nombre' },
        {
          data: null, 
          render: (data, type, row) => {
            return `$${new Intl.NumberFormat('es-CO').format(row.precio)}`;
          }
        },
        {
          data: null,
          render: (data, type, row) => {
            return `
              <button class="btn btn-warning btn-sm edit-btn" data-id="${row.id}">
                <i class="fa-solid fa-edit"></i>
              </button>
              &nbsp;
              <button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}" data-name="${row.nombre}">
                <i class="fa-solid fa-trash"></i>
              </button>
            `;
          }
        }
      ],
      botones: [
        {
            title: 'Reporte de Productos',
            extend: 'excelHtml5',
            text: '<i class="fa-solid fa-file-excel"></i> Excel',
            className: 'btn btn-success'
        },
        {
            title: 'Reporte de Productos',
            extend: 'pdfHtml5',
            text: '<i class="fa-solid fa-file-pdf"></i> PDF',
            className: 'btn btn-danger'
        },
        {
            title: 'Reporte de Productos',
            extend: 'print',
            text: '<i class="fa-solid fa-print"></i> Imprimir',
            className: 'btn btn-dark'
        },
        {
            title: 'Reporte de Productos',
            extend: 'copy',
            text: '<i class="fa-solid fa-copy"></i> Copiar',
            className: 'btn btn-light'
        },
        ],
      tableOptions: {
        responsive: true,
        autoWidth: false,
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        language: {
          search: 'Buscar',
          zeroRecords: 'No hay registros para mostrar',
          info: 'Mostrando del _START_ a _END_ de _TOTAL_ registros',
          infoFiltered: '(Filtrados de _MAX_ registros)',
          paginate: {
            first: 'Primero',
            previous: 'Anterior',
            next: 'Siguiente',
            last: 'Último'
          }
        }
      }
    };
  },
  mounted() {
    this.getProductos();
  },
  methods: {
    getProductos() {
      axios.get(`${this.apiUrl}${this.modulo}`).then(response => {
        this.productos = response.data;
        this.initButtons();
      });
    },
    eliminarProducto(id, nombre) {
      confirmar(id, nombre, 'el Producto')
        .then(() => {
          this.getProductos();  // Recargar la lista de productos después de la eliminación
        })
        .catch(error => {
          console.log(`Error al eliminar el producto ${nombre} con ID ${id}`);
          console.log(error);
        });
    },
    initButtons() {
      this.$nextTick(() => {
        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', (event) => {
            const id = event.target.closest('button').dataset.id;
            this.$router.push(`/editar-producto/${id}`);
          });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', (event) => {
            const id = event.target.closest('button').dataset.id;
            const name = event.target.closest('button').dataset.name;
            this.eliminarProducto(id, name);
          });
        });
      });
    }
  }
});

</script>
<style>
@import 'datatables.net-bs5';
</style>