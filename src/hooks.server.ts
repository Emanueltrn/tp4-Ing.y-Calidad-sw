import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  /// manejar peticiones "Preflight" (OPTIONS) que hace el navegador
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }

  /// procesar la petición normal y agregarle el header de CORS a la respuesta
  const response = await resolve(event);
  response.headers.set('Access-Control-Allow-Origin', '*');
  
  return response;
};