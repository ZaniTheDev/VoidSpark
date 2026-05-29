"use client";
import next from "next";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  console.log(`this is the value of count ${count}`);

  function changeFunction(amount) {
    const add = count + amount;
    return add;
  }

  return (
    <>
      <h1 onClick={() => setCount(changeFunction(5))}>
        hello world, this is counter {count}
      </h1>

      <h1
        onClick={() => {
          const nextValue = changeFunction(-7);
          console.log(nextValue);
          if (nextValue > 0) {
            setCount(nextValue);
          } else {
            setCount(0);
          }
        }}
      >
        click this to decrease
      </h1>
      <h1 onClick={() => setCount(0)}>click this to delete all</h1>
    </>
  );
}
