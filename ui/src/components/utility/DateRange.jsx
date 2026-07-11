import { formatDateRange } from "./formatDateRange";

const DateRange = ({startYear, endYear, id}) => {
  if (!startYear) {
    return <p id={id} className="sub-content"></p>;
  }

  return (
    <p id={id} className="sub-content">
      {formatDateRange(startYear, endYear)}
    </p>
  );
};

export default DateRange;
