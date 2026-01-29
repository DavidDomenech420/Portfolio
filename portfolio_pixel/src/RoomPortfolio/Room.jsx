import { useState, useEffect } from "react";

import InteractiveItem from "./InteractiveItem";
import Modal from "./Modal";

// LISTA DE CANCIONES
const PLAYLIST = [
  {
    title: "Heart To Heart",
    artist: "Mac DeMarco",
    src: "/music/heart_to_heart.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Rises the Moon",
    artist: "Liana Flores",
    src: "/music/rises_the_moon.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "505",
    artist: "Artic Monkeys",
    src: "/music/505.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Chandelier",
    artist: "Will Paquin",
    src: "/music/Chandelier.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Looking Out for You",
    artist: "Joy Again",
    src: "/music/Looking_out_for_you.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Karma Police",
    artist: "Radiohead",
    src: "/music/Karma_police.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "in the pool",
    artist: "Kensuke Ushio",
    src: "/music/In_the_pool.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Radio",
    artist: "Bershy",
    src: "/music/Radio.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "White Palace",
    artist: "Christopher Larkin",
    src: "/music/White_palace.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Gustave",
    artist: "Lorien Testard",
    src: "/music/Gustave.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Moth To a Flame",
    artist: "Swedish House Mafia, The Weeknd",
    src: "/music/Moth_to_a_flame.mp3",
    cover: "music_cover.jpg"
  },
  {
    title: "Carry The Name",
    artist: "Djo",
    src: "/music/Carry_the_name.mp3",
    cover: "music_cover.jpg"
  },
];

export default function Room() {

  // hoveredItem -> Variable que puede ser el Ordenador, Tocadiscos, Diario, etc.
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [copied, setCopied] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true);
  const email = "daviddomenech420@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parte de Audio
  // --- SISTEMA DE AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Empezamos por la 0

  // Creamos el objeto Audio una sola vez
  const [bgMusic] = useState(new Audio());

  useEffect(() => {
    // 1. Cargamos la  ruta
    bgMusic.src = PLAYLIST[currentTrackIndex].src;
    bgMusic.loop = false;
    bgMusic.volume = volume;

    // 2. Si ya estaba sonando, que la nueva arranque sola
    if (isPlaying) {
      bgMusic.play().catch(e => console.log("Audio play error:", e));
    }
  }, [currentTrackIndex, bgMusic]); // Se ejecuta cuando cambia el índice

  // Gestionar PLAY / PAUSE 
  useEffect(() => {
    if (isPlaying) {
      bgMusic.play().catch(e => console.log("Audio play error:", e));
    } else {
      bgMusic.pause();
    }
  }, [isPlaying, bgMusic]);

  //Gestionar VOLUMEN
  useEffect(() => {
    bgMusic.volume = volume;
  }, [volume, bgMusic]);

  // FUNCIONES PARA LOS BOTONES
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  useEffect(() => {
    const handleAutoNext = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
    };

    bgMusic.addEventListener('ended', handleAutoNext);

    // Limpieza:
    return () => {
      bgMusic.removeEventListener('ended', handleAutoNext);
    };
  }, [bgMusic]);

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
          name="Musica"
          imagePath="./tocadiscos.png"
          position={{ top: '42.6%', left: '27%', width: '8%', height: '6.5%' }}
          setHoveredItem={setHoveredItem}
          onClick={() => setActiveSection('Musica')}
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
          onClick={() => setActiveSection('Estudios y Experiencia')}
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
            <div className="text-center md:text-left">
              <p className="text-[#a89984] text-lg leading-relaxed">
                Si buscas un perfil híbrido para subir de nivel tu proyecto, contáctame. ¡Contestare lo mas rapido que pueda!
              </p>
            </div>
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

        {/* VENTANA TRAYECTORIA */}
        <Modal
          isOpen={activeSection === 'Estudios y Experiencia'}
          onClose={() => setActiveSection(null)}
          title="Historial de Misiones"
        >
          <div className="flex flex-col gap-8">

            {/* SECCIÓN 1: EXPERIENCIA LABORAL (Timeline) */}
            <div>
              <h3 className="text-[#b58fb6] text-xl font-bold mb-4 flex items-center gap-2">
                <span>⚔️</span> Misiones Principales
              </h3>

              {/* Contenedor de la línea de tiempo */}
              <div className="border-l-2 border-[#504945] ml-3 space-y-8">

                {/* TRABAJO 1 */}
                <div className="relative pl-8">
                  {/* El punto en la línea */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#7e638e] rounded-full border-2 border-[#282828]"></div>

                  <h4 className="text-[#ebdbb2] font-bold text-lg">QA Tester (Practicas DAM)</h4>
                  <div className="text-[#789949] text-sm mb-1">Empresa Inetum Tarragona | 2023 - 2024</div>
                  <p className="text-[#a89984] text-sm">
                    Desarrollo de diferentes pruebas de Testeo usando Selenium con Java, se creo un "framework" propio para facilitar la ejecucion y comprovacion
                    de los diferentes Tests.
                    Tambien se realizo algun proyecto pequeño Full-Stack
                  </p>
                  {/* Etiquetas de tecnologías usadas */}
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-[#32302f] px-2 py-0.5 rounded text-[#ebdbb2] border border-[#504945]">Selenium</span>
                    <span className="text-xs bg-[#32302f] px-2 py-0.5 rounded text-[#ebdbb2] border border-[#504945]">Java</span>
                    <span className="text-xs bg-[#32302f] px-2 py-0.5 rounded text-[#ebdbb2] border border-[#504945]">Appium</span>
                  </div>
                </div>

                {/* TRABAJO 2 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-[#7e638e] rounded-full border-2 border-[#282828]"></div>

                  <h4 className="text-[#ebdbb2] font-bold text-lg">Gestion Tienda Online (Prácticas DAW)</h4>
                  <div className="text-[#789949] text-sm mb-1">Regalogar Reus | 2022</div>
                  <p className="text-[#a89984] text-sm">
                    Mantenimiento de componentes UI y gestion de una tienda Online de electrodomesticos
                  </p>
                </div>

              </div>
            </div>

            <hr className="border-[#504945]" />

            {/* SECCIÓN 2: ESTUDIOS (Grid de Cartas) */}
            <div>
              <h3 className="text-[#b58fb6] text-xl font-bold mb-4 flex items-center gap-2">
                <span>📜</span> Entrenamiento
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ESTUDIO 1 */}
                <div className="bg-[#32302f] p-4 border-l-4 border-[#abcf5f]">
                  <div className="text-[#ebdbb2] font-bold">Grado en Ingeniería Informática</div>
                  <div className="text-sm text-[#789949]">Universidad Rovira Virgili (Tarragona) | En curso</div>
                  <div className="text-xs text-[#a89984] mt-1">Especialidad en Ingeniería del Software.</div>
                </div>

                {/* ESTUDIO 2 */}
                <div className="bg-[#32302f] p-4 border-l-4 border-[#7e638e]">
                  <div className="text-[#ebdbb2] font-bold">CFGS Desarrollo Multiplataforma (DAM)</div>
                  <div className="text-sm text-[#789949]">Instituto Baix Camp (Reus) | 2022 - 2024</div>
                  <div className="text-xs text-[#a89984] mt-1">Nota media: 8.3</div>
                </div>

                {/* ESTUDIO 3 */}
                <div className="bg-[#32302f] p-4 border-l-4 border-[#7e638e]">
                  <div className="text-[#ebdbb2] font-bold">CFGS Desarrollo Web (DAW)</div>
                  <div className="text-sm text-[#789949]">Instituto Baix Camp (Reus) | 2021 - 2023</div>
                  <div className="text-xs text-[#a89984] mt-1">Nota media: 7.7</div>
                </div>

              </div>
            </div>

            <hr className="border-[#504945]" />

            {/* SECCIÓN 3: EVENTOS / HACKATHONS (Estilo Polaroid o Badge) */}
            <div>
              <h3 className="text-[#b58fb6] text-xl font-bold mb-4 flex items-center gap-2">
                <span>🏆</span> Eventos y Logros
              </h3>

              <div className="flex flex-wrap gap-3">

                {/* EVENTO 1 */}
                <div className="group relative bg-[#3c3836] p-3 border border-[#504945] hover:border-[#7e638e] transition-colors w-full md:w-[48%]">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[#ebdbb2] font-bold">Hackathon HackEPS 2025</div>
                      <div className="text-xs text-[#789949]">Participante • Lleida</div>
                    </div>
                    <span className="text-2xl">💻​</span>
                  </div>
                  <p className="text-xs text-[#ebdbb2] mt-2">
                    Creamos una app de gestión del transporte de cerdos con los mataderos y granjas.
                  </p>
                </div>

                {/* EVENTO 1 */}
                <div className="group relative bg-[#3c3836] p-3 border border-[#504945] hover:border-[#7e638e] transition-colors w-full md:w-[48%]">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[#ebdbb2] font-bold">Hackathon StrongHoldPI 2025</div>
                      <div className="text-xs text-[#789949]">Participante • Tarragona</div>
                    </div>
                    <span className="text-2xl">💻​</span>
                  </div>
                  <p className="text-xs text-[#ebdbb2] mt-2">
                    Hicimos un capture the flag utilizando Rasperris.
                  </p>
                </div>

                {/* EVENTO 2 */}
                <div className="group relative bg-[#3c3836] p-3 border border-[#504945] hover:border-[#7e638e] transition-colors w-full md:w-[48%]">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[#ebdbb2] font-bold">Talent Arena 2025</div>
                      <div className="text-xs text-[#789949]">Asistente • Presencial</div>
                    </div>
                    <span className="text-2xl">🎫</span>
                  </div>
                  <p className="text-xs text-[#ebdbb2] mt-2">
                    Charlas sobre Inteligencia Artificial.
                  </p>
                </div>

                {/* EVENTO 2 */}
                <div className="group relative bg-[#3c3836] p-3 border border-[#504945] hover:border-[#7e638e] transition-colors w-full md:w-[48%]">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[#ebdbb2] font-bold">Mobile World Congress 2025</div>
                      <div className="text-xs text-[#789949]">Asistente • Presencial</div>
                    </div>
                    <span className="text-2xl">🎫</span>
                  </div>
                  <p className="text-xs text-[#ebdbb2] mt-2">
                    Diferentes novedades dentro del mundo de la informatica, sobre todo relacionado con la Inteligencia Artificial.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </Modal>

        {/* VENTANA INICIO */}
        <Modal
          isOpen={showWelcome}
          onClose={() => { }}
          title="Start Game"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-2">

            {/* 1. IMAGEN (Izquierda) */}
            <div className="shrink-0 relative group">
              {/* Marco decorativo */}
              <div className="absolute inset-0 border-4 border-[#7e638e] translate-x-2 translate-y-2 bg-[#1d2021]"></div>

              {/* Tu foto pixel art */}
              <img
                src="avatar.png"
                alt="Avatar Intro"
                className="relative w-48 h-48 md:w-56 md:h-56 object-cover pixel-art border-4 border-[#ebdbb2] shadow-2xl z-10"
              />
            </div>

            {/* 2. TEXTO Y TUTORIAL (Derecha) */}
            <div className="text-center md:text-left space-y-4">
              <h3 className="text-2xl text-[#b58fb6] font-bold">¡Hola, viajero!</h3>

              <p className="text-[#a89984] text-lg leading-relaxed">
                Bienvenido a mi pequeño rincón de internet. Este no es un portafolio normal; es mi habitación interactiva. Investiga los diferentes objetos para descubrir cosas sobre mi.
              </p>

              <div className="bg-[#32302f] p-4 border-l-4 border-[#789949] text-left">
                <h4 className="text-[#789949] font-bold mb-2 text-sm uppercase tracking-wide">Tutorial:</h4>
                <ul className="space-y-2 text-[#ebdbb2] text-sm">
                  <li className="flex items-center gap-2">
                    🖱️ <span className="opacity-80">Pasa el ratón para <strong>investigar</strong> objetos.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    👆 <span className="opacity-80">Haz clic para <strong>abrir</strong> las secciones.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    🎵 <span className="opacity-80">Interactua con el <strong>tocadiscos</strong> para ajustar la musica de fondo.</span>
                  </li>
                </ul>
              </div>

              {/* BOTÓN DE EXPLORAR (Cierra el modal) */}
              <button
                onClick={() => {
                  setShowWelcome(false);
                  setIsPlaying(true);
                }}
                className="
                 mt-4 w-full bg-[#7e638e] text-[#282828] font-bold py-3 px-6 text-xl 
                 hover:bg-[#b58fb6] hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(215,153,33,0.5)]
                 transition-all border-b-4 border-[#594a66] active:border-b-0 active:translate-y-[4px]
                 animate-pulse
               "
              >
                EXPLORAR MI HABITACIÓN 🗺️​
              </button>
            </div>

          </div>
        </Modal>

        {/* VENTANA TOCADISCOS */}
        <Modal
          isOpen={activeSection === 'Musica'}
          onClose={() => setActiveSection(null)}
          title="Estación de Audio"
          noScroll= {true}
        >
          <div className="flex flex-fil items-center justify-around gap-6 p-4 m-16">

            <div>
              {/* 1. EL VINILO GIRATORIO Y VISUALIZADOR */}
              <div className="relative m-10 group mt-2">

                {/* Efecto de 'Glow' o brillo detrás del disco */}
                <div className={`
                absolute inset-0 bg-[#7e638e] rounded-full blur-2xl opacity-20 transform scale-110 transition-opacity duration-1000
                ${isPlaying ? 'opacity-40' : 'opacity-10'}
            `}></div>

                {/* EL DISCO DE VINILO */}
                {/* La clase 'animate-[spin_4s_linear_infinite]' hace que gire solo si isPlaying es true */}
                <div
                  className={`
                 relative w-40 h-40 md:w-64 md:h-64 rounded-full 
                 border-8 border-[#1d2021] bg-[#1d2021] shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden
                 flex items-center justify-center
                 transition-transform duration-700
                 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}
               `}
                >
                  {/* Surcos del vinilo (Detalle estético) */}
                  <div className="absolute inset-0 rounded-full border-[2px] border-[#282828] opacity-50 scale-90"></div>
                  <div className="absolute inset-0 rounded-full border-[2px] border-[#282828] opacity-50 scale-75"></div>
                  <div className="absolute inset-0 rounded-full border-[2px] border-[#282828] opacity-50 scale-50"></div>

                  {/* PORTADA CENTRAL (Dinámica según el índice) */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#7e638e] relative z-10 bg-[#282828]">
                    <img
                      src={PLAYLIST[currentTrackIndex].cover}
                      alt="Album Cover"
                      className="w-full h-full object-cover opacity-90"
                    />
                    {/* Brillo del vinilo sobre la pegatina */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* BRAZO DEL TOCADISCOS */}
                {/* Se mueve hacia el disco cuando suena, y se retira cuando para */}
                <div className={`
                absolute -top-4 -right-4 w-28 h-6 bg-[#928374] 
                origin-top-right transition-transform duration-700 ease-in-out border-2 border-[#504945] rounded-full shadow-xl
                z-20
                ${!isPlaying ? 'rotate-[30deg] translate-y-2' : 'rotate-0'}
            `}>
                  <div className="absolute left-1 top-0.5 w-4 h-4 bg-[#7e638e] rounded-full"></div> {/* Aguja */}
                </div>
              </div>

              {/* 2. INFORMACIÓN DE LA PISTA (Dinámica) */}
              <div className="text-center w-full space-y-1 h-20">
                <h3 className="text-[#b58fb6] text-2xl font-bold font-pixel tracking-wide truncate">
                  {PLAYLIST[currentTrackIndex].title}
                </h3>
                <p className="text-[#a89984] text-sm uppercase tracking-widest">
                  {PLAYLIST[currentTrackIndex].artist}
                </p>
                {/* Pequeña barra de progreso visual (decorativa) */}
                <div className="w-24 h-1 bg-[#3c3836] mx-auto mt-2 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#b58fb6] ${isPlaying ? 'animate-[width_3s_ease-in-out_infinite]' : 'w-0'}`}></div>
                </div>
              </div>
            </div>

            <div>
              {/* 3. CONTROLES DE REPRODUCCIÓN */}
              <div className="flex items-center m-10 gap-6 bg-[#32302f] px-8 py-4 rounded-2xl border border-[#504945] shadow-inner">

                {/* BOTÓN ANTERIOR */}
                <button
                  onClick={handlePrev}
                  className="text-[#a89984] hover:text-[#ebdbb2] hover:scale-110 active:scale-95 transition-all"
                  title="Anterior"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M11 19V5l-9 7 9 7zm11 0V5l-9 7 9 7z" /></svg>
                </button>

                {/* PLAY / PAUSE CENTRAL */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="
                  w-16 h-16 rounded-full bg-[#7e638e] text-[#282828] 
                  flex items-center justify-center 
                  hover:bg-[#b58fb6] hover:scale-105 hover:shadow-[0_0_15px_#b58fb6]
                  active:scale-95 active:bg-[#594a66]
                  transition-all shadow-lg border-2 border-[#594a66]
                "
                >
                  {isPlaying ? (
                    // Icono Pause
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : (
                    // Icono Play (ligeramente desplazado para centrarlo visualmente)
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>

                {/* BOTÓN SIGUIENTE */}
                <button
                  onClick={handleNext}
                  className="text-[#a89984] hover:text-[#ebdbb2] hover:scale-110 active:scale-95 transition-all"
                  title="Siguiente"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19l9-7-9-7v14zm11 0h-2V5h2v14z" /></svg>
                </button>

              </div>
              {/* 4. CONTROL DE VOLUMEN */}
              <div className="w-full max-w-xs flex items-center gap-3 text-[#a89984] bg-[#32302f] p-2 rounded-lg border border-[#504945]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#d79921] h-2 bg-[#1d2021] rounded-lg appearance-none cursor-pointer hover:accent-[#fabd2f]"
                />

                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              </div>

            </div>



          </div>
          {/* 5. LINK EXTERNO A SPOTIFY */}
          <div className="-mt-16 text-xs text-[#928374] flex flex-col items-center gap-1">
            <span>¿Te gusta esta vibe?</span>
            <a
              href="https://open.spotify.com/playlist/7xRd1QsdyyrKjzdgXmswRe?si=8878707f12bb4922"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#789949] hover:text-[#abcf5f] hover:underline transition-colors font-bold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
              ABRIR PLAYLIST REAL
            </a>
          </div>
        </Modal>

      </div>


    </div>
  );
}