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

``` 
dotnet add package Amazon.Lambda.AspNetCoreServer
dotnet tool install -g Amazon.Lambda.Tools
dotnet tool update -g Amazon.Lambda.Tools
dotnet lambda deploy-function ServiciosAPI
dotnet lambda deploy-function 
```






