/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useContract } from "./useContract";

export const useReadContract = (
  methodName: string,
  eventName?: string | null,
  ...params: unknown[]
) => {
  const contract = useContract();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contract) return;
    const fetchData = async () => {
      try {
        const response = await contract.methods[methodName](...params).call();
        setData(response);
      } catch (err) {
        console.error(`Error calling ${methodName}:`, err);
        setError(`Error calling ${methodName}: ${err}`);
      }
      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    if (!contract) return;
    // If eventName is provided, listen for the event and refetch when it's triggered
    if (eventName && contract.events[eventName]) {
      const eventListener = contract.events[eventName]();

      eventListener.on("data", (event: any) => {
        console.log("Event data:", event);
        setData(event.returnValues);
      });

      // Clean up event listener on unmount
      return () => {
        if (eventListener) {
          eventListener.unsubscribe();
        }
      };
    }
  }, [contract, methodName, eventName]);

  return { data, loading, error };
};
