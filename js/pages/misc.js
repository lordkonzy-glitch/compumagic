/* =============================================== ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
   COMPUMAGIC = js/pages/misc.js
   Módulos de Nosotros, Contacto, Blog, Blog Detalle,
   Soporte, Garantías, Privacidad, Libro de Reclamaciones,
   Pedir Cotización y Panel de Administración
   ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="= */

window.Pages = window.Pages || {};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 1. PÁGINA: NOSOTROS
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.nosotros = function() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">


      <!-- ── ENCABEZADO NOSOTROS ── -->
      <div style="margin-bottom:2.5rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border-light);">
        <nav class="breadcrumb" style="margin-bottom:0.75rem;">
          <a href="?page=home" onclick="navigate('home');return false" class="hover-underline">Inicio</a>
          <span class="breadcrumb-separator">/</span>
          <span style="color:var(--text-primary); font-weight:600;">Nosotros</span>
        </nav>
        <div style="display:flex; align-items:center; gap:1rem;">
          <div style="width:5px; height:2.75rem; background:var(--electric-blue); border-radius:99px; flex-shrink:0;"></div>
          <h1 class="section-title" style="margin:0;">Sobre COMPUMAGIC</h1>
        </div>
      </div>


      <!-- ── MISIÓN + IMAGEN ── -->
      <div class="product-cols" style="align-items:center; margin-bottom:3rem;">
        <div>
          <h2 style="font-family:'Outfit',sans-serif; font-size:1.75rem; font-weight:800; color:var(--text-primary); margin-bottom:1rem; line-height:1.2;">
            Nuestra <span style="color:var(--electric-blue);">Misión</span>
          </h2>
          <p style="margin-bottom:1.25rem; line-height:1.8; color:var(--text-secondary);">
            COMPUMAGIC es una empresa fundada en el año 2016, dedicada a ofrecer los mejores accesorios y periféricos informáticos a nivel local y nacional.
          </p>
          <p style="margin-bottom:1.75rem; line-height:1.8; color:var(--text-secondary);">
            Atendemos con orgullo a usuarios domésticos, estudiantes, gamers, empresas privadas e instituciones públicas. Una de nuestras principales fortalezas es el conocimiento en trámites administrativos para el sector público y contar con personal en constante capacitación.
          </p>
          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <a class="btn-primary btn-rounded" href="?page=catalogo" onclick="navigate('catalogo');return false">Ver catálogo</a>
            <a class="btn-outline btn-rounded" href="?page=cotizacion" onclick="navigate('cotizacion');return false">Pedir cotización</a>
          </div>
        </div>
        <div class="cm-card nosotros-img-card" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-md)';">
          <img src="img/tienda.jpg" alt="Tienda Principal COMPUMAGIC" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.src='img/nosotros.jpg'; this.onerror=null;">
          <div style="position:absolute; bottom:0; left:0; width:100%; background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); padding:2rem 1.5rem 1.2rem; display:flex; flex-direction:column; justify-content:flex-end;">
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
              <span style="background:var(--electric-blue); color:white; font-size:0.7rem; font-weight:700; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px;">Tienda Principal</span>
            </div>
            <h3 style="color:#ffffff; margin:0 0 0.25rem 0; font-family:'Outfit',sans-serif; font-size:1.5rem; font-weight:700; text-shadow:0 2px 4px rgba(0,0,0,0.5);">Encuéntranos en Tacna</h3>
            <p style="color:#e2e8f0; margin:0; font-size:0.9rem; line-height:1.4;">Int. Mercadillo Bolognesi A-48, Av. Coronel Mendoza N.° 1945</p>
          </div>
        </div>
      </div>



      <!-- ── DIVISOR ── -->
      <div style="border-top:1px solid var(--border-light); margin:1rem 0 3rem;"></div>

      <!-- ── CONTACTO Y UBICACIÓN ── -->
      <section>
        <div class="section-header" style="margin-bottom:2rem;">
          <div>
            <h2 class="section-title" style="font-size:1.5rem;">Encuéntranos</h2>
            <p class="section-subtitle">Visítanos en tienda o escríbenos por WhatsApp</p>
          </div>
          <a href="https://wa.me/51925000899?text=Hola%20Alex,%20me%20comunico%20desde%20la%20web%20de%20COMPUMAGIC" target="_blank" rel="noopener"
            class="btn-primary btn-rounded"
            style="display:inline-flex; align-items:center; gap:0.5rem; background:#059669; border-color:#059669; white-space:nowrap;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Chatear por WhatsApp
          </a>
        </div>

        <div class="info-bar-fluid">
          <!-- Tienda -->
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div class="info-title">Nuestra Tienda</div>
              <div class="info-desc">Int. Mercadillo Bolognesi A-48<br>Av. Coronel Mendoza N.° 1945, Tacna</div>
            </div>
          </div>
          <!-- Teléfono principal -->
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.09 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 6.21 6.21l.85-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <div class="info-title">+51 988 663 869</div>
              <div class="info-desc">Teléfono Principal</div>
            </div>
          </div>
          <!-- Teléfono Alex -->
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.09 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 6.21 6.21l.85-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <div class="info-title">+51 925 000 899</div>
              <div class="info-desc">Asesor: Alex (WhatsApp)</div>
            </div>
          </div>
          <!-- Horario -->
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div class="info-title">Lun – Sáb: 10:00–20:00</div>
              <div class="info-desc">Domingo: Cerrado</div>
            </div>
          </div>
          <!-- Correo -->
          <div class="info-card">
            <div class="info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div class="info-title" style="word-break: break-word; overflow-wrap: break-word;">compumagicimportaciones@gmail.com</div>
              <div class="info-desc">Respuesta en minutos</div>
            </div>
          </div>
        </div>

        <!-- Mapa Optimizado con Carga Diferida -->
        <div class="cm-card" id="map-deferred-container" style="padding:0; overflow:hidden; height:380px; position:relative; background:var(--bg-muted); display:flex; align-items:center; justify-content:center;">
          <!-- Visual Placeholder: Se muestra inmediatamente, evitando descargas de scripts de Google en la carga inicial -->
          <div id="map-placeholder" style="text-align:center; color:var(--text-muted); font-size:0.9rem; z-index: 1;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color:var(--electric-blue); margin-bottom:8px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div style="font-weight:600; font-family:'Outfit',sans-serif; color:var(--text-primary);">Cargando mapa interactivo...</div>
            <div style="font-size:0.75rem; margin-top:2px;">Se activará al desplazarse aquí</div>
          </div>
          
          <!-- Overlay de Datos -->
          <div style="position:absolute; bottom:16px; left:16px; right:16px; background:var(--bg-surface); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; box-shadow:var(--shadow-lg); z-index: 2;">
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <div style="width:36px; height:36px; background:var(--electric-blue-light); color:var(--electric-blue); border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style="font-weight:700; color:var(--text-primary); font-family:'Outfit',sans-serif; font-size:0.9rem;">Mercadillo Bolognesi A-16, Tacna</div>
                <div style="font-size:0.78rem; color:var(--text-muted);">Haz clic para abrir en Google Maps</div>
              </div>
            </div>
            <a href="https://maps.google.com/maps?q=Mercadillo+Bolognesi+Tacna+Peru" target="_blank" rel="noopener"
              class="btn-primary btn-sm btn-rounded"
              style="display:inline-flex; align-items:center; gap:0.4rem; white-space:nowrap;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Navegar con Maps
            </a>
          </div>
        </div>
      </section>

    </div>
  `;

  // OPTIMIZACIÓN GOOGLE MAPS: Iniciamos IntersectionObserver para inyectar el iframe del mapa
  // únicamente cuando el usuario haga scroll y se acerque a este bloque, reduciendo el peso de carga inicial.
  setTimeout(() => {
    const target = document.getElementById('map-deferred-container');
    if (target) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Creamos e insertamos el iframe dinámicamente
            const iframe = document.createElement('iframe');
            iframe.src = "https://maps.google.com/maps?q=Mercadillo+Bolognesi+Tacna+Peru&t=m&z=17&ie=UTF8&iwloc=&output=embed";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.style.border = "0";
            iframe.style.display = "block";
            iframe.style.position = "absolute";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.zIndex = "0";
            iframe.allowFullscreen = "";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            iframe.title = "Ubicación COMPUMAGIC — Mercadillo Bolognesi, Tacna";
            
            // Cuando el mapa termine de cargar, removemos la animación/placeholder
            iframe.onload = () => {
              const ph = document.getElementById('map-placeholder');
              if (ph) ph.remove();
            };
            
            target.appendChild(iframe);
            obs.unobserve(target);
          }
        });
      }, { rootMargin: '120px' });
      observer.observe(target);
    }
  }, 100);
};


// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 2. PÁGINA: CONTACTO
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.contacto = function() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <h1 class="section-title mb-2">Contacto</h1>
      <p class="section-subtitle mb-8">¿Tienes alguna consulta? Escríbenos y te responderemos en minutos</p>

      <div class="product-cols">
        <!-- Formulario -->
        <form class="cm-card" style="display:flex; flex-direction:column; gap:1.25rem;" onsubmit="handleContactSubmit(event)">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">Formulario de Contacto</h3>
          
          <div class="form-group">
            <label class="form-label">Nombre Completo</label>
            <input type="text" id="contact-name" class="cm-input" placeholder="Ingresa tu nombre" required>
          </div>
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" id="contact-email" class="cm-input" placeholder="correo@ejemplo.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Mensaje o Consulta</label>
            <textarea id="contact-msg" class="cm-textarea" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </div>
          <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700;">Enviar mensaje</button>
        </form>

        <!-- Información -->
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <div class="cm-card">
            <h4 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.5rem;">Nuestra Oficina & Almacén</h4>
            <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">
              Int. Mercadillo Bolognesi A-48<br>
              Av. Coronel Mendoza N.° 1945, Tacna - Perú
            </p>
          </div>
          <div class="cm-card">
            <h4 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.5rem;">Atención al Cliente</h4>
            <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">
              Lunes a Sábado: 10:00 AM - 8:00 PM<br>
              Celular: 988 663 869<br>
              Alex (Asesor): 925 000 899<br>
              Correo: compumagicimportaciones@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.handleContactSubmit = async function(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-msg');
  
  const nombre = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const mensaje = msgInput ? msgInput.value.trim() : '';
  
  if (!nombre || !email || !mensaje) {
    showToast('Por favor completa todos los campos', 'error');
    return;
  }
  
  try {
    const response = await fetch('backend/db_config.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, mensaje })
    });
    
    const result = await response.json();
    
    if (result && !result.error) {
      showToast(result.mensaje || '¡Mensaje enviado con éxito!', 'success');
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (msgInput) msgInput.value = '';
    } else {
      showToast(result.mensaje || 'Hubo un error al enviar el mensaje', 'error');
    }
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    showToast('Error de conexión con el servidor. Tu mensaje no se pudo guardar.', 'error');
  }
};


// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 3. PÁGINA: BLOG (ARTÍCULOS)
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.blog = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const posts = APP.blog;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <h1 class="section-title mb-2">Blog COMPUMAGIC</h1>
      <p class="section-subtitle mb-8">Consejos, análisis técnicos de hardware e información relevante sobre esports</p>

      <div class="grid grid-2">
        ${posts.map(p => `
          <article class="cm-card" style="display:flex; flex-direction:column; padding:0; overflow:hidden; cursor:pointer;" onclick="navigate('blog-post', {id:'${p.id}'})">
            <div style="height:200px; width:100%; background:var(--bg-muted);">
              <img src="${p.imagen}" alt="${p.titulo}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div style="padding:1.5rem; display:flex; flex-direction:column; flex:1;">
              <span style="font-size:11px; font-weight:700; color:var(--electric-blue); text-transform:uppercase; margin-bottom:0.5rem;">${p.categoria}</span>
              <h2 style="font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:800; color:var(--text-primary); line-height:1.3; margin-bottom:0.5rem;" class="line-clamp-2">${p.titulo}</h2>
              <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.5rem; flex:1;" class="line-clamp-2">${p.resumen}</p>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--text-light); border-top:1px solid var(--border-light); padding-top:0.75rem;">
                <span>Por ${p.autor}</span>
                <span>${p.fecha}</span>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 4. PÁGINA: DETALLE DE ARTÍCULO DE BLOG
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.blogPost = function(id) {
  const app = document.getElementById('app');
  if (!app) return;

  const post = APP.blog.find(x => x.id === id);
  if (!post) {
    navigate('blog');
    return;
  }

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:800px;">
      <nav class="breadcrumb">
        <a href="?page=home" onclick="navigate('home');return false" class="hover-underline">Inicio</a>
        <span class="breadcrumb-separator">/</span>
        <a href="?page=blog" onclick="navigate('blog');return false" class="hover-underline">Blog</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color:var(--text-primary); font-weight:600;">Artículo</span>
      </nav>

      <span style="font-size:11px; font-weight:700; color:var(--electric-blue); text-transform:uppercase; margin-bottom:0.5rem; display:block;">${post.categoria}</span>
      <h1 style="font-family:'Outfit',sans-serif; font-size:2.25rem; font-weight:800; color:var(--text-primary); line-height:1.2; margin-bottom:1rem;">${post.titulo}</h1>
      
      <div style="display:flex; gap:1rem; align-items:center; font-size:12px; color:var(--text-muted); margin-bottom:2rem; border-bottom:1px solid var(--border-light); padding-bottom:1rem;">
        <span>Escrito por <b>${post.autor}</b></span>
        <span>⬢</span>
        <span>Publicado el <b>${post.fecha}</b></span>
      </div>

      <div class="blog-post-img-container">
        <img src="${post.imagen}" alt="${post.titulo}" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
      </div>

      <div style="line-height:1.8; font-size:1.05rem; color:var(--text-secondary); margin-bottom:3rem;">
        <p style="margin-bottom:1.5rem;">${post.contenido}</p>
        <p>Los detalles técnicos importan. En COMPUMAGIC creemos que configurar tu hardware correctamente es tan valioso como adquirirlo. Mantente atento a nuestras próximas guías sobre calibración y software.</p>
      </div>

      <!-- Comentarios -->
      <section class="cm-card" style="padding:2rem;">
        <h3 style="font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.75rem; margin-bottom:1.25rem;">
          Comentarios (${post.comentarios.length})
        </h3>
        
        ${post.comentarios.length === 0 ? `
          <p style="color:var(--text-muted); font-size:0.875rem; font-style:italic;">No hay comentarios todavía. ¡Sé el primero en comentar!</p>
        ` : `
          <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
            ${post.comentarios.map(c => `
              <div class="review-row">
                <div style="width:36px; height:36px; border-radius:50%; background:var(--bg-muted); display:flex; align-items:center; justify-content:center; font-weight:700;">${c.nombre[0]}</div>
                <div>
                  <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary);">${c.nombre} <span style="font-weight:400; color:var(--text-light); font-size:10px; margin-left:0.5rem;">${c.fecha}</span></div>
                  <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.25rem;">${c.texto}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `}

        <form onsubmit="handleCommentSubmit(event, '${post.id}')" style="display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem; border-top:1px dashed var(--border-light); padding-top:1.5rem;">
          <h4 style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">Añadir un comentario</h4>
          <div class="form-grid">
            <input type="text" id="comment-name" class="cm-input" placeholder="Tu Nombre" required>
            <input type="email" id="comment-email" class="cm-input" placeholder="correo@ejemplo.com" required>
          </div>
          <textarea id="comment-text" class="cm-textarea" placeholder="Escribe tu comentario..." required></textarea>
          <button type="submit" class="btn-primary" style="width:fit-content; align-self:flex-end;">Enviar Comentario</button>
        </form>
      </section>
    </div>
  `;
};

window.handleCommentSubmit = function(e, id) {
  e.preventDefault();
  const name = document.getElementById('comment-name').value.trim();
  const email = document.getElementById('comment-email').value.trim();
  const txt = document.getElementById('comment-text').value.trim();

  const posts = APP.blog;
  const post = posts.find(x => x.id === id);
  if (post) {
    post.comentarios.push({
      nombre: name,
      texto: txt,
      fecha: new Date().toISOString().split('T')[0]
    });
    APP.save('cm_blog', posts);
    showToast('Comentario añadido', 'success');
    Pages.blogPost(id);
  }
};


// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 5. PÁGINA: SOPORTE
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.soporte = function() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <h1 class="section-title mb-2">Soporte Técnico</h1>
      <p class="section-subtitle mb-8">Asesoría de software, controladores de macros, configuración RGB y posventa</p>

      <div class="product-cols">
        <!-- Crear ticket -->
        <form class="cm-card" style="display:flex; flex-direction:column; gap:1.25rem;" onsubmit="handleSupportSubmit(event)">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
            Generar Ticket de Soporte
          </h3>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nombre Completo</label>
              <input type="text" id="sup-name" class="cm-input" placeholder="Nombre" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nro. de Teléfono</label>
              <input type="tel" id="sup-phone" class="cm-input" placeholder="Teléfono" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Periférico / Modelo</label>
            <input type="text" id="sup-model" class="cm-input" placeholder="Ej: Logitech G502 Hero" required>
          </div>
          <div class="form-group">
            <label class="form-label">Detalle del Problema</label>
            <textarea id="sup-desc" class="cm-textarea" placeholder="Explica la falla técnica o la duda de software..." required></textarea>
          </div>
          <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700;">Enviar ticket a soporte</button>
        </form>

        <!-- FAQs / Enlaces de Interés -->
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <div class="cm-card">
            <h4 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">Controladores Oficiales</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.875rem;">
              <a href="https://www.logitechg.com/es-es/innovation/g-hub.html" target="_blank" rel="noopener" class="link-accent">Logitech G HUB (Mouses/Teclados Logitech)</a>
              <a href="https://www.razer.com/synapse-3" target="_blank" rel="noopener" class="link-accent">Razer Synapse 3 (Mouses/Teclados Razer)</a>
              <a href="https://row.hyperx.com/pages/ngenuity" target="_blank" rel="noopener" class="link-accent">HyperX NGENUITY (Auriculares/Teclados HyperX)</a>
            </div>
          </div>
          <div class="cm-card">
            <h4 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.5rem;">Atención Directa</h4>
            <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6;">
              Si necesitas soporte en tiempo real o videollamada para verificar una falla técnica, contáctanos por WhatsApp.
              <a href="https://wa.me/51925000899?text=Hola%20Alex,%20necesito%20soporte%20t%C3%A9cnico%20con%20un%20perif%C3%A9rico" target="_blank" class="btn-outline btn-sm btn-full mt-2" style="justify-content:center; color:#25D366; border-color:#25D366;">WhatsApp Soporte — Alex (+51 925 000 899)</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
};

window.handleSupportSubmit = function(e) {
  e.preventDefault();
  showToast('Ticket generado. Un técnico se contactará por WhatsApp.', 'success');
  document.getElementById('sup-name').value = '';
  document.getElementById('sup-phone').value = '';
  document.getElementById('sup-model').value = '';
  document.getElementById('sup-desc').value = '';
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 6. PÁGINAS DE POLÍTICAS: GARANTÍAS Y PRIVACIDAD
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.garantias = function() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:800px;">
      <h1 class="section-title mb-4">Políticas de Garantía</h1>
      <div class="cm-card" style="line-height:1.8; color:var(--text-secondary);">
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">1. Cobertura Estándar</h3>
        <p style="margin-bottom:1.5rem;">Todos los productos adquiridos en COMPUMAGIC cuentan con <b>12 meses de garantía oficial</b> contra defectos de fábrica, contados desde la fecha de emisión del comprobante.</p>
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">2. Exclusiones de Garantía</h3>
        <p style="margin-bottom:1.5rem;">La garantía quedará sin efecto en caso de daños causados por caídas físicas, manipulación indebida de circuitos internos, derrame de líquidos sobre componentes, rotura de cables trenzados por tirón o manipulación por técnicos ajenos a nuestra empresa.</p>
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">3. Proceso de Validación</h3>
        <p>Para aplicar a la garantía, envíe su ticket de soporte detallando el fallo. Deberá hacernos llegar el periférico en su empaque original con manuales intactos a nuestro Centro Tecnológico en Tacna para el peritaje técnico correspondiente.</p>
      </div>
    </div>
  `;
};

Pages.privacidad = function() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:800px;">
      <h1 class="section-title mb-4">Políticas de Privacidad</h1>
      <div class="cm-card" style="line-height:1.8; color:var(--text-secondary);">
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">1. Recopilación de Datos</h3>
        <p style="margin-bottom:1.5rem;">En COMPUMAGIC, recopilamos información personal básica (nombre, email, teléfono, dirección) con el único fin de procesar y despachar tus pedidos de hardware.</p>
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">2. Uso y Protección</h3>
        <p style="margin-bottom:1.5rem;">No vendemos ni alquilamos tu información personal a terceras empresas. Toda transacción en nuestra plataforma se procesa de forma segura a través de almacenamiento local o cifrado.</p>
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">3. Derechos del Usuario</h3>
        <p>Podrás solicitar la eliminación permanente de tu cuenta y de tu historial de pedidos de nuestra base de datos en cualquier momento enviando un correo a soporte@compumagic.com.</p>
      </div>
    </div>
  `;
};

Pages.terminos = function() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:800px;">
      <h1 class="section-title mb-4">Términos y Condiciones</h1>
      <div class="cm-card" style="line-height:1.8; color:var(--text-secondary);">
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">1. Introducción</h3>
        <p style="margin-bottom:1.5rem;">Bienvenido a COMPUMAGIC. Al acceder y realizar compras en nuestra plataforma web, aceptas cumplir y estar sujeto a los siguientes términos y condiciones de servicio.</p>
        
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">2. Precios y Stock</h3>
        <p style="margin-bottom:1.5rem;">Todos los precios indicados en la web están expresados en Soles Peruanos (S/) e incluyen los impuestos correspondientes. El stock está sujeto a disponibilidad y confirmación. En caso de no contar con el stock de un producto pagado, se ofrecerá un cambio de modelo o el reembolso inmediato del monto.</p>
        
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">3. Despacho y Envíos</h3>
        <p style="margin-bottom:1.5rem;">Realizamos envíos a nivel nacional a través de agencias autorizadas como Olva Courier y Shalom. Los tiempos de despacho varían según el destino (usualmente entre 24 a 72 horas hábiles). COMPUMAGIC no se responsabiliza por demoras atribuibles directamente a las empresas de transporte externo.</p>
        
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">4. Garantía y Devoluciones</h3>
        <p style="margin-bottom:1.5rem;">Los periféricos y componentes informáticos cuentan con la garantía oficial indicada en la boleta/factura y en nuestras políticas de garantía. Las devoluciones se aceptarán dentro de los 7 días hábiles posteriores a la entrega, siempre y cuando el producto se encuentre cerrado en su empaque original, con todos sus sellos de seguridad intactos y sin indicios de uso.</p>
        
        <h3 style="font-family:'Outfit',sans-serif; font-weight:800; color:var(--text-primary); margin-bottom:0.75rem;">5. Modificaciones de los Términos</h3>
        <p>COMPUMAGIC se reserva el derecho de modificar estos términos en cualquier momento. Le recomendamos revisar este documento de manera periódica para estar al tanto de cualquier cambio.</p>
      </div>
    </div>
  `;
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 7. PÁGINA: LIBRO DE RECLAMACIONES
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.libroReclamaciones = function() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:700px;">
      <h1 class="section-title mb-2">Libro de Reclamaciones</h1>
      <p class="section-subtitle mb-8">Conforme al Código de Protección y Defensa del Consumidor del Perú (INDECOPI)</p>

      <form class="cm-card" style="display:flex; flex-direction:column; gap:1.25rem;" onsubmit="handleClaimSubmit(event)">
        <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
          Hoja de Reclamación Virtual
        </h3>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Nombre Completo *</label>
            <input type="text" id="cl-name" class="cm-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">DNI / CE *</label>
            <input type="text" id="cl-dni" class="cm-input" placeholder="8 dígitos" required>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Correo Electrónico *</label>
            <input type="email" id="cl-email" class="cm-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Teléfono *</label>
            <input type="tel" id="cl-phone" class="cm-input" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tipo de Reclamo *</label>
          <select id="cl-type" class="cm-input" style="cursor:pointer;" required>
            <option value="Reclamo">Reclamo (Disconformidad relacionada con el producto)</option>
            <option value="Queja">Queja (Disconformidad respecto a la atención recibida)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción de lo ocurrido *</label>
          <textarea id="cl-desc" class="cm-textarea" placeholder="Explica de manera detallada lo ocurrido..." required></textarea>
        </div>

        <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700;">Enviar hoja de reclamación</button>
      </form>
    </div>
  `;
};

window.handleClaimSubmit = function(e) {
  e.preventDefault();
  const cod = 'REC-' + Math.floor(100000 + Math.random() * 900000);
  showToast(`Reclamación enviada. Código: ${cod}. Se responderá en un plazo máximo de 15 días hábiles.`, 'success');
  document.getElementById('cl-name').value = '';
  document.getElementById('cl-dni').value = '';
  document.getElementById('cl-email').value = '';
  document.getElementById('cl-phone').value = '';
  document.getElementById('cl-desc').value = '';
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// 8. PÁGINA: PEDIR COTIZACIÓN (CUSTOM SETUP)
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
Pages.cotizacion = function() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem; max-width:700px;">
      <h1 class="section-title mb-2">Pedir Cotización Especial</h1>
      <p class="section-subtitle mb-8">¿Deseas equipar tu cibercafé, oficina, setup gamer completo o solicitar importación especial?</p>

      <form class="cm-card" style="display:flex; flex-direction:column; gap:1.25rem;" onsubmit="handleQuoteSubmit(event)">
        <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.5rem;">
          Solicitud de Cotización Personalizada
        </h3>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Nombre o Razón Social *</label>
            <input type="text" id="qt-name" class="cm-input" placeholder="Nombre completo o Empresa" required>
          </div>
          <div class="form-group">
            <label class="form-label">WhatsApp de Contacto *</label>
            <input type="tel" id="qt-phone" class="cm-input" placeholder="9XXXXXXXX" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Presupuesto Estimado (S/) *</label>
          <select id="qt-budget" class="cm-input" style="cursor:pointer;" required>
            <option value="Menos de S/ 500">Menos de S/ 500</option>
            <option value="S/ 500 a S/ 1500">S/ 500 a S/ 1,500</option>
            <option value="S/ 1500 a S/ 4000">S/ 1,500 a S/ 4,000</option>
            <option value="Más de S/ 4000">Más de S/ 4,000 (Corporativo / Setup Elite)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Describe los periféricos y cantidades solicitadas *</label>
          <textarea id="qt-desc" class="cm-textarea" placeholder="Ej: 10 Mouses Logitech G502 Hero, 10 Teclados Corsair K70. Coordinar descuento por lote..." required></textarea>
        </div>

        <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700;">Enviar solicitud de cotización</button>
      </form>
    </div>
  `;
};

window.handleQuoteSubmit = function(e) {
  e.preventDefault();
  showToast('Cotización recibida. Un ejecutivo comercial le escribirá por WhatsApp.', 'success');
  document.getElementById('qt-name').value = '';
  document.getElementById('qt-phone').value = '';
  document.getElementById('qt-desc').value = '';
};

// =====================================================================
// 10. PÁGINA: OFERTAS
// =====================================================================
window.copyCouponCode = function(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.style.backgroundColor = 'var(--green)';
    btn.style.borderColor = 'var(--green)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
      btn.style.borderColor = '';
    }, 2000);
    showToast('Código de cupón copiado: ' + code, 'success');
  }).catch(err => {
    console.error('Error al copiar:', err);
    showToast('No se pudo copiar el código', 'error');
  });
};

Pages.ofertas = function() {
  const app = document.getElementById('app');
  if (!app) return;

  window._currentOfertasCategory = 'todos';

  // Filtrar productos con descuento
  const products = APP.productos || [];
  const onSaleProducts = products.filter(p => p.precioOriginal && p.precioOriginal > p.precio);

  // Categorías de los productos en oferta
  const categoriesInOffer = ['todos', ...new Set(onSaleProducts.map(p => p.categoria))];

  const catNames = {
    'todos': 'Todos',
    'mouses': 'Mouses',
    'teclados': 'Teclados',
    'auriculares': 'Audio',
    'laptops': 'Laptops',
    'accesorios': 'Accesorios',
    'audio': 'Audio'
  };

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <nav class="breadcrumb" style="margin-bottom: 0.75rem;">
        <a href="?page=home" onclick="navigate('home');return false" class="hover-underline">Inicio</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color: var(--text-primary); font-weight: 600;">Ofertas</span>
      </nav>

      <!-- Rediseño del Banner: limpio, minimalista, estilo light y con temporizador premium -->
      <div class="offers-banner" style="background: var(--bg-surface); border: 1px solid var(--border-light); padding: 2.5rem 2rem; border-radius: var(--radius-lg); margin-bottom: 2.5rem; text-align: center; box-shadow: var(--shadow-sm); position: relative;">
        <span style="background: var(--brand-blue-dark); color: #FFFFFF; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-xl); text-transform: uppercase; letter-spacing: 0.8px; display: inline-block; margin-bottom: 1rem;">Descuentos Especiales</span>
        <h1 style="font-family: 'Outfit', sans-serif; font-size: 2.25rem; font-weight: 900; color: var(--text-primary); margin: 0 0 0.5rem 0; letter-spacing: -0.5px;">Zona de Ahorro Magic</h1>
        <p style="color: var(--text-muted); font-size: 1rem; max-width: 600px; margin: 0 auto 1.5rem auto; line-height: 1.5;">Descuentos exclusivos de hasta 40% en periféricos y laptops gamer por tiempo limitado.</p>
        
        <!-- Temporizador de Oferta (Countdown Timer) -->
        <div style="display:flex; justify-content:center; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-top:1.5rem;">
          <span style="font-weight:700; font-size:0.875rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; margin-right:0.5rem;">La oferta termina en:</span>
          <div style="display:flex; gap:0.5rem;">
            <div style="background:var(--bg-muted); border:1px solid var(--border-light); padding:0.4rem 0.8rem; border-radius:var(--radius-md); text-align:center; min-width:55px;">
              <span id="countdown-days" style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:800; color:var(--brand-yellow); display:block; line-height:1.2;">00</span>
              <span style="font-size:9px; font-weight:700; color:var(--text-light); text-transform:uppercase; letter-spacing:0.5px;">Días</span>
            </div>
            <div style="background:var(--bg-muted); border:1px solid var(--border-light); padding:0.4rem 0.8rem; border-radius:var(--radius-md); text-align:center; min-width:55px;">
              <span id="countdown-hours" style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:800; color:var(--brand-yellow); display:block; line-height:1.2;">00</span>
              <span style="font-size:9px; font-weight:700; color:var(--text-light); text-transform:uppercase; letter-spacing:0.5px;">Horas</span>
            </div>
            <div style="background:var(--bg-muted); border:1px solid var(--border-light); padding:0.4rem 0.8rem; border-radius:var(--radius-md); text-align:center; min-width:55px;">
              <span id="countdown-minutes" style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:800; color:var(--brand-yellow); display:block; line-height:1.2;">00</span>
              <span style="font-size:9px; font-weight:700; color:var(--text-light); text-transform:uppercase; letter-spacing:0.5px;">Minutos</span>
            </div>
            <div style="background:var(--bg-muted); border:1px solid var(--border-light); padding:0.4rem 0.8rem; border-radius:var(--radius-md); text-align:center; min-width:55px;">
              <span id="countdown-seconds" style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:800; color:var(--brand-blue); display:block; line-height:1.2;">00</span>
              <span style="font-size:9px; font-weight:700; color:var(--text-light); text-transform:uppercase; letter-spacing:0.5px;">Segundos</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cupones de Descuento Activos: Rediseño limpio estilo ticket -->
      <div style="margin-bottom: 3.5rem;">
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">
          Cupones de Descuento Activos
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
          ${(APP.ofertas || []).map(cup => `
            <div class="cm-card" style="position: relative; border: 1px solid var(--border-light); border-left: 4px solid var(--brand-blue); padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; background: var(--bg-surface); transition: transform 0.2s, box-shadow 0.2s; overflow: hidden; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)';">
              <div style="display:flex; flex-direction:column; gap:0.25rem; flex:1;">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="background: rgba(33, 166, 219, 0.1); color: var(--brand-blue); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: var(--radius-sm); text-transform: uppercase;">Cupón Especial</span>
                  <span style="font-size: 11px; color: var(--text-light);">Mínimo: S/ ${cup.montoMinimo}</span>
                </div>
                <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin: 0.25rem 0 0.15rem 0;">Ahorra ${cup.tipo === 'porcentaje' ? `${cup.valor}%` : `S/ ${cup.valor}`} en tu total</h3>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0; line-height: 1.4;">Código: <strong style="color: var(--brand-yellow); font-family: monospace;">${cup.codigo}</strong></p>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: center; justify-content: center; border-left: 1px dashed var(--border-light); padding-left: 1.25rem; min-width: 110px;">
                <span style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-light); font-weight: 600;">Copiar</span>
                <button class="btn-primary btn-sm btn-rounded" onclick="copyCouponCode('${cup.codigo}', this)" style="padding: 0.45rem 0.75rem; font-weight: 700; width: 100%; justify-content: center; height: auto; font-size:0.75rem;">Copiar</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Productos en Oferta -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin: 0;">
            Productos en Liquidación
          </h2>
          <div id="ofertas-categories-filter" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${categoriesInOffer.map(cat => `
              <button class="btn-category-tab ${cat === 'todos' ? 'active' : ''}" data-cat="${cat}" onclick="filterOfertasByCategory('${cat}')" style="background: ${cat === 'todos' ? 'var(--brand-blue-dark)' : 'var(--bg-surface)'}; color: ${cat === 'todos' ? '#ffffff' : 'var(--text-secondary)'}; border: 1px solid var(--border-light); padding: 0.4rem 1rem; border-radius: var(--radius-xl); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                ${catNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-3" id="ofertas-products-grid"></div>

        <!-- Empty State -->
        <div id="ofertas-empty-state" class="text-center" style="display: none; padding: 4rem 2rem;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 64px; height: 64px; color: var(--text-light); margin-bottom: 1rem">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
          </svg>
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem">No hay ofertas en esta categoría</h3>
          <p style="color:var(--text-muted); font-size:0.875rem; max-width:400px; margin:0 auto 1.5rem auto">Prueba seleccionando otra categoría o visita el catálogo completo.</p>
          <button class="btn-primary btn-rounded btn-sm" onclick="navigate('catalogo')">Ver todo el catálogo</button>
        </div>
      </div>
    </div>
  `;

  renderOfertasGrid();

  // Iniciar la cuenta regresiva en el banner
  setTimeout(() => {
    if (typeof startCountdownTimer === 'function') {
      startCountdownTimer('countdown-days', 'countdown-hours', 'countdown-minutes', 'countdown-seconds');
    }
  }, 50);
};

window.filterOfertasByCategory = function(category) {
  window._currentOfertasCategory = category;
  
  const btns = document.querySelectorAll('#ofertas-categories-filter button');
  btns.forEach(btn => {
    const isCurrent = btn.getAttribute('data-cat') === category;
    btn.style.background = isCurrent ? 'var(--brand-blue-dark)' : 'var(--bg-surface)';
    btn.style.color = isCurrent ? '#ffffff' : 'var(--text-secondary)';
  });

  renderOfertasGrid();
};

window.renderOfertasGrid = function() {
  const grid = document.getElementById('ofertas-products-grid');
  const empty = document.getElementById('ofertas-empty-state');
  if (!grid) return;

  const products = APP.productos || [];
  let onSale = products.filter(p => p.precioOriginal && p.precioOriginal > p.precio);

  if (window._currentOfertasCategory !== 'todos') {
    onSale = onSale.filter(p => p.categoria === window._currentOfertasCategory);
  }

  if (onSale.length === 0) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
  } else {
    if (empty) empty.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = onSale.map(p => productCardHTML(p)).join('');
  }
};




