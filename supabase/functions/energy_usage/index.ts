import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(
	Deno.env.get('SUPABASE_URL'),
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

serve(async (req) => {
	// Fetch devices with status TRUE
	const { data: devices, error } = await supabase
		.from('devices')
		.select('id, user_id')
		.eq('status', true);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}

	// Map over devices and insert a row into usage_log for each
	const insertPromises = devices.map((device) => {
		// Random energy usage between 0.01 kWh and 0.1 kWh for realism
		const usage = Math.random() * 0.09 + 0.01; // Random value between 0.01 and 0.1
		return supabase.from('energy_logs').insert([
			{
				device_id: device.id,
				user_id: device.user_id,
				energy_used: parseFloat(usage.toFixed(3)), // Round to 3 decimal places for consistency
			},
		]);
	});

	const results = await Promise.all(insertPromises);

	return new Response(
		JSON.stringify({ message: 'Logs inserted successfully', results }),
		{
			status: 200,
		}
	);
});
