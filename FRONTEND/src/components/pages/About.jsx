// vista about
//import React from 'react';
//import { Link, useLoaderData } from 'react-router-dom';

export const About = () => {
    return (
        <>

            <h1>Quienes Somos</h1>

            <div className="contenidoAbout">
                <div className="grupo1">
                    <div >
                        <img className="img_About" src="/images/web/about1.jpg" alt="perrito en la entrada" ></img>
                    </div>
                    <div className="textAbout" >
                        <p>Somos una empresa con mas de 10 años de trayectoria, ubicados en la ciudad de Córdoba, Argentina y vendemos a todo el pais.</p>
                    </div>
                </div>
                <div className="grupo2">
                    <div className="textAbout" >
                        <p>Tenemos un amplio stock para pequeños animales y estamos incorporando nuevos productos para mascotas de compañía no convencionales.</p>
                    </div>
                    <div >
                        <img className="img_About" src="/images/web/about2.jpg" alt="productos petshop"></img>
                    </div>
                </div>
                <div className="grupo3">
                    <div >
                        <img className="img_About" src="/images/web/about3.png" alt="perrito atendiendo"></img>
                    </div>
                    <div className="textAbout" >

                        <ul>
                            <li> <b>Misión:</b>

                                En nuestro petshop nos dedicamos a brindar productos y servicios de calidad para el cuidado y bienestar de tus mascotas, con un enfoque en la satisfacción del cliente y el respeto hacia los animales.</li>
                            <li><b>Visión:</b>
                                Nos esforzamos por convertirnos en el petshop líder en nuestra comunidad, siendo reconocidos por nuestra excelencia en productos y servicios, y por nuestra ética y compromiso en el cuidado de los animales.</li>
                            <li><b>Valores:</b>
                                <ol>
                                    <li> Respeto hacia los animales</li>
                                    <li>Compromiso con la comunidad</li>
                                    <li>Honestidad y transparencia</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </>
    );
};