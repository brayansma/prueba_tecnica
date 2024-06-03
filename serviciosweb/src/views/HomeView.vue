<template>
   <div class="container mt-5">
        <h2 class="text-center">Prueba Técnica - Desarrollador Semisenior (Backend) <br> Linktic S.A.S</h2>
        
        <h4 class="text-center text-bg-primary">Realizado por: Brahyan Steven Marquez</h4>
        <div class="text-center">
        <h3>Anexo de Diagramas</h3>
        <hr>
        <h4>Diagrama Nube</h4>
        <img class="img-fluid" width="600px" src="../assets/diagramaAmazonNube.png" alt="" srcset="">
        <br>
        <h4>Diagrama Local</h4>
        <img class="img-fluid"  src="../assets/diagramaLocal.png" alt="" srcset="">
      </div>
        <hr>
        <h4>Creación del Proyecto</h4>

        <h4>ServiciosAPI - Creación del API</h4>
        <h4>Ajustar el contenido de las conexiones</h4>
        
        <p><strong>Crea el Proyecto</strong></p>
        <pre><code>dotnet new webapi -n ServiciosAPI</code></pre>
        
        <p><strong>Ingresa al Proyecto</strong></p>
        <pre><code>cd ServiciosAPI</code></pre>
        
        <p><strong>Instalaciones para .NET</strong></p>
        <pre><code>dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef</code></pre>
        
        <p><strong>Instalación de PostgreSQL para la conexión</strong></p>
        <pre><code>dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL</code></pre>
        
        <p><strong>Creación de Script y Migración a la BD</strong></p>
        <pre><code>dotnet ef migrations add InitialCreate
dotnet ef database update</code></pre>
        
        <p><strong>Cambiar la conexión a la BD PostgreSQL</strong></p>
        <pre><code>"DefaultConnection": "Host=127.0.0.1;Port=5432;Database=serviciosapi;Username=steven;Password=******;"</code></pre>
        
        <p><strong>Se realiza compilación del Proyecto</strong></p>
        <pre><code>dotnet build</code></pre>
        
        <p><strong>En caso de cache en el Proyecto</strong></p>
        <pre><code>dotnet nuget locals all --clear</code></pre>
        
        <p><strong>En caso de correr el Proyecto de Forma Local y ver la documentación</strong></p>
        <pre><code>cd ServiciosAPI 
dotnet run
https://localhost:5001/swagger</code></pre>
        
        <p><strong>Se Instalan dependencias Amazon para .NET</strong></p>
        
        <p><strong>Instalación del Kit de herramientas de AWS para Visual Studio</strong></p>
        <a href="https://aws.amazon.com/es/visualstudio/" class="link-primary">https://aws.amazon.com/es/visualstudio/</a>
        
        <pre><code>dotnet add package Amazon.Lambda.AspNetCoreServer
dotnet tool install -g Amazon.Lambda.Tools
dotnet tool update -g Amazon.Lambda.Tools
dotnet lambda deploy-function ServiciosAPI
dotnet lambda deploy-function</code></pre>
        <hr>
        <h2 class="text-center">Creación de Aplicativo Web Vue 3</h2>
        
        <h4>Creación del Proyecto Vue</h4>
        <pre><code>vue create serviciosWeb</code></pre>
        
        <h4>Instalación de Librerías</h4>
        <pre><code>npm install vue-router@4
npm install vuex --save
npm i  @fortawesome/fontawesome-free axios bootstrap sweetalert2
npm i datatables.net
npm i datatables.net-vue3
npm i datatables.net-bs5
npm i datatables.net-buttons-bs5
npm i datatables.net-responsive-bs5 jszip pdfmake</code></pre>
        
        <h3 class="text-center">Despues de instaladas las dependencies ejecutar el aplicativo</h3>
        <pre class="text-center"><code>npm run serve</code></pre>

        <hr>
        <h4>Consideraciones por temas de tiempo</h4>
        
## 

<h3 class="text-center"> No se coloco seguridad para poder realizar pruebas a los aplicativos </h3>
<h3 class="text-center"> No se hizo login </h3>
<h3 class="text-center"> Se dejan conexiones locales las cuales toca cambarlas </h3>

    </div>
</template>
