/**
 * GridSplitView Component:
 * - Renders a main splitted into 2, one side contains the interactive image and the other side takes children (Home Page / Sign Up \ Login)
 *
 * Props:
 * - children : React node
 * -
 */

import React from "react";
import COLORS from "../../constants/Colors";
import InteractiveImage from "./InteractiveImage";

// Props
interface GridSplitViewProps {
  children: React.ReactNode;
}

const GridSplitView: React.FC<GridSplitViewProps> = ({ children }) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2">
      {/* Others components */}
      <section className="flex flex-col items-center justify-center w-full min-h-svh">
        {children}
      </section>

      {/* Interactive Image */}
      <section
        className="w-full min-h-svh"
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
      >
        <InteractiveImage />
      </section>
    </main>
  );
};

export default GridSplitView;
