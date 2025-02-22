import React from "react";
import Container from "../components/container";
import Sidebar from "../components/ui/sidebar";
import HighlightedButton from "../components/ui/highlightedButton";
import Graph from "../components/ui/graph";
import { Card } from "../components/ui/card";

function Home() {
  return (
    <div className="flex gap-4">
      <Card>
        <Graph />
      </Card>
      <Card>1</Card>
    </div>
  );
}

export default Home;
