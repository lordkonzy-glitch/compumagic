<?php
/**
 * =====================================================================
 * COMPUMAGIC — db_config.php
 * Archivo de configuración y conexión a base de datos MySQL
 * Con inicialización y auto-creación automática de base de datos y tablas
 * =====================================================================
 */

// ─────────────────────────────────────────────────────────────────
// 1. CONFIGURACIÓN DE LA BASE DE DATOS
// ─────────────────────────────────────────────────────────────────
define('DB_HOST',    'apstivigil.edu.pe');       // Host del servidor MySQL
define('DB_PORT',    '3306');            // Puerto (3306 por defecto)
define('DB_NAME',    'iespvigil_bddia_202620');   // Nombre de la base de datos
define('DB_USER',    'iespvigil_udia_202620');            // Usuario MySQL
define('DB_PASS',    'bG#7vXz?9rQm'); // Contraseña MySQL
define('DB_CHARSET', 'utf8mb4');         // Charset

// Intentar conectar directamente a la base de datos especificada
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
} catch (mysqli_sql_exception $e) {
    // Si falla, intentar conectarse sin base de datos (por si es local y aún no está creada)
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, '', DB_PORT);
        $sql_db = "CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
        $conn->query($sql_db);
        $conn->select_db(DB_NAME);
    } catch (mysqli_sql_exception $e2) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
        die(json_encode([
            'error'   => true,
            'mensaje' => 'Error de conexión a MySQL: ' . $e2->getMessage() . '. Revisa tus datos en backend/db_config.php'
        ]));
    }
}
$conn->set_charset(DB_CHARSET);

// ─────────────────────────────────────────────────────────────────
// 2. INICIALIZACIÓN AUTOMÁTICA DE TABLAS Y DATOS (SEEDER)
// ─────────────────────────────────────────────────────────────────
function db_initialize($conn) {
    // Estructuras SQL para las tablas
    $sqls = [
        "CREATE TABLE IF NOT EXISTS usuarios (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            nombre      VARCHAR(100)  NOT NULL,
            email       VARCHAR(150)  NOT NULL UNIQUE,
            password    VARCHAR(255)  NOT NULL,
            rol         ENUM('admin','cliente') DEFAULT 'cliente',
            avatar      VARCHAR(10),
            telefono    VARCHAR(20)   NULL,
            direccion   VARCHAR(300)  NULL,
            ciudad      VARCHAR(100)  NULL,
            pais        VARCHAR(100)  NULL,
            creado_en   DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS productos (
            id              VARCHAR(20)    PRIMARY KEY,
            nombre          VARCHAR(200)   NOT NULL,
            categoria       VARCHAR(50)    NOT NULL,
            precio          DECIMAL(10,2)  NOT NULL,
            precio_original DECIMAL(10,2)  NULL,
            imagen          VARCHAR(500)   NULL,
            descripcion     TEXT           NULL,
            marca           VARCHAR(50)    NULL,
            stock           INT            DEFAULT 0,
            rating          DECIMAL(3,1)   DEFAULT 0.0,
            destacado       TINYINT(1)     DEFAULT 0,
            creado_en       DATETIME       DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS pedidos (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            codigo          VARCHAR(20)    NOT NULL UNIQUE,
            usuario_id      VARCHAR(50)    NULL,
            usuario_nombre  VARCHAR(100)   NULL,
total           DECIMAL(10,2)  NOT NULL,
            descuento       DECIMAL(10,2)  DEFAULT 0,
            total_final     DECIMAL(10,2)  NOT NULL,
            estado          ENUM('Pendiente','Procesando','Enviado','Entregado','Cancelado') DEFAULT 'Pendiente',
            metodo_pago     VARCHAR(50)    NULL,
            nombre_envio    VARCHAR(100)   NULL,
            direccion_envio VARCHAR(300)   NULL,
            ciudad_envio    VARCHAR(100)   NULL,
            telefono_envio  VARCHAR(20)    NULL,
            fecha_pedido    DATETIME       DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS detalle_pedidos (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            pedido_id       INT            NOT NULL,
            producto_id     VARCHAR(20)    NULL,
            producto_nombre VARCHAR(200)   NULL,
            precio_unitario DECIMAL(10,2)  NOT NULL,
            cantidad        INT            NOT NULL,
            subtotal        DECIMAL(10,2)  NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS contactos (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            nombre      VARCHAR(100) NOT NULL,
            email       VARCHAR(150) NOT NULL,
            asunto      VARCHAR(200) NULL,
            mensaje     TEXT         NOT NULL,
            leido       TINYINT(1)   DEFAULT 0,
            fecha_envio DATETIME     DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS blog_posts (
            id          INT AUTO_INCREMENT PRIMARY KEY,
            titulo      VARCHAR(300) NOT NULL,
            resumen     TEXT         NULL,
            contenido   LONGTEXT     NULL,
            imagen      VARCHAR(500) NULL,
            autor       VARCHAR(100) NULL,
            categoria   VARCHAR(50)  NULL,
            publicado   TINYINT(1)   DEFAULT 1,
            fecha       DATE         NULL,
            creado_en   DATETIME     DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",

        "CREATE TABLE IF NOT EXISTS cupones (
            id            INT AUTO_INCREMENT PRIMARY KEY,
            codigo        VARCHAR(20)    NOT NULL UNIQUE,
            tipo          ENUM('porcentaje','fijo') NOT NULL,
            valor         DECIMAL(10,2)  NOT NULL,
            monto_minimo  DECIMAL(10,2)  DEFAULT 0,
            activo        TINYINT(1)     DEFAULT 1,
            creado_en     DATETIME       DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
    ];

    foreach ($sqls as $sql) {
        $conn->query($sql);
    }

    // Asegurar que las columnas del perfil existan en la tabla usuarios si ya existía
    $check_cols = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'telefono'");
    if ($check_cols && $check_cols->num_rows === 0) {
        $conn->query("ALTER TABLE usuarios ADD COLUMN telefono VARCHAR(20) NULL");
    }
    $check_cols = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'direccion'");
    if ($check_cols && $check_cols->num_rows === 0) {
        $conn->query("ALTER TABLE usuarios ADD COLUMN direccion VARCHAR(300) NULL");
    }
    $check_cols = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'ciudad'");
    if ($check_cols && $check_cols->num_rows === 0) {
        $conn->query("ALTER TABLE usuarios ADD COLUMN ciudad VARCHAR(100) NULL");
    }
    $check_cols = $conn->query("SHOW COLUMNS FROM usuarios LIKE 'pais'");
    if ($check_cols && $check_cols->num_rows === 0) {
        $conn->query("ALTER TABLE usuarios ADD COLUMN pais VARCHAR(100) NULL");
    }

    // Insertar cupones por defecto
    $conn->query("INSERT IGNORE INTO cupones (codigo, tipo, valor, monto_minimo) VALUES
        ('MAGIC10', 'porcentaje', 10, 100),
        ('GAMER50',  'fijo',       50, 300)");

    // Insertar administrador por defecto (contraseña: admin123)
    $check_admin = $conn->query("SELECT id FROM usuarios WHERE email = 'admin@compumagic.com'");
    if ($check_admin && $check_admin->num_rows === 0) {
        $admin_pass = password_hash('admin123', PASSWORD_DEFAULT);
        $conn->query("INSERT INTO usuarios (nombre, email, password, rol, avatar) VALUES
            ('Administrador Magic', 'admin@compumagic.com', '$admin_pass', 'admin', 'A')");
    }

    // Insertar productos iniciales
    $productos = [
        ['m1', 'Mouse Gamer Logitech G203 LIGHTSYNC', 'mouses', 110.00, 130.00, 'img/prod_mouse.png', 'Mouse gamer con sensor óptico de alta precisión y RGB personalizable. Ideal para gaming competitivo.', 'Logitech', 15, 4.8, 1],
        ['m2', 'Mouse Ejecutivo Inalámbrico HP 200', 'mouses', 45.00, NULL, 'img/prod_mouse2.jpg', 'Mouse inalámbrico ergonómico con receptor USB nano. Ideal para trabajo de oficina diario.', 'HP', 30, 4.5, 0],
        ['t1', 'Teclado Gamer Mecánico Redragon Kumara', 'teclados', 155.00, 180.00, 'img/prod_keyboard.png', 'Teclado mecánico TKL compacto con switches Outemu Blue y retroiluminación roja.', 'Redragon', 20, 4.7, 1],
        ['t2', 'Teclado Ejecutivo Multimedia Genius', 'teclados', 35.00, NULL, 'img/prod_keyboard2.jpg', 'Teclado de membrana tamaño completo, silencioso y cómodo para trabajo de oficina.', 'Genius', 50, 4.2, 0],
        ['t3', 'Teclado Numérico Inalámbrico', 'teclados', 40.00, NULL, 'img/prod_keypad.jpg', 'Teclado numérico compacto e inalámbrico. Perfecto para laptops sin pad numérico.', 'Targus', 12, 4.4, 0],
        ['a1', 'Audífonos Gamer HyperX Cloud Stinger', 'auriculares', 195.00, 220.00, 'img/prod_headset.png', 'Auriculares ligeros con sonido surround y micrófono con cancelación de ruido.', 'HyperX', 10, 4.9, 1],
        ['p1', 'Parlantes Multimedia Logitech Z150', 'audio', 85.00, NULL, 'img/prod_speakers.jpg', 'Parlantes estéreo compactos con sonido nítido y entrada jack 3.5mm.', 'Logitech', 18, 4.6, 0],
        ['acc1', 'Cable HDMI 2.0 Trenzado 2 Metros', 'accesorios', 25.00, NULL, 'img/prod_hdmi.jpg', 'Cable HDMI trenzado de alta resistencia. Soporta resolución 4K a 60Hz.', 'Genérico', 100, 4.8, 0],
        ['acc2', 'Adaptador HDMI a VGA con Audio', 'accesorios', 30.00, NULL, 'img/prod_adapter.jpg', 'Convierte señal HDMI a VGA analógica. Compatible con proyectores y monitores antiguos.', 'Genérico', 45, 4.5, 1],
        ['acc3', 'Adaptador USB WiFi TP-Link 300Mbps', 'accesorios', 45.00, NULL, 'img/prod_wifi.jpg', 'Adaptador WiFi USB nano para PC de escritorio. Conexión inalámbrica estable y rápida.', 'TP-Link', 25, 4.7, 0],
        ['l1', 'Lenovo Legion 5 Pro', 'laptops', 6200.00, 6800.00, 'img/prod_legion.png', 'Laptop gamer con procesador potente y pantalla de alta tasa de refresco.', 'Lenovo', 10, 4.8, 1],
        ['l2', 'Lenovo LOQ 15', 'laptops', 4500.00, 4900.00, 'img/prod_loq.png', 'Excelente relación calidad-precio para gaming de entrada y productividad.', 'Lenovo', 8, 4.5, 0],
        ['l3', 'ASUS ROG Strix G16', 'laptops', 7200.00, 7800.00, 'img/prod_rog.png', 'Diseño agresivo, refrigeración avanzada y rendimiento premium.', 'ASUS', 5, 4.9, 1],
        ['l4', 'ASUS TUF Gaming A15', 'laptops', 4900.00, NULL, 'img/prod_tuf.png', 'Durabilidad de grado militar y gran autonomía para gaming.', 'ASUS', 12, 4.6, 1],
        ['l5', 'Dell G5 15', 'laptops', 4200.00, NULL, 'img/prod_dellg5.png', 'Diseño elegante con gran rendimiento térmico y de procesamiento.', 'Dell', 15, 4.4, 0],
        ['l6', 'Dell G7 17', 'laptops', 5100.00, 5600.00, 'img/prod_dellg7.png', 'Pantalla amplia y construcción delgada de aluminio premium.', 'Dell', 0, 4.5, 0],
        ['l7', 'Dell Alienware m16', 'laptops', 9500.00, 10500.00, 'img/prod_alienware.png', 'La laptop de gama ultra alta definitiva con iluminación RGB icónica.', 'Dell', 4, 4.9, 1]
    ];

    foreach ($productos as $p) {
        $precio_orig = $p[4] !== NULL ? $p[4] : 'NULL';
        $sql = "INSERT IGNORE INTO productos (id, nombre, categoria, precio, precio_original, imagen, descripcion, marca, stock, rating, destacado) 
                VALUES ('{$p[0]}', '{$p[1]}', '{$p[2]}', {$p[3]}, $precio_orig, '{$p[5]}', '{$p[6]}', '{$p[7]}', {$p[8]}, {$p[9]}, {$p[10]})";
        $conn->query($sql);
    }

    // Insertar blog posts iniciales
    $blog_posts = [
        ['¿Por qué un mouse gamer marca la diferencia?', 'Descubre cómo los DPI y la precisión del sensor mejoran tu experiencia de juego y trabajo diario.', 'En COMPUMAGIC sabemos que el mouse es el periférico más importante. Contamos con mouses gamer de alta precisión y mouses ejecutivos para comodidad diaria. Con más de 10 años en el mercado, recomendamos los mouses ligeros para evitar la fatiga en largas jornadas.', 'img/blog1.jpg', 'COMPUMAGIC', 'Mouses', '2026-06-05']
    ];

    foreach ($blog_posts as $b) {
        $sql = "INSERT IGNORE INTO blog_posts (titulo, resumen, contenido, imagen, autor, categoria, fecha) 
                VALUES ('{$b[0]}', '{$b[1]}', '{$b[2]}', '{$b[3]}', '{$b[4]}', '{$b[5]}', '{$b[6]}')";
        $conn->query($sql);
    }
}

// Ejecutar la inicialización
db_initialize($conn);


// ─────────────────────────────────────────────────────────────────
// 3. CABECERAS PARA API JSON (solo si este script se invoca directamente o como API)
// ─────────────────────────────────────────────────────────────────
// Determinamos si es una llamada AJAX de API
$is_api_call = (basename($_SERVER['PHP_SELF']) === 'db_config.php') || (defined('IS_API') && IS_API);

if ($is_api_call) {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
}


// ─────────────────────────────────────────────────────────────────
// 4. PROCESAR FORMULARIO DE CONTACTO (POST)
// ─────────────────────────────────────────────────────────────────
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST' && basename($_SERVER['PHP_SELF']) === 'db_config.php') {
    // Si la llamada no especificó cabeceras JSON, las enviamos
    if (!$is_api_call) {
        header('Content-Type: application/json; charset=utf-8');
    }

    // Leer datos del formulario (soporta urlencoded y JSON)
    $input = $_POST;
    if (empty($input)) {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
    }

    $nombre  = isset($input['nombre'])  ? $conn->real_escape_string(trim($input['nombre']))  : '';
    $email   = isset($input['email'])   ? $conn->real_escape_string(trim($input['email']))   : '';
    $mensaje = isset($input['mensaje']) ? $conn->real_escape_string(trim($input['mensaje'])) : '';
    $fecha   = date('Y-m-d H:i:s');

    // Validar campos obligatorios
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['error' => true, 'mensaje' => 'Todos los campos son obligatorios.']);
        exit;
    }

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => true, 'mensaje' => 'Correo electrónico inválido.']);
        exit;
    }

    // Insertar en la tabla contactos
    $sql = "INSERT INTO contactos (nombre, email, mensaje, fecha_envio)
            VALUES ('$nombre', '$email', '$mensaje', '$fecha')";

    if ($conn->query($sql)) {
        echo json_encode([
            'error'   => false,
            'mensaje' => '¡Mensaje enviado exitosamente! Te responderemos en menos de 24 horas.'
        ]);
    } else {
        echo json_encode([
            'error'   => true,
            'mensaje' => 'Error al guardar el mensaje en la base de datos: ' . $conn->error
        ]);
    }
    exit;
}
?>
