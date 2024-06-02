using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiciosAPI.Data;
using ServiciosAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiciosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productos>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Productos>> GetProductoById(int id)
        {
            var productos = await _context.Productos.FindAsync(id);
            if (productos == null)
            {
                return BadRequest("El Producto proporcionado no se encontro.");
            }
            return productos;
        }

        [HttpPost]
        public async Task<ActionResult<Productos>> AddProduct(Productos productos)
        {
            _context.Productos.Add(productos);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductoById), new { id = productos.Id }, productos);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Productos producto)
        {
            if (id != producto.Id)
            {
                return BadRequest();
            }

            var existingProduct = await _context.Productos.FindAsync(id);
            if (existingProduct == null)
            {
                return BadRequest("El Producto proporcionado no fue actualizado.");
            }

            // Actualiza solo el nombre si se proporciona un nuevo valor y no es nulo o cadena vacía
            if (!string.IsNullOrEmpty(producto.Nombre))
            {
                existingProduct.Nombre = producto.Nombre;
            }

            // Actualiza solo el precio si se proporciona un nuevo valor
            if (producto.Precio != 0)
            {
                existingProduct.Precio = producto.Precio;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return BadRequest("El Producto proporcionado no existe para actualizado.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
