import { useState } from 'react';

function MonthsList(props) {
  const { months = [], filterRequest = Function.prototype } = props;

  const [monthFilter, setFilter] = useState('');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <select
      className="input-selector"
      value={monthFilter}
      onChange={(e) => {
        setFilter(e.target.value);
        filterRequest(e.target.value, 'month');
      }}
    >
      {' '}
      <option value="">-</option>
      {months.map((month) => (
        <option key={month} value={month}>
          {monthNames[month - 1]}
        </option>
      ))}
    </select>
  );
}

export { MonthsList };
