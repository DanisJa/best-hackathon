import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const { user_id, activity_id } = await req.json();
		if (!user_id || !activity_id) {
			return new Response(
				JSON.stringify({ error: 'Missing user_id or activity_id' }),
				{ status: 400 }
			);
		}

		// Fetch the activity
		const { data: activity, error: activityError } = await supabase
			.from('eco_pet_activities')
			.select('xp_earned, points_earned, is_active')
			.eq('id', activity_id)
			.eq('is_active', true)
			.single();

		if (activityError || !activity) {
			return new Response(JSON.stringify({ error: activityError }), {
				status: 404,
				headers: corsHeaders,
			});
		}

		// Get user XP, level, and points
		const { data: user, error: userError } = await supabase
			.from('users')
			.select('eco_pet_xp, eco_pet_level, total_points')
			.eq('id', user_id)
			.single();

		if (userError || !user) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
				headers: corsHeaders,
			});
		}

		let newXp = user.eco_pet_xp + activity.xp_earned;
		let newLevel = user.eco_pet_level;
		let xpRemainder = 0;

		// Handle leveling up
		if (newXp >= 100) {
			newLevel += Math.floor(newXp / 100);
			xpRemainder = newXp % 100;
			newXp = xpRemainder; // Carry over remaining XP
		}

		// Update user XP, level, and points
		const { error: updateError } = await supabase
			.from('users')
			.update({
				eco_pet_xp: newXp,
				eco_pet_level: newLevel,
				total_points: user.total_points + activity.points_earned,
			})
			.eq('id', user_id);

		if (updateError) {
			return new Response(JSON.stringify({ error: 'Failed to update user' }), {
				status: 500,
				headers: corsHeaders,
			});
		}

		// Log the points transaction
		const { error: logError } = await supabase.from('points').insert([
			{
				user_id,
				points_earned: activity.points_earned,
				description: 'Completed Eco Pet Activity',
			},
		]);

		if (logError) {
			return new Response(JSON.stringify({ error: 'Failed to log points' }), {
				status: 500,
				headers: corsHeaders,
			});
		}

		return new Response(
			JSON.stringify({
				message: 'Activity completed successfully',
				newXp,
				newLevel,
				points_earned: activity.points_earned,
			}),
			{ status: 200, headers: corsHeaders }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: 'Internal Server Error',
				details: error.message,
			}),
			{ status: 500, headers: corsHeaders }
		);
	}
});
