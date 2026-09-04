<?php
/**
 * =====================================================================
 * COMPUMAGIC — index.php
 * Punto de entrada principal en PHP (SPA Shell)
 * =====================================================================
 */

// Incluir configuración y conexión de base de datos
// Esto ejecutará la inicialización automática si es la primera vez
require_once 'backend/db_config.php';

// Cargar cabecera común
include 'header.php';
?>

  <!-- ═══════════════════════════════════════════════
       CONTENIDO PRINCIPAL (SPA — inyectado por el router)
  ═══════════════════════════════════════════════════ -->
  <main id="app" aria-live="polite">
    <!-- Título principal h1 accesible para validación W3C y SEO (el router SPA inyecta dinámicamente las páginas) -->
    <h1 class="sr-only">COMPUMAGIC — Especialistas en Tecnología y Periféricos Informáticos</h1>
    <div style="display:flex;align-items:center;justify-content:center;min-height:60vh">
      <div class="spinner"></div>
    </div>
  </main>

<?php
// Cargar pie de página común
include 'footer.php';
?>
