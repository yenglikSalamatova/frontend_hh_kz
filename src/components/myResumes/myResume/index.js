export default function MyResume({ item }) {
  return (
    <div className="card mtb4">
      <a className="a-h3">{item.position}</a>
      <p>Создан {item.createdAt}</p>
      <h4 className="mtb2">Статистика за все время</h4>
      <div className="flex">
        <a className="p3">{item.stats.shows} показов</a>
        <a className="p3">{item.stats.views} просмотров</a>
        <a className="p3">{item.stats.applies} приглашений</a>
      </div>
    </div>
  );
}
