import {
	useMutation,
	useQuery,
	QueryClient,
	useQueryClient,
} from '@tanstack/react-query';
import supabase from '../utils/supabase';
import { toast } from 'sonner';

const claimActivity = async (userId: string, activityId: string) => {
	const { data, error } = await supabase.functions.invoke('complete_activity', {
		body: JSON.stringify({ user_id: userId, activity_id: activityId }),
	});

	if (error) throw error;
	return data;
};

const useActivityClaim = (activityId: string, userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => claimActivity(userId, activityId),
		onSuccess: async () => {
			await supabase
				.from('users')
				.update({ daily_claimed: true })
				.eq('id', userId);

			queryClient.invalidateQueries({ queryKey: ['userData'] });
		},
		onError: (error) => {
			toast(`Error claiming activity: ${error}`);
		},
	});
};

const getActivities = async () => {
	const { data, error } = await supabase
		.from('eco_pet_activities')
		.select()
		.eq('is_active', true);

	if (error) throw error;

	return data;
};

const useActivities = () => {
	return useQuery({
		queryKey: ['ecoPetActivities'],
		queryFn: getActivities,
	});
};

export { useActivityClaim, useActivities };
