import React, { useState } from "react";
import "./styles.css";

function App() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!goal || !deadline) {
      setMessage("Please enter both goal and deadline.");
      return;
    }

    const payload = {
      goal: goal,
      deadline: deadline,
    };

    try {
      const response = await fetch("https://curoai.free.beeceptor.com/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Goal successfully submitted!");
        setGoal("");
        setDeadline("");
      } else {
        setMessage("Failed to submit goal.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Submit Your Goal</h2>
      <label>Goal Description:</label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Describe your goal..."
        rows="5"
      />

      <label>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={handleSubmit}>Create My Plan</button>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;

// export default function Square() {
//   return <button className="square">X</button>;
// }
