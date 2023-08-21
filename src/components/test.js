"use client";

import { useState } from "react";

export default function Test() {
  const [counter, setCounter] = useState(10);
  console.log("component rerender");
  function plusFunc() {
    console.log("Plus");
    setCounter(counter + 1);
  }
  function minusFunc() {
    console.log("Minus");
    setCounter(counter - 1);
  }
  return (
    <>
      <Header />
    </>
  );
}
