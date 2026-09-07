import wallpaper from './assets/walpaper jpg.jpg'
import './App.css'

function App() {
  return (
    <main style={{ '--wallpaper': `url("${wallpaper}")` }}>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Volver al inicio">
          FUEGO<span>.</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#obra">Obra</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="menu-link" href="#contacto" aria-label="Abrir contacto">
          <span></span><span></span><span></span>
        </a>
      </header>

      <section className="artist-block block-light" id="inicio">
        <div className="block-copy">
          <p className="eyebrow">Artista visual / 2026</p>
          <h1>Todo lo que<br /><em>arde</em> deja una marca.</h1>
          <p className="intro">Obra gráfica, calle y memoria reunidas en una misma frecuencia.</p>
          <a className="outline-button" href="#obra">Explorar obra <span>↘</span></a>
        </div>
        <div className="image-window window-tall" role="img" aria-label="Fragmento del mural y obra del artista"></div>
        <span className="side-note">01 / manifiesto</span>
      </section>

      <section className="artist-block block-dark" id="obra">
        <div className="image-window window-wide" role="img" aria-label="Detalle de una obra urbana"></div>
        <div className="block-copy">
          <p className="eyebrow">Selección / 01—03</p>
          <h2>La ciudad<br /><em>también sueña.</em></h2>
          <p className="intro">Piezas nacidas entre el ruido, los viajes y las paredes que todavía tienen algo que decir.</p>
          <a className="outline-button" href="#contacto">Ver proyectos <span>↗</span></a>
        </div>
        <span className="side-note">02 / archivo vivo</span>
      </section>

      <section className="artist-block block-light block-contact" id="contacto">
        <div className="block-copy">
          <p className="eyebrow">Disponible para colaborar</p>
          <h2>Hagamos algo<br /><em>inolvidable.</em></h2>
          <p className="intro">Murales, portadas, dirección de arte y proyectos que necesiten una voz sin filtro.</p>
          <a className="outline-button dark-button" href="mailto:hola@fuego.studio">Escribir ahora <span>↗</span></a>
        </div>
        <div className="contact-stamp" aria-hidden="true">F<br />/U<br />E<br />G<br />O</div>
        <span className="side-note">03 / contacto</span>
      </section>

      <footer>
        <span>FUEGO. — Estudio independiente</span>
        <span>Instagram / Behance / Mail</span>
      </footer>
    </main>
  )
}

export default App
