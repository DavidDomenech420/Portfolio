import { useState } from "react";

import InteractiveItem from "./InteractiveItem";

export default function Room() {

  // hoveredItem -> Variable que puede ser el Ordenador, Tocadiscos, Diario, etc.
  const[hoveredItem, setHoveredItem] = useState(null);

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

        {/* EL ORDENADOR */}
        <InteractiveItem
          name="Proyectos"
          imagePath="./computer.png"
          position={{top: '17.5%', left: '35%', width: '14.4%', height: '25.5%'}}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Proyectos!")}
          zindex={2}
        />

        {/* EL TELEFONO */}
        <InteractiveItem
          name="Redes Sociales"
          imagePath="./phone.png"
          position={{top: '33.5%', left: '53%', width: '3.4%', height: '6.5%'}}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Redes Sociales!")}
          zindex={2}
        />

        {/* EL TOCADISCOS */}
        <InteractiveItem
          name="Spotify"
          imagePath="./tocadiscos.png"
          position={{top: '42.6%', left: '27%', width: '8%', height: '6.5%'}}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Spotify!")}
          zindex={2}
        />

        {/* EL DIARIO */}
        <InteractiveItem
          name="Sobre Mi"
          imagePath="./diary.png"
          position={{top: '43%', left: '63.5%', width: '6%', height: '6.5%'}}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Sobre Mi!")}
          zindex={2}
        />

        {/* EL CORCHO */}
        <InteractiveItem
          name="Estudios y Experiencia"
          imagePath="./corcho.png"
          position={{top: '24%', left: '20%', width: '11%', height: '6.5%'}}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Estudios y Experiencia!")}
          zindex={1}
        />
        
        {/* --- ETIQUETA DE TEXTO (DEBUG) --- */}
        {/* Si hay algo en la memoria, lo mostramos en grande */}
        {hoveredItem && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white p-4 text-2xl font-bold border-2 border-white">
            Estás tocando: {hoveredItem}
          </div>
        )}

      </div>
    </div>
  );
}