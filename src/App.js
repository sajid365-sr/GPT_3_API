/** @format */

import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ prompt: prompt });

    fetch("http://localhost:5000/gpt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.result.split("\n\n")[1]);
      });
  };

  return (
    <section className="w-[100vw] h-[100vh] grid place-items-center">
      <div className="w-[40vw]">
        <h1 className="text-4xl underline text-center mb-10 underline-offset-2">
          GPT 3 API
        </h1>
        <h2 className="mb-8 text-xl text-primary">{result}</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} action="">
          <input
            name="animal"
            placeholder="Enter an animal"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            className="input input-bordered"
          />
          <input type="submit" className="btn btn-md" />
        </form>
      </div>
    </section>
  );
}

export default App;
