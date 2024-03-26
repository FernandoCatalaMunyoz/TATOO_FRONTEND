import "./Card.css";

export const Card = ({ serviceName, description }) => {
  return (
    <div className="cardDesign">
      <div>{serviceName}</div>
      <div>{description}</div>
    </div>
  );
};
