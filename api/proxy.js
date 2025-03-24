export default async function handler(req, res) {
  // 1. Permitir conexiones desde tu web
  res.setHeader('Access-Control-Allow-Origin', 'https://auratest.carrd.co');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Solo aceptar peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permiten peticiones POST' });
  }

  try {
    // 3. Tu webhook de n8n (¡cambia esta URL por la tuya!)
    const targetUrl = 'https://luci-aura.app.n8n.cloud/webhook/7b4d7865-7137-4a5e-8829-061ed33b2435/chat';

    // 4. Reenviar la petición a n8n
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // 5. Devolver la respuesta de n8n a tu chat
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    // 6. Manejo de errores simples
    res.status(500).json({ 
      error: 'Error en el proxy',
      message: error.message 
    });
  }
}
