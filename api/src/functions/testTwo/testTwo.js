export default async () => {
  return new Response('Response from test two function', {
    headers: { 'content-type': 'text/html' },
  })
}
