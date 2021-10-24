import { useState, useEffect } from 'react';
import { CitiesList } from '../components/CitiesList';
import { MonthsList } from '../components/MonthsList';
import { EventsList } from '../components/EventsList';

const Main = () => {
  const dataFromStorage = JSON.parse(localStorage.getItem('favs'));

  const [events, setEvents] = useState([]);
  const [favs, setFav] = useState(dataFromStorage || {});

  const normalizeDate = (date) => {
    const [day, month, year] = date.split('.');
    return [year, month, day];
  };

  const changeFav = (id) => {
    let temp = { ...favs };
    if (favs[id] === true) {
      temp[id] = false;
    } else {
      temp[id] = true;
    }
    setFav(temp);
    localStorage.setItem('favs', JSON.stringify(temp));
  };

  const months = events
    .map((event) => {
      const normalizedDate = normalizeDate(event.date);
      return new Date(...normalizedDate);
    })
    .map((date) => date.getMonth());

  const eventsWithMonths = events.map((event, i) => ({
    ...event,
    month: months[i],
  }));

  const uniqueMonths = [...new Set(months)].sort((a, b) => a - b);

  const citiesList = events.map((event) => event.city);
  const uniqueCities = [...new Set(citiesList)].sort();

  const filterRequest = (request, type) => {
    let filteredEvents = [];
    if (type === 'month' && request !== '') {
      filteredEvents = eventsWithMonths.filter(
        (event) => event.month === +request
      );
      setEvents(filteredEvents);
    }
    if (type === 'city' && request !== '') {
      filteredEvents = eventsWithMonths.filter(
        (event) => event.city === request
      );
      setEvents(filteredEvents);
    }
  };

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Event Listing</h1>
      <form className="selectors">
        <label className="city-selector">
          City:
          <CitiesList cities={uniqueCities} filterRequest={filterRequest} />
        </label>
        <label className="month-selector">
          Month:
          <MonthsList months={uniqueMonths} filterRequest={filterRequest} />
        </label>
      </form>
      <div className="events-grid">
        <EventsList
          events={eventsWithMonths}
          changeFav={changeFav}
          favs={favs}
        />
      </div>
    </div>
  );
};

export { Main };
