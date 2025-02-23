import { useActivities } from "../hooks/ActivityClaim";
import ActivityCard from "../components/ActivityCard";
import { useUserData } from "../hooks/User";

const ActivitiesPage = () => {
  const { data: activities, isLoading, error } = useActivities();
  const {
    data,
    isLoading: isUserLoading,
    error: userDataError,
  } = useUserData();

  console.log(data);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Choose your daily task!</h2>
      <div className="grid grid-cols-4">
        {isLoading && isUserLoading && data && !userDataError && !error
          ? "Loading..."
          : activities?.map((activity) => (
              <ActivityCard
                id={activity.id}
                description={activity.activity_description}
                title={activity.activity_type}
                xp_earned={activity.xp_earned}
                points_earned={activity.points_earned}
                //@ts-expect-error userId will be there if there is no user data error or error
                userId={data?.authUser.id}
              />
            ))}
      </div>
    </>
  );
};

export default ActivitiesPage;
