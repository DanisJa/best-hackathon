import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const supabase = createClient(
	Deno.env.get('SUPABASE_URL'),
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

serve(async (req) => {
	try {
		// Step 1: Get the energy logs for the last 24 hours
		const { data: energyLogs, error: energyLogsError } = await supabase
			.from('energy_logs')
			.select('energy_used, user_id, created_at')
			.gt(
				'created_at',
				new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
			); // 24 hours ago

		if (energyLogsError) {
			return new Response(JSON.stringify({ error: energyLogsError.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Step 2: Calculate total energy usage and average energy usage for all users
		const totalEnergyUsage = energyLogs.reduce(
			(total, log) => total + log.energy_used,
			0
		);
		const numUsers = energyLogs.length;

		if (numUsers === 0) {
			return new Response(
				JSON.stringify({
					message: 'No energy data available for the last 24 hours.',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const averageEnergyUsage = totalEnergyUsage / numUsers;

		// Step 3: Get users and their total points
		const { data: users, error: usersError } = await supabase
			.from('users')
			.select('id, total_points');

		if (usersError) {
			return new Response(JSON.stringify({ error: usersError.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		// Step 4: Insert points into points table for each user based on energy usage
		const pointsInsertPromises = users.map(async (user) => {
			// Aggregate energy used by this user in the last 24 hours
			const userEnergyUsage = energyLogs
				.filter((log) => log.user_id === user.id)
				.reduce((total, log) => total + log.energy_used, 0);

			// Calculate multiplier based on the user's energy usage compared to the average
			let energyMultiplier = 1;

			if (userEnergyUsage > averageEnergyUsage) {
				// User used more energy, apply 0.75x multiplier
				energyMultiplier = 0.75;
			} else if (userEnergyUsage < averageEnergyUsage) {
				// User used less energy, apply 1.25x multiplier
				energyMultiplier = 1.25;
			}

			// Base points earned for daily activity
			const basePoints = 10;
			const pointsEarned = basePoints * energyMultiplier;

			// Step 5: Insert into points table
			const { error: pointsError } = await supabase.from('points').insert({
				user_id: user.id,
				points_earned: Math.round(pointsEarned),
				description: `Daily points based on energy usage multiplier of ${energyMultiplier}`,
			});

			if (pointsError) {
				console.error(
					`Error inserting points for user ${user.id}:`,
					pointsError
				);
			} else {
				// Step 6: Update the total points in the users table
				const { error: updateError } = await supabase
					.from('users')
					.update({
						total_points: Math.round(user.total_points + pointsEarned),
					})
					.eq('id', user.id);

				if (updateError) {
					console.error(
						`Error updating total points for user ${user.id}:`,
						updateError
					);
				}
			}
		});

		// Wait for all insertions and updates to complete
		await Promise.all(pointsInsertPromises);

		return new Response(
			JSON.stringify({ message: 'Daily points awarded successfully.' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Error in Edge Function:', error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
});
