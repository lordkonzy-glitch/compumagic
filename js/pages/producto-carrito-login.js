/* ═══════════════════════════════════════════════
   COMPUMAGIC — js/pages/producto-carrito-login.js
   Módulos de Producto Detalle, Carrito, Checkout,
   Confirmación de Pedido, Login y Perfil de Usuario
   ═══════════════════════════════════════════════ */

window.Pages = window.Pages || {};

// ═══════════════════════════════════════════════
// 1. PÁGINA: DETALLE DE PRODUCTO
// ═══════════════════════════════════════════════
Pages.producto = function(id) {
  const app = document.getElementById('app');
  if (!app) return;

  const p = APP.productos.find(x => x.id === id);
  if (!p) {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Producto no encontrado</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">El periférico solicitado no existe o fue descontinuado.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('catalogo')">Volver al catálogo</button>
      </div>
    `;
    return;
  }

  const hd = p.precioOriginal && p.precioOriginal > p.precio;
  const pct = hd ? APP.pctDesc(p.precio, p.precioOriginal) : 0;
  const isFav = APP.isFavorito(p.id);

  // Obtener productos relacionados (de la misma categoría, excluyendo el actual)
  const relacionados = APP.productos
    .filter(x => x.categoria === p.categoria && x.id !== p.id)
    .slice(0, 4);

  // Inyectar HTML
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="?page=home" onclick="navigate('home');return false" class="hover-underline">Inicio</a>
        <span class="breadcrumb-separator">/</span>
        <a href="?page=categoria-${p.categoria}" onclick="navigate('categoria-${p.categoria}');return false" class="hover-underline" style="text-transform: capitalize;">${p.categoria}</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color:var(--text-primary); font-weight:600;">${p.nombre}</span>
      </nav>

      <!-- Main Columns -->
      <div class="product-cols">
        <!-- Gallery / Image Box -->
        <div class="product-gallery">
          <img id="detail-img" src="${p.imagen}" alt="${p.nombre}" onerror="this.src='https://placehold.co/500x500/F1F3F5/9CA3AF?text=Imagen'">
        </div>

        <!-- Info Details Panel -->
        <div class="product-info-details" style="display:flex; flex-direction:column; gap:1.25rem;">
          <div>
            <span class="detail-brand" style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--text-light); letter-spacing:1.5px;">${p.marca}</span>
            <h1 class="detail-name" style="margin:0.25rem 0 0.5rem 0; font-size:1.85rem; font-weight:800; color:var(--text-primary); line-height:1.25; font-family:'Outfit',sans-serif;">${p.nombre}</h1>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">Valoración: ${p.rating} / 5.0</span>
            </div>
          </div>

          <!-- Precios (Diseño minimalista y elegante sin caja gris pesada) -->
          <div style="display:flex; flex-direction:column; gap:0.25rem; padding: 0.5rem 0;">
            <div style="display:flex; align-items:baseline; gap:0.75rem; flex-wrap:wrap;">
              <span style="font-size:2.25rem; font-weight:800; color:var(--brand-blue); font-family:'Outfit',sans-serif; line-height:1;">${APP.formatPrice(p.precio)}</span>
              ${hd ? `
                <span style="font-size:1.15rem; color:var(--text-light); text-decoration:line-through; font-weight:500;">${APP.formatPrice(p.precioOriginal)}</span>
                <span style="font-size:0.75rem; font-weight:700; color:var(--red); background:var(--red-light); padding:2px 8px; border-radius:4px; margin-left:4px;">-${pct}% AHORRO</span>
              ` : ''}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-light); display:flex; align-items:center; gap: 0.35rem; margin-top:0.25rem;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:14px; height:14px; color:var(--green)">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Garantía oficial directa COMPUMAGIC</span>
            </div>
          </div>

          <!-- Descripción Corta -->
          <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.6; margin:0;">
            ${p.descripcion || 'Sin descripción adicional. Este periférico premium ofrece un rendimiento optimizado para gaming competitivo y tareas de productividad exigentes.'}
          </p>

          <!-- Separador Fino -->
          <div style="border-top: 1px solid var(--border-light); margin: 0.5rem 0;"></div>

          <!-- Specs Table (Diseño refinado y limpio) -->
          <div>
            <h3 style="font-family:'Outfit',sans-serif; font-size:0.95rem; font-weight:700; color:var(--text-primary); margin-bottom:0.75rem; text-transform:uppercase; letter-spacing:0.5px;">Especificaciones Técnicas</h3>
            <table class="spec-table" style="width:100%; border-collapse:collapse;">
              <tbody>
                ${Object.entries(p.specs || {}).map(([k, v]) => `
                  <tr style="border-bottom: 1px solid var(--border-light);">
                    <td style="padding: 0.6rem 0; font-size: 0.85rem; font-weight: 500; color: var(--text-light); text-transform: uppercase; font-family:'Outfit',sans-serif; font-size: 0.75rem; letter-spacing: 0.3px; width: 35%;">${k}</td>
                    <td style="padding: 0.6rem 0; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${v}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Actions (Añadir al Carrito con Selector de Cantidad) -->
          ${p.stock > 0 ? `
            <div class="product-detail-actions-row">
              <div class="qty-selector" style="height: 46px; border: 1.5px solid var(--border-default); border-radius: var(--radius-sm); display:flex; align-items:center; overflow:hidden;">
                <button class="qty-btn" style="height:100%; padding:0 1rem; border:none; background:transparent; font-weight:600; cursor:pointer;" onclick="adjustDetailQty(-1)">-</button>
                <input type="text" id="detail-qty" class="qty-input" style="height:100%; width:40px; text-align:center; border:none; border-left:1.5px solid var(--border-default); border-right:1.5px solid var(--border-default); font-weight:600; outline:none;" value="1" readonly>
                <button class="qty-btn" style="height:100%; padding:0 1rem; border:none; background:transparent; font-weight:600; cursor:pointer;" onclick="adjustDetailQty(1, ${p.stock})">+</button>
              </div>
              
              <button class="btn-primary" style="flex:1; min-width:200px; height: 46px; display:inline-flex; align-items:center; justify-content:center; gap: 8px; border-radius: var(--radius-sm); font-weight:700; font-size:0.9rem;" onclick="addDetailToCart('${p.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:18px;height:18px;">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Añadir al carrito
              </button>

              <button class="btn-outline" style="width: 46px; height: 46px; display:inline-flex; align-items:center; justify-content:center; border-radius: var(--radius-sm); padding:0;" onclick="toggleDetailFav('${p.id}', this)">
                <span class="fav-heart" style="font-size:1.2rem; color:${isFav ? 'var(--red)' : 'inherit'}">${isFav ? '♥' : '♡'}</span>
              </button>
            </div>
          ` : `
            <button class="btn-outline btn-full" disabled style="cursor:not-allowed; opacity:0.6; height: 46px; margin-top: 0.5rem;">Producto Agotado</button>
          `}
        </div>
      </div>



      <!-- Relacionados -->
      ${relacionados.length > 0 ? `
        <section class="cm-section" style="padding-bottom: 0; margin-top: 2rem;">
          <div class="section-header">
            <div>
              <h2 class="section-title">Productos Relacionados</h2>
              <p class="section-subtitle">Completa tu setup gaming con estos periféricos compatibles</p>
            </div>
          </div>
          <div class="grid grid-4">
            ${relacionados.map(r => productCardHTML(r)).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;
};

// AJUSTAR CANTIDAD EN VISTA DETALLE
window.adjustDetailQty = function(amount, maxStock = 99) {
  const el = document.getElementById('detail-qty');
  if (!el) return;
  let val = parseInt(el.value) + amount;
  if (val < 1) val = 1;
  if (val > maxStock) val = maxStock;
  el.value = val;
};

// AÑADIR A CARRITO DESDE DETALLE
window.addDetailToCart = function(id) {
  const el = document.getElementById('detail-qty');
  const qty = el ? parseInt(el.value) : 1;
  const p = APP.productos.find(x => x.id === id);
  if (p) {
    APP.addToCart(p, qty);
  }
};

// FAVORITOS DESDE DETALLE
window.toggleDetailFav = function(id, btnEl) {
  const p = APP.productos.find(x => x.id === id);
  if (p) {
    const isAdded = APP.toggleFavorito(p);
    const heart = btnEl.querySelector('.fav-heart');
    if (heart) {
      heart.textContent = isAdded ? '♥' : '♡';
      heart.style.color = isAdded ? 'var(--red)' : 'inherit';
    }
  }
};


// ═══════════════════════════════════════════════
// 2. PÁGINA: CARRITO DE COMPRAS
// ═══════════════════════════════════════════════
Pages.carrito = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const items = APP.carrito;

  if (items.length === 0) {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:64px;height:64px;color:var(--text-light);margin-bottom:1rem">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Tu carrito está vacío</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">Agrega periféricos gaming premium de nuestro catálogo para iniciar tu pedido.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('catalogo')">Ver Catálogo de Productos</button>
      </div>
    `;
    return;
  }

  // Totales
  const subtotal = items.reduce((s, i) => s + (i.producto.precio * i.cantidad), 0);
  const coupon = APP.cuponActivo;
  const desc = APP.calcDescuento(subtotal);
  const total = Math.max(0, subtotal - desc);

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <h1 class="section-title mb-8">Mi Carrito de Compras</h1>

      <div class="cart-layout">
        <!-- Tabla de Productos -->
        <div class="cm-card" style="padding:0; overflow-x:auto;">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => {
                const sub = item.producto.precio * item.cantidad;
                const pData = JSON.stringify(item.producto).replace(/"/g, '&quot;');
                return `
                  <tr>
                    <td>
                      <div class="cart-item-row" style="cursor:pointer;" onclick="navigate('producto', {id:'${item.producto.id}'})">
                        <div class="cart-thumb">
                          <img src="${item.producto.imagen}" alt="${item.producto.nombre}" loading="lazy">
                        </div>
                        <div>
                          <div class="cart-brand">${item.producto.marca}</div>
                          <div class="cart-name">${item.producto.nombre}</div>
                        </div>
                      </div>
                    </td>
                     <td data-label="Precio" style="font-weight:600; color:var(--text-primary);">${APP.formatPrice(item.producto.precio)}</td>
                     <td data-label="Cantidad">
                      <div class="qty-selector">
                        <button class="qty-btn" onclick="updateCartItemQty('${item.producto.id}', -1)">-</button>
                        <input type="text" class="qty-input" value="${item.cantidad}" readonly>
                        <button class="qty-btn" onclick="updateCartItemQty('${item.producto.id}', 1, ${item.producto.stock})">+</button>
                      </div>
                    </td>
                     <td data-label="Subtotal" style="font-weight:800; color:var(--electric-blue);">${APP.formatPrice(sub)}</td>
                    <td>
                      <button class="btn-ghost" style="color:var(--red); padding:0.5rem;" onclick="APP.removeFromCart('${item.producto.id}'); Pages.carrito();" title="Quitar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px;">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <!-- Footer de la Tabla (Cupones) -->
          <div style="padding:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-top:1px solid var(--border-light)">
            <div style="display:flex; gap:0.5rem; max-width:320px; width:100%;">
              <input type="text" id="coupon-code" class="cm-input" placeholder="Ingresa cupón (ej: MAGIC10)" value="${coupon ? coupon.codigo : ''}" ${coupon ? 'disabled' : ''}>
              ${coupon ? `
                <button class="btn-outline" style="color:var(--red); border-color:var(--red); padding:0 1rem;" onclick="removeCoupon()">Quitar</button>
              ` : `
                <button class="btn-primary" style="padding:0 1.25rem;" onclick="applyCouponCode()">Aplicar</button>
              `}
            </div>
            <button class="btn-ghost btn-sm" onclick="APP.clearCart(); Pages.carrito();" style="color:var(--text-muted)">Vaciar todo el carrito</button>
          </div>
        </div>

        <!-- Summary Card -->
        <div class="summary-card">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:1.25rem;">Resumen de Compra</h3>
          
          <div class="summary-row">
            <span>Subtotal</span>
            <span style="font-weight:600; color:var(--text-primary);">${APP.formatPrice(subtotal)}</span>
          </div>

          ${coupon ? `
            <div class="summary-row" style="color:var(--green); font-weight:600;">
              <span>Descuento (${coupon.codigo})</span>
              <span>-${APP.formatPrice(desc)}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span>Envío</span>
            <span style="color:var(--green); font-weight:600;">¡GRATIS!</span>
          </div>

          <div class="summary-row total">
            <span>Total</span>
            <span>${APP.formatPrice(total)}</span>
          </div>

          <button class="btn-primary btn-full mt-4" style="padding:0.8rem; justify-content:center;" onclick="navigate('checkout')">
            Proceder al pago
          </button>

          <a href="?page=catalogo" onclick="navigate('catalogo');return false;" class="btn-ghost btn-full text-center mt-2" style="font-size:0.8rem; font-weight:600; justify-content:center;">
            Seguir comprando
          </a>
        </div>
      </div>
    </div>
  `;
};

// CAMBIAR CANTIDAD DESDE TABLA DE CARRITO
window.updateCartItemQty = function(id, amount, maxStock = 99) {
  const items = APP.carrito;
  const item = items.find(x => x.producto.id === id);
  if (item) {
    let newQty = item.cantidad + amount;
    if (newQty < 1) newQty = 1;
    if (newQty > maxStock) {
      newQty = maxStock;
      showToast(`Stock máximo alcanzado (${maxStock} uds)`, 'warning');
    }
    APP.updateCantidad(id, newQty);
    Pages.carrito();
  }
};

// APLICAR CUPÓN
window.applyCouponCode = function() {
  const el = document.getElementById('coupon-code');
  if (!el) return;
  const cod = el.value.trim();
  if (!cod) {
    showToast('Ingresa un código de cupón', 'warning');
    return;
  }
  const res = APP.aplicarCupon(cod);
  showToast(res.msg, res.ok ? 'success' : 'error');
  Pages.carrito();
};

// QUITAR CUPÓN
window.removeCoupon = function() {
  APP.quitarCupon();
  showToast('Cupón eliminado', 'info');
  Pages.carrito();
};


// ═══════════════════════════════════════════════
// 3. PÁGINA: CHECKOUT (DATOS Y ENVÍO)
// ═══════════════════════════════════════════════
Pages.checkout = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const items = APP.carrito;
  if (items.length === 0) {
    navigate('carrito');
    return;
  }

  const subtotal = items.reduce((s, i) => s + (i.producto.precio * i.cantidad), 0);
  const coupon = APP.cuponActivo;
  const desc = APP.calcDescuento(subtotal);
  const total = Math.max(0, subtotal - desc);
  const u = APP.usuarioActual;

  const departamentos = [
    "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao",
    "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque",
    "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno",
    "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];
  const defaultDept = (u && u.ciudad && departamentos.includes(u.ciudad)) ? u.ciudad : "Tacna";

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <!-- Breadcrumb de progreso -->
      <div style="display:flex; align-items:center; justify-content:center; gap:0.75rem; margin-bottom:2.5rem; font-family:'Outfit',sans-serif; font-size:0.85rem;">
        <span style="color:var(--text-muted); display:flex; align-items:center; gap:0.25rem; font-weight:500;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Carrito
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="color:var(--text-light);"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:var(--electric-blue); font-weight:700; display:flex; align-items:center; gap:0.35rem; background:var(--electric-blue-light); padding:4px 12px; border-radius:99px;">
          <span style="width:6px; height:6px; background:var(--electric-blue); border-radius:50%;"></span>
          Envío y Pago
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="color:var(--text-light);"><path d="M9 18l6-6-6-6"/></svg>
        <span style="color:var(--text-light); display:flex; align-items:center; gap:0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          Confirmación
        </span>
      </div>

      <h1 class="section-title mb-8">Finalizar Pedido</h1>

      <form id="checkout-form" onsubmit="handlePlaceOrder(event)" class="cart-layout">
        <!-- Formulario de Datos -->
        <div class="cm-card" style="display:flex; flex-direction:column; gap:1.5rem; box-shadow: var(--shadow-md); border-radius: 12px; border: 1px solid var(--border-light);">
          
          <!-- Encabezado Sección 1 -->
          <div style="display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid var(--border-light); padding-bottom:0.75rem;">
            <div style="width:32px; height:32px; background:var(--electric-blue-light); color:var(--electric-blue); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">
              Datos de Facturación y Envío
            </h3>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nombre Completo *</label>
              <input type="text" id="chk-nombre" class="cm-input" placeholder="Nombre y Apellidos" value="${u ? u.nombre : ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Correo Electrónico *</label>
              <input type="email" id="chk-email" class="cm-input" placeholder="correo@ejemplo.com" value="${u ? u.email : ''}" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Teléfono / WhatsApp *</label>
              <input type="tel" id="chk-telefono" class="cm-input" placeholder="9XXXXXXXX" value="${u && u.telefono ? u.telefono : ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Dirección Completa *</label>
              <input type="text" id="chk-direccion" class="cm-input" placeholder="Av. / Calle / Nro. / Dpto." value="${u && u.direccion ? u.direccion : ''}" required>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Ciudad / Distrito *</label>
              <input type="text" id="chk-distrito" class="cm-input" placeholder="Ej: Yanahuara" value="${u && u.ciudad ? u.ciudad : ''}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Departamento *</label>
              <select id="chk-departamento" class="cm-input" style="cursor:pointer;" onchange="handleDepartmentChange(this.value)" required>
                ${departamentos.map(d => `<option value="${d}" ${d === defaultDept ? 'selected' : ''}>${d}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notas Adicionales (Opcional)</label>
            <textarea id="chk-notas" class="cm-textarea" placeholder="Instrucciones especiales para la entrega."></textarea>
          </div>

          <!-- Encabezado Sección 2 -->
          <div style="display:flex; align-items:center; gap:0.5rem; border-bottom:1px solid var(--border-light); padding-bottom:0.75rem; margin-top:1rem;">
            <div style="width:32px; height:32px; background:var(--electric-blue-light); color:var(--electric-blue); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); margin:0;">
              Método de Pago
            </h3>
          </div>

          <div class="payment-options">
            <!-- Opción: Transferencia o Yape -->
            <div class="payment-option active" id="pay-opt-bank" onclick="selectPaymentMethod('bank')" style="display:flex; align-items:flex-start; gap:1rem; padding:1.25rem; border-radius:12px; border:2px solid var(--electric-blue); background:var(--electric-blue-light); cursor:pointer; transition:all 0.25s;">
              <input type="radio" name="pay-method" value="bank" checked style="accent-color:var(--electric-blue); margin-top:4px; transform: scale(1.25);">
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; width:100%;">
                  <span style="font-weight:700; color:var(--text-primary); font-size:0.95rem; font-family:'Outfit',sans-serif;">Transferencia Bancaria o Yape / Plin</span>
                  <span style="background:var(--electric-blue); color:white; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.5px; margin-left:auto;">Recomendado</span>
                </div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.35rem; line-height:1.45;">Paga vía Yape, Plin o transferencia directa (BCP, Interbank). Envía el comprobante por WhatsApp tras registrar el pedido.</div>
                
                <div style="display:flex; gap:0.4rem; margin-top:0.75rem; flex-wrap:wrap;">
                  <span style="font-size:0.7rem; font-weight:700; color:#5500A5; background:rgba(85,0,165,0.08); border:1px solid rgba(85,0,165,0.15); padding:2px 8px; border-radius:4px;">Yape</span>
                  <span style="font-size:0.7rem; font-weight:700; color:#00B69B; background:rgba(0,182,155,0.08); border:1px solid rgba(0,182,155,0.15); padding:2px 8px; border-radius:4px;">Plin</span>
                  <span style="font-size:0.7rem; font-weight:700; color:var(--electric-blue); background:var(--electric-blue-light); border:1px solid rgba(0,102,255,0.15); padding:2px 8px; border-radius:4px;">Bancos</span>
                </div>
              </div>
            </div>

            <!-- Opción: Pago Contra Entrega -->
            <div class="payment-option" id="pay-opt-cod" onclick="selectPaymentMethod('cod')" style="display:flex; align-items:flex-start; gap:1rem; padding:1.25rem; border-radius:12px; border:2px solid var(--border-default); background:var(--bg-surface); cursor:pointer; transition:all 0.25s;">
              <input type="radio" name="pay-method" value="cod" style="accent-color:var(--electric-blue); margin-top:4px; transform: scale(1.25);">
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; flex-wrap:wrap; width:100%;">
                  <span style="font-weight:700; color:var(--text-primary); font-size:0.95rem; font-family:'Outfit',sans-serif;">Pago Contra Entrega (Solo Tacna)</span>
                </div>
                <div class="cod-desc" style="font-size:0.8rem; color:var(--text-muted); margin-top:0.35rem; line-height:1.45;">Cancela en efectivo o tarjeta POS directamente cuando entreguemos el periférico en tu domicilio (Tacna).</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen de Pedido lateral -->
        <div class="summary-card" style="box-shadow: var(--shadow-md); border-radius: 12px; border: 1px solid var(--border-light); height:fit-content;">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:1.5rem; border-bottom:1px solid var(--border-light); padding-bottom:0.75rem;">
            Tu Pedido
          </h3>
          
          <div style="max-height: 250px; overflow-y: auto; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1.25rem; display:flex; flex-direction:column; gap:0.75rem;">
            ${items.map(i => `
              <div style="display:flex; gap:0.75rem; align-items:center; font-size:0.85rem;">
                <img src="${i.producto.imagen}" alt="${i.producto.nombre}" style="width:44px; height:44px; object-fit:cover; border-radius:6px; background:var(--bg-muted); border:1px solid var(--border-light); flex-shrink:0;">
                <div style="flex:1; min-width:0;">
                  <div style="font-weight:600; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${i.producto.nombre}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Cantidad: ${i.cantidad} &middot; ${APP.formatPrice(i.producto.precio)} c/u</div>
                </div>
                <span style="font-weight:700; color:var(--text-primary); font-family:'Outfit',sans-serif; margin-left:auto;">${APP.formatPrice(i.producto.precio * i.cantidad)}</span>
              </div>
            `).join('')}
          </div>

          <div class="summary-row" style="font-size:0.85rem; color:var(--text-secondary);">
            <span>Subtotal</span>
            <span style="font-weight:600; color:var(--text-primary);">${APP.formatPrice(subtotal)}</span>
          </div>

          ${coupon ? `
            <div class="summary-row" style="font-size:0.85rem; color:var(--green); font-weight:600;">
              <span>Cupón (${coupon.codigo})</span>
              <span>-${APP.formatPrice(desc)}</span>
            </div>
          ` : ''}

          <div class="summary-row" style="font-size:0.85rem; color:var(--text-secondary);">
            <span>Envío Express</span>
            <span style="color:var(--green); font-weight:700; text-transform:uppercase; font-size:0.75rem; letter-spacing:0.5px;">Gratis</span>
          </div>

          <div class="summary-row total" style="margin-bottom:1.75rem; padding-top:1.25rem; border-top:1px dashed var(--border-light); margin-top:1.25rem;">
            <span style="font-family:'Outfit',sans-serif; font-size:1rem; font-weight:800;">Total a pagar</span>
            <span style="font-family:'Outfit',sans-serif; font-size:1.35rem; font-weight:900; color:var(--electric-blue);">${APP.formatPrice(total)}</span>
          </div>

          <button type="submit" class="btn-primary btn-full" style="padding:0.9rem; justify-content:center; font-family:'Outfit',sans-serif; font-weight:800; font-size:0.95rem; border-radius:8px; display:flex; align-items:center; gap:0.5rem; box-shadow:0 4px 12px rgba(0, 102, 255, 0.2);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Confirmar y realizar pedido
          </button>
        </div>
      </form>
    </div>
  `;

  // Inicializar estado del pago contra entrega según el departamento seleccionado
  setTimeout(() => {
    const deptVal = document.getElementById('chk-departamento')?.value;
    if (deptVal) {
      window.handleDepartmentChange(deptVal);
    }
  }, 50);
};

// CONTROLAR ACCESO A PAGO CONTRA ENTREGA SEGÚN DEPARTAMENTO
window.handleDepartmentChange = function(dept) {
  const oCod = document.getElementById('pay-opt-cod');
  const oCodDesc = oCod?.querySelector('.cod-desc');
  if (!oCod) return;

  if (dept === 'Tacna') {
    oCod.style.opacity = '1';
    oCod.style.pointerEvents = 'auto';
    oCod.style.cursor = 'pointer';
    if (oCodDesc) {
      oCodDesc.textContent = 'Cancela en efectivo o tarjeta cuando entreguemos el periférico en tu domicilio (Tacna).';
      oCodDesc.style.color = 'var(--text-muted)';
    }
  } else {
    // Si estaba seleccionado COD, forzar cambio a transferencia bancaria
    const checkedInput = document.querySelector('input[name="pay-method"]:checked');
    if (checkedInput && checkedInput.value === 'cod') {
      window.selectPaymentMethod('bank');
      showToast('Pago Contra Entrega solo disponible para Tacna. Se seleccionó Transferencia Bancaria.', 'info');
    }
    oCod.style.opacity = '0.5';
    oCod.style.pointerEvents = 'none';
    oCod.style.cursor = 'not-allowed';
    if (oCodDesc) {
      oCodDesc.textContent = 'No disponible fuera de Tacna. Por favor use Transferencia Bancaria o Yape.';
      oCodDesc.style.color = 'var(--red)';
    }
  }
};

// SELECCIONAR MÉTODO DE PAGO
window.selectPaymentMethod = function(method) {
  const oBank = document.getElementById('pay-opt-bank');
  const oCod = document.getElementById('pay-opt-cod');
  if (!oBank || !oCod) return;

  if (method === 'bank') {
    oBank.classList.add('active');
    oBank.querySelector('input').checked = true;
    oCod.classList.remove('active');
  } else {
    const dept = document.getElementById('chk-departamento')?.value;
    if (dept !== 'Tacna') {
      showToast('El pago contra entrega solo está disponible en Tacna.', 'warning');
      return;
    }
    oCod.classList.add('active');
    oCod.querySelector('input').checked = true;
    oBank.classList.remove('active');
  }
};

// MANEJADOR DE REALIZAR PEDIDO (SUBMIT FORM)
window.handlePlaceOrder = function(e) {
  e.preventDefault();

  const nombre = document.getElementById('chk-nombre').value.trim();
  const email = document.getElementById('chk-email').value.trim();
  const telefono = document.getElementById('chk-telefono').value.trim();
  const direccion = document.getElementById('chk-direccion').value.trim();
  const distrito = document.getElementById('chk-distrito').value.trim();
  const departamento = document.getElementById('chk-departamento').value;
  const notas = document.getElementById('chk-notas').value.trim();
  
  const mPago = document.querySelector('input[name="pay-method"]:checked').value;
  const pagoTexto = mPago === 'bank' ? 'Transferencia / Yape' : 'Contra Entrega';

  const envio = {
    nombreCompleto: nombre,
    email: email,
    telefono: telefono,
    direccion: direccion,
    distrito: distrito,
    departamento: departamento,
    notas: notas
  };

  const p = APP.crearPedido(envio, pagoTexto);
  if (p) {
    showToast('¡Pedido registrado con éxito!', 'success');
    navigate('confirmacion', { pedido: p.id });
  } else {
    showToast('Error al procesar el pedido.', 'error');
  }
};


// ═══════════════════════════════════════════════
// 4. PÁGINA: CONFIRMACIÓN DE PEDIDO
// ═══════════════════════════════════════════════
Pages.confirmacion = function(pedidoId) {
  const app = document.getElementById('app');
  if (!app) return;

  const o = APP.pedidos.find(x => x.id === pedidoId);
  if (!o) {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Código inválido</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">El identificador de pedido especificado no existe.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('home')">Volver al inicio</button>
      </div>
    `;
    return;
  }

  // Generar link de WhatsApp
  const numWhatsApp = "51925000899";
  const textoMsg = `Hola COMPUMAGIC, acabo de realizar el pedido con código *${o.codigo}* en tu web.\n\n*Detalles del Pedido:*\n- Cliente: ${o.envio.nombreCompleto}\n- Teléfono: ${o.envio.telefono}\n- Total: ${APP.formatPrice(o.totalFinal)}\n- Método de Pago: ${o.metodoPago}\n\nPor favor, facilítame los datos bancarios para realizar el pago y coordinar el despacho. ¡Gracias!`;
  const urlWhatsApp = `https://wa.me/${numWhatsApp}?text=${encodeURIComponent(textoMsg)}`;

  app.innerHTML = `
    <div class="cm-container text-center" style="padding: 4rem 1.25rem; max-width:600px; padding-bottom: 6rem;">
      
      <!-- Checkmark Icon Animation -->
      <div style="width:72px; height:72px; background:var(--green-light); color:var(--green); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem auto;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" style="width:36px; height:36px;">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 style="font-family:'Outfit',sans-serif; font-size:2rem; font-weight:800; color:var(--text-primary); margin-bottom:0.5rem;">¡Gracias por tu compra!</h1>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:2rem;">Tu pedido ha sido procesado de forma segura y se encuentra en estado <b>Pendiente de Pago</b>.</p>

      <!-- Resumen en Tarjeta -->
      <div class="cm-card" style="text-align:left; margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border-light); padding-bottom:0.75rem; margin-bottom:0.75rem;">
          <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">Código del Pedido</span>
          <span style="font-size:0.9rem; font-weight:800; color:var(--electric-blue);">${o.codigo}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
          <span>Cliente:</span>
          <span style="font-weight:600; color:var(--text-primary);">${o.envio.nombreCompleto}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
          <span>Teléfono:</span>
          <span style="font-weight:600; color:var(--text-primary);">${o.envio.telefono}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
          <span>Dirección de Envío:</span>
          <span style="font-weight:600; color:var(--text-primary); text-align:right;">${o.envio.direccion}, ${o.envio.distrito} (${o.envio.departamento})</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.875rem;">
          <span>Método de Pago:</span>
          <span style="font-weight:600; color:var(--text-primary);">${o.metodoPago}</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-light); padding-top:0.75rem; margin-top:0.75rem; font-size:1.1rem; font-weight:800;">
          <span style="color:var(--text-primary);">Total a Pagar:</span>
          <span style="color:var(--electric-blue);">${APP.formatPrice(o.totalFinal)}</span>
        </div>
      </div>

      <!-- Importante WhatsApp Call-to-Action -->
      <div class="cm-card" style="border-color:var(--green); background:var(--green-light); padding:1.25rem; margin-bottom:2rem; text-align:left; display:flex; align-items:flex-start; gap:0.75rem;">
        <span style="font-size:1.5rem; line-height:1;">📱</span>
        <div>
          <h4 style="color:#047857; font-weight:700; font-size:0.9rem; margin-bottom:0.25rem;">Paso final necesario: Coordinar Pago</h4>
          <p style="font-size:0.8rem; color:#065F46; line-height:1.5;">Haz clic en el botón de WhatsApp abajo para enviar este resumen a un asesor técnico. Recibirás de inmediato las cuentas BCP/BBVA o el QR Yape para concretar la transacción y programar tu entrega express.</p>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        <a href="${urlWhatsApp}" target="_blank" rel="noopener" class="btn-primary" style="background:#25D366; color:white; padding:0.9rem; justify-content:center; font-weight:700; font-size:1rem; border-radius:9999px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="margin-right:4px;">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.977h.004c4.368 0 7.926-3.559 7.93-7.934A7.868 7.868 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.1-.195-.177-.59-.64-.395-.46-.788-.892-.88-1.002-.092-.11-.184-.176-.306-.068-.12.107-.49.576-.6.7-.11.124-.22.138-.42.04-.2-.1-.843-.311-1.605-.989-.593-.53-1.002-1.182-1.118-1.38-.117-.198-.012-.304.088-.403.09-.09.2-.23.3-.34.1-.11.133-.19.2-.32.067-.13.034-.245-.017-.35-.05-.103-.49-1.212-.672-1.65-.178-.43-.36-.37-.49-.375-.125-.005-.27-.005-.415-.005-.145 0-.38.054-.58.273-.2.22-.76.74-.76 1.807 0 1.067.77 2.098.88 2.244.11.147 1.517 2.316 3.673 3.248.513.221.913.353 1.226.452.515.163.985.14 1.355.084.413-.062 1.27-.52 1.45-1.02.18-.5 1.82 2.32 1.82 2.32v-.003z"/>
          </svg>
          Enviar pedido a WhatsApp
        </a>
        <a class="btn-outline btn-rounded" style="padding:0.75rem; justify-content:center; font-weight:600;" href="?page=home" onclick="navigate('home');return false;">
          Volver a la página de inicio
        </a>
      </div>
    </div>
  `;
};


// ═══════════════════════════════════════════════
// 5. PÁGINA: INGRESO / REGISTRO DE USUARIO
// ═══════════════════════════════════════════════
Pages.login = function() {
  const app = document.getElementById('app');
  if (!app) return;

  if (APP.usuarioActual) {
    navigate('perfil');
    return;
  }

  app.innerHTML = `
    <div class="cm-container" style="padding: 3rem 1.25rem; display:flex; justify-content:center; align-items:center; min-height:70vh; padding-bottom:5rem;">
      <div class="cm-card" style="max-width:420px; width:100%; padding:2rem 2.25rem;">
        
        <!-- Tabs -->
        <div style="display:flex; border-bottom:2px solid var(--border-light); margin-bottom:1.75rem;">
          <button id="tab-btn-login" class="btn-ghost" style="flex:1; border-radius:0; border-bottom:2px solid var(--electric-blue); font-weight:700; color:var(--electric-blue); padding-bottom:0.75rem;" onclick="switchLoginTab('login')">
            Iniciar Sesión
          </button>
          <button id="tab-btn-register" class="btn-ghost" style="flex:1; border-radius:0; border-bottom:2px solid transparent; font-weight:600; color:var(--text-muted); padding-bottom:0.75rem;" onclick="switchLoginTab('register')">
            Registrarse
          </button>
        </div>

        <!-- Login Form -->
        <form id="form-login" onsubmit="handleUserLogin(event)" style="display:flex; flex-direction:column; gap:1.25rem;">
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" id="log-email" class="cm-input" placeholder="correo@ejemplo.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input type="password" id="log-pass" class="cm-input" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700; margin-top:0.5rem;">
            Ingresar
          </button>
        </form>

        <!-- Register Form (Hidden initially) -->
        <form id="form-register" onsubmit="handleUserRegister(event)" style="display:none; flex-direction:column; gap:1.25rem;">
          <div class="form-group">
            <label class="form-label">Nombre Completo</label>
            <input type="text" id="reg-name" class="cm-input" placeholder="Tu Nombre" required>
          </div>
          <div class="form-group">
            <label class="form-label">Correo Electrónico</label>
            <input type="email" id="reg-email" class="cm-input" placeholder="correo@ejemplo.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input type="password" id="reg-pass" class="cm-input" placeholder="Mínimo 6 caracteres" minlength="6" required>
          </div>
          
          <button type="submit" class="btn-primary btn-full" style="padding:0.75rem; justify-content:center; font-weight:700; margin-top:0.5rem;">
            Crear Cuenta
          </button>
        </form>

      </div>
    </div>
  `;
};

// SWITCH TABS EN LOGIN
window.switchLoginTab = function(tab) {
  const btnLog = document.getElementById('tab-btn-login');
  const btnReg = document.getElementById('tab-btn-register');
  const fLog = document.getElementById('form-login');
  const fReg = document.getElementById('form-register');

  if (!btnLog || !btnReg || !fLog || !fReg) return;

  if (tab === 'login') {
    btnLog.style.borderBottomColor = 'var(--electric-blue)';
    btnLog.style.color = 'var(--electric-blue)';
    btnLog.style.fontWeight = '700';

    btnReg.style.borderBottomColor = 'transparent';
    btnReg.style.color = 'var(--text-muted)';
    btnReg.style.fontWeight = '600';

    fLog.style.display = 'flex';
    fReg.style.display = 'none';
  } else {
    btnReg.style.borderBottomColor = 'var(--electric-blue)';
    btnReg.style.color = 'var(--electric-blue)';
    btnReg.style.fontWeight = '700';

    btnLog.style.borderBottomColor = 'transparent';
    btnLog.style.color = 'var(--text-muted)';
    btnLog.style.fontWeight = '600';

    fReg.style.display = 'flex';
    fLog.style.display = 'none';
  }
};

// MANEJADORES DE ENVÍO
window.handleUserLogin = async function(e) {
  e.preventDefault();
  const email = document.getElementById('log-email').value.trim();
  const pass = document.getElementById('log-pass').value;

  const res = await APP.login(email, pass);
  showToast(res.msg, res.ok ? 'success' : 'error');
  if (res.ok) {
    // Al iniciar sesión de manera exitosa, redirigimos a la página de inicio (home)
    // para que el administrador eche un vistazo general de la tienda antes de entrar al panel.
    navigate('home');
  }
};

window.handleUserRegister = async function(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;

  const res = await APP.registro(name, email, pass);
  showToast(res.msg, res.ok ? 'success' : 'error');
  if (res.ok) {
    navigate('home');
  }
};


// ═══════════════════════════════════════════════
// 6. PÁGINA: MI PERFIL DE USUARIO
// ═══════════════════════════════════════════════
Pages.perfil = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const u = APP.usuarioActual;
  if (!u) {
    navigate('login');
    return;
  }

  // Filtrar pedidos correspondientes a este usuario
  const misOrd = APP.pedidos.filter(o => o.usuarioId === u.id || (o.usuarioId === 'guest' && o.usuarioNombre.split(' ')[0] === u.nombre.split(' ')[0]));
  const isEdit = !!window.perfilEditMode;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:2rem;">
        <h1 class="section-title">Mi Cuenta</h1>
        <button class="btn-outline btn-sm" onclick="APP.logout(); navigate('home');" style="color:var(--red); border-color:var(--red); border-radius:var(--radius-sm); font-weight:600;">Cerrar Sesión</button>
      </div>

      <!-- Layout de Perfil Adaptativo -->
      <div class="profile-layout" style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
        <style>
          @media (min-width: 1024px) {
            .profile-layout {
              grid-template-columns: 320px 1fr !important;
            }
          }
        </style>

        <!-- Columna Izquierda: Información de Usuario (320px) -->
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          
          <!-- Datos de Cuenta -->
          <div class="cm-card" style="padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem; background:var(--bg-surface);">
            <div style="display:flex; gap:1rem; align-items:center;">
              <div style="width:54px; height:54px; background:var(--electric-blue); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.35rem; font-weight:800; font-family:'Outfit',sans-serif;">
                ${u.avatar || u.nombre[0]}
              </div>
              <div>
                <h2 style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-bottom:0.15rem; line-height:1.2;">${u.nombre}</h2>
                <span class="badge ${u.rol === 'admin' ? 'badge-blue' : 'badge-navy'}" style="font-size:0.7rem; font-weight:700;">${u.rol === 'admin' ? 'Administrador' : 'Cliente'}</span>
              </div>
            </div>
            
            <div style="border-top:1px solid var(--border-light); padding-top:1rem; display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem;">
              <div>
                <div style="color:var(--text-light); font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.15rem;">Correo Electrónico</div>
                <div style="color:var(--text-primary); font-weight:500; word-break:break-all;">${u.email}</div>
              </div>
              <div>
                <div style="color:var(--text-light); font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.15rem;">Teléfono / Celular</div>
                ${isEdit ? `
                  <input type="text" id="edit-telefono" class="cm-input" value="${u.telefono || ''}" placeholder="Ej. +51 925 000 899" style="margin-top:0.25rem; font-size:0.85rem; padding:6px 10px;">
                ` : `
                  <div style="color:${u.telefono ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight:500;">${u.telefono || 'No especificado'}</div>
                `}
              </div>
            </div>
          </div>

          <!-- Datos de Envío -->
          <div class="cm-card" style="padding:1.5rem; display:flex; flex-direction:column; gap:1rem; background:var(--bg-surface);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 style="font-family:'Outfit',sans-serif; font-size:0.95rem; font-weight:800; color:var(--text-primary); text-transform:uppercase; letter-spacing:0.5px;">Dirección de Envío</h3>
              ${!isEdit ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--text-light); cursor:pointer;" onclick="window.togglePerfilEdit(true)"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              ` : ''}
            </div>
            
            <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.85rem; border-top:1px solid var(--border-light); padding-top:1rem;">
              <div>
                <div style="color:var(--text-light); font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.15rem;">Calle / Av</div>
                ${isEdit ? `
                  <input type="text" id="edit-direccion" class="cm-input" value="${u.direccion || ''}" placeholder="Ej. Mercadillo Bolognesi A-16" style="margin-top:0.25rem; font-size:0.85rem; padding:6px 10px;">
                ` : `
                  <div style="color:${u.direccion ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight:500;">${u.direccion || 'No especificado'}</div>
                `}
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                <div>
                  <div style="color:var(--text-light); font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.15rem;">Ciudad</div>
                  ${isEdit ? `
                    <input type="text" id="edit-ciudad" class="cm-input" value="${u.ciudad || ''}" placeholder="Ej. Tacna" style="margin-top:0.25rem; font-size:0.85rem; padding:6px 10px;">
                  ` : `
                    <div style="color:${u.ciudad ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight:500;">${u.ciudad || 'No especificado'}</div>
                  `}
                </div>
                <div>
                  <div style="color:var(--text-light); font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.15rem;">País</div>
                  ${isEdit ? `
                    <input type="text" id="edit-pais" class="cm-input" value="${u.pais || ''}" placeholder="Ej. Perú" style="margin-top:0.25rem; font-size:0.85rem; padding:6px 10px;">
                  ` : `
                    <div style="color:${u.pais ? 'var(--text-primary)' : 'var(--text-muted)'}; font-weight:500;">${u.pais || 'No especificado'}</div>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Acciones de Edición -->
          ${isEdit ? `
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-primary btn-sm btn-rounded" onclick="window.savePerfilEdit()" style="flex:1; justify-content:center; font-weight:600;">Guardar</button>
              <button class="btn-outline btn-sm btn-rounded" onclick="window.togglePerfilEdit(false)" style="flex:1; justify-content:center; font-weight:600;">Cancelar</button>
            </div>
          ` : `
            <button class="btn-primary btn-sm btn-rounded btn-full" onclick="window.togglePerfilEdit(true)" style="font-weight:600; justify-content:center;">Editar Perfil</button>
          `}

        </div>

        <!-- Columna Derecha: Historial de Pedidos (1fr) -->
        <div class="cm-card" style="padding:1.5rem 0; background:var(--bg-surface); height:fit-content;">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:800; color:var(--text-primary); border-bottom:1px solid var(--border-light); padding-bottom:0.75rem; padding-left:1.5rem; padding-right:1.5rem; margin-bottom:1rem; text-transform:uppercase; letter-spacing:0.5px;">
            Historial de Pedidos (${misOrd.length})
          </h3>

          ${misOrd.length === 0 ? `
            <div style="text-align:center; padding:3.5rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.75rem;">
              <div style="width:54px; height:54px; background:var(--electric-blue-light); color:var(--electric-blue); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <div style="font-weight:700; color:var(--text-primary); font-size:1.05rem; font-family:'Outfit',sans-serif; margin-top:0.25rem;">Sin pedidos registrados</div>
              <p style="font-size:0.85rem; color:var(--text-muted); max-width:280px; margin:0 0 0.5rem 0; line-height:1.5;">Aún no has realizado ninguna compra en nuestra tienda online.</p>
              <a href="?page=catalogo" onclick="navigate('catalogo');return false;" class="btn-primary btn-sm btn-rounded" style="display:inline-flex; align-items:center; gap:4px; font-weight:600; padding:0.5rem 1.25rem;">
                Comenzar a comprar
              </a>
            </div>
          ` : `
            <div style="overflow-x:auto; padding:0 1rem;">
              <table class="admin-table" style="font-size:0.875rem;">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Método</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  ${misOrd.map(o => {
                    let bCls = 'badge-amber';
                    if (o.estado === 'Entregado') bCls = 'badge-green';
                    if (o.estado === 'Cancelado') bCls = 'badge-red';
                    
                    return `
                      <tr>
                        <td style="font-weight:700; color:var(--electric-blue); cursor:pointer;" onclick="navigate('confirmacion', {pedido:'${o.id}'})">${o.codigo}</td>
                        <td>${o.fecha}</td>
                        <td style="font-weight:700;">${APP.formatPrice(o.totalFinal)}</td>
                        <td style="font-size:11px; color:var(--text-muted);">${o.metodoPago}</td>
                        <td><span class="badge ${bCls}" style="font-size:0.7rem; font-weight:700;">${o.estado}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
};

window.togglePerfilEdit = function(active) {
  window.perfilEditMode = active;
  Pages.perfil();
};

window.savePerfilEdit = async function() {
  const u = APP.usuarioActual;
  if (!u) return;

  const tel = document.getElementById('edit-telefono').value.trim();
  const dir = document.getElementById('edit-direccion').value.trim();
  const ciu = document.getElementById('edit-ciudad').value.trim();
  const pai = document.getElementById('edit-pais').value.trim();

  try {
    const response = await fetch('backend/api_auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_profile',
        user_id: u.id,
        telefono: tel,
        direccion: dir,
        ciudad: ciu,
        pais: pai
      })
    });
    const res = await response.json();
    if (res && !res.error) {
      APP.save('cm_current_user', res.user);
      showToast(res.mensaje, 'success');
      window.perfilEditMode = false;
      Pages.perfil();
    } else {
      showToast(res.mensaje || 'Error al actualizar perfil', 'error');
    }
  } catch (err) {
    console.error(err);
    showToast('Error de conexión con el servidor', 'error');
  }
};

// ═══════════════════════════════════════════════
// 7. PÁGINA: MIS PEDIDOS (REDIRECCIÓN A PERFIL)
// ═══════════════════════════════════════════════
Pages.misPedidos = function() {
  Pages.perfil();
};

// ═══════════════════════════════════════════════
// 8. PÁGINA: FAVORITOS
// ═══════════════════════════════════════════════
Pages.favoritos = function() {
  const app = document.getElementById('app');
  if (!app) return;

  const favs = APP.favoritos;

  if (favs.length === 0) {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:64px;height:64px;color:var(--text-light);margin-bottom:1rem">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--text-primary); margin-bottom: 1rem;">Tus favoritos están vacíos</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">Guarda los periféricos que más te gustan para revisarlos o comprarlos después.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('catalogo')">Explorar Catálogo</button>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <h1 class="section-title mb-2">Mis Favoritos</h1>
      <p class="section-subtitle mb-8">Tus periféricos gaming guardados para comprar después</p>

      <div class="grid grid-4">
        ${favs.map(p => productCardHTML(p)).join('')}
      </div>
    </div>
  `;
};

// ═══════════════════════════════════════════════
// 7.1 PÁGINA: DETALLE DE PEDIDO (CLIENTE)
// ═══════════════════════════════════════════════
Pages.detallePedido = function(id) {
  const app = document.getElementById('app');
  if (!app) return;

  const o = APP.pedidos.find(x => x.id === id);

  if (!o) {
    app.innerHTML = `
      <div class="cm-container text-center" style="padding: 6rem 2rem;">
        <h2 style="font-family:'Outfit',sans-serif; font-size: 2rem; color: var(--red); margin-bottom: 1rem;">Pedido no encontrado</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">No pudimos encontrar el código de pedido especificado en el sistema.</p>
        <button class="btn-primary btn-rounded" onclick="navigate('perfil')">Ir a mis pedidos</button>
      </div>
    `;
    return;
  }

  const steps = ['Pendiente', 'En camino', 'Entregado'];
  const currentStepIdx = steps.indexOf(o.estado);
  
  let stepHTML = steps.map((s, idx) => {
    const isCompleted = idx <= currentStepIdx;
    const isActive = idx === currentStepIdx;
    return `
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; position:relative;">
        <div style="width:36px; height:36px; border-radius:50%; background:${isCompleted ? 'var(--brand-blue)' : 'var(--bg-muted)'}; color:${isCompleted ? '#fff' : 'var(--text-secondary)'}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem; z-index:2; border: 3px solid ${isActive ? 'var(--brand-yellow)' : 'transparent'};">
          ${idx + 1}
        </div>
        <span style="font-size:0.8rem; font-weight:600; color:${isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)'}; margin-top:0.5rem; text-align:center;">${s}</span>
      </div>
    `;
  }).join('');

  // Generar reporte resumen para WhatsApp
  const itemsText = o.items.map(i => `- ${i.producto.nombre} x${i.cantidad} (${APP.formatPrice(i.producto.precio * i.cantidad)})`).join('%0A');
  const msgWhatsApp = `Hola COMPUMAGIC, mi nombre es ${o.usuarioNombre} y quiero consultar sobre el estado de mi pedido con código ${o.codigo}.%0AResumen de productos:%0A${itemsText}%0ATotal Final: ${APP.formatPrice(o.totalFinal)}%0AEstado actual: ${o.estado}`;
  const urlWhatsApp = `https://wa.me/51925000899?text=${msgWhatsApp}`;

  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <div class="breadcrumb">
        <a href="?page=home" onclick="navigate('home');return false">Inicio</a>
        <span class="breadcrumb-separator">/</span>
        <a href="?page=perfil" onclick="navigate('perfil');return false">Mi Perfil</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color:var(--text-primary)">Detalle de Pedido</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h1 class="section-title">Pedido ${o.codigo}</h1>
          <p class="section-subtitle">Realizado el ${o.fecha}</p>
        </div>
        <a href="?page=perfil" onclick="navigate('perfil');return false" class="btn-outline btn-rounded btn-sm" style="display:flex; align-items:center; gap:0.4rem;">
          Volver a mis pedidos
        </a>
      </div>

      <div style="display:grid; grid-template-columns:1fr; gap:2rem; max-width:960px; margin:0 auto;">
        
        <!-- Estado del envío -->
        <div class="cm-card">
          <h3 style="font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:700; margin-bottom:1.5rem; color:var(--text-primary);">Estado del Envío</h3>
          
          <div style="position:relative; display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; padding: 0 1rem;">
            <!-- Linea de progreso de fondo -->
            <div style="position:absolute; top:18px; left:10%; right:10%; height:4px; background:var(--bg-muted); z-index:1;"></div>
            <!-- Linea de progreso activa -->
            <div style="position:absolute; top:18px; left:10%; width:${currentStepIdx >= 0 ? (currentStepIdx / 2) * 80 : 0}%; height:4px; background:var(--brand-blue); z-index:1; transition: width 0.4s ease;"></div>
            ${stepHTML}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr; gap:1.5rem;">
          <div style="display:grid; grid-template-columns:1fr; gap:1.5rem; grid-template-rows: auto;">
            
            <div style="display:flex; gap:1.5rem; flex-wrap:wrap; width: 100%;">
              <!-- Datos de Envío -->
              <div class="cm-card" style="padding:1.25rem; flex:1; min-width:280px;">
                <h4 style="font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; margin-bottom:0.75rem; color:var(--text-primary);">Detalles de Entrega</h4>
                <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">
                  <strong>Destinatario:</strong> ${o.envio.nombreCompleto}<br>
                  <strong>Teléfono:</strong> ${o.envio.telefono}<br>
                  <strong>Dirección:</strong> ${o.envio.direccion}, ${o.envio.distrito}<br>
                  <strong>Referencia:</strong> ${o.envio.referencia || '—'}<br>
                  <strong>Ciudad/Provincia:</strong> ${o.envio.ciudad || 'Tacna, Perú'}
                </p>
              </div>

              <!-- Datos de Pago -->
              <div class="cm-card" style="padding:1.25rem; flex:1; min-width:280px;">
                <h4 style="font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; margin-bottom:0.75rem; color:var(--text-primary);">Información de Pago</h4>
                <p style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;">
                  <strong>Método de Pago:</strong> ${o.metodoPago}<br>
                  <strong>Estado de Transacción:</strong> <span class="badge ${o.estado==='Cancelado'?'badge-red':o.estado==='Entregado'?'badge-green':'badge-amber'}">${o.estado==='Entregado'?'Completado':o.estado==='Cancelado'?'Rechazado':'Coordinando'}</span>
                </p>
                <div style="margin-top:1rem; border-top: 1px solid var(--border-light); padding-top:0.75rem;">
                  <a href="${urlWhatsApp}" target="_blank" rel="noopener" class="btn-outline btn-rounded btn-sm" style="display:flex; justify-content:center; align-items:center; gap:0.4rem; color:#25D366; border-color:#25D366;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.977h.004c4.368 0 7.926-3.559 7.93-7.934A7.868 7.868 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.1-.195-.177-.59-.64-.395-.46-.788-.892-.88-1.002-.092-.11-.184-.176-.306-.068-.12.107-.49.576-.6.7-.11.124-.22.138-.42.04-.2-.1-.843-.311-1.605-.989-.593-.53-1.002-1.182-1.118-1.38-.117-.198-.012-.304.088-.403.09-.09.2-.23.3-.34.1-.11.133-.19.2-.32.067-.13.034-.245-.017-.35-.05-.103-.49-1.212-.672-1.65-.178-.43-.36-.37-.49-.375-.125-.005-.27-.005-.415-.005-.145 0-.38.054-.58.273-.2.22-.76.74-.76 1.807 0 1.067.77 2.098.88 2.244.11.147 1.517 2.316 3.673 3.248.513.221.913.353 1.226.452.515.163.985.14 1.355.084.413-.062 1.27-.52 1.45-1.02.18-.5 1.82 2.32 1.82 2.32v-.003z"/></svg>
                    Coordinar por WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>

          <!-- Resumen de Productos -->
          <div class="cm-card">
            <h4 style="font-family:'Outfit',sans-serif; font-weight:700; font-size:1rem; margin-bottom:1rem; color:var(--text-primary);">Resumen del Pedido</h4>
            <div class="admin-table-container">
              <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
                <thead>
                  <tr style="border-bottom:2px solid var(--border-light); color:var(--text-primary); font-weight:600;">
                    <th style="padding:0.75rem 0.5rem;">Producto</th>
                    <th style="padding:0.75rem 0.5rem; text-align:center;">Precio</th>
                    <th style="padding:0.75rem 0.5rem; text-align:center;">Cant.</th>
                    <th style="padding:0.75rem 0.5rem; text-align:right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${o.items.map(i => `
                    <tr style="border-bottom:1px solid var(--border-light); color:var(--text-secondary);">
                      <td style="padding:0.75rem 0.5rem;">
                        <div style="font-weight:600; color:var(--text-primary);">${i.producto.nombre}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${i.producto.marca}</div>
                      </td>
                      <td style="padding:0.75rem 0.5rem; text-align:center;">${APP.formatPrice(i.producto.precio)}</td>
                      <td style="padding:0.75rem 0.5rem; text-align:center;">${i.cantidad}</td>
                      <td style="padding:0.75rem 0.5rem; text-align:right; font-weight:600;">${APP.formatPrice(i.producto.precio * i.cantidad)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Desglose de totales -->
            <div style="width:100%; max-width:320px; margin-left:auto; margin-top:1.5rem; display:flex; flex-direction:column; gap:0.5rem; font-size:0.9rem;">
              <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
                <span>Subtotal:</span>
                <span>${APP.formatPrice(o.total)}</span>
              </div>
              ${o.descuento > 0 ? `
                <div style="display:flex; justify-content:space-between; color:var(--red);">
                  <span>Descuento aplicado:</span>
                  <span>-${APP.formatPrice(o.descuento)}</span>
                </div>
              ` : ''}
              <div style="display:flex; justify-content:space-between; color:var(--text-primary); font-weight:800; font-size:1.1rem; border-top:1.5px solid var(--border-light); padding-top:0.5rem; margin-top:0.25rem;">
                <span>Total Final:</span>
                <span style="color:var(--brand-blue);">${APP.formatPrice(o.totalFinal)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;
};

