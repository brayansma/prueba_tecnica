namespace ServiciosAPI.Models
{
    public class Orden
    {
        public int Id { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public DateTime FechaOrden { get; set; }
    }
}