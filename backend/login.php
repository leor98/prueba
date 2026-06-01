<?php
// 1. PERMISOS CORS (Clave para que Angular pueda hablar con PHP sin rebote)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Si Angular hace la consulta de control (OPTIONS), salimos rápido
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 2. INCLUIR CONEXIÓN A LA BASE DE DATOS
require_once 'conexion.php';

// 3. RECIBIR LOS DATOS QUE MANDA ANGULAR
$datosRecibidos = json_encode(json_decode(file_get_contents("php://input")));
$data = json_decode($datosRecibidos);

// Verificamos que Angular haya mandado el usuario y la contraseña
if (!empty($data->username) && !empty($data->password)) {
    
    $username = $data->username;
    $password = $data->password;

    // 4. BUSCAR AL USUARIO EN LA BASE DE DATOS
    $sql = "SELECT id_usuario, username, password_hash FROM usuarios WHERE username = :username AND activo = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username]);
    $usuario = $stmt->fetch();

    // 5. VERIFICAR LA CONTRASEÑA
    // Nota: Usamos password_verify porque en la base de datos se guarda el hash encriptado
    if ($usuario && password_verify($password, $usuario['password_hash'])) {
        
        // Login exitoso, le respondemos a Angular que está todo OK
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "mensaje" => "¡Login correcto!",
            "id_usuario" => $usuario['id_usuario'],
            "username" => $usuario['username']
        ]);
    } else {
        // Datos incorrectos
        http_response_code(401);
        echo json_encode(["status" => "error", "mensaje" => "Usuario o contraseña incorrectos."]);
    }
} else {
    // Datos incompletos
    http_response_code(400);
    echo json_encode(["status" => "error", "mensaje" => "Faltan datos para el login."]);
}
?>