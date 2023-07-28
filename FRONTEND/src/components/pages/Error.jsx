//vista del error
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export const Error = ({ errorNumber, subtitle }) => {
  return (
    <div className="body_Error">

    <div className="contenido_Error">
      <div className="img_Error">
        <img src="/images/perrito_Hueso.jpg" alt="imagen Error 404" />
      </div>
      <div className="texto_Error">
        <h2 className="title_Error">{errorNumber} ERROR</h2>
        <h6 className="subtitle_Error">{subtitle}</h6>
        <a href="/" className="btn_Error">Volver al inicio</a>
      </div>
    </div>
    </div>
  );
};