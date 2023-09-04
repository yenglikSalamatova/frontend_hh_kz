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
          <option value="" disabled hidden>
            Месяц
          </option>
          <option value="0">января</option>
          <option value="1">февраля</option>
          <option value="2">марта</option>
          <option value="3">апреля</option>
          <option value="4">мая</option>
          <option value="5">июня</option>
          <option value="6">июля</option>
          <option value="7">августа</option>
          <option value="8">сентября</option>
          <option value="9">октября</option>
          <option value="10">ноября</option>
          <option value="11">декабря</option>
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
