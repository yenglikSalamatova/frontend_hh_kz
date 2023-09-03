export default function SelectDate({ label, size }) {
  const onChangeDay = (e) => {
    console.log(e.target.value);
  };

  const onChangeMonth = (e) => {
    console.log(e.target.value);
  };

  const onChangeYear = (e) => {
    console.log(e.target.value);
  };

  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <div className="selectdate">
        <input
          className="input"
          type="number"
          onChange={onChangeDay}
          placeholder="День"
        />
        <select onChange={onChangeMonth} className="input select">
          <option value="1">января</option>
          <option value="2">февраля</option>
          <option value="3">марта</option>
          <option value="4">апреля</option>
          <option value="5">мая</option>
          <option value="6">июня</option>
          <option value="7">июля</option>
          <option value="8">августа</option>
          <option value="9">сентября</option>
          <option value="10">октября</option>
          <option value="11">ноября</option>
          <option value="12">декабря</option>
        </select>
        <input
          placeholder="Год"
          className="input"
          type="number"
          onChange={onChangeYear}
        />
      </div>
    </fieldset>
  );
}
