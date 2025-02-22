import { useActivities } from '../hooks/ActivityClaim';
import ActivityCard from '../components/ActivityCard';
import { useUserData } from '../hooks/User';

const ActivitiesPage = () => {
	const { data: activities, isLoading, error } = useActivities();
	const {
		data,
		isLoading: isUserLoading,
		error: userDataError,
	} = useUserData();

	return (
		<div className="grid grid-cols-4">
			{isLoading && isUserLoading && data && !userDataError && !error
				? 'Loading...'
				: activities?.map((activity) => (
						<ActivityCard
							id={activity.id}
							description={activity.activity_description}
							title={activity.activity_type}
							//@ts-expect-error userId will be there if there is no user data error or error
							userId={data?.authUser.id}
						/>
				  ))}
		</div>
	);
};

export default ActivitiesPage;
