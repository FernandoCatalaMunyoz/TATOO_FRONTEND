import { useEffect, useState } from "react";
import "./Studio_services.css";
import { getServices } from "../../services/apiCalls";
import { Card } from "../../common/Card/Card";
import { Header } from "../../common/Header/Header";

export const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (services.length === 0) {
      const bringData = async () => {
        const fetched = await getServices();
        setServices(fetched);
      };
      bringData();
    }
  }, [services]);

  return (
    <>
      <Header></Header>
      <div className="serviceDesign">
        {services.length > 0 ? (
          <div className="cardDesign">
            {services.map((service) => {
              return (
                <Card
                  key={service.id}
                  serviceName={service.servicesName}
                  description={service.description}
                ></Card>
              );
            })}
          </div>
        ) : (
          <div>Los servicios estan cargandose</div>
        )}
      </div>
    </>
  );
};
