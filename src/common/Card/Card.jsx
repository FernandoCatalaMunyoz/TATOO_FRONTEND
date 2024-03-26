import "./Card.css";

export const Card = ({ serviceName, description }) => {
  return (
    <div className="cardDesign">
      <div className="titleDesign">{serviceName}</div>
      <div className="descriptionDesign">{description}</div>
    </div>
  );
};
