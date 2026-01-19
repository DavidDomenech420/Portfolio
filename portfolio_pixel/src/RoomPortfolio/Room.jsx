import { useState } from "react";

import InteractiveItem from "./InteractiveItem";
import Modal from "./Modal";

export default function Room() {

  // hoveredItem -> Variable que puede ser el Ordenador, Tocadiscos, Diario, etc.
  const[hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

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
          onClick={() => setActiveSection('Proyectos')}
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
          onClick={() => setActiveSection('Sobre Mi')}
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


        {/* --- SISTEMA DE VENTANAS (MODALES) --- */}
      
        {/* VENTANA SOBRE MÍ */}
        <Modal 
          isOpen={activeSection === 'Sobre Mi'} 
          onClose={() => setActiveSection(null)} 
          title="Quién Soy"
        >
          <p className="mb-4">¡Hola! Soy David, un desarrollador apasionado por el Pixel Art.</p>
          <p>Actualmente estudio Ingeniería y me encanta React.</p>
          <p className="text-[#b58fb6] mt-4">Skills: HTML, CSS, JS, React, Tailwind.</p>
        </Modal>

        {/* VENTANA PROYECTOS */}
        <Modal 
          isOpen={activeSection === 'Proyectos'} 
          onClose={() => setActiveSection(null)} 
          title="Mis Proyectos"
        >
          {/* GRID: 1 columna en móvil, 2 en pantallas medianas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* PROYECTO 1 */}
              <a href="#" target="_blank" className="block group">
                <div className="bg-[#3c3836] border-2 border-[#504945] hover:border-[#b58fb6] transition-colors h-full flex flex-col">
                  <div className="w-full h-40 border-b-2 border-[#504945] overflow-hidden relative">
                    <img 
                      src="/preview_portfolio.png"
                      alt="Preview" 
                      className="
                        w-full h-full object-cover pixel-art 
                        /* Efecto Zoom suave al pasar el ratón */
                        group-hover:scale-110 transition-transform duration-500
                      " 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-2xl text-[#b58fb6] mb-2 group-hover:underline">Portfolio Pixel</h3>
                      <p className="text-[#a89984] leading-tight">
                        Mi portafolio personal interactivo hecho en pixelart con Aseprite, perfecto para conocerme mejor.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#504945]/50 flex justify-between items-center mt-auto">
                      {/* ZONA IZQUIERDA: Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#504945] text-[#ebdbb2] text-sm px-2 py-1 rounded border border-[#282828]">React</span>
                        <span className="bg-[#504945] text-[#ebdbb2] text-sm px-2 py-1 rounded border border-[#282828]">Tailwind</span>
                      </div>

                      {/* ZONA DERECHA: Icono GitHub */}
                      {/* z-20 y relative para asegurar que el click funcione y no choque con el link de la carta entera */}
                      <a 
                        href="https://github.com/DavidDomenech420/Portfolio" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="
                          text-[#a89984] hover:text-[#b58fb6] hover:scale-110 
                          transition-all duration-300 z-20 relative p-1
                        "
                        title="Ver código en GitHub"
                        onClick={(e) => e.stopPropagation()} 
                      >
                        {/* SVG del Logo de GitHub */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </a>

              {/* PROYECTO 2 */}
              <a href="https://deskhub.duckdns.org" target="_blank" className="block group h-full">
                <div className="bg-[#3c3836] border-2 border-[#504945] hover:border-[#b58fb6] transition-colors h-full flex flex-col">
                  <div className="w-full h-40 border-b-2 border-[#504945] overflow-hidden relative">
                    <img 
                      src="/preview_deskhub.png"
                      alt="Preview" 
                      className="
                        w-full h-30 object-cover pixel-art 
                        /* Efecto Zoom suave al pasar el ratón */
                        group-hover:scale-110 transition-transform duration-500
                      " 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-2xl text-[#b58fb6] mb-2 group-hover:underline">DeskHub</h3>
                      <p className="text-[#a89984] leading-tight">
                        Aplicacion ideal para organizarte las tareas, eventos que tengas que atender, con un calendario incorporado y con muchos posits a tu disposicion
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#504945]/50 flex justify-between items-center mt-auto">
                  
                      {/* ZONA IZQUIERDA: Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[#504945] text-[#ebdbb2] text-sm px-2 py-1 rounded border border-[#282828]">Angular</span>
                        <span className="bg-[#504945] text-[#ebdbb2] text-sm px-2 py-1 rounded border border-[#282828]">Django</span>
                        <span className="bg-[#504945] text-[#ebdbb2] text-sm px-2 py-1 rounded border border-[#282828]">PostgreSQL</span>
                      </div>

                      {/* ZONA DERECHA: Icono GitHub */}
                      {/* z-20 y relative para asegurar que el click funcione y no choque con el link de la carta entera */}
                      <a 
                        href="https://github.com/DavidDomenech420/DeskHub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="
                          text-[#a89984] hover:text-[#b58fb6] hover:scale-110 
                          transition-all duration-300 z-20 relative p-1
                        "
                        title="Ver código en GitHub"
                        onClick={(e) => e.stopPropagation()} 
                      >
                        {/* SVG del Logo de GitHub */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </a>

              {/* PROYECTO 3 */}
                <div className="bg-[#3c3836] border-2 border-[#504945] p-4 opacity-75">
                    <h3 className="text-2xl text-[#b58fb6] mb-2 group-hover:underline">Megadex (En construccion)</h3>
                    <p className="text-[#a89984] leading-tight">
                      Ten a tu disposicion de forma rapida y accesible toda la informacion de todos los juegos de Pokemon
                    </p>
                </div>

              
          </div>
        </Modal>
      </div>


    </div>
  );
}