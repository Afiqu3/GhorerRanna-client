import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div
      className="p-8 bg-white space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-md text-left group hover:bg-secondary"
    >
      <figure className="text-secondary text-5xl group-hover:text-white">
        {service.icon}
      </figure>
      <h3 className="text-primary text-xl font-semibold group-hover:text-white">
        {service.name}
      </h3>
      <p className="text-black/50 group-hover:text-white">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;
