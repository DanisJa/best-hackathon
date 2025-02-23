# GreenPals
https://greenpals.netlify.app

> NOTE: Registration flow is working, but since we didn't have enough time to implement adding devices through the QR code, please use danisjusic@icloud.com:Test123! credentials to view live energy usage, other features are available with new accounts.

## Overview
GreenPals is an application that helps users manage and track his device energy usage, as well as encourage eco-friendly behaviour. To do this, we designed the system software in 2 parts:

- The **core** part
- The **gamification** part

We used React as the frontend and supabase as the backend. Authentication is implemented by creating a row in `auth.users` table and having a trigger `on_auth_user_insert` that runs the database function `handle_new_user()`, which inserts a row into the `public.users` table, so we can have a public presentable user object, without having to expose the `auth` schema.

Our key dependencies/plugins for frontend are: `react-router`, `react-query`, `tailwind` and `shadcn/ui`.

The public schema is below: 
<img  width="906" alt="Screenshot 2025-02-23 at 00 25 30" src="https://github.com/user-attachments/assets/bbc9e7a6-ce21-4600-9c35-6b7b9b0b1ed4" />
(might not be the latest schema, but the tables are unchanged and only some missing arguments for various feature implementations were added, such as `daily_claimed` columns on the `public.users` table, for daily claim validation)

### Core part
We used cron-jobs and serverless functions for lightweight, but automated data flow through the system. The energy is being simulated by assigning `update_energy_usage_job` to run every 30 seconds, and run the `energy_usage` function. The function grabs the data from the simulated device (in our implementation, it is generating a random, but realistic kWh value), and inserts it into the `public.energy_logs` table. The energy logs table enables the user to track his energy usage in graph form, in realtime. The user also has device components on his dashboard, which allows him to turn them on and off. The user can also set a daily limit to the device, having it turn off once the limit is reached. The physical device though, in our planned implementation, would be connected to the WiFi, allowing it to communicate with the server and send the data in realtime, for further processing and analysis.

### Gamification part

The gamification part is a superset of the core functionalities, which will enable the user to do various activities, missions, compete with others, to earn points, which can be used to buy eco-friendly products, or even a discount for the devices we sell.

The user gains points on a daily basis, which can be influenced with a multiplier of either `0.75x`, `1.00x`, `1.25x`, depending if your pet/pal is happy, content or sad. This is calculated based on the average energy usage of all users in the last 24 hours. The multipliers are as follows:
```
> AVERAGE USAGE OF ALL USERS (LAST 24H) = 0.75x multiplier
= AVERAGE USAGE OF ALL USERS (LAST 24H) = 1.00x multiplier
< AVERAGE USAGE OF ALL USERS (LAST 24H) = 1.25x multiplier
```

This has been implemented by running the `daily_points` edge function, which is being run by a cron-job `daily_points_job`.

Other ways the user can make points is either by participating in daily `eco_pet_activities` (will be referred to as just activities), or weekly/monthly `eco_pet_missions` (will be referred to as just missions). The user can select one of the few activities posted by an admin through the supabase dashboard, such as recycling 5 water bottles and taking a picture of the reciept. After he completes the activity, he is allowed to claim points and experience. Missions are public events, such as cleaning the neighborhood, and scanning the QR code that the organisers would have there, would also give you points in the app.

With these features, we hope to affect the wider audiences, with somewhat of a ripple effect, having small habit and routine changes, which would have a big impact on the long-term ecology awareness.

We implemented these features with the following list of cron-jobs, running serverless functions:

| **EVENT/CRON-JOB**            | **DB/SERVERLESS FUNCTION** | **DESCRIPTION**                                                                 |
|-------------------------------|----------------------------|---------------------------------------------------------------------------------|
| daily_points_job              | daily_points               | Calculates multipliers and gives users points every day at 00:00.               |
| deactivate_old_activities_job | deactivate_old_activities  | If the activity is older than 24h, it is disabled.                             |
| user action                   | complete_activity          | Completes the daily activity for the user; they receive points.                |
| restart_dailies_job           | restart_dailies            | Allows the users to re-do dailies every day at 00:00.                          |

We also implemented a trigger and a function to help the database update the level and restart xp accordingly, as well as add the remaining xp to the next level. This is implemented with `update_eco_pet_level` database function.

## Project Directory Overview
`/src`: pages, components, mostly regarding frontend

`/supabase`: serverless functions dir, sometimes left out in `.gitignore`, but I kept it here in case of code review, same as `.env`.

# Installation guide

## Prerequisites

Node.js (latest)
npm/yarn/pnpm

## Getting started

```
git clone git@github.com:DanisJa/best-hackathon.git
cd best-hackathon
```

## Install dependencies

npm:
`npm install`

yarn:
`yarn install`

pnpm:
`pnpm install`

## Run dev server:

npm:
`npm run dev`

yarn:
`yarn dev`

pnpm:
`pnpm dev`

## Build for prod

npm:
`npm run build`

yarn:
`yarn build`

pnpm:
`pnpm build`

## Preview prod build

npm:
`npm run preview`

yarn:
`yarn preview`

pnpm:
`pnpm preview`

## ENV variables (we know it is a security issue, but we trust the judges and it's a free tier :D)

`VITE_SUPABASE_SERVICE_KEY: https://ifzewqgrvqgiuvmceiwy.supabase.co`

`VITE_SUPABASE_URL: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmemV3cWdydnFnaXV2bWNlaXd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDE2NTQyMCwiZXhwIjoyMDU1NzQxNDIwfQ.839jT2qrhz3uIqgEyFgzKS24lxuBFtVqFHerBspRdAY`
