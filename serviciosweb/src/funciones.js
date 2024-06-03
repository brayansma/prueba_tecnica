// funciones.js
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "./globals";

export function show_alerta(mensaje, icono, foco = '') {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: mensaje,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomin' },
        buttonsStyling: false
    });
}

export function confirmar(id, nombre, modulo) {
    const url = `${API_BASE_URL}${modulo}/${id}`;

    return new Promise((resolve, reject) => {
        const swalwithBootstrapButtons = Swal.mixin({
            customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
            buttonsstyling: false
        });

        swalwithBootstrapButtons.fire({
            title: `Seguro de eliminar ${modulo} ` + nombre,
            text: `Se perderá la información del ${modulo}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarSolicitud('DELETE', { id: id }, url, `${modulo} Eliminado`)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                show_alerta('Operación cancelada', 'info');
                reject('Operación cancelada');
            }
        });
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  return axios({
    method: metodo,
    url: url,
    data: parametros,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (respuesta) {
      let status = respuesta.status;
      if (status === 204) {
        show_alerta(mensaje, 'success');
        return respuesta;
      } else if (status === 201) {
        show_alerta('Operación creada', 'success');
        return respuesta;
      } else {
        if (respuesta.request) {
          let { status, statusText } = respuesta.request;
          show_alerta(`Errores ${status} - ${statusText}`, 'error');
          throw new Error(`Errores ${status} - ${statusText}`);
        } else {
          console.error(respuesta);
          throw new Error('Error en la solicitud');
        }
      }
    })
    .catch(err => {
      if (err.request) {
        let { status, statusText } = err.request;
        show_alerta(`Error en la Solicitud <br> ${status} - ${statusText}`, 'error');
      } else {
        console.error(err);
        throw err;
      }
    });
}



// export function enviarSolicitud(metodo, parametros, url, mensaje) {
//     return axios({
//         method: metodo,
//         url: url,
//         data: parametros,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(function (respuesta) {
//             let status = respuesta.status;
//             if (status === 204) {
//                 show_alerta(mensaje, 'success');
//                 return respuesta;
//             } else {
//                 let { status, statusText } = respuesta.request;
//                 show_alerta(`Errores  ${status} - ${statusText}`, 'error');
//                 throw new Error(`Errores ${status} - ${statusText}`);
//             }
//         }).catch(err => {
//             let { status, statusText } = err.request;
//             show_alerta(`Error en la Solicitud <br> ${status} - ${statusText}`, 'error');
//             throw err;
//         });
// }
