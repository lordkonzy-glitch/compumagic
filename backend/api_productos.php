<?php
/**
 * =====================================================================
 * COMPUMAGIC — api_productos.php
 * API Endpoint para consultar, guardar y eliminar productos de la base de datos MySQL
 * =====================================================================
 */

define('IS_API', true);
require_once 'db_config.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    // Obtener todos los productos ordenados por creación
    $result = $conn->query("SELECT * FROM productos ORDER BY creado_en DESC");
    
    if ($result) {
        $productos = [];
        while ($row = $result->fetch_assoc()) {
            $productos[] = [
                'id'             => $row['id'],
                'nombre'         => $row['nombre'],
                'categoria'      => $row['categoria'],
                'precio'         => floatval($row['precio']),
                'precioOriginal' => $row['precio_original'] !== null ? floatval($row['precio_original']) : null,
                'imagen'         => $row['imagen'],
                'descripcion'    => $row['descripcion'],
                'marca'          => $row['marca'],
                'stock'          => intval($row['stock']),
                'rating'         => floatval($row['rating']),
                'destacado'      => intval($row['destacado']) === 1,
                'specs'          => [] // La SPA lo maneja de forma flexible
            ];
        }
        echo json_encode([
            'error' => false,
            'data'  => $productos
        ]);
    } else {
        echo json_encode([
            'error'   => true,
            'mensaje' => 'Error al consultar productos: ' . $conn->error
        ]);
    }
    exit;
} elseif ($method === 'POST') {
    // Leer datos del cuerpo de la petición (JSON)
    $input = json_decode(file_get_contents('php://input'), true) ?? [];
    $action = isset($input['action']) ? trim($input['action']) : '';

    if ($action === 'save') {
        $id             = isset($input['id']) ? $conn->real_escape_string(trim($input['id'])) : '';
        $nombre         = isset($input['nombre']) ? $conn->real_escape_string(trim($input['nombre'])) : '';
        $marca          = isset($input['marca']) ? $conn->real_escape_string(trim($input['marca'])) : '';
        $categoria      = isset($input['categoria']) ? $conn->real_escape_string(trim($input['categoria'])) : '';
        $precio         = isset($input['precio']) ? floatval($input['precio']) : 0.0;
        $precioOriginal = isset($input['precioOriginal']) && $input['precioOriginal'] !== null ? floatval($input['precioOriginal']) : null;
        $stock          = isset($input['stock']) ? intval($input['stock']) : 0;
        $rating         = isset($input['rating']) ? floatval($input['rating']) : 4.5;
        $imagen         = isset($input['imagen']) ? $conn->real_escape_string(trim($input['imagen'])) : '';
        $descripcion    = isset($input['descripcion']) ? $conn->real_escape_string(trim($input['descripcion'])) : '';

        if (empty($id) || empty($nombre) || empty($categoria)) {
            echo json_encode([
                'error'   => true,
                'mensaje' => 'El ID, nombre y categoría son campos requeridos.'
            ]);
            exit;
        }

        $sql_precio_original = $precioOriginal !== null ? $precioOriginal : "NULL";

        // Verificar si el producto ya existe para decidir si es INSERT o UPDATE
        $check = $conn->query("SELECT id FROM productos WHERE id = '$id'");
        if ($check && $check->num_rows > 0) {
            // Actualizar
            $sql = "UPDATE productos SET 
                        nombre = '$nombre', 
                        marca = '$marca', 
                        categoria = '$categoria', 
                        precio = $precio, 
                        precio_original = $sql_precio_original, 
                        stock = $stock, 
                        rating = $rating, 
                        imagen = '$imagen', 
                        descripcion = '$descripcion' 
                    WHERE id = '$id'";
        } else {
            // Insertar nuevo
            $sql = "INSERT INTO productos (id, nombre, marca, categoria, precio, precio_original, imagen, descripcion, stock, rating) 
                    VALUES ('$id', '$nombre', '$marca', '$categoria', $precio, $sql_precio_original, '$imagen', '$descripcion', $stock, $rating)";
        }

        if ($conn->query($sql)) {
            echo json_encode([
                'error'   => false,
                'mensaje' => 'Producto guardado correctamente en la base de datos.',
                'id'      => $id
            ]);
        } else {
            echo json_encode([
                'error'   => true,
                'mensaje' => 'Error al guardar el producto: ' . $conn->error
            ]);
        }
        exit;
    } elseif ($action === 'delete') {
        $id = isset($input['id']) ? $conn->real_escape_string(trim($input['id'])) : '';

        if (empty($id)) {
            echo json_encode([
                'error'   => true,
                'mensaje' => 'El ID del producto es requerido para eliminar.'
            ]);
            exit;
        }

        $sql = "DELETE FROM productos WHERE id = '$id'";
        if ($conn->query($sql)) {
            echo json_encode([
                'error'   => false,
                'mensaje' => 'Producto eliminado correctamente de la base de datos.'
            ]);
        } else {
            echo json_encode([
                'error'   => true,
                'mensaje' => 'Error al eliminar el producto: ' . $conn->error
            ]);
        }
        exit;
    } else {
        echo json_encode([
            'error'   => true,
            'mensaje' => 'Acción no permitida'
        ]);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode([
        'error'   => true,
        'mensaje' => 'Método no permitido'
    ]);
}
?>
