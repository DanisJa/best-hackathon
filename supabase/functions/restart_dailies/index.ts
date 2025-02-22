import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(
	Deno.env.get('SUPABASE_URL'),
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

serve(async () => {
	try {
		const { error } = await supabase
			.from('users')
			.update({ daily_claimed: false })
			.eq('daily_claimed', true);

		if (error) {
			console.error('Supabase Error:', error);
			return new Response(
				JSON.stringify({
					error: 'Failed to reset daily_claimed',
					details: error.message,
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ message: 'Daily claims reset successfully' }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (err) {
		console.error('Unexpected Error:', err);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
});
