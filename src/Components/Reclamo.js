import { React, useEffect, useState } from "react";
import { Navbar } from "./NavBar";
import { GetReclamo } from "../Services/ReclamosService";

const Reclamo = () => {
  const initialReclamo = [
    {
      reclamo_id: 0,
      titulo: "",
      userid: 0,
      descripcion: "a",
      estadoReclamo: "",
      tipoReclamo: "a",
      actualizacion: "",
      edificioid: 0,
      imagenes: [],
    },
  ];

  const [imageSrc, setImageSrc] = useState("");

  const [reclamo, setReclamo] = useState(initialReclamo[0]);

  const handlerReclamo = async () => {
    const fetchReclamo = async () => {
      let reclamoDB = await GetReclamo();
      return reclamoDB[0];
    };
    fetchReclamo()
      .then((res) => setReclamo(res.imagenes[0]))
      .then((res) => {
        console.log(reclamo);
        setImageSrc("data:image/jpeg;base64," + reclamo.datosImagen);
      });
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setReclamo({
      ...reclamo,
      [name]: value,
    });
  };

  useEffect(() => {}, [reclamo]);

  return (
    <div className="container">
      <Navbar />
      <h1>Prueba Imagen</h1>
      <input type="text" onChange={onInputChange} name="reclamo_id" />
      <div>
        <button className="btn btn-primary my-2" onClick={handlerReclamo}>
          Obtener reclamo
        </button>
      </div>
      <div>
        <p>{reclamo.reclamo_id}</p>
        <p>{reclamo.tipoReclamo}</p>
        <p>{reclamo.descripcion}</p>
        <img src={imageSrc} alt="Reclamo" />;
      </div>
    </div>
  );
};

export default Reclamo;
