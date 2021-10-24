import { useState } from 'react';

function CitiesList(props) {
  const { cities = [], filterRequest = Function.prototype } = props;
  const [citiesFilter, setFilter] = useState('');

  return (
    <select
      className="input-selector"
      value={citiesFilter}
      onChange={(e) => {
        setFilter(e.target.value);
        filterRequest(e.target.value, 'city');
      }}
    >
      <option value="">-</option>
      {cities.map((city, i) => (
        <option key={i} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

export { CitiesList };
