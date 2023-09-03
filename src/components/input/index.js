export default function Input({ label, type, id, value, onChange, size }) {
  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <input
        className="input"
        type={type}
        id={id}
        onChange={onChange}
        value={value}
      />
    </fieldset>
  );
}
