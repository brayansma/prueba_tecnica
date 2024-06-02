# Prueba Técnica - Desarrollador Semisenior (Backend) - Linktic S.A.S

# ServiciosAPI
## Creación del API
## Ajustar el contenido de las conexiones
> **Crea el Proyecto**
``` 
dotnet new webapi -n ServiciosAPI 
```

> **Ingresa al Proyecto**
```
cd ServiciosAPI 
```

> **Instalaciones para .NET**
```	
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```	
> **Instalación de PostgreSQL para la conexión**

```	
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```	
> **Creación de Script y Migracón a la BD**
```	
dotnet ef migrations add InitialCreate
dotnet ef database update
```
> **Cambiar la conexión a la BD PostgreSQL**
```	
"DefaultConnection": "Host=127.0.0.1;Port=5432;Database=serviciosapi;Username=steven;Password=******;"
```	


> **Se realiza compilación del Proyecto**
```	
dotnet build
```
> **En caso de cache en el Proyecto**
```	
dotnet nuget locals all --clear
```
> **En caso de correr el Proyecto de Forma Local y ver la documentación**
```	
cd ServiciosAPI 
dotnet run
https://localhost:5001/swagger
```

> **Se Instalan dependencias Amazon para .NET**

> **Instalación del Kit de herramientas de AWS para Visual Studio**
> https://aws.amazon.com/es/visualstudio/

``` 
dotnet add package Amazon.Lambda.AspNetCoreServer
dotnet tool install -g Amazon.Lambda.Tools
dotnet tool update -g Amazon.Lambda.Tools
dotnet lambda deploy-function ServiciosAPI
dotnet lambda deploy-function 
```
>

# Creación de Aplicativo Web Vue 3

## Creación del Proyecto Vue
> vue create serviciosWeb


> Instalación de Librerias
```
npm install vue-router@4
npm install vuex --save
npm i  @fortawesome/fontawesome-free axios bootstrap sweetalert2
```