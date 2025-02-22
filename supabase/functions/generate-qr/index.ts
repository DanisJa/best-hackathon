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
