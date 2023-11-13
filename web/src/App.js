// Vendor imports
import React from "react";

// imports
import Computer from "./components/Computer/Computer";
import logo from "./logo.svg";
import { TabProvider } from "./stores/Tab/TabProvider.tsx";

// style imports
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TabProvider>
          <Computer />
        </TabProvider>
      </header>
    </div>
  );
}

export default App;
