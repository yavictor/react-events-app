import { Fav } from './Fav';

function Event(props) {
  const {
    id,
    name,
    date,
    image,
    changeFav = Function.prototype,
    fav = false,
    favs = {},
  } = props;

  const day = date.split('.')[0];
  return (
    <div
      id={id}
      className="event-card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="top-container">
        <div className="date-box">{day}</div>
        <Fav id={id} changeFav={changeFav} fav={fav} favs={favs} />
      </div>
      <div className="event-name">{name}</div>
    </div>
  );
}

export { Event };
