import React from "react";
import AnimatedNumber from "animated-number-react";

const Card = ({
  className="card text-center border-primary mb-3",
  header="Header",
  cardTitle,
  desc="Description"
}) => {

  const formatValue = (value) => value.toFixed(0);
  return (
    <div class={className} style={{ "max-width": "18rem" }} >
      <div class="card-header">{header}</div>
      <div class="card-body">
      <AnimatedNumber
          value={cardTitle}
          formatValue={formatValue}
        />
        <p class="card-text">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
