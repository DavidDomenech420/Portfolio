export default function Room() {
  return (
    // Un contenedor negro que ocupa toda la pantalla, para hacerlo de fondo
    <div className="w-full h-screen bg-[#282828] flex items-center justify-center overflow-hidden">
      
      {/* El marco del juego (Aspect Ratio 16:9) */}
      <div className="relative w-full max-w-[85vw] aspect-video bg-[#32302f]">
        
        {/* TU FONDO */}
        <img 
          src="./fondoHabitacion.png" 
          alt="Mi Habitación" 
          className="w-full h-full object-cover pixel-art" 
        />
        
      </div>
    </div>
  );
}