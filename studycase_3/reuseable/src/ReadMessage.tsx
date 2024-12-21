import { Button } from "antd/es/radio";

import { useState } from "react";
import { useReadContract } from "./webtri/hooks/useReadContract";
import { useWriteContract } from "./webtri/hooks/useWriteContract";

const ReadMessage: React.FC = () => {
  const [message, setMessage] = useState("");
  const { data: latestMessage, error } = useReadContract("getLatestMessage","MessagePosted");
  const { triggerSend, loading } = useWriteContract("postMessage", message);
  return (
    <div>
      <h2>Latest Message</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={triggerSend}>{loading ? "loading" : "Post Message"}</Button>
      {error ? <p>{error}</p> : latestMessage ? (
        <>
          <p>Message: {latestMessage[0]}</p>
          <p>Sender: {latestMessage[1]}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      
    </div>
  );
};


export default ReadMessage;
