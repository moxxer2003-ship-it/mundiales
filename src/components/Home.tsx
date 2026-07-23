import "./../styles/home.css";
import { mundiales } from "../data/mundiales";
import { records } from "../data/records";
import { useEffect, useState } from "react";
import MundialCard from "./MundialCard";

const formatKey = (key: string) => {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
};

function Home() {
    const [mundialSeleccionado, setMundialSeleccionado] = useState<any>(null);

    useEffect(() => {
        if (mundialSeleccionado) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mundialSeleccionado]);

    return (
        <div className="home">
            {/* Luces decorativas de fondo */}
            <div className="bg-glow glow-1"></div>
            <div className="bg-glow glow-2"></div>

            {/* SECCIÓN HERO */}
            <header className="hero-section">
                <div className="badge-hero">
                    <span className="dot"></span> ARCHIVO HISTÓRICO OFICIAL
                </div>
                <h1 className="titulo">
                    LA GRAN HISTORIA DE LOS <span className="gold-text">MUNDIALES</span>
                </h1>

                <p className="descripcion">
                    Explora el legado supremo del fútbol global. Descubre las leyendas, récords imbatibles y los momentos memorables que definieron cada Copa del Mundo.
                </p>

                <div className="hero-copas-container">
                    <div className="copa-card izquierda">
                        <div className="copa-wrapper">
                            <img
                                src="/assets/jules-rimet.png"
                                className="copa"
                                alt="Copa Jules Rimet"
                            />
                        </div>
                        <span className="copa-label">Trofeo Jules Rimet (1930 - 1970)</span>
                    </div>

                    <div className="copa-card derecha">
                        <div className="copa-wrapper">
                            <img
                                src="/assets/copa-del-mundo.png"
                                className="copa"
                                alt="Copa FIFA"
                            />
                        </div>
                        <span className="copa-label">Copa Mundial de la FIFA (1974 - Presente)</span>
                    </div>
                </div>
            </header>

            {/* SECCIÓN MUNDIALES */}
            <section className="seccion-mundiales">
                <div className="section-header">
                    <h2>Ediciones Históricas</h2>
                    <p>Selecciona una edición para ver estadísticas detalladas, plantilla y contexto histórico.</p>
                </div>

                <div className="listaMundiales">
                    {mundiales.map((mundial) => (
                        <div
                            key={mundial.year}
                            className="card-mundial"
                            onClick={() => setMundialSeleccionado(mundial)}
                        >
                            <div className="card-img-container">
                                <img
                                    src={mundial.imagenAnfitrion}
                                    alt={mundial.anfitrion}
                                />
                                <span className="year-badge">{mundial.year}</span>
                            </div>
                            <div className="card-info">
                                <h3>{mundial.anfitrion}</h3>
                                <span className="ver-mas-link">Explorar edición &rarr;</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECCIÓN RÉCORDS */}
            <section className="seccion-records">
                <div className="section-header">
                    <span className="sub-badge">HITOS E IMPRESIONANTES MARCAS</span>
                    <h2 className="titulo-records">RÉCORDS HISTÓRICOS</h2>
                </div>

                <div className="grid-records">
                    {Object.entries(records).map(([key, value]) => (
                        <div className="card-record" key={key}>
                            <div className="icon-badge">🏆</div>
                            <div className="record-content">
                                <h3>{formatKey(key)}</h3>
                                <p>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {mundialSeleccionado && (
                <MundialCard
                    mundial={mundialSeleccionado}
                    onClose={() => setMundialSeleccionado(null)}
                />
            )}
        </div>
    );
}

export default Home;