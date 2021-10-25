import { Event } from './Event';

function EventsList(props) {
  const { events = [], changeFav = Function.prototype, favs = {} } = props;

  if (!events.length) {
    return (<h3>Sorry no events loaded</h3>);
  }
  return (
    <div className="events">
      {events.map((event) => (
        <Event key={event.id} {...event} changeFav={changeFav} favs={favs} />
      ))}
    </div>
  );
}

export { EventsList };
