export default function WorkingHistory({ item, remove }) {
  const startDate = new Date(item.start_date)
    .toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");

  const endDate = new Date(item.end_date)
    .toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    })
    .replace(" г.", "");

  return (
    <div className="experience-item" key={item.company_name}>
      <div className="experience-item__header">
        <p>
          {startDate} - {endDate}
        </p>
        <h4>{item.company_name}</h4>
        <h5>{item.position}</h5>
      </div>

      <span onClick={() => remove(item)} className="experience-item__remove">
        Удалить
      </span>
    </div>
  );
}
