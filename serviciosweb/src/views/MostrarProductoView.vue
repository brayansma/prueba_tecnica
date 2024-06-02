
<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="contenido">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {  
        data() {
            return {
                productos: null
            }
        },
        mounted() {
            this.getProductos();
        },
        methods: {
             getProductos() {
                axios.get('http://localhost:5165/api/Productos').then(
                    response => {
                        this.productos = response.data;
                    }
                );
                
            }  
        }
}
</script>