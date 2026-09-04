// ====================================================================================================
// 9. PÁGINA: PANEL DE ADMINISTRACIÓN (ADMIN DASHBOARD)
// ====================================================================================================

let _adminSection = 'dashboard'; // sección activa del sidebar

Pages.admin = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const u = APP.usuarioActual;
  if (!u || u.rol !== 'admin') {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--red); margin-bottom: 1rem;">Acceso Denegado</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">No tienes los privilegios necesarios para ver esta página.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('home')">Volver al inicio</button>
      </div>
    `;
    return;
  }

  // Establecemos 'light' como tema predeterminado del panel administrativo
  const currentTheme = localStorage.getItem('cm_admin_theme') || 'light';
  if (currentTheme === 'light') {
    document.body.classList.add('admin-light-mode');
  } else {
    document.body.classList.remove('admin-light-mode');
  }

  app.innerHTML = `
    <div class="admin-dashboard" id="adminDashboard">

      <!-- =========================================================
           MENÚ LATERAL (SIDEBAR) - 3 MÓDULOS REQUERIDOS
           ========================================================= -->
      <aside class="admin-sidebar" id="adminSidebar">
        <div class="admin-sidebar-header">
          <div style="display:flex;align-items:center;gap:0.6rem;">
            <div style="background:var(--admin-accent-blue);color:#fff;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:900;font-size:1rem;flex-shrink:0;">CM</div>
            <div>
              <div style="color:var(--admin-text-primary);font-weight:700;font-size:0.95rem;line-height:1.1;">COMPUMAGIC</div>
              <div style="color:var(--admin-text-secondary);font-size:0.7rem;">Panel Admin</div>
            </div>
          </div>
        </div>
        <nav class="admin-nav">
          <!-- Módulo 1: Inicio (Dashboard) -->
          <a class="admin-nav-item ${_adminSection==='dashboard'?'active':''}" onclick="adminGoTo('dashboard')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Inicio (Dashboard)
          </a>
          <!-- Módulo 2: Productos -->
          <a class="admin-nav-item ${_adminSection==='productos'?'active':''}" onclick="adminGoTo('productos')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            Productos
          </a>
          <!-- Módulo 3: Pedidos / Cotizaciones -->
          <a class="admin-nav-item ${_adminSection==='pedidos'?'active':''}" onclick="adminGoTo('pedidos')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Pedidos / Cotizaciones
          </a>
          <div style="flex:1"></div>
          <div style="padding:1rem;border-top:1px solid var(--admin-border);font-size:0.75rem;color:var(--admin-text-secondary);">
            RUC: 10403188528<br>MERCADILLO BOLOGNESI A-16
          </div>
          <a class="admin-nav-item" onclick="navigate('home')" style="margin:0 0.5rem 0.75rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Volver a la Tienda
          </a>
        </nav>
      </aside>

      <!-- =========================================================
           CONTENEDOR PRINCIPAL
           ========================================================= -->
      <div class="admin-main-wrapper">
        <!-- Header -->
        <header class="admin-header">
          <button class="admin-mobile-toggle" onclick="document.getElementById('adminSidebar').classList.toggle('open'); document.getElementById('admin-sidebar-backdrop').classList.toggle('active');">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div class="admin-header-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar productos, pedidos..." oninput="adminSearch(this.value)">
          </div>
          <div class="admin-header-actions">
            <button class="admin-action-btn" onclick="toggleAdminTheme()" title="Cambiar tema">
              <svg id="admin-theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${currentTheme === 'light' 
                  ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
                  : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
                }
              </svg>
            </button>
            <div class="admin-user-profile">
              <div class="admin-user-avatar">
                <span style="font-weight:700;font-size:0.9rem;">${u.avatar || u.nombre[0].toUpperCase()}</span>
              </div>
              <div style="display:flex;flex-direction:column;line-height:1.2;">
                <span style="color:var(--admin-text-primary);font-size:0.85rem;font-weight:600;">${u.nombre.split(' ')[0]}</span>
                <span style="color:var(--admin-text-secondary);font-size:0.7rem;">Administrador</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Content -->
        <main class="admin-content" id="adminContent">
          <!-- Cargado dinámicamente por adminGoTo() -->
        </main>
      </div>

      <!-- Backdrop Sidebar para móviles -->
      <div id="admin-sidebar-backdrop" class="admin-sidebar-backdrop" onclick="document.getElementById('adminSidebar').classList.remove('open'); this.classList.remove('active');"></div>

      <!-- Modal Producto -->
      <div id="admin-product-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;align-items:center;justify-content:center;">
        <div style="background:var(--admin-bg-surface);border:1px solid var(--admin-border);border-radius:16px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;margin:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid var(--admin-border);">
            <h3 style="color:var(--admin-text-primary);font-family:'Outfit',sans-serif;font-weight:700;" id="admin-prod-modal-title">Agregar Periférico</h3>
            <button onclick="closeAdminProductModal()" style="background:transparent;border:none;color:var(--admin-text-secondary);cursor:pointer;font-size:1.5rem;line-height:1;">&times;</button>
          </div>
          <form onsubmit="handleAdminSaveProduct(event)" style="padding:1.5rem;display:flex;flex-direction:column;gap:1rem;">
            <input type="hidden" id="apm-id">
            <div class="admin-form-grid">
              <div style="grid-column:1/-1;">
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Nombre del Periférico *</label>
                <input type="text" id="apm-nombre" required style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Marca *</label>
                <input type="text" id="apm-marca" required style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Categoría *</label>
                <select id="apm-categoria" required style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;cursor:pointer;">
                  <option value="laptops">Laptops</option>
                  <option value="mouses">Mouses</option>
                  <option value="teclados">Teclados</option>
                  <option value="auriculares">Auriculares y Audio</option>
                  <option value="cables">Cables y Adaptadores</option>
                  <option value="webcams">Webcams</option>
                  <option value="accesorios">Accesorios Varios</option>
                </select>
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Precio Venta (S/) *</label>
                <input type="number" id="apm-precio" step="0.10" required style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Precio Original (S/)</label>
                <input type="number" id="apm-precio-orig" step="0.10" placeholder="Opcional" style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Stock *</label>
                <input type="number" id="apm-stock" required style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div>
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Rating (1-5)</label>
                <input type="number" id="apm-rating" step="0.1" min="1" max="5" value="4.5" style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div style="grid-column:1/-1;">
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">URL de Imagen *</label>
                <input type="url" id="apm-imagen" required placeholder="https://..." style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;">
              </div>
              <div style="grid-column:1/-1;">
                <label style="display:block;color:var(--admin-text-secondary);font-size:0.8rem;margin-bottom:0.4rem;">Descripción</label>
                <textarea id="apm-desc" rows="3" style="width:100%;background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:8px;padding:0.6rem 0.8rem;color:var(--admin-text-primary);outline:none;resize:vertical;"></textarea>
              </div>
            </div>
            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:0.5rem;">
              <button type="button" onclick="closeAdminProductModal()" style="background:var(--admin-bg-hover);border:none;border-radius:8px;padding:0.6rem 1.25rem;color:var(--admin-text-primary);cursor:pointer;">Cancelar</button>
              <button type="submit" style="background:var(--admin-accent-blue);border:none;border-radius:8px;padding:0.6rem 1.25rem;color:#fff;font-weight:600;cursor:pointer;">Guardar</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;

  // Iniciar sección activa
  adminRenderSection();
};

// ==========================================
// Navegación interna del dashboard
// ==========================================
window.adminGoTo = function(section) {
  _adminSection = section;
  document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
  const activeEl = document.querySelector(`.admin-nav-item[onclick*="adminGoTo('${section}')"]`);
  if (activeEl) activeEl.classList.add('active');
  adminRenderSection();
};

window.adminSearch = function(q) {
  if (_adminSection === 'productos' || _adminSection === 'pedidos') adminRenderSection(q);
};

function adminRenderSection(filtro = '') {
  const container = document.getElementById('adminContent');
  if (!container) return;

  switch (_adminSection) {
    case 'dashboard': renderAdminDashboard(container); break;
    case 'productos':  renderAdminProductos(container, filtro); break;
    case 'ofertas':    renderAdminOfertas(container); break;
    case 'banners':    renderAdminBanners(container); break;
    case 'pedidos':    renderAdminPedidos(container, filtro); break;
    case 'usuarios':   renderAdminUsuarios(container); break;
    case 'reportes':   renderAdminReportes(container); break;

    default:           renderAdminDashboard(container);
  }
}

// ==========================================
// SECCIÓN: OFERTAS Y CUPONES (ADMIN)
// ==========================================
function renderAdminOfertas(container) {
  if (!localStorage.getItem('cm_admin_offers')) {
    const defaultOffers = [
      { id: '1', codigo: 'COMPU10', tipo: 'Porcentaje', valor: 10, minCompra: 100, activo: true },
      { id: '2', codigo: 'GAMER20', tipo: 'Porcentaje', valor: 20, minCompra: 300, activo: true },
      { id: '3', codigo: 'BIENVENIDA', tipo: 'Fijo', valor: 15, minCompra: 50, activo: false }
    ];
    localStorage.setItem('cm_admin_offers', JSON.stringify(defaultOffers));
  }

  let offers = JSON.parse(localStorage.getItem('cm_admin_offers'));

  window.toggleOfferStatus = function(id) {
    offers = offers.map(o => o.id === id ? { ...o, activo: !o.activo } : o);
    localStorage.setItem('cm_admin_offers', JSON.stringify(offers));
    renderAdminOfertas(container);
  };

  window.deleteOffer = function(id) {
    if (confirm('¿Estás seguro de eliminar este cupón?')) {
      offers = offers.filter(o => o.id !== id);
      localStorage.setItem('cm_admin_offers', JSON.stringify(offers));
      renderAdminOfertas(container);
    }
  };

  window.addOffer = function(e) {
    e.preventDefault();
    const codigo = document.getElementById('offer_code').value.toUpperCase().trim();
    const tipo = document.getElementById('offer_type').value;
    const valor = parseFloat(document.getElementById('offer_value').value);
    const minCompra = parseFloat(document.getElementById('offer_min').value) || 0;

    if (!codigo || isNaN(valor) || valor <= 0) {
      alert('Por favor completa todos los campos con valores válidos.');
      return;
    }

    const newOffer = {
      id: Date.now().toString(),
      codigo,
      tipo,
      valor,
      minCompra,
      activo: true
    };

    offers.push(newOffer);
    localStorage.setItem('cm_admin_offers', JSON.stringify(offers));
    renderAdminOfertas(container);
  };

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Gestión de Ofertas y Cupones</h1>
      <p>Administra códigos de descuento y campañas promocionales de COMPUMAGIC</p>
    </div>

    <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
      <div class="admin-panel" style="flex:2; min-width:300px; margin-bottom:0;">
        <div class="admin-panel-header">
          <span class="admin-panel-title">Cupones de Descuento</span>
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Descuento</th>
                <th>Mín. Compra</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${offers.length === 0 
                ? `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--admin-text-secondary);">No hay cupones creados.</td></tr>`
                : offers.map(o => `
                  <tr>
                    <td style="color:var(--admin-accent-blue); font-weight:700;">${o.codigo}</td>
                    <td style="color:var(--admin-text-primary); font-size:0.85rem;">${o.tipo}</td>
                    <td style="color:var(--admin-accent-green); font-weight:600;">${o.tipo === 'Porcentaje' ? `${o.valor}%` : APP.formatPrice(o.valor)}</td>
                    <td style="color:var(--admin-text-secondary); font-size:0.85rem;">${o.minCompra > 0 ? APP.formatPrice(o.minCompra) : 'Ninguno'}</td>
                    <td>
                      <span class="admin-badge badge-${o.activo ? 'completed' : 'pending'}" style="cursor:pointer;" onclick="toggleOfferStatus('${o.id}')">
                        ${o.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <button onclick="deleteOffer('${o.id}')" style="background:rgba(212,24,61,0.1); border:none; border-radius:6px; padding:0.35rem 0.7rem; color:var(--admin-accent-red); cursor:pointer; font-size:0.75rem;">Eliminar</button>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>

      <div class="admin-panel" style="flex:1; min-width:260px; margin-bottom:0;">
        <div class="admin-panel-header">
          <span class="admin-panel-title">Crear Nuevo Cupón</span>
        </div>
        <form onsubmit="addOffer(event)" style="display:flex; flex-direction:column; gap:1rem; padding:1.25rem;">
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Código de Cupón</label>
            <input type="text" id="offer_code" placeholder="Ej: VERANO15" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;" required>
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Tipo de Descuento</label>
            <select id="offer_type" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;">
              <option value="Porcentaje">Porcentaje (%)</option>
              <option value="Fijo">Monto Fijo (S/.)</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Valor del Descuento</label>
            <input type="number" id="offer_value" min="1" step="any" placeholder="Ej: 10 o 15" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;" required>
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Compra Mínima (S/.)</label>
            <input type="number" id="offer_min" min="0" placeholder="Ej: 50 (Opcional)" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;">
          </div>
          <button type="submit" style="background:var(--admin-accent-blue); border:none; border-radius:8px; padding:0.75rem; color:#fff; font-weight:600; cursor:pointer; margin-top:0.5rem;">
            Crear Cupón
          </button>
        </form>
      </div>
    </div>
  `;
}

// ==========================================
// SECCIÓN: GESTIÓN DE BANNERS (ADMIN)
// ==========================================
function renderAdminBanners(container) {
  if (!localStorage.getItem('cm_admin_banners')) {
    const defaultBanners = [
      { id: '1', titulo: 'Colección Auriculares Pro', subtitulo: 'Disfruta de sonido premium e inmersivo para gaming', imagen: 'https://placehold.co/1200x500/1e293b/ffffff?text=Auriculares+Gamer+COMPUMAGIC', activo: true },
      { id: '2', titulo: 'Teclados Mecánicos RGB', subtitulo: 'Switches táctiles rápidos para una ventaja competitiva', imagen: 'https://placehold.co/1200x500/1e293b/ffffff?text=Teclados+Mec%C3%A1nicos+Rgb', activo: true },
      { id: '3', titulo: 'Mouses de Alta Precisión', subtitulo: 'Sensores ópticos profesionales y diseño ultra liviano', imagen: 'https://placehold.co/1200x500/1e293b/ffffff?text=Mouses+Gaming+Opticos', activo: false }
    ];
    localStorage.setItem('cm_admin_banners', JSON.stringify(defaultBanners));
  }

  let banners = JSON.parse(localStorage.getItem('cm_admin_banners'));

  window.toggleBannerStatus = function(id) {
    banners = banners.map(b => b.id === id ? { ...b, activo: !b.activo } : b);
    localStorage.setItem('cm_admin_banners', JSON.stringify(banners));
    renderAdminBanners(container);
  };

  window.deleteBanner = function(id) {
    if (confirm('¿Estás seguro de eliminar este banner?')) {
      banners = banners.filter(b => b.id !== id);
      localStorage.setItem('cm_admin_banners', JSON.stringify(banners));
      renderAdminBanners(container);
    }
  };

  window.addBanner = function(e) {
    e.preventDefault();
    const titulo = document.getElementById('banner_title').value.trim();
    const subtitulo = document.getElementById('banner_subtitle').value.trim();
    const imagen = document.getElementById('banner_img').value.trim() || 'https://placehold.co/1200x500/1e293b/ffffff?text=COMPUMAGIC+Banner';

    if (!titulo || !subtitulo) {
      alert('Por favor ingresa un título y subtítulo válidos.');
      return;
    }

    const newBanner = {
      id: Date.now().toString(),
      titulo,
      subtitulo,
      imagen,
      activo: true
    };

    banners.push(newBanner);
    localStorage.setItem('cm_admin_banners', JSON.stringify(banners));
    renderAdminBanners(container);
  };

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Gestión de Banners del Slider</h1>
      <p>Administra los banners publicitarios e informativos que se muestran en el Hero de la página de inicio</p>
    </div>

    <div style="display:flex; gap:1.5rem; flex-wrap:wrap;">
      <div class="admin-panel" style="flex:2; min-width:300px; margin-bottom:0;">
        <div class="admin-panel-header">
          <span class="admin-panel-title">Banners del Slider Principal</span>
        </div>
        <div style="padding:1.25rem; display:flex; flex-direction:column; gap:1.25rem;">
          ${banners.length === 0 
            ? `<p style="text-align:center;color:var(--admin-text-secondary);padding:2rem;">No hay banners configurados.</p>`
            : banners.map(b => `
              <div style="display:flex; border:1px solid var(--admin-border); border-radius:12px; background:var(--admin-bg-surface); overflow:hidden; gap:1rem; padding:0.75rem; flex-wrap:wrap;">
                <div style="width:160px; height:80px; border-radius:8px; overflow:hidden; background:var(--admin-bg-base); flex-shrink:0; display:flex; align-items:center; justify-content:center;">
                  <img src="${b.imagen}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://placehold.co/160x80/1E293B/ffffff?text=Error'">
                </div>
                <div style="flex:1; min-width:200px; display:flex; flex-direction:column; justify-content:center;">
                  <h4 style="color:var(--admin-text-primary); font-weight:700; font-size:0.95rem; margin-bottom:0.25rem;">${b.titulo}</h4>
                  <p style="color:var(--admin-text-secondary); font-size:0.78rem; line-height:1.4; margin-bottom:0.5rem;">${b.subtitulo}</p>
                  <div style="display:flex; gap:0.75rem; align-items:center;">
                    <span class="admin-badge badge-${b.activo ? 'completed' : 'pending'}" style="cursor:pointer;" onclick="toggleBannerStatus('${b.id}')">
                      ${b.activo ? 'Mostrando' : 'Oculto'}
                    </span>
                  </div>
                </div>
                <div style="display:flex; align-items:center; justify-content:flex-end;">
                  <button onclick="deleteBanner('${b.id}')" style="background:rgba(212,24,61,0.1); border:none; border-radius:6px; padding:0.5rem 1rem; color:var(--admin-accent-red); cursor:pointer; font-weight:600; font-size:0.75rem;">Eliminar</button>
                </div>
              </div>
            `).join('')
          }
        </div>
      </div>

      <div class="admin-panel" style="flex:1; min-width:260px; margin-bottom:0;">
        <div class="admin-panel-header">
          <span class="admin-panel-title">Crear Nuevo Banner</span>
        </div>
        <form onsubmit="addBanner(event)" style="display:flex; flex-direction:column; gap:1rem; padding:1.25rem;">
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Título Principal</label>
            <input type="text" id="banner_title" placeholder="Ej: Combo Gaming Pro" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;" required>
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">Subtítulo o Descripción</label>
            <input type="text" id="banner_subtitle" placeholder="Ej: Consigue 30% de descuento en el pack" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;" required>
          </div>
          <div>
            <label style="display:block; font-size:0.8rem; color:var(--admin-text-secondary); margin-bottom:0.4rem;">URL de Imagen de Banner</label>
            <input type="url" id="banner_img" placeholder="https://ejemplo.com/imagen.jpg (Opcional)" style="width:100%; padding:0.6rem 0.8rem; border-radius:8px; border:1px solid var(--admin-border); background:var(--admin-bg-base); color:var(--admin-text-primary); outline:none;">
          </div>
          <button type="submit" style="background:var(--admin-accent-blue); border:none; border-radius:8px; padding:0.75rem; color:#fff; font-weight:600; cursor:pointer; margin-top:0.5rem;">
            Añadir Banner
          </button>
        </form>
      </div>
    </div>
  `;
}

// ====================================================================================================
// SECCIÓN: DASHBOARD PRINCIPAL
// ====================================================================================================
function renderAdminDashboard(container) {
  const prods = APP.productos;
  const peds  = APP.pedidos;
  const users = APP.usuarios;

  container.innerHTML = `
    <!-- Saludo / Cabecera del Panel -->
    <div class="admin-greeting" style="margin-bottom: 2rem;">
      <h1 style="font-family:'Outfit',sans-serif; color: var(--admin-text-primary); font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem;">Panel de Control</h1>
      <p style="color: var(--admin-text-secondary); font-size: 0.9rem;">Vista general del sistema de COMPUMAGIC. Indicadores clave y últimos movimientos.</p>
    </div>

    <!-- Fila de 3 Tarjetas (Cards) Grandes y Espaciadas -->
    <div class="admin-stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
      
      <!-- Card 1: Total Productos -->
      <div class="admin-stat-card" onclick="adminGoTo('productos')" style="cursor: pointer; background: var(--admin-bg-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius-lg); padding: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="admin-stat-header" style="display: flex; align-items: center; gap: 0.75rem; color: var(--admin-text-secondary); font-size: 0.9rem; font-weight: 500;">
          <div class="admin-stat-icon" style="width: 40px; height: 40px; border-radius: 8px; background: rgba(46, 134, 193, 0.1); color: var(--admin-accent-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          </div>
          <span style="font-weight: 600;">Total Productos</span>
        </div>
        <div class="admin-stat-value" style="font-size: 2.25rem; font-weight: 700; color: var(--admin-text-primary); font-family: 'Outfit', sans-serif; line-height: 1;">${prods.length}</div>
        <div style="font-size: 0.8rem; color: var(--admin-text-secondary); margin-top: 0.25rem;">Items registrados en inventario</div>
      </div>

      <!-- Card 2: Últimas Cotizaciones -->
      <div class="admin-stat-card" onclick="adminGoTo('pedidos')" style="cursor: pointer; background: var(--admin-bg-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius-lg); padding: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="admin-stat-header" style="display: flex; align-items: center; gap: 0.75rem; color: var(--admin-text-secondary); font-size: 0.9rem; font-weight: 500;">
          <div class="admin-stat-icon" style="width: 40px; height: 40px; border-radius: 8px; background: rgba(46, 134, 193, 0.1); color: var(--admin-accent-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <span style="font-weight: 600;">Últimas Cotizaciones</span>
        </div>
        <div class="admin-stat-value" style="font-size: 2.25rem; font-weight: 700; color: var(--admin-text-primary); font-family: 'Outfit', sans-serif; line-height: 1;">${peds.length}</div>
        <div style="font-size: 0.8rem; color: var(--admin-text-secondary); margin-top: 0.25rem;">Órdenes y solicitudes de clientes</div>
      </div>

      <!-- Card 3: Usuarios Registrados -->
      <div class="admin-stat-card" style="background: var(--admin-bg-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius-lg); padding: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="admin-stat-header" style="display: flex; align-items: center; gap: 0.75rem; color: var(--admin-text-secondary); font-size: 0.9rem; font-weight: 500;">
          <div class="admin-stat-icon" style="width: 40px; height: 40px; border-radius: 8px; background: rgba(46, 134, 193, 0.1); color: var(--admin-accent-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <span style="font-weight: 600;">Usuarios Registrados</span>
        </div>
        <div class="admin-stat-value" style="font-size: 2.25rem; font-weight: 700; color: var(--admin-text-primary); font-family: 'Outfit', sans-serif; line-height: 1;">${users.length}</div>
        <div style="font-size: 0.8rem; color: var(--admin-text-secondary); margin-top: 0.25rem;">Usuarios y cuentas activas</div>
      </div>

    </div>

    <!-- Tabla Estilizada de Últimos Movimientos -->
    <div class="admin-panel" style="background: var(--admin-bg-surface); border: 1px solid var(--admin-border); border-radius: var(--admin-radius-lg); padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div class="admin-panel-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <span class="admin-panel-title" style="color: var(--admin-text-primary); font-weight: 700; font-size: 1.1rem; font-family:'Outfit',sans-serif;">Últimos Movimientos</span>
        <button onclick="adminGoTo('pedidos')" style="background: rgba(46, 134, 193, 0.1); border: none; border-radius: 8px; padding: 0.5rem 1rem; color: var(--admin-accent-blue); cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: background 0.2s;">
          Ver todas las cotizaciones
        </button>
      </div>
      <div class="admin-table-container" style="overflow-x: auto;">
        <table class="admin-table" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1.5px solid var(--admin-border);">
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Código</th>
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Cliente</th>
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Fecha</th>
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Total</th>
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Estado</th>
              <th style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">Acción</th>
            </tr>
          </thead>
          <tbody>
            ${peds.length === 0
              ? `<tr><td colspan="6" style="text-align:center; padding:3rem; color:var(--admin-text-secondary); font-size:0.9rem;">No se registran movimientos ni cotizaciones recientes.</td></tr>`
              : peds.slice(0, 5).map((o, index) => `
                <tr style="border-bottom: 1px solid var(--admin-border);">
                  <td style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-size: 0.85rem; font-weight: 700;">${o.codigo || 'CM-'+(index+1001)}</td>
                  <td style="padding: 1rem 0.75rem; color: var(--admin-text-primary); font-weight: 600; font-size: 0.9rem;">${o.usuarioNombre}</td>
                  <td style="padding: 1rem 0.75rem; color: var(--admin-text-secondary); font-size: 0.85rem;">${o.fecha}</td>
                  <td style="padding: 1rem 0.75rem; color: var(--admin-accent-blue); font-weight: 700; font-size: 0.9rem;">${APP.formatPrice(o.totalFinal)}</td>
                  <td style="padding: 1rem 0.75rem;">
                    <span class="admin-badge badge-${o.estado==='Entregado'?'completed':o.estado==='Cancelado'?'cancelled':'pending'}" style="padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">
                      ${o.estado}
                    </span>
                  </td>
                  <td style="padding: 1rem 0.75rem; text-align: center;">
                    <button onclick="adminGoTo('pedidos')" style="background: transparent; border: 1px solid var(--admin-border); border-radius: 6px; padding: 0.4rem 0.8rem; color: var(--admin-text-primary); cursor: pointer; font-size: 0.78rem; font-weight: 600; transition: all 0.2s;">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====================================================================================================
// SECCIÓN: PRODUCTOS (CRUD)
// ====================================================================================================
function renderAdminProductos(container, filtro = '') {
  let prods = APP.productos;
  if (filtro) prods = prods.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()) || p.marca.toLowerCase().includes(filtro.toLowerCase()));

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Gestión de Productos</h1>
      <p>Catálogo de periféricos y accesorios informáticos de COMPUMAGIC</p>
    </div>

    <div class="admin-panel" style="margin-bottom:1.5rem;">
      <div class="admin-panel-header">
        <span class="admin-panel-title">Inventario (${prods.length} productos)</span>
        <button onclick="openAdminProductModal('add')" style="background:var(--admin-accent-blue);border:none;border-radius:8px;padding:0.5rem 1.25rem;color:#fff;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.4rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Agregar Periférico
        </button>
      </div>
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre / Marca</th>
              <th>Categoría</th>
              <th>Precio Venta</th>
              <th>Precio Orig.</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${prods.length === 0
              ? `<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--admin-text-secondary);">No hay productos. Agrega el primero.</td></tr>`
              : prods.map(p => `
                <tr>
                  <td>
                    <div style="width:44px;height:44px;background:var(--admin-bg-base);border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
                      <img src="${p.imagen}" loading="lazy" style="max-width:100%;max-height:100%;object-fit:contain;" onerror="this.src='https://placehold.co/44x44/1E293B/64748B?text=P'">
                    </div>
                  </td>
                  <td>
                    <div style="color:var(--admin-text-primary);font-weight:600;font-size:0.85rem;max-width:200px;">${p.nombre}</div>
                    <div style="color:var(--admin-text-secondary);font-size:0.75rem;">${p.marca}</div>
                  </td>
                  <td>
                    <span style="background:var(--admin-bg-hover);border-radius:6px;padding:0.2rem 0.6rem;font-size:0.75rem;color:var(--admin-text-secondary);text-transform:capitalize;">${p.categoria}</span>
                  </td>
                  <td style="color:var(--admin-accent-green);font-weight:600;">${APP.formatPrice(p.precio)}</td>
                  <td style="color:var(--admin-text-secondary);font-size:0.85rem;">${p.precioOriginal ? APP.formatPrice(p.precioOriginal) : '—'}</td>
                  <td>
                    <span style="background:${p.stock===0?'rgba(212,24,61,0.15)':p.stock<=5?'rgba(255,195,0,0.15)':'rgba(34,197,94,0.15)'};color:${p.stock===0?'var(--admin-accent-red)':p.stock<=5?'var(--admin-accent-amber)':'var(--admin-accent-green)'};border-radius:6px;padding:0.2rem 0.6rem;font-size:0.8rem;font-weight:600;">
                      ${p.stock === 0 ? 'Agotado' : p.stock + ' uds'}
                    </span>
                  </td>
                  <td style="color:var(--admin-accent-amber);">⭐ ${p.rating || '—'}</td>
                  <td>
                    <div style="display:flex;gap:0.4rem;">
                      <button onclick="openAdminProductModal('edit','${p.id}')" style="background:var(--admin-bg-hover);border:none;border-radius:6px;padding:0.35rem 0.7rem;color:var(--admin-text-secondary);cursor:pointer;font-size:0.75rem;">Editar</button>
                      <button onclick="deleteAdminProduct('${p.id}')" style="background:rgba(212,24,61,0.1);border:none;border-radius:6px;padding:0.35rem 0.7rem;color:var(--admin-accent-red);cursor:pointer;font-size:0.75rem;">Eliminar</button>
                    </div>
                  </td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====================================================================================================
// SECCIÓN: PEDIDOS
// ====================================================================================================
function renderAdminPedidos(container, filtro = '') {
  let peds = APP.pedidos;
  if (filtro) peds = peds.filter(o => o.usuarioNombre.toLowerCase().includes(filtro.toLowerCase()) || (o.codigo||'').toLowerCase().includes(filtro.toLowerCase()));

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Gestión de Pedidos</h1>
      <p>Control de despacho y estado de órdenes de compra</p>
    </div>

    <!-- Resumen rápido -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label: 'Pendientes',  count: peds.filter(o=>o.estado==='Pendiente').length,  color: 'var(--admin-accent-amber)' },
        { label: 'Entregados',  count: peds.filter(o=>o.estado==='Entregado').length,  color: 'var(--admin-accent-green)' },
        { label: 'Cancelados',  count: peds.filter(o=>o.estado==='Cancelado').length,  color: 'var(--admin-accent-red)' },
        { label: 'Total',       count: peds.length,                                     color: 'var(--admin-accent-blue)' },
      ].map(s => `
        <div style="background:var(--admin-bg-surface);border:1px solid var(--admin-border);border-radius:12px;padding:1rem;text-align:center;">
          <div style="font-size:1.75rem;font-weight:700;color:${s.color};font-family:'Outfit',sans-serif;">${s.count}</div>
          <div style="color:var(--admin-text-secondary);font-size:0.8rem;">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="admin-panel">
      <div class="admin-panel-header">
        <span class="admin-panel-title">Órdenes (${peds.length})</span>
      </div>
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr><th>Código</th><th>Cliente</th><th>Items</th><th>Total</th><th>Pago</th><th>Fecha</th><th>Estado</th><th>WhatsApp</th></tr>
          </thead>
          <tbody>
            ${peds.length === 0
              ? `<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--admin-text-secondary);">No hay pedidos registrados</td></tr>`
              : peds.map(o => `
                <tr>
                  <td style="color:var(--admin-accent-blue);font-weight:700;font-size:0.8rem;">${o.codigo || '—'}</td>
                  <td>
                    <div style="color:var(--admin-text-primary);font-weight:500;">${o.usuarioNombre}</div>
                    <div style="color:var(--admin-text-secondary);font-size:0.75rem;">${o.envio?.telefono || ''}</div>
                  </td>
                  <td style="color:var(--admin-text-secondary);font-size:0.8rem;">${o.items?.length || 0} producto(s)</td>
                  <td style="color:var(--admin-accent-green);font-weight:600;">${APP.formatPrice(o.totalFinal)}</td>
                  <td style="color:var(--admin-text-secondary);font-size:0.78rem;">${o.metodoPago || '—'}</td>
                  <td style="color:var(--admin-text-secondary);font-size:0.78rem;">${o.fecha}</td>
                  <td>
                    <select onchange="updateAdminOrderStatus('${o.id}', this.value)"
                      style="background:var(--admin-bg-base);border:1px solid var(--admin-border);border-radius:6px;padding:0.3rem 0.5rem;color:${o.estado==='Entregado'?'var(--admin-accent-green)':o.estado==='Cancelado'?'var(--admin-accent-red)':'var(--admin-accent-amber)'};cursor:pointer;font-size:0.78rem;outline:none;">
                      <option value="Pendiente" ${o.estado==='Pendiente'?'selected':''}>Pendiente</option>
                      <option value="En camino" ${o.estado==='En camino'?'selected':''}>En camino</option>
                      <option value="Entregado" ${o.estado==='Entregado'?'selected':''}>Entregado</option>
                      <option value="Cancelado" ${o.estado==='Cancelado'?'selected':''}>Cancelado</option>
                    </select>
                  </td>
                  <td>
                    <a href="https://wa.me/${o.envio?.telefono?.startsWith('51')?o.envio.telefono:'51'+(o.envio?.telefono||'')}" target="_blank"
                      style="background:rgba(37,211,102,0.1);border:none;border-radius:6px;padding:0.35rem 0.7rem;color:#25D366;cursor:pointer;font-size:0.75rem;text-decoration:none;font-weight:600;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====================================================================================================
// SECCIÓN: USUARIOS
// ====================================================================================================
function renderAdminUsuarios(container) {
  const users = APP.usuarios;
  const peds  = APP.pedidos;

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Usuarios Registrados</h1>
      <p>Listado de clientes y administradores del sistema</p>
    </div>
    <div class="admin-panel">
      <div class="admin-panel-header">
        <span class="admin-panel-title">Usuarios (${users.length})</span>
      </div>
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr><th>Avatar</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Pedidos</th></tr>
          </thead>
          <tbody>
            ${users.map(u => {
              const userPedidos = peds.filter(o => o.usuarioId === u.id).length;
              return `
                <tr>
                  <td>
                    <div style="width:36px;height:36px;border-radius:50%;background:${u.rol==='admin'?'var(--admin-accent-blue)':'var(--admin-bg-hover)'};display:flex;align-items:center;justify-content:center;font-weight:700;color:#F8FAFC;">
                      ${u.avatar || u.nombre[0].toUpperCase()}
                    </div>
                  </td>
                  <td style="color:#F8FAFC;font-weight:500;">${u.nombre}</td>
                  <td style="color:var(--admin-text-secondary);font-size:0.85rem;">${u.email}</td>
                  <td>
                    <span style="background:${u.rol==='admin'?'rgba(46,134,193,0.15)':'rgba(100,116,139,0.15)'};color:${u.rol==='admin'?'var(--admin-accent-blue)':'var(--admin-text-secondary)'};border-radius:6px;padding:0.2rem 0.6rem;font-size:0.75rem;font-weight:600;text-transform:uppercase;">
                      ${u.rol}
                    </span>
                  </td>
                  <td style="color:#94A3B8;">${userPedidos} pedido(s)</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ====================================================================================================
// SECCIÓN: REPORTES
// ====================================================================================================
function renderAdminReportes(container) {
  const prods = APP.productos;
  const peds  = APP.pedidos;

  // Productos más vendidos (por items en pedidos)
  const ventas = {};
  peds.forEach(o => {
    if (o.estado !== 'Cancelado' && o.items) {
      o.items.forEach(i => {
        const key = i.producto?.id;
        if (key) ventas[key] = (ventas[key] || 0) + i.cantidad;
      });
    }
  });
  const topProds = prods
    .map(p => ({ ...p, vendidos: ventas[p.id] || 0 }))
    .sort((a, b) => b.vendidos - a.vendidos)
    .slice(0, 10);

  // Stock por categoría
  const stockCat = {};
  prods.forEach(p => { stockCat[p.categoria] = (stockCat[p.categoria] || 0) + p.stock; });

  container.innerHTML = `
    <div class="admin-greeting">
      <h1>Reportes y Análisis</h1>
      <p>Estadísticas detalladas de COMPUMAGIC</p>
    </div>

    <div class="admin-charts-grid">
      <div class="admin-panel">
        <div class="admin-panel-header"><span class="admin-panel-title">Stock por Categoría</span></div>
        <div style="height:240px;"><canvas id="stockCatChart"></canvas></div>
      </div>
      <div class="admin-panel">
        <div class="admin-panel-header"><span class="admin-panel-title">Estado de Pedidos</span></div>
        <div style="height:240px;display:flex;justify-content:center;"><canvas id="pedidosChart"></canvas></div>
      </div>
    </div>

    <div class="admin-panel" style="margin-top:1.5rem;">
      <div class="admin-panel-header"><span class="admin-panel-title">Productos Más Vendidos</span></div>
      <div class="admin-table-container">
        <table class="admin-table">
          <thead><tr><th>#</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Unidades vendidas</th><th>Stock restante</th></tr></thead>
          <tbody>
            ${topProds.map((p, i) => `
              <tr>
                <td style="color:var(--admin-text-secondary);">${i + 1}</td>
                <td>
                  <div style="color:var(--admin-text-primary);font-weight:500;">${p.nombre}</div>
                  <div style="color:var(--admin-text-secondary);font-size:0.75rem;">${p.marca}</div>
                </td>
                <td style="color:var(--admin-text-secondary);text-transform:capitalize;font-size:0.85rem;">${p.categoria}</td>
                <td style="color:var(--admin-accent-green);font-weight:600;">${APP.formatPrice(p.precio)}</td>
                <td>
                  <span style="background:${p.vendidos>0?'rgba(34,197,94,0.1)':'rgba(100,116,139,0.1)'};color:${p.vendidos>0?'var(--admin-accent-green)':'var(--admin-text-secondary)'};border-radius:6px;padding:0.2rem 0.7rem;font-weight:600;">
                    ${p.vendidos} uds
                  </span>
                </td>
                <td>
                  <span style="color:${p.stock===0?'var(--admin-accent-red)':p.stock<=5?'var(--admin-accent-amber)':'var(--admin-text-secondary)'};">
                    ${p.stock === 0 ? 'Agotado' : p.stock + ' uds'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (typeof Chart === 'undefined') return;
    const textCol = getComputedStyle(document.body).getPropertyValue('--admin-text-secondary').trim() || '#94A3B8';
    const borderCol = getComputedStyle(document.body).getPropertyValue('--admin-border').trim() || '#334155';
    Chart.defaults.color = textCol;
    Chart.defaults.borderColor = borderCol;

    const catKeys = Object.keys(stockCat);
    const catColors = ['#2E86C1','#22C55E','#FFC300','#8B5CF6','#EC4899','#64748B','#0EA5E9'];

    const ctxStock = document.getElementById('stockCatChart');
    if (ctxStock) {
      new Chart(ctxStock, {
        type: 'bar',
        data: {
          labels: catKeys.map(k => k.charAt(0).toUpperCase() + k.slice(1)),
          datasets: [{ label: 'Unidades en stock', data: catKeys.map(k => stockCat[k]), backgroundColor: catColors, borderRadius: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { borderDash: [2,4] } }, x: { grid: { display: false } } } }
      });
    }

    const ctxPed = document.getElementById('pedidosChart');
    const pendientes = peds.filter(o=>o.estado==='Pendiente').length;
    const entregados = peds.filter(o=>o.estado==='Entregado').length;
    const cancelados = peds.filter(o=>o.estado==='Cancelado').length;
    if (ctxPed) {
      new Chart(ctxPed, {
        type: 'doughnut',
        data: {
          labels: ['Pendientes','Entregados','Cancelados'],
          datasets: [{ data: [pendientes||1, entregados||1, cancelados||0], backgroundColor: ['#FFC300','#22C55E','#D4183D'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } } }
      });
    }
  }, 100);
}

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// GRÁFICOS DEL DASHBOARD PRINCIPAL
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
function adminInitCharts(catKeys, catData, catLabels, catColors) {
  if (typeof Chart === 'undefined') return;
  const textCol = getComputedStyle(document.body).getPropertyValue('--admin-text-secondary').trim() || '#94A3B8';
  const borderCol = getComputedStyle(document.body).getPropertyValue('--admin-border').trim() || '#334155';
  Chart.defaults.color = textCol;
  Chart.defaults.borderColor = borderCol;

  const ctxSales = document.getElementById('salesChart');
  if (ctxSales) {
    // Generar datos de los últimos 7 días basados en pedidos reales
    const days = [];
    const salesByDay = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('es-PE', { day:'2-digit', month:'short' });
      days.push(label);
      const dayStr = d.toISOString().split('T')[0];
      const daySales = APP.pedidos.filter(o => o.fecha === dayStr).reduce((s,o) => s + o.totalFinal, 0);
      salesByDay.push(daySales || Math.floor(Math.random() * 800 + 200));
    }
    new Chart(ctxSales, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Ventas (S/)',
          data: salesByDay,
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37,99,235,0.08)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#2563EB',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { borderDash: [3,4] }, ticks: { callback: v => 'S/ ' + v } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  const ctxCat = document.getElementById('categoryChart');
  if (ctxCat) {
    const validCats = catKeys.filter((k, i) => catData[i] > 0);
    const validData = catData.filter(v => v > 0);
    const validColors = validCats.map((k, i) => catColors[catKeys.indexOf(k)]);
    const validLabels = validCats.map(k => catLabels[k]);

    new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: validLabels,
        datasets: [{ data: validData, backgroundColor: validColors, borderWidth: 0, hoverOffset: 6 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 8, padding: 12, font: { size: 11 } } } }
      }
    });
  }
}

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// CRUD PRODUCTOS =  Modal
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
window.openAdminProductModal = function(mode, id = '') {
  const modal = document.getElementById('admin-product-modal');
  if (!modal) return;
  document.getElementById('admin-prod-modal-title').textContent = mode === 'add' ? 'Agregar Periférico' : 'Editar Periférico';
  ['apm-id','apm-nombre','apm-marca','apm-precio','apm-precio-orig','apm-stock','apm-imagen','apm-desc'].forEach(i => {
    const el = document.getElementById(i);
    if (el) el.value = '';
  });
  document.getElementById('apm-rating').value = '4.5';
  document.getElementById('apm-categoria').value = 'mouses';

  if (mode === 'edit' && id) {
    const p = APP.productos.find(x => x.id === id);
    if (p) {
      document.getElementById('apm-id').value = p.id;
      document.getElementById('apm-nombre').value = p.nombre;
      document.getElementById('apm-marca').value = p.marca;
      document.getElementById('apm-categoria').value = p.categoria;
      document.getElementById('apm-precio').value = p.precio;
      document.getElementById('apm-precio-orig').value = p.precioOriginal || '';
      document.getElementById('apm-stock').value = p.stock;
      document.getElementById('apm-rating').value = p.rating || '4.5';
      document.getElementById('apm-imagen').value = p.imagen;
      document.getElementById('apm-desc').value = p.descripcion || '';
    }
  }
  modal.style.display = 'flex';
};

window.closeAdminProductModal = function() {
  const modal = document.getElementById('admin-product-modal');
  if (modal) modal.style.display = 'none';
};

window.handleAdminSaveProduct = async function(e) {
  e.preventDefault();
  const id     = document.getElementById('apm-id').value;
  const nombre = document.getElementById('apm-nombre').value.trim();
  const marca  = document.getElementById('apm-marca').value.trim();
  const cat    = document.getElementById('apm-categoria').value;
  const precio = parseFloat(document.getElementById('apm-precio').value);
  const pOrig  = document.getElementById('apm-precio-orig').value;
  const stock  = parseInt(document.getElementById('apm-stock').value);
  const rating = parseFloat(document.getElementById('apm-rating').value);
  const imagen = document.getElementById('apm-imagen').value.trim();
  const desc   = document.getElementById('apm-desc').value.trim();
  const precioOriginal = pOrig ? parseFloat(pOrig) : null;

  const productId = id || 'pm_' + Date.now();

  try {
    const response = await fetch('backend/api_productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'save',
        id: productId,
        nombre,
        marca,
        categoria: cat,
        precio,
        precioOriginal,
        stock,
        rating,
        imagen,
        descripcion: desc
      })
    });
    const res = await response.json();
    if (res && !res.error) {
      let prods = APP.productos;
      if (id) {
        prods = prods.map(p => p.id === id ? { ...p, nombre, marca, categoria: cat, precio, precioOriginal, stock, rating, imagen, descripcion: desc } : p);
        showToast('Producto actualizado correctamente', 'success');
      } else {
        prods.push({ id: productId, nombre, marca, categoria: cat, precio, precioOriginal, stock, rating, imagen, descripcion: desc, specs: { Marca: marca }, destacado: false });
        showToast('Producto agregado al catálogo', 'success');
      }
      APP.save('cm_products', prods);
      closeAdminProductModal();
      renderAdminProductos(document.getElementById('adminContent'));
    } else {
      showToast(res.mensaje || 'Error al guardar el producto en la base de datos', 'error');
    }
  } catch (err) {
    console.error('Error al guardar producto:', err);
    showToast('Error de conexión con el servidor', 'error');
  }
};

window.deleteAdminProduct = async function(id) {
  if (!confirm('¿Eliminar permanentemente este producto del inventario?')) return;
  
  try {
    const response = await fetch('backend/api_productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'delete',
        id: id
      })
    });
    const res = await response.json();
    if (res && !res.error) {
      APP.save('cm_products', APP.productos.filter(p => p.id !== id));
      showToast('Producto eliminado', 'info');
      renderAdminProductos(document.getElementById('adminContent'));
    } else {
      showToast(res.mensaje || 'Error al eliminar el producto de la base de datos', 'error');
    }
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    showToast('Error de conexión con el servidor', 'error');
  }
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// CRUD PEDIDOS =  Actualizar estado
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
window.updateAdminOrderStatus = function(id, newState) {
  const peds = APP.pedidos;
  const idx = peds.findIndex(x => x.id === id);
  if (idx > -1) {
    peds[idx].estado = newState;
    APP.save('cm_orders', peds);
    showToast(`Pedido actualizado a "${newState}"`, 'success');
  }
};

// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
// TOGGLE TEMA ADMIN
// ="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=="=
window.toggleAdminTheme = function() {
  const isLight = document.body.classList.toggle('admin-light-mode');
  localStorage.setItem('cm_admin_theme', isLight ? 'light' : 'dark');
  const icon = document.getElementById('admin-theme-icon');
  if(icon) {
    icon.innerHTML = isLight 
      ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
};

