import "./../styles/mundialCard.css";

interface MundialCardProps {
    mundial: any;
    onClose: () => void;
}

function MundialCard({ mundial, onClose }: MundialCardProps) {
    if (!mundial) return null;

    const fasesEliminatorias = [
        { key: "dieciseisavos", titulo: "Dieciseisavos de Final" },
        { key: "octavos", titulo: "Octavos de Final" },
        { key: "cuartos", titulo: "Cuartos de Final" },
        { key: "semifinales", titulo: "Semifinales" },
    ];

    // Función para extraer los goleadores según el país
    const obtenerGoleadoresPorPais = (stringGoles: string, pais: string): string[] => {
        if (!stringGoles) return [];

        // Normalizamos separando por punto y coma (;)
        const bloquesPais = stringGoles.split(';');

        for (const bloque of bloquesPais) {
            const [nombrePais, listaJugadores] = bloque.split(':');

            if (nombrePais && listaJugadores) {
                // Comprobamos si el nombre del país coincide (ignorando espacios/mayúsculas)
                if (nombrePais.trim().toLowerCase() === pais.trim().toLowerCase()) {
                    // Separamos por comas para devolver lista limpia de goleadores
                    return listaJugadores.split(',').map(j => j.trim()).filter(Boolean);
                }
            }
        }
        return [];
    };

    // Componente Reutilizable de Partido
    const TarjetaPartido = ({ partido, esFinal = false }: { partido: any; esFinal?: boolean }) => {
        const golesLocal = obtenerGoleadoresPorPais(partido.goles, partido.local);
        const golesVisitante = obtenerGoleadoresPorPais(partido.goles, partido.visitante);
        const urlHighlights = partido.highlights || partido.higlights;

        return (
            <div className={`tarjetaPartido ${esFinal ? 'tarjetaFinal' : ''}`}>
                {partido.fecha && <div className="fechaPartido">{partido.fecha}</div>}

                {/* Marcador en estructura de 3 Columnas (Local | Marcador | Visitante) */}
                <div className="estructuraPartido">
                    {/* Columna Local */}
                    <div className="columnaEquipo local">
                        <span className="nombreEquipo">{partido.local}</span>
                        {golesLocal.length > 0 && (
                            <div className="listaGoleadores">
                                {golesLocal.map((jugador, i) => (
                                    <span key={i} className="jugadorGol">⚽ {jugador}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Marcador Central */}
                    <div className="columnaResultado">
                    <span className={`resultadoDestacado ${esFinal ? 'finalResultado' : ''}`}>
                        {partido.resultado}
                    </span>
                    </div>

                    {/* Columna Visitante */}
                    <div className="columnaEquipo visitante">
                        <span className="nombreEquipo">{partido.visitante}</span>
                        {golesVisitante.length > 0 && (
                            <div className="listaGoleadores">
                                {golesVisitante.map((jugador, i) => (
                                    <span key={i} className="jugadorGol">⚽ {jugador}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón Highlights */}
                {urlHighlights && (
                    <div className="contenedorHighlights">
                        <a
                            href={urlHighlights}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btnHighlights"
                        >
                            ▶ Ver Highlights
                        </a>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="cerrar"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h1 className="tituloModal">Mundial {mundial.year}</h1>
                <div className="banner">
                    <img
                        src={mundial.imagenAnfitrion}
                        alt={mundial.anfitrion}
                    />
                    <h2>{mundial.anfitrion}</h2>
                </div>
                <div className="filaSuperior">
                    <div className="panel">
                        <h3>🏆 Campeón</h3>
                        <img
                            src={mundial.imagenCampeon}
                            alt={mundial.campeon}
                        />
                        <p>{mundial.campeon}</p>
                    </div>
                    <div className="panel">
                        <h3>⚽ Goleador</h3>
                        <img
                            src={mundial.imagenGoleador}
                            alt={mundial.goleador}
                        />
                        <p>{mundial.goleador}</p>
                    </div>
                </div>
                <div className="filaInferior">
                    <div className="panel">
                        <h3>🥇 Primeros puestos</h3>
                        <ol>
                            {
                                mundial.primerosPuestos.map(
                                    (equipo: string, index: number) => (

                                        <li key={index}>
                                            {equipo}
                                        </li>
                                    )
                                )
                            }
                        </ol>
                    </div>
                    <div className="panel">
                        <h3>🥎 Pelota Oficial</h3>
                        <img
                            src={mundial.imagenPelota}
                            alt={mundial.pelota}
                        />
                        <p>{mundial.pelota}</p>
                    </div>
                    <div className="panel">
                        <h3>⚽ Promedio de gol</h3>
                        <div className="promedio">{mundial.promedioGol}</div>
                        <span>goles por partido</span>
                    </div>
                </div>

                {/* ==================== NUEVA FILA: ELEMENTOS CULTURALES (Mascota, Canción, Álbum) ==================== */}
                {(mundial.mascota || mundial.cancion || mundial.album) && (
                    <div className="filaCultural">
                        {/* Mascotas (Solo si existe mundial.mascota) */}
                        {mundial.mascota && (
                            <div className="panel">
                                <h3>🦁 Mascota Oficial</h3>
                                {mundial.imagenMascota && (
                                    <img
                                        src={mundial.imagenMascota}
                                        alt={mundial.mascota}
                                    />
                                )}
                                <p className="nombreMascota">{mundial.mascota}</p>
                            </div>
                        )}

                        {/* Canción Oficial (Solo si existe mundial.cancion) */}
                        {mundial.cancion && (
                            <div className="panel">
                                <h3>🎵 Canción Oficial</h3>
                                <div className="contenedorCancion">
                                    <a
                                        href={mundial.cancion}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btnCancion"
                                    >
                                        ▶ Escuchar en YouTube
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Álbum de Figuritas / Cromos (Solo si existe mundial.album) */}
                        {mundial.album && (
                            <div className="panel">
                                <h3>📖 Álbum Oficial</h3>
                                <img
                                    src={mundial.album}
                                    alt={`Álbum Mundial ${mundial.year}`}
                                    className="imagenAlbum"
                                />
                            </div>
                        )}
                    </div>
                )}
                {/* ==================== 1. TABLA DE GRUPOS (SI EXISTE) ==================== */}
                {mundial.grupos && mundial.grupos.length > 0 && (
                    <div className="panel seccionGrupos">
                        <h3>📊 Fase de Grupos</h3>
                        {/* NUEVO CONTENEDOR PARA HACER LA GRILLA DE 2 COLUMNAS */}
                        <div className="gruposGrid">
                            {mundial.grupos.map((grupoObj: any, gIdx: number) => (
                                <div key={gIdx} className="grupoContenedor">
                                    <h4>Grupo {grupoObj.grupo}</h4>

                                    {/* Tabla de Posiciones */}
                                    <div className="tablaResponsiva">
                                        <table className="tablaPosiciones">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th className="textLeft">País</th>
                                                <th>PTS</th>
                                                <th>PJ</th>
                                                <th>PG</th>
                                                <th>PE</th>
                                                <th>PP</th>
                                                <th>GF</th>
                                                <th>GC</th>
                                                <th>DG</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {grupoObj.posiciones.map((pos: any, pIdx: number) => (
                                                <tr key={pIdx}>
                                                    <td>{pos.puesto}</td>
                                                    <td className="textLeft bold">{pos.pais}</td>
                                                    <td className="bold">{pos.puntos}</td>
                                                    <td>{pos.pj}</td>
                                                    <td>{pos.pg}</td>
                                                    <td>{pos.pe}</td>
                                                    <td>{pos.pp}</td>
                                                    <td>{pos.gf}</td>
                                                    <td>{pos.gc}</td>
                                                    <td>{pos.dg >= 0 ? `+${pos.dg}` : pos.dg}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Partidos del Grupo */}
                                    <div className="partidosGrupo">
                                        <h5>Resultados del Grupo:</h5>
                                        <div className="listaPartidosGrupo">
                                            {grupoObj.partidos.map((partido: any, partIdx: number) => (
                                                <TarjetaPartido key={partIdx} partido={partido} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {(mundial.octavos || mundial.cuartos || mundial.semifinales || mundial.tercero || mundial.final) && (
                    <div className="panel seccionEliminatorias">
                        <h3>🏆 Fase Eliminatoria</h3>

                        {/* Renderizar dinámicamente Octavos, Cuartos o Semifinales si existen en el objeto */}
                        {fasesEliminatorias.map((fase) => {
                            const partidosFase = mundial[fase.key];
                            if (!partidosFase || partidosFase.length === 0) return null;

                            return (
                                <div key={fase.key} className="faseEliminatoriaContenedor">
                                    <h4>{fase.titulo}</h4>
                                    <div className="partidosGrid">
                                        {partidosFase.map((partido: any, idx: number) => (
                                            <TarjetaPartido key={idx} partido={partido} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Tercer Puesto */}
                        {mundial.tercero && (
                            <div className="faseEliminatoriaContenedor">
                                <h4>Tercer y Cuarto Puesto</h4>
                                <div className="partidoUnico">
                                    <TarjetaPartido partido={mundial.tercero} />
                                </div>
                            </div>
                        )}

                        {/* Gran Final */}
                        {mundial.final && (
                            <div className="faseEliminatoriaContenedor">
                                <h4 className="tituloFinal">Gran Final 🌟</h4>
                                <div className="partidoUnico">
                                    <TarjetaPartido partido={mundial.final} esFinal={true} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="panel">
                    <h3>📖 Trasfondo</h3>
                    <p>{mundial.trasfondo}</p>
                </div>
                <div className="panel">
                    <h3>💡 Datos curiosos</h3>
                    <ul>
                        {
                            mundial.datosCuriosos.map(
                                (dato: string, index: number) => (
                                    <li key={index}>
                                        {dato}
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MundialCard;