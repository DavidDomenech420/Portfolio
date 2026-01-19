// src/InteractiveItem.jsx

export default function InteractiveItem({ 
  name,           // El nombre del objeto (ej: "Proyectos")
  imagePath,      // La ruta de la imagen (ej: "/assets/computer.png")
  position,       // Objeto con top, left, width (ej: { top: '20%', ... })
  setHoveredItem, // La función para avisar a la Room que lo estamos tocando
  onClick,        // Qué hacer cuando hacemos click
  zindex          // Prioridad
}) {
  return (
    <div 
      className="absolute cursor-pointer transition-transform duration-300 hover:scale-105"
      style={{...position,
            zIndex: zindex
      }}
      
      onMouseEnter={() => setHoveredItem(name)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={onClick}
    >
      <img 
        src={imagePath} 
        alt={name}
        className="
          w-full h-auto pixel-art 
          interactive-glow 
          hover:animate-none 
          glow-on-hover
        " 
      />
    </div>
  );
}