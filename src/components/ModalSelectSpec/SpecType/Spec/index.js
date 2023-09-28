import { useState } from "react";

export default function Spec({ spec, onChange, specializationId }) {
  return (
    <div className="spec">
      <input
        type="radio"
        name="spec"
        data-name={spec.name}
        value={spec.id}
        id={spec.id}
        onChange={onChange}
        checked={specializationId === spec.id}
      />
      <label htmlFor={spec.id}>{spec.name}</label>
    </div>
  );
}
