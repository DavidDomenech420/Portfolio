// src/Modal.jsx

export default function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children 
}) {
  // Si la ventana no está abierta, no renderizamos nada (return null)
  if (!isOpen) return null;

  return (
    // 1. EL FONDO OSCURO (Overlay)
    // z-50 para asegurar que quede ENCIMA de todos los muebles
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      
      {/* 2. LA VENTANA RETRO */}
      <div 
        className="
          relative w-full max-w-5xl bg-[#282828] 
          border-4 border-[#7e638e] 
          text-[#789949] p-6 shadow-2xl
          font-pixel text-xl
        "
      >
        
        {/* CABECERA: Título y Botón Cerrar */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-[#504945] pb-2">
          <h2 className="text-2xl font-bold uppercase tracking-widest">{title}</h2>
          
          <button 
            onClick={onClose}
            className="
              text-[#cc241d] font-bold text-xl 
              hover:text-[#fb4934] transition-colors
            "
          >
            [X] CERRAR
          </button>
        </div>

        {/* CONTENIDO DINÁMICO (Lo que pasemos dentro de la etiqueta) */}
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>

      </div>
    </div>
  );
}