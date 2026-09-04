<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>COMPUMAGIC — Especialistas en Tecnología y Periféricos Informáticos</title>
  <meta name="description"
    content="COMPUMAGIC: Tu tienda de confianza con más de 10 años de experiencia. Mouses gamer, teclados, parlantes y más. Envíos a nivel nacional.">
  <meta name="keywords"
    content="mouses gamer, teclados ejecutivos, auriculares, cables, adaptadores, tecnología, periféricos, compumagic, perú">
  <meta name="author" content="COMPUMAGIC">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:title" content="COMPUMAGIC — Tecnología y Periféricos">
  <meta property="og:description"
    content="Mouses gamer, teclados, auriculares y accesorios informáticos con envíos a nivel nacional.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_PE">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="img/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet">

  <!-- Estilos -->
  <link rel="stylesheet" href="css/style.css?v=<?php echo filemtime('css/style.css'); ?>">
  <link rel="stylesheet" href="css/admin.css?v=<?php echo filemtime('css/admin.css'); ?>">

  <!-- Canonical -->
  <link rel="canonical" href="index.php">
</head>

<body>

  <!-- ═══════════════════════════════════════════════
       HEADER (renderizado inicialmente por PHP y actualizado por script.js)
  ═══════════════════════════════════════════════════ -->
  <header id="site-header" aria-label="Cabecera principal">
    <div class="cm-container header-main">
      <a class="header-logo" href="?page=home" onclick="navigate('home');return false" style="display:flex; align-items:center; gap:8px;">
        <img src="img/logo_nuevo.jpg" alt="CompuMagic Logo" style="height:56px; width:160px; object-fit:cover; object-position:center; mix-blend-mode:multiply;">
      </a>
      <div class="header-search">
        <form onsubmit="handleSearch(event)">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="search-input" type="text" placeholder="Buscar mouses, teclados, auriculares...">
          <button type="submit" class="search-btn">Buscar</button>
        </form>
      </div>
      <div class="header-actions">
        <a class="icon-btn" href="?page=favoritos" onclick="navigate('favoritos');return false" title="Favoritos">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span id="fav-count" class="badge-count" style="display:none">0</span>
        </a>
        <a class="icon-btn" href="?page=carrito" onclick="navigate('carrito');return false" title="Carrito">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span id="cart-count" class="badge-count" style="display:none">0</span>
        </a>
        <a id="login-btn" class="btn-outline btn-sm btn-rounded" href="?page=login" onclick="navigate('login');return false" style="display:flex;margin-left:4px">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="hide-mobile">Ingresar</span>
        </a>
        <div id="user-pill" class="user-pill" onclick="toggleUserMenu()" style="display:none">
          <div class="user-avatar" id="user-initial">U</div>
          <span class="user-pill-name" id="user-name"></span>
          <div id="user-dropdown" class="dropdown" style="display:none">
            <div class="dropdown-header">
              <div class="label">Mi cuenta</div>
              <div class="name"></div>
            </div>
            <div class="dropdown-body">
              <a class="dropdown-item" href="?page=perfil" onclick="navigate('perfil');toggleUserMenu();return false">Mi Perfil</a>
              <a class="dropdown-item" href="?page=pedidos" onclick="navigate('pedidos');toggleUserMenu();return false">Mis Pedidos</a>
              <hr class="dropdown-divider">
              <button class="dropdown-item danger" onclick="APP.logout();toggleUserMenu()">Cerrar Sesión</button>
            </div>
          </div>
        </div>
        <a class="header-cta" href="?page=cotizacion" onclick="navigate('cotizacion');return false">Pedir Cotización</a>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px;height:20px"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="header-bottom">
      <div class="cm-container header-bottom-inner">
        <div style="position:relative;height:100%;display:flex;align-items:center">
          <button class="cat-dropdown-btn" onclick="toggleCatMenu()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:4px;"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>Categorías<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left:4px;"><path d="M6 9l6 6 6-6"></path></svg>
          </button>
          <div id="cat-menu" class="cat-menu" style="display:none" onmouseleave="closeCatMenu()">
            <a class="cat-item" href="?page=categoria-mouses" onclick="navigate('categoria-mouses');closeCatMenu();return false">
              <div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg></div>
              <div>
                <div class="cat-label">Mouses (Gamer y Ejecutivos)</div>
                <div class="cat-desc">Máxima precisión</div>
              </div>
            </a>
            <a class="cat-item" href="?page=categoria-teclados" onclick="navigate('categoria-teclados');closeCatMenu();return false">
              <div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/></svg></div>
              <div>
                <div class="cat-label">Teclados</div>
                <div class="cat-desc">Mecánicos y Numéricos</div>
              </div>
            </a>
            <a class="cat-item" href="?page=categoria-auriculares" onclick="navigate('categoria-auriculares');closeCatMenu();return false">
              <div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div>
              <div>
                <div class="cat-label">Audio</div>
                <div class="cat-desc">Audífonos y Parlantes</div>
              </div>
            </a>
            <a class="cat-item" href="?page=catalogo" onclick="navigate('catalogo');closeCatMenu();return false">
              <div class="cat-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:16px;height:16px"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <div class="cat-label">Ver todo el catálogo</div>
                <div class="cat-desc">Todos los productos</div>
              </div>
            </a>
          </div>
        </div>
        <nav class="nav-links">
          <a class="nav-link" data-page="home" href="?page=home" onclick="navigate('home');return false">Inicio<span class="underline-bar"></span></a>
          <a class="nav-link" data-page="catalogo" href="?page=catalogo" onclick="navigate('catalogo');return false">Catálogo<span class="underline-bar"></span></a>
          <a class="nav-link" data-page="blog" href="?page=blog" onclick="navigate('blog');return false">Blog<span class="underline-bar"></span></a>
          <a class="nav-link" data-page="nosotros" href="?page=nosotros" onclick="navigate('nosotros');return false">Nosotros<span class="underline-bar"></span></a>
          <a class="nav-link" data-page="soporte" href="?page=soporte" onclick="navigate('soporte');return false">Soporte<span class="underline-bar"></span></a>
        </nav>
        <div class="trust-badges">
          <span class="trust-badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantía oficial</span>
          <span class="trust-badge"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>Envío a todo el Perú</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile menu overlay -->
  <div id="mobile-menu" role="navigation" aria-label="Menú móvil"></div>

  <!-- Header spacer -->
  <div class="header-spacer" aria-hidden="true"></div>
