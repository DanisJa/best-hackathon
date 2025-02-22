'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useActivityClaim } from '../hooks/ActivityClaim';
import { useUserData } from '../hooks/User';

interface ActivityCardProps {
	id: string;
	title: string;
	description: string;
	userId: string;
}

export default function ActivityCard({
	id,
	title,
	description,
	userId,
}: ActivityCardProps) {
	const mutate = useActivityClaim(id, userId);
	const { data, isLoading } = useUserData();

	return (
		<Card className="w-[200px] space-x-2">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{description}</CardDescription>
			</CardContent>
			<CardFooter>
				{!isLoading ? (
					<Button
						className="w-full"
						onClick={() => mutate.mutate()}
						disabled={mutate.isPending || data?.publicUser.daily_claimed}
					>
						{mutate.isPending
							? 'CLAIMING...'
							: data?.publicUser.daily_claimed
							? 'CLAIMED.'
							: 'CLAIM'}
					</Button>
				) : (
					'Loading...'
				)}
			</CardFooter>
		</Card>
	);
}
