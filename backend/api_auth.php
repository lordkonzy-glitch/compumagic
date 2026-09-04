<?php
/**
 * =====================================================================
 * COMPUMAGIC — api_auth.php
 * API Endpoint para autenticación (login y registro) con MySQL
 * =====================================================================
 */

define('IS_API', true);
require_once 'db_config.php';

// Leer datos JSON del cuerpo de la petición
$input = json_decode(file_get_contents('php://input'), true) ?? [];

$action = isset($input['action']) ? trim($input['action']) : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'login') {
        $email = isset($input['email']) ? $conn->real_escape_string(trim($input['email'])) : '';
        $pass  = isset($input['password']) ? trim($input['password']) : '';

        if (empty($email) || empty($pass)) {
            echo json_encode(['error' => true, 'mensaje' => 'Correo y contraseña obligatorios.']);
            exit;
        }

        // Buscar el usuario en la base de datos
        $result = $conn->query("SELECT * FROM usuarios WHERE email = '$email'");
        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // Verificar contraseña (soporta password_verify y también el admin123 de prueba inicial)
            if (password_verify($pass, $user['password']) || ($email === 'admin@compumagic.com' && $pass === 'admin123')) {
                
                // Si inició como admin123 y la contraseña de la base de datos no está encriptada aún,
                // la encriptamos para el futuro
                if ($pass === 'admin123' && !password_verify($pass, $user['password'])) {
                    $new_hash = password_hash('admin123', PASSWORD_DEFAULT);
                    $conn->query("UPDATE usuarios SET password = '$new_hash' WHERE id = " . $user['id']);
                }

                echo json_encode([
                    'error' => false,
                    'mensaje' => '¡Inicio de sesión exitoso! Bienvenido, ' . $user['nombre'],
                    'user' => [
                        'id' => 'usr_' . $user['id'],
                        'nombre' => $user['nombre'],
                        'email' => $user['email'],
                        'rol' => $user['rol'],
                        'avatar' => $user['avatar'] ?: strtoupper($user['nombre'][0]),
                        'telefono' => $user['telefono'] ?? '',
                        'direccion' => $user['direccion'] ?? '',
                        'ciudad' => $user['ciudad'] ?? '',
                        'pais' => $user['pais'] ?? ''
                    ]
                ]);
            } else {
                echo json_encode(['error' => true, 'mensaje' => 'Contraseña incorrecta.']);
            }
        } else {
            echo json_encode(['error' => true, 'mensaje' => 'El correo electrónico no está registrado.']);
        }
        exit;

    } elseif ($action === 'register') {
        $nombre = isset($input['nombre']) ? $conn->real_escape_string(trim($input['nombre'])) : '';
        $email  = isset($input['email']) ? $conn->real_escape_string(trim($input['email'])) : '';
        $pass   = isset($input['password']) ? trim($input['password']) : '';

        if (empty($nombre) || empty($email) || empty($pass)) {
            echo json_encode(['error' => true, 'mensaje' => 'Todos los campos son obligatorios.']);
            exit;
        }

        // Verificar si el correo ya existe
        $result = $conn->query("SELECT id FROM usuarios WHERE email = '$email'");
        if ($result && $result->num_rows > 0) {
            echo json_encode(['error' => true, 'mensaje' => 'El correo electrónico ya está registrado.']);
            exit;
        }

        // Hashear contraseña por seguridad
        $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
        $avatar = strtoupper($nombre[0]);

        // Insertar en la BD
        $sql = "INSERT INTO usuarios (nombre, email, password, rol, avatar) 
                VALUES ('$nombre', '$email', '$hashed_pass', 'cliente', '$avatar')";
        
        if ($conn->query($sql)) {
            $new_id = $conn->insert_id;
            echo json_encode([
                'error' => false,
                'mensaje' => '¡Registro exitoso! Bienvenido a COMPUMAGIC.',
                'user' => [
                    'id' => 'usr_' . $new_id,
                    'nombre' => $nombre,
                    'email' => $email,
                    'rol' => 'cliente',
                    'avatar' => $avatar,
                    'telefono' => '',
                    'direccion' => '',
                    'ciudad' => '',
                    'pais' => ''
                ]
            ]);
        } else {
            echo json_encode(['error' => true, 'mensaje' => 'Error al guardar el usuario en la base de datos: ' . $conn->error]);
        }
        exit;

    } elseif ($action === 'update_profile') {
        $user_id  = isset($input['user_id']) ? intval(str_replace('usr_', '', $input['user_id'])) : 0;
        $telefono  = isset($input['telefono']) ? $conn->real_escape_string(trim($input['telefono'])) : '';
        $direccion = isset($input['direccion']) ? $conn->real_escape_string(trim($input['direccion'])) : '';
        $ciudad    = isset($input['ciudad']) ? $conn->real_escape_string(trim($input['ciudad'])) : '';
        $pais      = isset($input['pais']) ? $conn->real_escape_string(trim($input['pais'])) : '';

        if ($user_id <= 0) {
            echo json_encode(['error' => true, 'mensaje' => 'Usuario no válido.']);
            exit;
        }

        $sql = "UPDATE usuarios SET 
                telefono = '$telefono', 
                direccion = '$direccion', 
                ciudad = '$ciudad', 
                pais = '$pais' 
                WHERE id = $user_id";

        if ($conn->query($sql)) {
            // Obtener el usuario actualizado
            $result = $conn->query("SELECT * FROM usuarios WHERE id = $user_id");
            if ($result && $result->num_rows > 0) {
                $user = $result->fetch_assoc();
                echo json_encode([
                    'error' => false,
                    'mensaje' => 'Perfil actualizado correctamente.',
                    'user' => [
                        'id' => 'usr_' . $user['id'],
                        'nombre' => $user['nombre'],
                        'email' => $user['email'],
                        'rol' => $user['rol'],
                        'avatar' => $user['avatar'] ?: strtoupper($user['nombre'][0]),
                        'telefono' => $user['telefono'] ?? '',
                        'direccion' => $user['direccion'] ?? '',
                        'ciudad' => $user['ciudad'] ?? '',
                        'pais' => $user['pais'] ?? ''
                    ]
                ]);
            } else {
                echo json_encode(['error' => true, 'mensaje' => 'Usuario no encontrado tras actualizar.']);
            }
        } else {
            echo json_encode(['error' => true, 'mensaje' => 'Error al actualizar el perfil: ' . $conn->error]);
        }
        exit;
    } else {
        echo json_encode(['error' => true, 'mensaje' => 'Acción no válida.']);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => true, 'mensaje' => 'Método no permitido']);
}
?>
