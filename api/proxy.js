export default async function handler(req, res) {
  // Cabeceras comunes para todas las respuestas
  res.setHeader('Access-Control-Allow-Origin', 'https://auratest.carrd.co');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo explícito del método OPTIONS (preflight request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo aceptar peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permiten peticiones POST' });
  }

  try {
    // URL de tu webhook en n8n (ajústala si es necesario)
    const targetUrl = 'https://luci-aura.app.n8n.cloud/webhook/7b4d7865-7137-4a5e-8829-061ed33b2435/chat';

    // Reenviar la petición a n8n
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    // Devolver respuesta desde n8n
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    // Manejo de errores básicos
    return res.status(500).json({ 
      error: 'Error en el proxy',
      message: error.message,
    });
  }
}
