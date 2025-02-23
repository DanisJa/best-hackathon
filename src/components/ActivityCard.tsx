"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useActivityClaim } from "../hooks/ActivityClaim";
import { useUserData } from "../hooks/User";
import { Badge } from "../components/ui/badge";

interface ActivityCardProps {
  id: string;
  title: string;
  description: string;
  userId: string;
  xp_earned: number;
  points_earned: number;
}

export default function ActivityCard({
  id,
  title,
  description,
  userId,
  xp_earned,
  points_earned,
}: ActivityCardProps) {
  const mutate = useActivityClaim(id, userId);
  const { data, isLoading } = useUserData();

  return (
    <Card className="w-[250px] hover:border-green-500!">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex space-x-2">
          <Badge variant="secondary">XP: {xp_earned}</Badge>
          <Badge variant="secondary">Points: {points_earned}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        {!isLoading ? (
          <Button
            className="w-full hover:border-green-500! hover:cursor-pointer!"
            onClick={() => mutate.mutate()}
            disabled={mutate.isPending || data?.publicUser.daily_claimed}
            variant="defaultLinear"
          >
            {mutate.isPending
              ? "CLAIMING..."
              : data?.publicUser.daily_claimed
              ? "CLAIMED"
              : "CLAIM"}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Loading...
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
