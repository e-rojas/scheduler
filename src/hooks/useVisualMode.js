import { useState } from 'react';



export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(valueToNext, skip) {
        if (!skip) {
          setHistory(prev => [...prev, mode]);
        }
        setMode(valueToNext);
      }
    
      function back() {
        if (history.length >= 1) {
          setMode(history[history.length - 1]);
          setHistory(prev => [...prev.slice(0, -1)]);
        }
      }
  
    return { mode, transition, back };
  };