import { Card } from "../components/ui/card";
import PetCard from "../components/PetCard";
import Devices from "../components/Devices";
import Graph from "../components/ui/graph";

function Home() {
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Card className="flex-grow-2">
          <Graph />
        </Card>
        <Card className="flex-grow">{/* <PetCard /> */}</Card>
      </div>
      <div>
        <Devices />
      </div>
    </div>
  );
}

export default Home;
