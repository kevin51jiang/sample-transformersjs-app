import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { pipeline, env } from "@xenova/transformers";

// [{label: 'POSITIVE', score: 0.9998176857266375}]

env.wasm.wasmPaths = "http://localhost:3000/wasm/";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    (async () => {
      const hf_url =
        "https://huggingface.co/Xenova/transformers.js/resolve/main/quantized";
      const model_id = "distilbert-base-uncased-finetuned-sst-2-english";
      const task = "sequence-classification";

      const model_url = `${hf_url}/${model_id}/${task}`;
      const pipe = await pipeline("sentiment-analysis", model_url);
      setClassifier(() => pipe);
    })();
  }, []);

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

          <br />
          <button onClick={classifyText}>Classify</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
