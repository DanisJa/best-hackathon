import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Power, Snowflake, Lightbulb, Droplet, Zap, Clock } from "lucide-react";

export default function EcoDashboard() {
  return (
    <div className="min-h-screen bg-[#333] rounded-3xl p-6 text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-emerald-400">Eco Proposal</h1>
          <p className="text-zinc-400">Personalised AI Score: 75/100</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">AI Insights</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-100">Title</TableHead>
                <TableHead className="text-zinc-100">Description</TableHead>
                <TableHead className="text-zinc-100">Recommendation</TableHead>
                <TableHead className="text-zinc-100">Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-700">
                <TableCell className="flex items-center gap-2">
                  <Power className="h-4 w-4 text-emerald-400" />
                  Reduce Standby Power
                </TableCell>
                <TableCell className="text-zinc-400">
                  Devices like TVs and gaming consoles consume energy even when
                  off.
                </TableCell>
                <TableCell>
                  Enable "Deep Sleep Mode" on unused devices after 10 PM.
                </TableCell>
                <TableCell>Save ~5% on monthly energy.</TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell className="flex items-center gap-2">
                  <Snowflake className="h-4 w-4 text-emerald-400" />
                  Optimize A/C Usage
                </TableCell>
                <TableCell className="text-zinc-400">
                  The A/C is running when the room is empty.
                </TableCell>
                <TableCell>
                  Set A/C to Eco Mode and schedule it to turn off when no
                  movement is detected for 30 min.
                </TableCell>
                <TableCell>Reduce cooling costs by ~15%.</TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-emerald-400" />
                  Adjust Lighting Schedule
                </TableCell>
                <TableCell className="text-zinc-400">
                  Lights are staying on past bedtime.
                </TableCell>
                <TableCell>
                  Set lights to turn off automatically at 11 PM in unoccupied
                  rooms.
                </TableCell>
                <TableCell>Reduce lighting costs by ~8%.</TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-emerald-400" />
                  Limit Water Heater Usage
                </TableCell>
                <TableCell className="text-zinc-400">
                  The water heater is running 24/7.
                </TableCell>
                <TableCell>
                  Adjust water heater schedule to heat water only from 5 AM - 8
                  AM and 5 PM - 9 PM.
                </TableCell>
                <TableCell>Save ~20% on water heating.</TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  Peak Hour Reduction
                </TableCell>
                <TableCell className="text-zinc-400">
                  Heavy appliances are running during peak pricing hours (6-9
                  PM).
                </TableCell>
                <TableCell>
                  Move dishwasher and laundry usage to after 9 PM.
                </TableCell>
                <TableCell>Lower electricity bill by ~10%.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Smart Scheduling</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-100">Time Slot</TableHead>
                <TableHead className="text-zinc-100">Appliance</TableHead>
                <TableHead className="text-zinc-100">Original Time</TableHead>
                <TableHead className="text-zinc-100">Optimised time</TableHead>
                <TableHead className="text-zinc-100">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-700">
                <TableCell>6:30 AM</TableCell>
                <TableCell>Water Heater</TableCell>
                <TableCell>24/7</TableCell>
                <TableCell>5 AM - 8 AM</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />4 hrs off
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell>7:00 AM</TableCell>
                <TableCell>Coffee Maker</TableCell>
                <TableCell>6:00 AM</TableCell>
                <TableCell>7:30 AM</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />1 hr later
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell>8:00 AM</TableCell>
                <TableCell>Washing Machine</TableCell>
                <TableCell>6:30 PM</TableCell>
                <TableCell>9:30 PM</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  Off-peak time
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell>10:00 PM</TableCell>
                <TableCell>Living Room Lights</TableCell>
                <TableCell>Always on</TableCell>
                <TableCell>Auto-off at 10PM</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  Reduce idle time
                </TableCell>
              </TableRow>
              <TableRow className="border-zinc-700">
                <TableCell>11:00 PM</TableCell>
                <TableCell>A/C</TableCell>
                <TableCell>Always on</TableCell>
                <TableCell>Auto-off if no movement</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  Reduce overnight use
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
