// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import QRCode from 'https://deno.land/x/qrcode/mod.ts';

serve(async (req) => {
	try {
		const { data } = await req.json();
		if (!data) {
			return new Response(JSON.stringify({ error: 'No data provided' }), {
				status: 400,
			});
		}

		// Generate the QR Code as a data URL
		const qrCodeDataUrl = await QRCode.toDataURL(data);

		return new Response(JSON.stringify({ qrCode: qrCodeDataUrl }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
