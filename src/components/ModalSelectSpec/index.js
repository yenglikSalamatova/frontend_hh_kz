import { useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import SpecType from "./SpecType";

export default function ModalSelectSpec({
  onToggle,
  onChange,
  specializationId,
}) {
  const [search, setSearch] = useState("");
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const specializationTypes = useSelector(
    (state) => state.vacancy.specializations
  );

  useEffect(() => {
    if (search) {
      const filteredSpecializations = specializationTypes.filter((specType) => {
        for (let i = 0; i < specType.specializations.length; i++) {
          if (
            specType.specializations[i].name
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setFilteredSpecializations(filteredSpecializations);
    } else {
      setFilteredSpecializations(specializationTypes);
    }
  }, [search]);

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onToggle}></div>
      <div className="modal-inner">
        <h3>Кого вы хотите найти?</h3>
        <input
          type="search"
          placeholder="Поиск"
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredSpecializations &&
          filteredSpecializations.map((specType) => (
            <SpecType
              key={specType.id}
              specType={specType}
              onChange={onChange}
              specializationId={specializationId}
            />
          ))}
      </div>
    </div>
  );
}
