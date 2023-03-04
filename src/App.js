import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { pipeline } from "@xenova/transformers";

// [{label: 'POSITIVE', score: 0.9998176857266375}]

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    (async () => {
      const pipe = await pipeline("sentiment-analysis");
      setClassifier(pipe);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (classifier) {
        const result = await classifier(input);
        setOutput(result);
      }
    })();
  }, [input]);

  return (
    <div className="App">
      {classifier ? (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>{output}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
