import { useEffect, useState } from "react";

function Timer() {
  const [sec, setSec] = useState(0);

  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  useEffect(() => {
    const id = setInterval(() => setSec((sec) => sec + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : minutes} :{" "}
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
