<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $date = date('Y-m-d H:i:s');
        $csvLine = "$email,$date\n";
        
        // Salvar no arquivo CSV
        file_put_contents('email_leads.csv', $csvLine, FILE_APPEND);
        
        echo json_encode(['success' => true, 'message' => 'Email cadastrado com sucesso!']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email inválido']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
}
?> 