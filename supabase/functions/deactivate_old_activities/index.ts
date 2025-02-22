import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(
	Deno.env.get('SUPABASE_URL'),
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

const twentyFourHoursAgo = new Date(
	Date.now() - 24 * 60 * 60 * 1000
).toISOString();

serve(async () => {
	const { data, error } = await supabase
		.from('eco_pet_activities')
		.update({ is_active: false })
		.lt('created_at', twentyFourHoursAgo)
		.eq('is_active', true);

	if (!data || data.length === 0) {
		return new Response(
			JSON.stringify({
				message: 'No old activities found to deactivate.',
			}),
			{ status: 200 }
		);
	}

	if (error) {
		return new Response(
			JSON.stringify({
				error: 'Failed to update activities',
				details: error.message,
			}),
			{ status: 500 }
		);
	}

	return new Response(
		JSON.stringify({ message: 'Old activities deactivated successfully' }),
		{ status: 200 }
	);
});
