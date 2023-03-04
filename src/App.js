import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { pipeline } from "@xenova/transformers";

// [{label: 'POSITIVE', score: 0.9998176857266375}]

// env.wasm.wasmPaths = "http://localhost:3000/wasm/";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    (async () => {
      const pipe = await pipeline("sentiment-analysis");
      setClassifier(() => pipe);
    })();
  }, []);

  useEffect(() => {
    classifyText();
  }, [input]);

  const classifyText = async () => {
    if (classifier && input) {
      const result = await classifier(input);
      setOutput(result);
    }
  };

  return (
    <div className="App">
      {classifier ? (
        <div>
          <p>Input</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <p>Output</p>
          <div>{JSON.stringify(output)}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
