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
	const mutate = useActivityClaim(userId, id);

	return (
		<Card className="w-[300px]">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{description}</CardDescription>
			</CardContent>
			<CardFooter>
				<Button
					className="w-full"
					onClick={() => mutate.mutate()}
					disabled={mutate.isPending}
				>
					{mutate.isPending ? 'CLAIMING...' : 'CLAIM'}
				</Button>
			</CardFooter>
		</Card>
	);
}
