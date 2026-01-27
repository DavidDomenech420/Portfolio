import { useState } from "react";

import InteractiveItem from "./InteractiveItem";
import Modal from "./Modal";

export default function Room() {

  // hoveredItem -> Variable que puede ser el Ordenador, Tocadiscos, Diario, etc.
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [copied, setCopied] = useState(false)
  const email = "daviddomenech420@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          position={{ top: '17.5%', left: '35%', width: '14.4%', height: '25.5%' }}
          setHoveredItem={setHoveredItem}
          onClick={() => setActiveSection('Proyectos')}
          zindex={2}
        />

        {/* EL TELEFONO */}
        <InteractiveItem
          name="Redes Sociales"
          imagePath="./phone.png"
          position={{ top: '33.5%', left: '53%', width: '3.4%', height: '6.5%' }}
          setHoveredItem={setHoveredItem}
          onClick={() => setActiveSection('Redes Sociales')}
          zindex={2}
        />

        {/* EL TOCADISCOS */}
        <InteractiveItem
          name="Spotify"
          imagePath="./tocadiscos.png"
          position={{ top: '42.6%', left: '27%', width: '8%', height: '6.5%' }}
          setHoveredItem={setHoveredItem}
          onClick={() => alert("¡Aquí se abrirá la ventana de Spotify!")}
          zindex={2}
        />

        {/* EL DIARIO */}
        <InteractiveItem
          name="Sobre Mi"
          imagePath="./diary.png"
          position={{ top: '43%', left: '63.5%', width: '6%', height: '6.5%' }}
          setHoveredItem={setHoveredItem}
          onClick={() => setActiveSection('Sobre Mi')}
          zindex={2}
        />

        {/* EL CORCHO */}
        <InteractiveItem
          name="Estudios y Experiencia"
          imagePath="./corcho.png"
          position={{ top: '24%', left: '20%', width: '11%', height: '6.5%' }}
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


        {/* --- SISTEMA DE VENTANAS --- */}

        {/* VENTANA SOBRE MÍ */}
        <Modal
          isOpen={activeSection === 'Sobre Mi'}
          onClose={() => setActiveSection(null)}
          title="Ficha de Personaje"
        >
          <div className="flex flex-col gap-6">

            {/* 1. CABECERA: Foto*/}
            <div className="flex flex-col md:flex-row gap-6 items-center border-b border-[#504945] pb-6">
              {/* Foto de Perfil (Pixelada) */}
              <div className="w-40 h-40 shrink-0 border-4 border-[#b58fb6] shadow-lg overflow-hidden bg-[#32302f]">
                <img src="avatar.png" alt="Avatar" className="w-full h-full object-cover pixel-art" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl text-[#b58fb6] mb-2">David Domenech Aguilera</h3>
                <p className="text-[#a89984] text-lg leading-relaxed">
                  Desarrollador Full Stack con visión de Ingeniero. Me especializo en cerrar la brecha entre la lógica del backend y la magia del frontend. Actualmente cursando <span className="text-[#789949]">Ingeniería Informática</span> tras dominar el desarrollo Web y Móvil. <br /> <br />
                  Busco un entorno dinámico donde la proactividad se premie y donde pueda evolucionar de Junior a Senior enfrentándome a problemas reales de negocio.
                </p>
              </div>

            </div>

            {/* 2. SKILLS (HARD & SOFT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Columna Izquierda: Tech Stack */}
              <div className="bg-[#3c3836] p-4 border border-[#504945]">
                <h4 className="text-[#b58fb6] text-xl mb-3 border-b border-[#504945] pb-1">Hard Skills</h4>
                <h5 className="text-[#7e638e] text-lg mb-1 pb-0.5">Frameworks</h5>
                <div className="flex flex-wrap gap-1">
                  {/* Lista de tecnologías como etiquetas */}
                  {['Angular', 'React', 'Tailwind', 'Django', 'Selenium', 'Appium'].map((skill) => (
                    <span key={skill} className="bg-[#282828] text-[#789949] px-2 py-0.5 text-sm border border-[#504945]">
                      {skill}
                    </span>
                  ))}
                </div>
                <h5 className="text-[#7e638e] text-lg mt-1 mb-1 pb-0.5">FrontEnd</h5>
                <div className="flex flex-wrap gap-1">
                  {/* Lista de tecnologías como etiquetas */}
                  {['HTML', 'CSS', 'JavaScript', 'TypeScript'].map((skill) => (
                    <span key={skill} className="bg-[#282828] text-[#789949] px-2 py-0.5 text-sm border border-[#504945]">
                      {skill}
                    </span>
                  ))}
                </div>
                <h5 className="text-[#7e638e] text-lg mt-1 mb-1 pb-0.5">BackEnd</h5>
                <div className="flex flex-wrap gap-1">
                  {/* Lista de tecnologías como etiquetas */}
                  {['Python', 'Java', 'C', 'Kotlin', 'PostgreSQL', 'FireBase'].map((skill) => (
                    <span key={skill} className="bg-[#282828] text-[#789949] px-2 py-0.5 text-sm border border-[#504945]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Columna Derecha: Soft Skills */}
              <div className="bg-[#3c3836] p-4 border border-[#504945]">
                <h4 className="text-[#b58fb6] text-xl mb-3 border-b border-[#504945] pb-1">Soft Skills</h4>
                <ul className="list-disc list-inside text-[#a89984] space-y-1">
                  <li>Trabajo en Equipo (Agile/Scrum)</li>
                  <li>Aprendizaje Autodidacta</li>
                  <li>Comunicación Efectiva</li>
                  <li>Resolución de problemas</li>
                  <li>Pensamiento Analítico</li>
                </ul>
              </div>
            </div>

            {/* 3. PERSONAL / HOBBIES (El toque humano) */}
            <div className="bg-[#3c3836] p-4 border border-[#504945]">
              <h4 className="text-[#b58fb6] text-xl mb-2 border-b border-[#504945]">Fuera del Código</h4>
              <p className="text-[#a89984]">
                Como se puede observar paso parte de mi tiempo escuchando música, jugando a gran variedad de videojuegos y también leyendo diferentes libros de fantasía. <br /> <br />
                Dentro del mundo de la música un cantante que me esta gustando mucho es Djo con su nuevo disco <span className="text-[#789949]">The Crux Deluxe</span>. <br /> <br />
                En la parte de videojuegos me encantan los indie como <span className="text-[#789949]">Hollow Knight</span> y <span className="text-[#789949]">Clair Obscur: Expedition 33</span>. <br /> <br />
                Por ultimo los libros que mas leo son los de <span className="text-[#789949]">Brandon Sanderson</span> ya que fue el que hizo que me enamorara de las obras literarias.
              </p>
            </div>

            {/* 4. CALL TO ACTION (Descargar CV) */}
            <div className="flex justify-center mt-2">
              <a
                href="/cv.pdf"
                download
                className="
                bg-[#7e638e] text-[#282828] font-bold py-2 px-6 text-xl 
                hover:bg-[#b58fb6] hover:scale-105 transition-transform
                flex items-center gap-2 shadow-lg
              "
              >
                <span>💾</span> DESCARGAR CV
              </a>
            </div>

          </div>
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
                      <span className="bg-[#504945] text-[#789949] text-sm px-2 py-1 rounded border border-[#282828]">React</span>
                      <span className="bg-[#504945] text-[#789949] text-sm px-2 py-1 rounded border border-[#282828]">Tailwind</span>
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
                      <span className="bg-[#504945] text-[#789949] text-sm px-2 py-1 rounded border border-[#282828]">Angular</span>
                      <span className="bg-[#504945] text-[#789949] text-sm px-2 py-1 rounded border border-[#282828]">Django</span>
                      <span className="bg-[#504945] text-[#789949] text-sm px-2 py-1 rounded border border-[#282828]">PostgreSQL</span>
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

        {/* VENTANA REDES SOCIALES */}
        <Modal
          isOpen={activeSection === 'Redes Sociales'}
          onClose={() => setActiveSection(null)}
          title="Redes & Contacto"
        >
          <div className="flex flex-col gap-8">

            {/* 1. REDES SOCIALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/david-domenech-aguilera/"
                target="_blank"
                className="
                flex items-center justify-center gap-3 p-4 
                bg-[#0077b5] text-white border-4 border-[#005582] 
                hover:translate-y-[-4px] hover:shadow-[0_4px_0_#004466] 
                transition-all active:translate-y-0 active:shadow-none
              "
              >
                {/* Icono LinkedIn SVG */}
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span className="font-bold text-xl tracking-wide">LINKEDIN</span>
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/DavidDomenech420"
                target="_blank"
                className="
                flex items-center justify-center gap-3 p-4 
                bg-[#333] text-white border-4 border-[#1a1a1a] 
                hover:translate-y-[-4px] hover:shadow-[0_4px_0_#000] 
                transition-all active:translate-y-0 active:shadow-none
              "
              >
                {/* Icono GitHub SVG */}
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                <span className="font-bold text-xl tracking-wide">GITHUB</span>
              </a>
            </div>

            <hr className="border-[#504945]" />

            {/* 2. ZONA EMAIL */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#b58fb6]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <h3 className="text-2xl font-bold font-pixel">Mail</h3>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                {/* INPUT: Dirección de correo */}
                <div className="flex-grow bg-[#1d2021] border-2 border-[#504945] p-3 rounded text-[#a89984] font-mono select-all">
                  {email}
                </div>

                {/* GRUPO DE BOTONES */}
                <div className="flex gap-2 shrink-0">

                  {/* BOTÓN ENVIAR */}
                  <a
                    href={`mailto:${email}`}
                    title="Enviar correo"
                    className="
                    bg-[#7e638e] hover:bg-[#594a66] text-[#282828] 
                    w-12 h-full min-h-[50px] rounded flex items-center justify-center
                    border-b-4 border-[#594a66] active:border-b-0 active:translate-y-[4px]
                    transition-all
                  "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </a>

                  {/* BOTÓN COPIAR */}
                  <button
                    onClick={handleCopyEmail}
                    title="Copiar al portapapeles"
                    className={`
                    w-12 h-full min-h-[50px] rounded flex items-center justify-center
                    border-b-4 transition-all active:border-b-0 active:translate-y-[4px]
                    ${copied
                        ? "bg-[#abcf5f] border-[#789949] text-[#282828]" // Verde si copiado
                        : "bg-[#7e638e] border-[#594a66] hover:bg-[#594a66] text-[#282828]" // Morado normal
                      }
                  `}
                  >
                    {copied ? (
                      // Icono Check (Copiado)
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      // Icono Copiar
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    )}
                  </button>

                </div>
              </div>

              <div className={`text-[#abcf5f] text-sm mt-1 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                ¡Correo copiado al portapapeles!
              </div>

            </div>

          </div>
        </Modal>
      </div>


    </div>
  );
}