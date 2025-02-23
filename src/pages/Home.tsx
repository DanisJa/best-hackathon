import { Card } from "../components/ui/card";
import PetCard from "../components/PetCard";
import Devices from "../components/Devices";
import Graph from "../components/ui/graph";
import Lights from "../components/Lights";

function Home() {
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Card className="flex-grow-2">
          <Graph />
        </Card>
        <Card className="flex-grow">{<PetCard />}</Card>
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          <Lights />
        </div>
        <div className="flex-grow items-end">
          <Devices />
        </div>
      </div>
    </div>
  );
}

export default Home;
