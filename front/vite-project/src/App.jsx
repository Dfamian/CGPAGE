import { useEffect, useRef, useState } from 'react'
import wallpaper from './assets/walpaper jpg.jpg'
import lettersLogo from './assets/Letrass.PNG'
import cgSamoLogo from './assets/Ilustraciones/CGSAMO-header.png'
import titleArtwork from './assets/Ilustraciones/samoooooo.png'
import './App.css'

const assetFiles = import.meta.glob('./assets/accesorios samo/**/*.svg', { eager: true, import: 'default', query: '?url' })
const categoryLabels = { siluetas: 'Siluetas', 'ojos sin pestañas': 'Ojos', 'ojos con pestañas': 'Ojos con pestañas', gafas: 'Gafas', aretes: 'Aretes', Balacas: 'Balacas', Gorras: 'Gorras', Headsets: 'Headsets', mas: 'Más', exclamaciones: 'Exclamaciones' }
const categoryOrder = Object.keys(categoryLabels)
const catalog = Object.entries(assetFiles).reduce((groups, [path, url]) => {
  const parts = path.split('/')
  const category = parts[3]
  const name = parts.at(-1)
  groups[category] ??= []
  groups[category].push({ id: path, name, url })
  return groups
}, {})
Object.values(catalog).forEach((items) => items.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })))
const frameAsset = catalog.marco?.[0]
const fixedCategories = new Set(['siluetas'])
const verticalCategories = new Set(['ojos sin pestañas', 'ojos con pestañas', 'gafas', 'Gorras'])
const faceAlignedCategories = new Set(['aretes', 'Balacas'])
// Cada silueta comparte una caja cuadrada; mask-size: contain conserva su forma.
const silhouetteSize = 60
// Ajusta left, top y width de los accesorios; las siluetas conservan un tamaño fijo.
const layerDefaults = {
  siluetas: { left: 50, top: 50, width: silhouetteSize, rotate: 0, zIndex: 1 },
  'ojos sin pestañas': { left: 50, top: 49, width: 31, rotate: 0, zIndex: 3 }, 'ojos con pestañas': { left: 50, top: 49, width: 31, rotate: 0, zIndex: 3 }, gafas: { left: 50, top: 49, width: 35, rotate: 0, zIndex: 4 }, aretes: { left: 50, top: 68, width: 55, rotate: 0, zIndex: 5 }, Balacas: { left: 50, top: 22, width: 58, rotate: 0, zIndex: 5 }, Gorras: { left: 50, top: 19, width: 55, rotate: 0, zIndex: 6 }, Headsets: { left: 50, top: 48, width: 48, rotate: 0, zIndex: 5 }, mas: { left: 72, top: 70, width: 22, rotate: -8, zIndex: 7 }, exclamaciones: { left: 77, top: 29, width: 12, rotate: 8, zIndex: 8 },
}
const randomItem = (category) => { const items = catalog[category] ?? []; return items[Math.floor(Math.random() * items.length)] }
const loadCanvasImage = (src) => new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = src })
const carouselImages = Object.entries(import.meta.glob('./assets/carrusel/*.{avif,gif,jpeg,jpg,png,webp}', { eager: true, import: 'default', query: '?url' }))
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([path, url]) => ({ name: path.split('/').at(-1), url }))

function App() {
  const [activeImage, setActiveImage] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const currentImage = carouselImages[activeImage]
  const changeImage = (direction) => {
    setSlideDirection(direction)
    setActiveImage((current) => (current + direction + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReduceMotion(motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (carouselImages.length < 2 || carouselPaused || reduceMotion) return undefined
    const intervalId = window.setInterval(() => {
      setSlideDirection(1)
      setActiveImage((current) => (current + 1) % carouselImages.length)
    }, 5500)
    return () => window.clearInterval(intervalId)
  }, [carouselPaused, reduceMotion])

  return <main style={{ '--wallpaper': `url("${wallpaper}")` }}>
    <header className="site-header"><div className="header-left"><a className="brand brand-image" href="#inicio"><img src={cgSamoLogo} alt="CG SAMO" /></a><nav><a href="#inicio">Inicio</a><a href="#obra">Obra</a><a href="#contacto">Contacto</a></nav></div><a className="header-logo" href="#inicio"><img src={lettersLogo} alt="CG SAMO" /></a><a className="menu-link" href="#contacto" aria-label="Abrir contacto"><span></span><span></span><span></span></a></header>
    <section className="gallery-block" id="inicio" aria-label="Carrusel de imágenes del artista">
      <p className="eyebrow">CG SAMO / Galería</p>
      <div className="gallery-carousel" role="region" aria-roledescription="carrusel" aria-label="Galería de imágenes"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
        onFocus={() => setCarouselPaused(true)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false) }}>
        <button className="gallery-arrow" type="button" onClick={() => changeImage(-1)} disabled={carouselImages.length < 2} aria-label="Foto anterior">←</button>
        <div className="gallery-slide" aria-live={carouselPaused ? 'polite' : 'off'}>
          {currentImage
            ? <img className="gallery-photo" key={activeImage} src={currentImage.url} alt={`Foto ${activeImage + 1}: ${currentImage.name}`} style={{ '--slide-direction': slideDirection }} />
            : <div className="gallery-empty"><span>FOTOS DEL CARRUSEL</span><span>Agrega imágenes cuadradas en src/assets/carrusel/</span></div>}
        </div>
        <button className="gallery-arrow" type="button" onClick={() => changeImage(1)} disabled={carouselImages.length < 2} aria-label="Foto siguiente">→</button>
      </div>
      <p className="gallery-count">{currentImage ? `${activeImage + 1} / ${carouselImages.length}` : 'Galería pendiente'}</p>
    </section>
    <BuilderBlock />
    <section className="title-block" id="titulo-homles" aria-label="HOMLES AND RAPERS">
      <img className="title-art" src={titleArtwork} alt="HOMLES AND RAPERS" />
    </section>
    <section className="music-block" id="musica">
      <p className="eyebrow">04 / El sonido</p>
      <div className="music-copy">
        <h2>La música<br /><em>de CG SAMO.</em></h2>
        <p className="intro">Este espacio presentará el sonido del artista, sus influencias y las historias detrás de sus canciones.</p>
      </div>
      <span className="music-note" aria-hidden="true">♪</span>
    </section>
    <footer className="site-footer" id="contacto"><span>CG SAMO — HOMLES AND RAPERS</span><span>Redes / Contacto</span></footer>
  </main>
}

function BuilderBlock() {
  const stageRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0])
  const [layers, setLayers] = useState({})
  const [dragging, setDragging] = useState(null)
  const [cabezamoName, setCabezamoName] = useState('Mi cabezamo')
  const [includeName, setIncludeName] = useState(true)
  const [silhouetteColors, setSilhouetteColors] = useState(['#ff4d6d', '#ffd166'])
  const [stageColors, setStageColors] = useState(['#e8ff78', '#f8ecfa'])
  const silhouetteScaleLocked = fixedCategories.has(activeCategory)

  useEffect(() => {
    const moveLayer = (event) => {
      if (!dragging || !stageRef.current) return
      const bounds = stageRef.current.getBoundingClientRect()
      const top = Math.max(5, Math.min(95, ((event.clientY - bounds.top) / bounds.height) * 100))
      setLayers((current) => {
        const currentLayer = current[dragging]
        const left = verticalCategories.has(dragging) || faceAlignedCategories.has(dragging) ? currentLayer.left : Math.max(6, Math.min(94, ((event.clientX - bounds.left) / bounds.width) * 100))
        return { ...current, [dragging]: { ...currentLayer, left, top } }
      })
    }
    const stopDragging = () => setDragging(null)
    window.addEventListener('pointermove', moveLayer)
    window.addEventListener('pointerup', stopDragging)
    return () => { window.removeEventListener('pointermove', moveLayer); window.removeEventListener('pointerup', stopDragging) }
  }, [dragging])

  const chooseAccessory = (item) => setLayers((current) => {
    const nextLayers = { ...current, [activeCategory]: { ...item, category: activeCategory, ...layerDefaults[activeCategory] } }
    if (verticalCategories.has(activeCategory)) {
      const otherEyeCategory = activeCategory === 'ojos sin pestañas' ? 'ojos con pestañas' : 'ojos sin pestañas'
      delete nextLayers[otherEyeCategory]
    }
    return nextLayers
  })
  const removeAccessory = () => setLayers((current) => {
    const nextLayers = { ...current }
    delete nextLayers[activeCategory]
    return nextLayers
  })
  const randomize = () => {
    const nextLayers = {}
    const addRandomLayer = (category) => {
      const item = randomItem(category)
      if (item) nextLayers[category] = { ...item, category, ...layerDefaults[category] }
    }
    addRandomLayer('siluetas')
    addRandomLayer(Math.random() > 0.5 ? 'ojos sin pestañas' : 'ojos con pestañas')
    const accessoryCategories = ['gafas', 'aretes', 'Balacas', 'Gorras', 'Headsets', 'mas', 'exclamaciones'].filter((category) => catalog[category]?.length)
    accessoryCategories.sort(() => Math.random() - 0.5).slice(0, 3).forEach(addRandomLayer)
    setLayers(nextLayers)
  }
  const stageGradient = '#ffffff'
  const silhouetteGradient = `radial-gradient(circle, ${silhouetteColors[0]} 0%, ${silhouetteColors[1]} 100%)`
  // Exporta el marco y todas las capas visibles respetando sus posiciones actuales.
  const downloadComposition = async () => {
    const stage = stageRef.current
    if (!stage) return
    const width = 900
    const height = Math.round(width * 1.08)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    const drawContain = (image, x, y, boxWidth, boxHeight) => {
      const scale = Math.min(boxWidth / image.naturalWidth, boxHeight / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      context.drawImage(image, x + (boxWidth - drawWidth) / 2, y + (boxHeight - drawHeight) / 2, drawWidth, drawHeight)
    }
    if (frameAsset) drawContain(await loadCanvasImage(frameAsset.url), 0, 0, width, height)
    if (includeName) {
      context.fillStyle = '#21192a'
      context.font = '700 26px "Space Grotesk", sans-serif'
      context.textAlign = 'center'
      context.fillText(cabezamoName.trim() || 'Mi cabezamo', width / 2, 52)
    }
    for (const layer of Object.values(layers)) {
      const image = await loadCanvasImage(layer.url)
      const layerWidth = layer.category === 'siluetas' ? silhouetteSize : layer.width
      const drawWidth = width * layerWidth / 100
      const drawHeight = layer.category === 'siluetas' ? drawWidth : drawWidth * image.naturalHeight / image.naturalWidth
      const x = width * layer.left / 100
      const y = height * layer.top / 100
      context.save()
      context.translate(x, y)
      context.rotate(layer.rotate * Math.PI / 180)
      if (layer.category === 'siluetas') {
        const maskCanvas = document.createElement('canvas')
        maskCanvas.width = drawWidth
        maskCanvas.height = drawHeight
        const maskContext = maskCanvas.getContext('2d')
        const maskScale = Math.min(drawWidth / image.naturalWidth, drawHeight / image.naturalHeight)
        const maskWidth = image.naturalWidth * maskScale
        const maskHeight = image.naturalHeight * maskScale
        maskContext.drawImage(image, (drawWidth - maskWidth) / 2, (drawHeight - maskHeight) / 2, maskWidth, maskHeight)
        maskContext.globalCompositeOperation = 'source-in'
        const gradient = maskContext.createRadialGradient(
          drawWidth / 2,
          drawHeight / 2,
          0,
          drawWidth / 2,
          drawHeight / 2,
          Math.hypot(drawWidth, drawHeight) / 2,
        )
        gradient.addColorStop(0, silhouetteColors[0])
        gradient.addColorStop(1, silhouetteColors[1])
        maskContext.fillStyle = gradient
        maskContext.fillRect(0, 0, drawWidth, drawHeight)
        context.drawImage(maskCanvas, -drawWidth / 2, -drawHeight / 2)
      } else {
        context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
      }
      context.restore()
    }
    const link = document.createElement('a')
    const safeName = cabezamoName.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'cabezamo'
    link.download = `${safeName}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
  return <section className="builder-block block-dark" id="obra">
    <div className="builder-intro"><p className="eyebrow">Cabezamos / Estudio interactivo</p><h2>Haz tu<br /><em>cabezamo.</em></h2><p className="intro">Elige una silueta, mezcla accesorios y arrastra cada pieza hasta encontrar tu personaje.</p><div className="builder-action-panel"><label className="name-control" htmlFor="cabezamo-name"><span>Nombre del cabezamo</span><input id="cabezamo-name" type="text" value={cabezamoName} maxLength="32" onChange={(event) => setCabezamoName(event.target.value)} /></label><label className="name-toggle"><input type="checkbox" checked={includeName} onChange={(event) => setIncludeName(event.target.checked)} /><span>Incluir nombre al descargar</span></label><div className="builder-actions"><button className="outline-button builder-action" type="button" onClick={randomize}>Mezcla libre <span>✦</span></button><button className="text-action" type="button" onClick={() => setLayers({})}>Limpiar composición <span>↺</span></button><button className="text-action download-action" type="button" onClick={downloadComposition}>Descargar cabezamo <span>↓</span></button></div></div><span className="builder-count">{Object.keys(layers).length} piezas activas</span></div>
    <div className="builder-workspace"><div className="builder-stage" ref={stageRef} aria-label="Composición interactiva" style={{ background: stageGradient }}>{frameAsset && <img className="builder-frame" src={frameAsset.url} alt="" aria-hidden="true" />}{Object.values(layers).map((layer) => {
      const layerSize = layer.category === 'siluetas' ? silhouetteSize : layer.width
      return layer.category === 'siluetas'
        ? <div className={`builder-layer builder-silhouette-gradient ${dragging === layer.category ? 'is-dragging' : ''}`} key={layer.category} role="img" aria-label="Silueta seleccionada" style={{ left: `${layer.left}%`, top: `${layer.top}%`, width: `${layerSize}%`, height: `${layerSize}%`, zIndex: layer.zIndex, transform: `translate(-50%, -50%) rotate(${layer.rotate}deg)`, background: silhouetteGradient, WebkitMaskImage: `url("${layer.url}")`, maskImage: `url("${layer.url}")` }} onPointerDown={(event) => { event.preventDefault(); setActiveCategory(layer.category); setDragging(null) }} />
        : <img className={`builder-layer ${dragging === layer.category ? 'is-dragging' : ''}`} key={layer.category} src={layer.url} alt={`${categoryLabels[layer.category]} seleccionados`} style={{ left: `${layer.left}%`, top: `${layer.top}%`, width: `${layerSize}%`, zIndex: layer.zIndex, transform: `translate(-50%, -50%) rotate(${layer.rotate}deg)` }} onPointerDown={(event) => { event.preventDefault(); setActiveCategory(layer.category); setDragging(fixedCategories.has(layer.category) ? null : layer.category) }} />
    })}<span className="stage-label">arrastra / combina</span></div>
      <div className="builder-controls">
        <div className="control-section">
          <div className="control-heading"><span>01</span><strong>Escala la pieza activa</strong></div>
          <label className="scale-control" htmlFor="piece-scale">
            <span>{silhouetteScaleLocked ? 'Tamaño fijo' : layers[activeCategory] ? `${Math.round(layers[activeCategory].width)}%` : 'Elige una pieza'}</span>
            <input
              id="piece-scale"
              type="range"
              min="8"
              max="85"
              value={silhouetteScaleLocked ? silhouetteSize : layers[activeCategory]?.width ?? 30}
              disabled={!layers[activeCategory] || silhouetteScaleLocked}
              onChange={(event) => setLayers((current) => ({ ...current, [activeCategory]: { ...current[activeCategory], width: Number(event.target.value) } }))}
            />
          </label>
        </div>
        {activeCategory === 'siluetas' && <div className="control-section color-controls">
          <div className="control-heading"><span>02</span><strong>Degradado de silueta</strong></div>
          <div className="color-pickers">
            <label>Inicio <input type="color" value={silhouetteColors[0]} onChange={(event) => setSilhouetteColors(([current, end]) => [event.target.value, end])} /></label>
            <label>Final <input type="color" value={silhouetteColors[1]} onChange={(event) => setSilhouetteColors(([start]) => [start, event.target.value])} /></label>
          </div>
        </div>}
        <div className="control-section color-controls">
          <div className="control-heading"><span>{activeCategory === 'siluetas' ? '03' : '02'}</span><strong>Fondo del lienzo</strong></div>
          <div className="color-pickers">
            <label>Inicio <input type="color" value={stageColors[0]} onChange={(event) => setStageColors(([current, end]) => [event.target.value, end])} /></label>
            <label>Final <input type="color" value={stageColors[1]} onChange={(event) => setStageColors(([start]) => [start, event.target.value])} /></label>
          </div>
        </div>
        <div className="control-section">
          <div className="control-heading">
            <span>{activeCategory === 'siluetas' ? '04' : '03'}</span><strong>Añade una pieza</strong>
            <button className="remove-action" type="button" onClick={removeAccessory} disabled={!layers[activeCategory]} aria-label={`Quitar ${categoryLabels[activeCategory]}`}>Quitar <span>×</span></button>
          </div>
          <div className="category-tabs" role="tablist">
            {categoryOrder.map((category) => <button className={activeCategory === category ? 'is-active' : ''} key={category} type="button" onClick={() => setActiveCategory(category)}>{categoryLabels[category]}</button>)}
          </div>
          <div className="asset-strip accessory-strip">
            {(catalog[activeCategory] ?? []).map((item) => <button className={`asset-choice accessory-choice ${layers[activeCategory]?.id === item.id ? 'is-selected' : ''}`} key={item.id} type="button" onClick={() => chooseAccessory(item)}><img src={item.url} alt="" /></button>)}
          </div>
        </div>
      </div>
    </div>
      <span className="side-note">02 / laboratorio visual</span>
  </section>
}

export default App
