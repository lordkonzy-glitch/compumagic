/* COMPUMAGIC - script.js: Router SPA + Estado Global + Header + Footer */
window.Pages = window.Pages || {};

const APP = {
  get productos()     { return JSON.parse(localStorage.getItem('cm_products')  || 'null') || CM_DATA.productos; },
  get carrito()       { return JSON.parse(localStorage.getItem('cm_cart')      || '[]'); },
  get favoritos()     { return JSON.parse(localStorage.getItem('cm_favorites') || '[]'); },
  get usuarios()      { return JSON.parse(localStorage.getItem('cm_users')     || 'null') || CM_DATA.usuariosIniciales; },
  get pedidos()       { return JSON.parse(localStorage.getItem('cm_orders')    || '[]'); },
  get blog()          { return JSON.parse(localStorage.getItem('cm_blog')      || 'null') || CM_DATA.blog; },
  get ofertas()       { return JSON.parse(localStorage.getItem('cm_offers')    || 'null') || CM_DATA.ofertas; },
  get cuponActivo()   { return JSON.parse(localStorage.getItem('cm_coupon')    || 'null'); },
  get usuarioActual() { return JSON.parse(localStorage.getItem('cm_current_user') || 'null'); },
  save(k,v){ localStorage.setItem(k, JSON.stringify(v)); },
  addToCart(p,q=1){ const c=this.carrito; const i=c.findIndex(x=>x.producto.id===p.id); if(i>-1)c[i].cantidad+=q; else c.push({producto:p,cantidad:q}); this.save('cm_cart',c); showToast('Añadido al carrito','success'); this._updateCounts(); },
  removeFromCart(id){ this.save('cm_cart',this.carrito.filter(i=>i.producto.id!==id)); this._updateCounts(); },
  updateCantidad(id,q){ if(q<=0){this.removeFromCart(id);return;} this.save('cm_cart',this.carrito.map(i=>i.producto.id===id?{...i,cantidad:q}:i)); },
  clearCart(){ this.save('cm_cart',[]); this.save('cm_coupon',null); this._updateCounts(); },
  toggleFavorito(p){ const f=this.favoritos; const is=f.some(x=>x.id===p.id); this.save('cm_favorites',is?f.filter(x=>x.id!==p.id):[...f,p]); showToast(is?'Eliminado de favoritos':'Añadido a favoritos',is?'info':'success'); this._updateCounts(); return !is; },
  isFavorito(id){ return this.favoritos.some(p=>p.id===id); },
  aplicarCupon(cod){ const c=cod.trim().toUpperCase(); const o=this.ofertas.find(x=>x.codigo===c&&x.activo); if(!o)return{ok:false,msg:'Cupón inválido.'}; const t=this.carrito.reduce((s,i)=>s+i.producto.precio*i.cantidad,0); if(o.montoMinimo&&t<o.montoMinimo)return{ok:false,msg:`Mínimo S/ ${o.montoMinimo}`}; this.save('cm_coupon',o); return{ok:true,msg:`Cupón ${c} aplicado`}; },
  quitarCupon(){ this.save('cm_coupon',null); },
  calcDescuento(t){ const c=this.cuponActivo; if(!c)return 0; return c.tipo==='porcentaje'?(t*c.valor/100):c.valor; },
  async login(email,pass){
    try {
      const response = await fetch('backend/api_auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password: pass })
      });
      const res = await response.json();
      if (res && !res.error) {
        this.save('cm_current_user', res.user);
        this._updateHeaderUser();
        return { ok: true, msg: res.mensaje };
      } else {
        return { ok: false, msg: res.mensaje || 'Credenciales incorrectas' };
      }
    } catch (err) {
      console.error(err);
      return { ok: false, msg: 'Error de conexión con el servidor' };
    }
  },
  async registro(n,e,p){
    try {
      const response = await fetch('backend/api_auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', nombre: n, email: e, password: p })
      });
      const res = await response.json();
      if (res && !res.error) {
        this.save('cm_current_user', res.user);
        this._updateHeaderUser();
        return { ok: true, msg: res.mensaje };
      } else {
        return { ok: false, msg: res.mensaje || 'Error al registrar' };
      }
    } catch (err) {
      console.error(err);
      return { ok: false, msg: 'Error de conexión con el servidor' };
    }
  },
  logout(){ this.save('cm_current_user',null); this._updateHeaderUser(); navigate('home'); showToast('Sesión cerrada','info'); },
  crearPedido(env,pago){ const c=this.carrito; if(!c.length)return null; const t=c.reduce((s,i)=>s+i.producto.precio*i.cantidad,0); const d=this.calcDescuento(t); const p={id:'ord_'+Date.now(),codigo:'CM-'+Math.floor(100000+Math.random()*900000),usuarioId:this.usuarioActual?.id||'guest',usuarioNombre:this.usuarioActual?.nombre||env.nombreCompleto,items:[...c],total:t,descuento:d,totalFinal:Math.max(0,t-d),estado:'Pendiente',fecha:new Date().toISOString().split('T')[0],envio:env,metodoPago:pago}; this.save('cm_orders',[p,...this.pedidos]); this.clearCart(); return p; },
  getCartCount(){ return this.carrito.reduce((s,i)=>s+i.cantidad,0); },
  getFavsCount(){ return this.favoritos.length; },
  formatPrice(p){ return 'S/ '+Number(p).toFixed(2); },
  pctDesc(p,o){ return Math.round((1-p/o)*100); },
  _updateCounts(){ const cc=document.getElementById('cart-count'); const fc=document.getElementById('fav-count'); const n=this.getCartCount(); const f=this.getFavsCount(); if(cc){cc.textContent=n;cc.style.display=n>0?'flex':'none';} if(fc){fc.textContent=f;fc.style.display=f>0?'flex':'none';} },
  _updateHeaderUser(){ renderHeader(); renderMobileMenu(); }
};

const ROUTES = {
  'home':()=>Pages.home(),
  '':()=>Pages.home(),
  'catalogo':()=>Pages.catalogo(),
  'ofertas':()=>Pages.home(),
  'producto':()=>Pages.producto(getParam('id')),
  'busqueda':()=>Pages.buscar(getParam('q')),
  'buscar':()=>Pages.buscar(getParam('q')),
  'categoria-mouses':()=>Pages.categoria('mouses'),
  'categoria/mouses':()=>Pages.categoria('mouses'),
  'categoria-teclados':()=>Pages.categoria('teclados'),
  'categoria/teclados':()=>Pages.categoria('teclados'),
  'categoria-auriculares':()=>Pages.categoria('auriculares'),
  'categoria/auriculares':()=>Pages.categoria('auriculares'),
  'categoria-laptops':()=>Pages.categoria('laptops'),
  'categoria/laptops':()=>Pages.categoria('laptops'),
  'carrito':()=>Pages.carrito(),
  'checkout':()=>Pages.checkout(),
  'confirmacion':()=>Pages.confirmacion(getParam('pedido')),
  'login':()=>Pages.login(),
  'perfil':()=>Pages.perfil(),
  'pedidos':()=>Pages.misPedidos(),
  'mis-pedidos':()=>Pages.misPedidos(),
  'pedido':()=>Pages.detallePedido(getParam('id')),
  'pedido-detalle':()=>Pages.detallePedido(getParam('id')),
  'favoritos':()=>Pages.favoritos(),
  'nosotros':()=>Pages.nosotros(),
  'contacto':()=>Pages.contacto(),
  'cotizacion':()=>Pages.cotizacion(),
  'soporte':()=>Pages.soporte(),
  'reclamaciones':()=>Pages.libroReclamaciones(),
  'libro-reclamaciones':()=>Pages.libroReclamaciones(),
  'garantias':()=>Pages.garantias(),
  'privacidad':()=>Pages.privacidad(),
  'terminos':()=>Pages.terminos(),
  'blog':()=>Pages.blog(),
  'blog-post':()=>Pages.blogPost(getParam('id')),
  'blog-articulo':()=>Pages.blogPost(getParam('id')),
  
  // Administración
  'admin':()=>{ window._adminSection='dashboard'; Pages.admin(); },
  'admin-productos':()=>{ window._adminSection='productos'; Pages.admin(); },
  'admin/productos':()=>{ window._adminSection='productos'; Pages.admin(); },
  'admin-ofertas':()=>{ window._adminSection='ofertas'; Pages.admin(); },
  'admin/ofertas':()=>{ window._adminSection='ofertas'; Pages.admin(); },
  'admin-banners':()=>{ window._adminSection='banners'; Pages.admin(); },
  'admin/banners':()=>{ window._adminSection='banners'; Pages.admin(); },
  'admin-usuarios':()=>{ window._adminSection='usuarios'; Pages.admin(); },
  'admin/usuarios':()=>{ window._adminSection='usuarios'; Pages.admin(); },
  'admin-reportes':()=>{ window._adminSection='reportes'; Pages.admin(); },
  'admin/reportes':()=>{ window._adminSection='reportes'; Pages.admin(); }
};

function getParam(k){ return new URLSearchParams(window.location.search).get(k)||''; }
function navigate(p,params={}){ const q=Object.keys(params).length?'?'+new URLSearchParams({page:p,...params}).toString():`?page=${p}`; history.pushState({page:p},'',q); renderPage(p); window.scrollTo({top:0,behavior:'smooth'}); updateNavActive(p); }
function renderPage(p){ 
  const fn=ROUTES[p]||ROUTES['home']; 
  const a=document.getElementById('app'); 
  if(!a)return; 
  
  // Admin Mode: ocultar/mostrar shell del sitio público
  const wa = document.getElementById('whatsapp-float-btn');

  if(p.startsWith('admin')) {
    document.body.classList.add('admin-mode');
    document.body.style.overflow = 'hidden';
    a.style.cssText = 'padding:0!important;margin:0!important;';
    
    // Lazy loading del módulo de administración
    if (typeof Pages.admin === 'undefined') {
      a.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; min-height:60vh; color:var(--text-muted); font-weight:500; font-family:'Outfit',sans-serif; gap:8px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
        Cargando panel de administración...
      </div>
      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>`;
      
      const script = document.createElement('script');
      script.src = 'js/pages/admin.js?v=' + Date.now();
      script.onload = () => {
        a.innerHTML = '';
        a.classList.add('animate-fade-in'); 
        setTimeout(()=>a.classList.remove('animate-fade-in'),400); 
        fn();
      };
      script.onerror = () => {
        a.innerHTML = '<div class="cm-container text-center" style="padding: 4rem 2rem;"><p style="color:var(--red);">Error al cargar el panel de administración. Por favor, reintente.</p></div>';
      };
      document.body.appendChild(script);
      return;
    }
  } else {
    document.body.classList.remove('admin-mode');
    document.body.style.overflow = '';
    a.style.cssText = '';
    if(wa) wa.style.display = '';
  }

  a.innerHTML=''; 
  a.classList.add('animate-fade-in'); 
  setTimeout(()=>a.classList.remove('animate-fade-in'),400); 
  fn(); 
}
window.addEventListener('popstate',()=>{ const p=getParam('page')||'home'; renderPage(p); updateNavActive(p); });
function updateNavActive(p){ document.querySelectorAll('.nav-link').forEach(el=>el.classList.toggle('active',el.dataset.page===p)); }

function showToast(msg, type = 'info') {
  let c = document.getElementById('toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
  } else {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  t.innerHTML = `
    <div class="toast-content-wrapper">
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-message">${msg}</span>
    </div>
  `;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}
function handleSearch(e){ e.preventDefault(); const inp=document.getElementById('search-input')||document.getElementById('mobile-search-input'); const q=inp?inp.value.trim():''; if(q){navigate('buscar',{q});if(inp)inp.value='';} }
function toggleCatMenu(){ const m=document.getElementById('cat-menu'); if(m)m.style.display=m.style.display==='none'?'block':'none'; }
function closeCatMenu(){ const m=document.getElementById('cat-menu'); if(m)m.style.display='none'; }
function toggleUserMenu(){ const d=document.getElementById('user-dropdown'); if(d)d.style.display=d.style.display==='none'?'block':'none'; }
function closeUserMenu(){ const d=document.getElementById('user-dropdown'); if(d)d.style.display='none'; }
let _mobOpen=false;
function toggleMobileMenu(){ _mobOpen=!_mobOpen; const m=document.getElementById('mobile-menu'); if(m)m.classList.toggle('open',_mobOpen); document.body.style.overflow=_mobOpen?'hidden':''; renderMobileMenu(); }
function closeMobileMenu(){ _mobOpen=false; const m=document.getElementById('mobile-menu'); if(m)m.classList.remove('open'); document.body.style.overflow=''; }
function starRating(r){ let s=''; for(let i=1;i<=5;i++)s+=`<span class="star${i<=Math.round(r)?'':' empty'}">&#9733;</span>`; return `<div class="stars">${s}</div>`; }
function productCardHTML(p){ const hd=p.precioOriginal&&p.precioOriginal>p.precio; const pct=hd?APP.pctDesc(p.precio,p.precioOriginal):0; const pd=JSON.stringify(p).replace(/"/g,'&quot;'); return `<div class="product-card" onclick="navigate('producto',{id:'${p.id}'})"><div class="product-image-wrap">${p.stock===0?'<div class="badge badge-red" style="position:absolute;top:10px;left:10px;z-index:2">Agotado</div>':''}${p.destacado?'<div class="badge badge-navy" style="position:absolute;top:10px;left:10px;z-index:2">Destacado</div>':''}<img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='https://placehold.co/300x300/F1F3F5/9CA3AF?text=Imagen'"><div class="product-actions" onclick="event.stopPropagation()"><button class="btn-primary btn-sm" style="flex:1" onclick="APP.addToCart(${pd})">Al carrito</button><button class="btn-outline btn-sm" onclick="APP.toggleFavorito(${pd})" style="padding:6px 10px">&hearts;</button></div></div><div class="product-body"><div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--brand-blue); letter-spacing: 0.6px; margin-bottom: 4px;">${p.marca}</div><div style="font-size: 14px; font-weight: 600; color: var(--brand-blue-dark); line-height: 1.4; margin-bottom: 8px;">${p.nombre}</div><div style="display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap"><span class="price-current">${APP.formatPrice(p.precio)}</span>${hd?`<span class="price-original">${APP.formatPrice(p.precioOriginal)}</span><span class="price-discount">-${pct}%</span>`:''}</div>${p.stock>0&&p.stock<=5?`<div style="font-size:11px;color:var(--amber);font-weight:600;margin-top:4px">Solo ${p.stock} en stock</div>`:''}</div></div>`; }

function renderHeader(){
  const h=document.getElementById('site-header'); if(!h)return;
  const u=APP.usuarioActual; const cc=APP.getCartCount(); const fc=APP.getFavsCount();
  h.innerHTML=`<div class="cm-container header-main"><a class="header-logo" href="?page=home" onclick="navigate('home');return false" style="display:flex; align-items:center; gap:8px;"><img src="img/logo_nuevo.jpg" alt="CompuMagic Logo" style="height:56px; width:160px; object-fit:cover; object-position:center; mix-blend-mode:multiply;"></a><div class="header-search"><form onsubmit="handleSearch(event)"><svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input id="search-input" type="text" placeholder="Buscar mouses, teclados, laptops..."><button type="submit" class="search-btn">Buscar</button></form></div><div class="header-actions"><a class="icon-btn" href="?page=favoritos" onclick="navigate('favoritos');return false" title="Favoritos"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span id="fav-count" class="badge-count" style="display:${fc>0?'flex':'none'}">${fc}</span></a><a class="icon-btn" href="?page=carrito" onclick="navigate('carrito');return false" title="Carrito"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span id="cart-count" class="badge-count" style="display:${cc>0?'flex':'none'}">${cc}</span></a><a id="login-btn" class="btn-outline btn-sm btn-rounded" href="?page=login" onclick="navigate('login');return false" style="display:${u?'none':'flex'};margin-left:4px"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span class="hide-mobile">Ingresar</span></a><div id="user-pill" class="user-pill" onclick="toggleUserMenu()" style="display:${u?'flex':'none'}"><div class="user-avatar" id="user-initial">${u?u.avatar||u.nombre[0]:'U'}</div><span class="user-pill-name" id="user-name">${u?u.nombre.split(' ')[0]:''}</span><div id="user-dropdown" class="dropdown" style="display:none"><div class="dropdown-header"><div class="label">Mi cuenta</div><div class="name">${u?u.nombre:''}</div></div><div class="dropdown-body"><a class="dropdown-item" href="?page=perfil" onclick="navigate('perfil');toggleUserMenu();return false">Mi Perfil</a><a class="dropdown-item" href="?page=pedidos" onclick="navigate('pedidos');toggleUserMenu();return false">Mis Pedidos</a>${u&&u.rol==='admin'?`<a class="dropdown-item admin" href="?page=admin" onclick="navigate('admin');toggleUserMenu();return false">Panel Admin</a>`:''}<hr class="dropdown-divider"><button class="dropdown-item danger" onclick="APP.logout();toggleUserMenu()">Cerrar Sesión</button></div></div></div><a class="header-cta" href="?page=cotizacion" onclick="navigate('cotizacion');return false">Pedir Cotización</a><button class="mobile-menu-btn" onclick="toggleMobileMenu()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px;height:20px"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button></div></div><div class="header-bottom"><div class="cm-container header-bottom-inner"><div style="position:relative;height:100%;display:flex;align-items:center"><button class="cat-dropdown-btn" onclick="toggleCatMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>Categorías<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left:4px;"><path d="M6 9l6 6 6-6"></path></svg></button><div id="cat-menu" class="cat-menu" style="display:none" onmouseleave="closeCatMenu()"><a class="cat-item" href="?page=categoria-laptops" onclick="navigate('categoria-laptops');closeCatMenu();return false"><div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M2 20h20M5 17h14"/></svg></div><div><div class="cat-label">Laptops</div><div class="cat-desc">Portátiles Gamer y Oficina</div></div></a><a class="cat-item" href="?page=categoria-mouses" onclick="navigate('categoria-mouses');closeCatMenu();return false"><div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg></div><div><div class="cat-label">Mouses (Gamer y Ejecutivos)</div><div class="cat-desc">Máxima precisión</div></div></a><a class="cat-item" href="?page=categoria-teclados" onclick="navigate('categoria-teclados');closeCatMenu();return false"><div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg></div><div><div class="cat-label">Teclados</div><div class="cat-desc">Mecánicos y Numéricos</div></div></a><a class="cat-item" href="?page=categoria-auriculares" onclick="navigate('categoria-auriculares');closeCatMenu();return false"><div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div><div><div class="cat-label">Audio</div><div class="cat-desc">Audífonos y Parlantes</div></div></a><a class="cat-item" href="?page=catalogo" onclick="navigate('catalogo');closeCatMenu();return false"><div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div><div><div class="cat-label">Ver todo el catálogo</div><div class="cat-desc">Todos los productos</div></div></a></div></div><nav class="nav-links"><a class="nav-link" data-page="home" href="?page=home" onclick="navigate('home');return false">Inicio<span class="underline-bar"></span></a><a class="nav-link" data-page="catalogo" href="?page=catalogo" onclick="navigate('catalogo');return false">Catálogo<span class="underline-bar"></span></a><a class="nav-link" data-page="blog" href="?page=blog" onclick="navigate('blog');return false">Blog<span class="underline-bar"></span></a><a class="nav-link" data-page="nosotros" href="?page=nosotros" onclick="navigate('nosotros');return false">Nosotros<span class="underline-bar"></span></a><a class="nav-link" data-page="soporte" href="?page=soporte" onclick="navigate('soporte');return false">Soporte<span class="underline-bar"></span></a></nav><div class="trust-badges"><span class="trust-badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantía oficial</span><span class="trust-badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Envío a todo el Perú</span></div></div></div>`;
  
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    h.classList.toggle('scrolled', currentScrollY > 8);
    
    // Ocultar cabecera al bajar, mostrar al subir (solo si bajamos más de 80px para evitar rebotes)
    if (currentScrollY > 80 && currentScrollY > lastScrollY) {
      h.classList.add('header-hidden');
    } else {
      h.classList.remove('header-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  document.addEventListener('click',(e)=>{if(!e.target.closest('#user-pill'))closeUserMenu();if(!e.target.closest('.cat-dropdown-btn')&&!e.target.closest('#cat-menu'))closeCatMenu();});
}

function renderMobileMenu(){
  const el=document.getElementById('mobile-menu'); if(!el)return;
  el.innerHTML=`<div class="cm-container" style="padding-top:1.5rem"><form onsubmit="handleSearch(event);closeMobileMenu();" style="position:relative;margin-bottom:1.5rem"><input id="mobile-search-input" class="cm-input" style="padding-left:2.5rem;border-radius:9999px" type="text" placeholder="Buscar productos..."></form><nav><a class="mobile-nav-link" href="?page=home" onclick="navigate('home');closeMobileMenu();return false">Inicio</a><a class="mobile-nav-link" href="?page=catalogo" onclick="navigate('catalogo');closeMobileMenu();return false">Catálogo</a><a class="mobile-nav-link" href="?page=categoria-laptops" onclick="navigate('categoria-laptops');closeMobileMenu();return false">Laptops Gamer</a><a class="mobile-nav-link" href="?page=categoria-mouses" onclick="navigate('categoria-mouses');closeMobileMenu();return false">Mouses Gaming</a><a class="mobile-nav-link" href="?page=categoria-teclados" onclick="navigate('categoria-teclados');closeMobileMenu();return false">Teclados Mecánicos</a><a class="mobile-nav-link" href="?page=categoria-auriculares" onclick="navigate('categoria-auriculares');closeMobileMenu();return false">Auriculares</a><a class="mobile-nav-link" href="?page=blog" onclick="navigate('blog');closeMobileMenu();return false">Blog</a><a class="mobile-nav-link" href="?page=nosotros" onclick="navigate('nosotros');closeMobileMenu();return false">Nosotros</a></nav><div style="padding:1.5rem 0.5rem;display:flex;flex-direction:column;gap:0.75rem"><a class="btn-primary btn-rounded btn-full" style="justify-content:center;padding:0.875rem" href="?page=cotizacion" onclick="navigate('cotizacion');closeMobileMenu();return false">Pedir Cotización</a>${!APP.usuarioActual?`<a class="btn-outline btn-rounded btn-full" style="justify-content:center;padding:0.875rem" href="?page=login" onclick="navigate('login');closeMobileMenu();return false">Iniciar Sesión</a>`:''}</div></div>`;
}

function renderFooter(){
  const f=document.getElementById('site-footer'); if(!f)return;
  const y=new Date().getFullYear();
  f.innerHTML=`<div class="cm-container"><div class="footer-grid-modern"><div class="footer-brand-modern"><a class="header-logo" href="?page=home" onclick="navigate('home');return false" style="margin-bottom:1rem; display:inline-block; background-color:#fff; padding:4px 8px; border-radius:8px;"><img src="img/logo_nuevo.jpg" alt="CompuMagic Logo" loading="lazy" style="height:64px; width:180px; object-fit:cover; object-position:center; mix-blend-mode:multiply; display:block;"></a><p>Especialistas en accesorios y periféricos informáticos desde 2016. Atendemos usuarios, empresas e instituciones públicas con garantía y seguridad.</p><div class="footer-socials"><a href="#" class="social-icon" title="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a><a href="#" class="social-icon" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a><a href="#" class="social-icon" title="Tiktok"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a></div></div><div class="footer-col-modern"><h4>Enlaces Rápidos</h4><div class="footer-nav"><a href="?page=home" onclick="navigate('home');return false">Inicio</a><a href="?page=catalogo" onclick="navigate('catalogo');return false">Catálogo</a><a href="?page=nosotros" onclick="navigate('nosotros');return false">Nosotros</a><a href="?page=soporte" onclick="navigate('soporte');return false">Soporte</a></div></div><div class="footer-col-modern"><h4>Contacto</h4><div class="footer-contact-info"><div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Int. Mercadillo Bolognesi A-48<br>Av. Coronel Mendoza N.° 1945, Tacna - Perú</span></div><div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.09 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 6.21 6.21l.85-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>Cel: 988 663 869<br>Alex (Asesor): 925 000 899</span></div><div class="contact-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span>compumagicimportaciones@gmail.com</span></div></div></div><div class="footer-col-modern"><h4>Métodos de Pago</h4><p style="color:#94a3b8;font-size:0.9rem;margin-bottom:1.25rem">Compra 100% segura con los mejores métodos de pago.</p><div class="footer-payments" style="display:flex;gap:0.5rem;flex-wrap:wrap;"><span class="payment-badge" style="background:rgba(85,0,165,0.15);border:1px solid rgba(85,0,165,0.3);color:#e9d5ff;font-size:0.75rem;font-weight:700;border-radius:4px;padding:3px 8px;letter-spacing:0.5px">Yape</span><span class="payment-badge" style="background:rgba(0,214,177,0.1);border:1px solid rgba(0,214,177,0.3);color:#99f6e4;font-size:0.75rem;font-weight:700;border-radius:4px;padding:3px 8px;letter-spacing:0.5px">Plin</span><span class="payment-badge" style="background:rgba(46,134,193,0.12);border:1px solid rgba(46,134,193,0.3);color:#93c5fd;font-size:0.75rem;font-weight:700;border-radius:4px;padding:3px 8px;letter-spacing:0.5px">Bancos</span><span class="payment-badge" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;font-size:0.75rem;font-weight:700;border-radius:4px;padding:3px 8px;letter-spacing:0.5px">Tarjetas</span></div></div></div><div class="footer-bottom-modern"><div class="footer-copyright">© ${y} COMPUMAGIC. Todos los derechos reservados.</div><div class="footer-legal-links"><a href="?page=privacidad" onclick="navigate('privacidad');return false">Privacidad</a><a href="?page=terminos" onclick="navigate('terminos');return false">Términos</a><a href="?page=libro-reclamaciones" onclick="navigate('libro-reclamaciones');return false" style="display:inline-flex;align-items:center;gap:4px"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right:2px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1V17M14 3v8l2.5-1.6L19 11V3"/></svg>Libro de Reclamaciones</a></div></div></div>`;
}

window.startCountdownTimer = function(daysId, hoursId, minutesId, secondsId, targetDateString) {
  let targetTime;
  if (targetDateString) {
    targetTime = new Date(targetDateString).getTime();
  } else {
    const now = new Date();
    const nextSunday = new Date(now);
    const dayOfWeek = now.getDay();
    const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    nextSunday.setDate(now.getDate() + daysToSunday);
    nextSunday.setHours(23, 59, 59, 999);
    targetTime = nextSunday.getTime();
    
    if (targetTime - now.getTime() < 1000 * 60 * 60) {
      nextSunday.setDate(nextSunday.getDate() + 7);
      targetTime = nextSunday.getTime();
    }
  }

  const update = () => {
    const now = new Date().getTime();
    const diff = targetTime - now;

    const elD = document.getElementById(daysId);
    const elH = document.getElementById(hoursId);
    const elM = document.getElementById(minutesId);
    const elS = document.getElementById(secondsId);

    if (!elD && !elH && !elM && !elS) {
      return false;
    }

    if (diff <= 0) {
      if (elD) elD.textContent = '00';
      if (elH) elH.textContent = '00';
      if (elM) elM.textContent = '00';
      if (elS) elS.textContent = '00';
      return false;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (elD) elD.textContent = String(d).padStart(2, '0');
    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
    return true;
  };

  update();
  const timer = setInterval(() => {
    const active = update();
    if (!active) {
      clearInterval(timer);
    }
  }, 1000);
};

document.addEventListener('DOMContentLoaded',()=>{
  const p=getParam('page')||'home';
  renderHeader(); renderFooter(); renderMobileMenu();
  renderPage(p); updateNavActive(p);

  // Botón flotante WhatsApp
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/519520009210';
  wa.target = '_blank';
  wa.id = 'whatsapp-float-btn';
  wa.className = 'whatsapp-float';
  wa.title = 'Contáctanos por WhatsApp';
  wa.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  document.body.appendChild(wa);
  if(p === 'admin') wa.style.display = 'none';
});

