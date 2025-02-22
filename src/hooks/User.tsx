import { useQuery } from '@tanstack/react-query';
import supabase from '../utils/supabase'; // Adjust import based on your setup

const fetchUserData = async () => {
	// Get authenticated user
	const { data: authData, error: authError } = await supabase.auth.getUser();
	if (authError || !authData?.user)
		throw authError || new Error('No authenticated user found');

	const userId = authData.user.id;

	// Fetch additional user details from public.users
	const { data: publicUser, error: publicError } = await supabase
		.from('users')
		.select('*')
		.eq('id', userId)
		.single();

	if (publicError) throw publicError;

	return { authUser: authData.user, publicUser };
};

export const useUserData = () => {
	return useQuery({
		queryKey: ['userData'],
		queryFn: fetchUserData,
	});
};
