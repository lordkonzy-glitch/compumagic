/* ═══════════════════════════════════════════════
   COMPUMAGIC — js/pages/home.js
   Módulo de la Página de Inicio (Home)
   ═══════════════════════════════════════════════ */

window.Pages = window.Pages || {};

Pages.home = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const prods = APP.productos;
  const destacados = prods.filter(p => p.destacado).sort((a, b) => {
    const catOrder = { 'laptops': 1, 'mouses': 2, 'teclados': 3, 'auriculares': 4, 'audio': 5, 'accesorios': 6 };
    return (catOrder[a.categoria] || 99) - (catOrder[b.categoria] || 99);
  });
  const nuevos = prods.slice().reverse().slice(0, 4);

  // Render slides dynamically from CM_DATA.banners
  const banners = CM_DATA.banners || [];
  let bannerHTML = '';
  if (banners.length > 0) {
    const btnLabels = { 'catalogo': 'Ver Catálogo', 'cotizacion': 'Pedir Cotización', 'ofertas': 'Ver Ofertas' };
    let slidesHTML = banners.map((b, index) => `
      <div class="hero-slide-item ${index === 0 ? 'active' : ''}" style="background-image: url('${b.imagen}');">
        <div class="hero-content">
          <h1 class="hero-title">${b.titulo}</h1>
          <p class="hero-subtitle">${b.subtitulo}</p>
          <a class="btn-primary btn-lg btn-rounded" href="?page=${b.link || 'catalogo'}" onclick="navigate('${b.link || 'catalogo'}');return false">${btnLabels[b.link] || 'Ver Catálogo'}</a>
        </div>
      </div>
    `).join('');

    bannerHTML = `
      <div class="hero-slider-container">
        ${slidesHTML}
        ${banners.length > 1 ? `
          <div class="slider-arrow prev" onclick="prevHeroSlide()">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
          </div>
          <div class="slider-arrow next" onclick="nextHeroSlide()">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    bannerHTML = `
      <div class="hero-slider-container">
        <div class="hero-slide-item active" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80')">
          <div class="hero-content">
            <h1 class="hero-title">SETUP EXTREMO 2026</h1>
            <p class="hero-subtitle">Encuentra periféricos gamer y de oficina con garantía oficial.</p>
            <a class="btn-primary btn-lg btn-rounded" href="?page=catalogo" onclick="navigate('catalogo');return false">Comprar Ahora</a>
          </div>
        </div>
      </div>
    `;
  }

  // HTML Structure of the Home page
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem;">
      <!-- Hero Banner -->
      ${bannerHTML}

      <!-- Trust Info Bar -->
      <div class="info-bar mb-8">
        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div>
            <div class="info-title">Envíos a todo el Perú</div>
            <div class="info-desc">Despachos rápidos y seguros a nivel nacional</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <div class="info-title">Garantía Oficial</div>
            <div class="info-desc">Productos 100% originales con garantía local</div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <div class="info-title">Soporte Especializado</div>
            <div class="info-desc">Asesoría técnica post-venta gratuita</div>
          </div>
        </div>
      </div>

      <!-- Categories Shortcuts -->
      <section class="cm-section" style="padding-top: 1rem; padding-bottom: 2rem;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Comprar por Categorías</h2>
            <p class="section-subtitle">Encuentra laptops, mouses, teclados, auriculares y accesorios</p>
          </div>
        </div>
        <div class="grid grid-4">
          <div class="cm-card cm-card-hover text-center" onclick="navigate('categoria-laptops')" style="cursor:pointer; padding: 2rem 1.5rem;">
            <div class="info-icon" style="margin: 0 auto 1rem auto; width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <path d="M2 20h20M5 17h14"/>
              </svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;margin-bottom:0.25rem">Laptops Gamer</h3>
            <p style="font-size:0.8rem;color:var(--text-muted)">Portátiles de alto rendimiento para gaming y productividad.</p>
          </div>

          <div class="cm-card cm-card-hover text-center" onclick="navigate('categoria-mouses')" style="cursor:pointer; padding: 2rem 1.5rem;">
            <div class="info-icon" style="margin: 0 auto 1rem auto; width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <rect x="6" y="3" width="12" height="18" rx="6" />
                <path d="M12 3v7M6 10h12" />
              </svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;margin-bottom:0.25rem">Mouses Gaming</h3>
            <p style="font-size:0.8rem;color:var(--text-muted)">Sensores de alta gama, inalámbricos y ultraligeros.</p>
          </div>

          <div class="cm-card cm-card-hover text-center" onclick="navigate('categoria-teclados')" style="cursor:pointer; padding: 2rem 1.5rem;">
            <div class="info-icon" style="margin: 0 auto 1rem auto; width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <path d="M6 9h2M11 9h2M16 9h2M6 14h12" />
              </svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;margin-bottom:0.25rem">Teclados Mecánicos</h3>
            <p style="font-size:0.8rem;color:var(--text-muted)">Switches de alto rendimiento, compactos y full size.</p>
          </div>

          <div class="cm-card cm-card-hover text-center" onclick="navigate('categoria-auriculares')" style="cursor:pointer; padding: 2rem 1.5rem;">
            <div class="info-icon" style="margin: 0 auto 1rem auto; width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:28px;height:28px">
                <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1m-14 0h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z" />
              </svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;margin-bottom:0.25rem">Auriculares Gaming</h3>
            <p style="font-size:0.8rem;color:var(--text-muted)">Sonido envolvente, micrófonos con cancelación de ruido.</p>
          </div>
        </div>
      </section>

      <!-- Promo Grid -->
      <div class="promo-grid mb-8">
        <!-- Laptops Gaming Card -->
        <div class="promo-card" onclick="navigate('categoria-laptops')">
          <div class="promo-bg" style="background-image: url('img/promo_laptops.png')"></div>
          <div class="promo-overlay" style="background: linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.2) 100%);"></div>
          <div class="promo-content">
            <div class="badge mb-2" style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); width: fit-content;">Nueva Categoría</div>
            <h3 class="promo-title">LAPTOPS GAMING PRO</h3>
            <p class="promo-desc">Rendimiento extremo con Lenovo Legion, Asus ROG y Dell Alienware.</p>
            <span class="btn-primary btn-sm btn-rounded" style="padding: 0.4rem 1.1rem; font-size: 0.8rem; width: fit-content; display: inline-flex;">Ver Laptops</span>
          </div>
        </div>
        
        <!-- PC Build Quote Card -->
        <div class="promo-card" onclick="navigate('cotizacion')">
          <div class="promo-bg" style="background-image: url('img/promo_cotiza.png')"></div>
          <div class="promo-overlay" style="background: linear-gradient(90deg, rgba(21, 32, 43, 0.95) 0%, rgba(21, 32, 43, 0.7) 50%, rgba(21, 32, 43, 0.2) 100%);"></div>
          <div class="promo-content">
            <div class="badge mb-2" style="background: rgba(33, 166, 219, 0.2); color: #38bdf8; border: 1px solid rgba(33, 166, 219, 0.3); width: fit-content;">Asesoría Gratis</div>
            <h3 class="promo-title">COTIZA TU SETUP</h3>
            <p class="promo-desc">Arma tu PC ideal con el apoyo y asesoría de nuestros técnicos expertos.</p>
            <span class="btn-primary btn-sm btn-rounded" style="padding: 0.4rem 1.1rem; font-size: 0.8rem; width: fit-content; display: inline-flex; background: var(--brand-yellow); color: var(--brand-blue-dark);">Pedir Cotización</span>
          </div>
        </div>
      </div>

      <!-- Featured Products -->
      <section class="cm-section">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:1.5rem;">
          <div>
            <h2 class="section-title">Productos Destacados</h2>
            <p class="section-subtitle">Los periféricos más vendidos y recomendados</p>
          </div>
          <div>
            <a class="btn-outline btn-sm" href="?page=catalogo" onclick="navigate('catalogo');return false">Ver Todo</a>
          </div>
        </div>
        
        <div style="position: relative;">
          <!-- Left Slide Arrow (Translucent, centered on product image height) -->
          <button class="featured-slider-arrow prev" onclick="scrollFeatured(-1)" aria-label="Anterior">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <!-- Right Slide Arrow (Translucent, centered on product image height) -->
          <button class="featured-slider-arrow next" onclick="scrollFeatured(1)" aria-label="Siguiente">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div id="featured-slider" class="featured-slider-container" style="overflow: hidden; width: 100%;">
            <div class="featured-slider-track" style="display: flex; gap: 1.5rem; overflow-x: auto; scroll-behavior: smooth; padding: 0.5rem 0.25rem 1.5rem 0.25rem; margin: 0 -0.25rem -0.5rem -0.25rem; -ms-overflow-style: none; scrollbar-width: none;">
              ${destacados.map(p => `
                <div class="featured-slider-item">
                  ${productCardHTML(p)}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Products -->
      <section class="cm-section" style="padding-top: 0;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Nuevos Ingresos</h2>
            <p class="section-subtitle">Los últimos ingresos en nuestro catálogo</p>
          </div>
        </div>
        <div class="grid grid-4">
          ${nuevos.map(p => productCardHTML(p)).join('')}
        </div>
      </section>

      <!-- Trust & Philosophy -->
      <section class="cm-card bg-linen text-center" style="padding: 4rem 2rem; margin-top: 2rem;">
        <h2 style="font-family:'Outfit',sans-serif;font-size:2rem;font-weight:800;color:var(--text-primary);margin-bottom:1rem">
          ¿Por qué elegir COMPUMAGIC?
        </h2>
        <p style="max-width:700px;margin:0 auto 2rem auto;color:var(--text-secondary);line-height:1.7">
          Somos especialistas en tecnología y periféricos. Ofrecemos asesoramiento en tu compra, productos nuevos con garantía oficial local y envíos rápidos a todo el Perú.
        </p>
        <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap">
          <a class="btn-primary btn-rounded" href="?page=catalogo" onclick="navigate('catalogo');return false">Explorar el catálogo</a>
          <a class="btn-outline btn-rounded" href="?page=nosotros" onclick="navigate('nosotros');return false">Conocer más de nosotros</a>
        </div>
      </section>
    </div>
  `;
  // Iniciar slider si hay más de 1 slide
  setTimeout(() => {
    initHeroSlider();
  }, 100);
};

// ── LÓGICA DEL HERO SLIDER ──
window.currentHeroSlide = 0;
window.heroSliderInterval = null;

window.initHeroSlider = function() {
  const slides = document.querySelectorAll('.hero-slide-item');
  if (slides.length <= 1) return;
  
  if (window.heroSliderInterval) {
    clearInterval(window.heroSliderInterval);
  }
  
  window.heroSliderInterval = setInterval(() => {
    // Si ya no estamos en la página de inicio, detener el intervalo
    if (!document.querySelector('.hero-slider-container')) {
      clearInterval(window.heroSliderInterval);
      return;
    }
    nextHeroSlide();
  }, 5000); // Cambia cada 5 segundos
};

window.nextHeroSlide = function() {
  const slides = document.querySelectorAll('.hero-slide-item');
  if (slides.length <= 1) return;
  
  slides[currentHeroSlide].classList.remove('active');
  currentHeroSlide = (currentHeroSlide + 1) % slides.length;
  slides[currentHeroSlide].classList.add('active');
  resetHeroSliderInterval();
};

window.prevHeroSlide = function() {
  const slides = document.querySelectorAll('.hero-slide-item');
  if (slides.length <= 1) return;
  
  slides[currentHeroSlide].classList.remove('active');
  currentHeroSlide = (currentHeroSlide - 1 + slides.length) % slides.length;
  slides[currentHeroSlide].classList.add('active');
  resetHeroSliderInterval();
};

window.resetHeroSliderInterval = function() {
  if (window.heroSliderInterval) {
    clearInterval(window.heroSliderInterval);
    window.heroSliderInterval = setInterval(() => {
      if (!document.querySelector('.hero-slider-container')) {
        clearInterval(window.heroSliderInterval);
        return;
      }
      nextHeroSlide();
    }, 5000);
  }
};

window.scrollFeatured = function(direction) {
  const track = document.querySelector('.featured-slider-track');
  if (!track) return;
  const card = track.querySelector('.featured-slider-item');
  if (!card) return;
  const scrollAmount = (card.offsetWidth + 24) * direction;
  track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};
