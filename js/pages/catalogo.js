/* ═══════════════════════════════════════════════
   COMPUMAGIC — js/pages/catalogo.js
   Módulo de Catálogo, Búsqueda y Categorías
   ═══════════════════════════════════════════════ */

window.Pages = window.Pages || {};

// ESTADOS DE FILTRO INTERNO DE CATÁLOGO (Persiste durante la navegación de página)
let currentFilters = {
  categorias: [],
  marcas: [],
  minPrecio: 0,
  maxPrecio: 15000,
  soloStock: false,
  sort: 'rating_desc',
  searchQuery: ''
};

// FUNCIÓN PRINCIPAL DE CATÁLOGO
Pages.catalogo = function() {
  currentFilters.categorias = [];
  currentFilters.searchQuery = '';
  renderCatalogPage('Catálogo General', 'Encuentra mouses, teclados, auriculares y accesorios');
};

// FUNCIÓN DE CATEGORÍA ESPECÍFICA
Pages.categoria = function(categoriaId) {
  currentFilters.categorias = [categoriaId];
  currentFilters.searchQuery = '';
  
  let titulo = 'Mouses Gaming';
  let desc = 'Mouses gamer y de oficina de las mejores marcas';
  if (categoriaId === 'teclados') {
    titulo = 'Teclados Mecánicos';
    desc = 'Teclados mecánicos y de oficina con garantía oficial';
  } else if (categoriaId === 'auriculares') {
    titulo = 'Auriculares Gaming';
    desc = 'Auriculares gamer y multimedia con sonido envolvente';
  } else if (categoriaId === 'laptops') {
    titulo = 'Laptops Gamer';
    desc = 'Laptops de alto rendimiento para gaming y diseño';
  }
  
  renderCatalogPage(titulo, desc);
};

// FUNCIÓN DE BÚSQUEDA
Pages.buscar = function(q) {
  currentFilters.categorias = [];
  currentFilters.searchQuery = q.trim().toLowerCase();
  renderCatalogPage(`Búsqueda: "${q}"`, `Resultados encontrados para tu búsqueda`);
};

// RENDERIZADO DE LA MAQUETA DE CATÁLOGO
function renderCatalogPage(title, subtitle) {
  const app = document.getElementById('app');
  if (!app) return;

  // Extraer todas las marcas únicas para el filtro y calcular conteos
  const todasMarcas = [...new Set(CM_DATA.productos.map(p => p.marca))];
  const countCat = (cat) => CM_DATA.productos.filter(p => p.categoria.toLowerCase() === cat.toLowerCase()).length;
  const countBrand = (brand) => CM_DATA.productos.filter(p => p.marca.toLowerCase() === brand.toLowerCase()).length;
  const countStock = () => CM_DATA.productos.filter(p => p.stock > 0).length;
  
  // HTML Layout
  app.innerHTML = `
    <div class="cm-container" style="padding-bottom: 4rem; padding-top: 1.5rem;">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="?page=home" onclick="navigate('home');return false" class="hover-underline">Inicio</a>
        <span class="breadcrumb-separator">/</span>
        <span style="color:var(--text-primary); font-weight:600;">${title}</span>
      </nav>

      <!-- Page Header -->
      <div class="section-header" style="margin-bottom: 1.5rem;">
        <div>
          <h1 class="section-title">${title}</h1>
          <p class="section-subtitle">${subtitle}</p>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="catalog-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
            <h3 style="font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:800; color:var(--text-primary)">Filtros</h3>
            <button class="btn-ghost btn-sm" onclick="clearAllFilters()" style="padding: 2px 6px; font-size: 11px;">Limpiar</button>
          </div>

          <!-- Categorías (solo si no es página de categoría fija) -->
          ${currentFilters.categorias.length === 0 ? `
          <div class="filter-group">
            <h4 class="filter-title">Categorías</h4>
            <div class="filter-options">
              <label class="checkbox-label">
                <input type="checkbox" class="cat-filter" value="laptops" ${currentFilters.categorias.includes('laptops') ? 'checked' : ''}>
                <span>Laptops Gamer</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" class="cat-filter" value="mouses" ${currentFilters.categorias.includes('mouses') ? 'checked' : ''}>
                <span>Mouses Gaming</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" class="cat-filter" value="teclados" ${currentFilters.categorias.includes('teclados') ? 'checked' : ''}>
                <span>Teclados Mecánicos</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" class="cat-filter" value="auriculares" ${currentFilters.categorias.includes('auriculares') ? 'checked' : ''}>
                <span>Auriculares Gaming</span>
              </label>
            </div>
          </div>
          ` : ''}

          <!-- Marcas -->
          <div class="filter-group">
            <h4 class="filter-title">Marca</h4>
            <div class="filter-options">
              ${todasMarcas.map(marca => `
                <label class="checkbox-label">
                  <input type="checkbox" class="brand-filter" value="${marca.toLowerCase()}" ${currentFilters.marcas.includes(marca.toLowerCase()) ? 'checked' : ''}>
                  <span>${marca}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </aside>

        <!-- Product Grid & Toolbar -->
        <div>
          <!-- Toolbar -->
          <div class="catalog-header">
            <div class="results-count" id="results-count">Cargando productos...</div>
            <div class="catalog-sort">
              <span>Ordenar por:</span>
              <select class="catalog-select" id="sort-select" onchange="handleSortChange(this.value)">
                <option value="rating_desc" ${currentFilters.sort === 'rating_desc' ? 'selected' : ''}>Mejor valorados</option>
                <option value="price_asc" ${currentFilters.sort === 'price_asc' ? 'selected' : ''}>Precio: Menor a Mayor</option>
                <option value="price_desc" ${currentFilters.sort === 'price_desc' ? 'selected' : ''}>Precio: Mayor a Menor</option>
                <option value="name_asc" ${currentFilters.sort === 'name_asc' ? 'selected' : ''}>Nombre: A - Z</option>
              </select>
            </div>
          </div>

          <!-- Grid Container -->
          <div class="grid grid-3" id="products-grid">
            <!-- Productos cargados dinámicamente -->
          </div>
          
          <!-- Empty State -->
          <div id="empty-state" class="text-center" style="display:none; padding:4rem 2rem;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:64px; height:64px; color:var(--text-light); margin-bottom:1rem">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
            <h3 style="font-family:'Outfit',sans-serif; font-size:1.25rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem">No encontramos resultados</h3>
            <p style="color:var(--text-muted); font-size:0.875rem; max-width:400px; margin:0 auto 1.5rem auto">Prueba quitando algunos filtros o cambiando los términos de tu búsqueda.</p>
            <button class="btn-primary btn-rounded btn-sm" onclick="clearAllFilters()">Ver todos los productos</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Inicializar event listeners de filtros
  initFilterEvents();
  // Aplicar filtros e inyectar productos inicialmente
  updateFilteredProducts();
}

// INICIALIZACIÓN DE EVENTOS DE FILTRADO
function initFilterEvents() {
  // Checkbox de categorías
  document.querySelectorAll('.cat-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      currentFilters.categorias = Array.from(document.querySelectorAll('.cat-filter:checked')).map(el => el.value);
      updateFilteredProducts();
    });
  });

  // Checkbox de marcas
  document.querySelectorAll('.brand-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      currentFilters.marcas = Array.from(document.querySelectorAll('.brand-filter:checked')).map(el => el.value);
      updateFilteredProducts();
    });
  });

  // Rango de precio
  const priceRange = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-display');
  if (priceRange && priceDisplay) {
    priceRange.addEventListener('input', (e) => {
      const val = e.target.value;
      priceDisplay.textContent = `S/ ${val}`;
      currentFilters.maxPrecio = Number(val);
      updateFilteredProducts();
    });
  }

  // Stock checkbox
  const stockFilter = document.getElementById('stock-filter');
  if (stockFilter) {
    stockFilter.addEventListener('change', (e) => {
      currentFilters.soloStock = e.target.checked;
      updateFilteredProducts();
    });
  }
}

// MANEJADOR DE ORDENAMIENTO
window.handleSortChange = function(sortValue) {
  currentFilters.sort = sortValue;
  updateFilteredProducts();
};

// LIMPIAR TODOS LOS FILTROS
window.clearAllFilters = function() {
  currentFilters = {
    categorias: [],
    marcas: [],
    minPrecio: 0,
    maxPrecio: 15000,
    soloStock: false,
    sort: 'rating_desc',
    searchQuery: ''
  };
  
  // Re-renderizar la página según donde estemos
  const page = new URLSearchParams(window.location.search).get('page') || 'catalogo';
  if (page.startsWith('categoria-')) {
    Pages.categoria(page.replace('categoria-', ''));
  } else if (page === 'buscar') {
    Pages.buscar(new URLSearchParams(window.location.search).get('q') || '');
  } else {
    Pages.catalogo();
  }
};

// APLICACIÓN DE LA LÓGICA DE FILTRADO Y RENDER EN GRID
function updateFilteredProducts() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('results-count');
  const emptyEl = document.getElementById('empty-state');
  if (!grid) return;

  let filtered = APP.productos;

  // 1. Filtrar por búsqueda si existe
  if (currentFilters.searchQuery) {
    const q = currentFilters.searchQuery;
    filtered = filtered.filter(p => 
      p.nombre.toLowerCase().includes(q) || 
      p.marca.toLowerCase().includes(q) || 
      p.categoria.toLowerCase().includes(q) || 
      (p.descripcion && p.descripcion.toLowerCase().includes(q))
    );
  }

  // 2. Filtrar por categorías
  if (currentFilters.categorias.length > 0) {
    filtered = filtered.filter(p => currentFilters.categorias.includes(p.categoria.toLowerCase()));
  }

  // 3. Filtrar por marcas
  if (currentFilters.marcas.length > 0) {
    filtered = filtered.filter(p => currentFilters.marcas.includes(p.marca.toLowerCase()));
  }

  // 4. Filtrar por precio
  filtered = filtered.filter(p => p.precio <= currentFilters.maxPrecio);

  // 5. Filtrar por stock
  if (currentFilters.soloStock) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  // 6. Ordenamiento
  if (currentFilters.sort === 'price_asc') {
    filtered.sort((a, b) => a.precio - b.precio);
  } else if (currentFilters.sort === 'price_desc') {
    filtered.sort((a, b) => b.precio - a.precio);
  } else if (currentFilters.sort === 'name_asc') {
    filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else {
    // rating_desc por defecto
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // 7. Actualizar contador
  countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'} encontrados`;

  // 8. Renderizar
  if (filtered.length === 0) {
    grid.style.display = 'none';
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
  }
}
