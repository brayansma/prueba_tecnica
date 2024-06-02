using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiciosAPI.Data;
using ServiciosAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServiciosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdenesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdenesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orden>>> GetOrden()
        {
            return await _context.Orden.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Orden>> AddOrder(Orden orden)
        {
            // Verificar si el producto existe en la base de datos
            var productoExistente = await _context.Productos.FindAsync(orden.ProductoId);
            if (productoExistente == null)
            {
                return BadRequest("El producto especificado no existe.");
            }

            // Si el producto existe, agregar la orden
            _context.Orden.Add(orden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrdenById), new { id = orden.Id }, orden);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Orden>> GetOrdenById(int id)
        {
            var orden = await _context.Orden.FindAsync(id);
            if (orden == null)
            {
                return BadRequest("La Orden proporcionado no se encontro.");

            }
            return orden;
        }

        private bool OrderExists(int id)
        {
            return _context.Orden.Any(e => e.Id == id);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Orden orden)
        {
            if (id != orden.Id)
            {
                return BadRequest();
            }

            var existingOrder = await _context.Orden.FindAsync(id);
            if (existingOrder == null)
            {
                return NotFound();
            }

            // Verificar si se proporciona un valor válido para la cantidad
            if (orden.Cantidad > 0)
            {
                existingOrder.Cantidad = orden.Cantidad;
            }

            // Verificar si se proporciona un valor válido para el ProductoId
            if (orden.ProductoId > 0)
            {
                // Validar que el producto existe en la base de datos
                var existingProduct = await _context.Productos.FindAsync(orden.ProductoId);
                if (existingProduct == null)
                {
                    return BadRequest("El ProductoId proporcionado no está registrado.");
                }
                existingOrder.ProductoId = orden.ProductoId;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }













        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrden(int id)
        {
            var orden = await _context.Orden.FindAsync(id);
            if (orden == null)
            {
                return NotFound();
            }

            _context.Orden.Remove(orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdenExists(int id)
        {
            return _context.Orden.Any(e => e.Id == id);
        }



    }
}
