import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://auratest.carrd.co');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se permiten peticiones POST' });
  }

  try {
    const targetUrl = 'https://luci-aura.app.n8n.cloud/webhook/7b4d7865-7137-4a5e-8829-061ed33b2435/chat';

    const requestBody = {
      ...req.body,
      sessionId: req.body.sessionId || null
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    const formattedResponse = [{
      sessionId: requestBody.sessionId || null,
      chatInput: data.output || data.message || data.chatInput || 'Sin respuesta',
    }];

    return res.status(200).json(formattedResponse);
  } catch (error) {
    return res.status(500).json({ 
      error: 'Error en el proxy',
      message: error.message,
    });
  }
}
