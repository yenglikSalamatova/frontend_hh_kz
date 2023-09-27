import { useEffect, useState } from "react";
import Spec from "./Spec";

export default function SpecType({ specType, onChange, specializationId }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (specType.specializations.find((spec) => spec.id === specializationId)) {
      setActive(true);
    }
  }, [specializationId]);

  return (
    <>
      {" "}
      <div
        className={active ? "specType active" : "specType"}
        onClick={() => setActive(!active)}
      >
        <img
          width="15"
          height="15"
          src="https://img.icons8.com/ios-glyphs/30/forward.png"
          alt="forward"
        />
        <p>{specType.name}</p>
      </div>
      {active &&
        specType.specializations.map((spec) => (
          <Spec
            key={spec.id}
            spec={spec}
            onChange={onChange}
            specializationId={specializationId}
          />
        ))}
    </>
  );
}
