import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Polyline,
} from 'react-leaflet';

import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './Mapa.css';

import type { Lugar } from '../types/lugar';

interface Props {
  lugares: Lugar[];
  onSelecionarLugar: (lugar: Lugar) => void;
}

/* ÍCONE PERSONALIZADO */
const criarIcone = (cor: string) =>
  new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-wrapper ${cor}">
        <img src="/rodas.png" />
      </div>
    `,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
    popupAnchor: [0, -48],
  });

const icones = {
  verde: criarIcone('verde'),
  amarelo: criarIcone('amarelo'),
  vermelho: criarIcone('vermelho'),
  inicio: criarIcone('azul'),    // Novo ícone para início
  chegada: criarIcone('roxo'),   // Novo ícone para chegada
};

/* COORDENADAS DAS ROTAS */
const rotaAlternativa: LatLngExpression[] = [
  [-26.426988, -51.315287],
  [-26.426623, -51.314767],
  [-26.426280, -51.314268],
  [-26.426078, -51.313930],
  [-26.425890, -51.313412],
  [-26.425703, -51.313007],
  [-26.425597, -51.312597],
  [-26.425387, -51.312580],
  [-26.425183, -51.312669],
  [-26.425073, -51.312368],
  [-26.424993, -51.312053],
  [-26.425287, -51.311913],
  [-26.424992, -51.311230],
  [-26.424702, -51.311365],
  [-26.424333, -51.311525],
  [-26.423707, -51.311784],
  [-26.423487, -51.311383],
  [-26.423336, -51.311046], // Chegada
];

const rotaPrincipal: LatLngExpression[] = [
  [-26.426975, -51.315262],
  [-26.426530, -51.314663],
  [-26.426028, -51.314173],
  [-26.425580, -51.313998],
  [-26.425098, -51.313924],
  [-26.424654, -51.313940],
  [-26.423961, -51.314033],
  [-26.423861, -51.313373],
  [-26.423790, -51.312874],
  [-26.423772, -51.312577],
  [-26.423724, -51.312151],
  [-26.423691, -51.311823],
  [-26.423499, -51.311395],
  [-26.423421, -51.311019], // Chegada
];

export function Mapa({ lugares, onSelecionarLugar }: Props) {
  const center = [-26.425072, -51.313651] as LatLngExpression;

  const [mostrarRotaPrincipal, setMostrarRotaPrincipal] = useState(false);
  const [mostrarRotaAlternativa, setMostrarRotaAlternativa] = useState(false);

  // Ao ativar uma rota, desativamos a outra para evitar sobreposição confusa
  const toggleRotaPrincipal = () => {
    setMostrarRotaPrincipal(!mostrarRotaPrincipal);
    if (!mostrarRotaPrincipal) setMostrarRotaAlternativa(false);
  };

  const toggleRotaAlternativa = () => {
    setMostrarRotaAlternativa(!mostrarRotaAlternativa);
    if (!mostrarRotaAlternativa) setMostrarRotaPrincipal(false);
  };

  const mostrandoAlgumaRota = mostrarRotaPrincipal || mostrarRotaAlternativa;
  const rotaAtual = mostrarRotaPrincipal ? rotaPrincipal : rotaAlternativa;

  return (
    <div className="mapa-wrapper">
      <div className="controles-rota">
        <button 
          className={`btn-rota principal ${mostrarRotaPrincipal ? 'ativo' : ''}`}
          onClick={toggleRotaPrincipal}
        >
          {mostrarRotaPrincipal ? 'Ocultar Rota Principal' : 'Mostrar Rota Principal'}
        </button>
        <button 
          className={`btn-rota alternativa ${mostrarRotaAlternativa ? 'ativo' : ''}`}
          onClick={toggleRotaAlternativa}
        >
          {mostrarRotaAlternativa ? 'Ocultar Rota Adaptada' : 'Mostrar Rota Adaptada'}
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={true}
        className="mapa"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. RENDERIZAÇÃO DA ROTA */}
        {mostrarRotaPrincipal && (
          <Polyline positions={rotaPrincipal} pathOptions={{ color: '#3b82f6', weight: 6, opacity: 0.8 }} />
        )}

        {mostrarRotaAlternativa && (
          <Polyline positions={rotaAlternativa} pathOptions={{ color: '#8b5cf6', weight: 6, opacity: 0.9 }} />
        )}

        {/* 2. RENDERIZAÇÃO CONDICIONAL DOS MARCADORES */}
        {mostrandoAlgumaRota ? (
          /* Mostrar apenas Início e Chegada se alguma rota estiver ativa */
          <>
            <Marker position={rotaAtual[0]} icon={icones.inicio}>
              <Popup><div className="popup-card"><h3>Ponto de Partida</h3></div></Popup>
            </Marker>
            <Marker position={rotaAtual[rotaAtual.length - 1]} icon={icones.chegada}>
              <Popup><div className="popup-card"><h3>Destino (Farmácia)</h3></div></Popup>
            </Marker>
          </>
        ) : (
          /* Mostrar os lugares normalmente se nenhuma rota estiver ativa */
          lugares.map((lugar) => {
            const [lng, lat] = lugar.localizacao.coordinates;
            const icon =
              lugar.statusAcessibilidade === 'ACESSIVEL'
                ? icones.verde
                : lugar.statusAcessibilidade.includes('PARCIAL')
                ? icones.amarelo
                : icones.vermelho;

            return (
              <Marker
                key={lugar.id}
                position={[lat, lng]}
                icon={icon}
                eventHandlers={{ click: () => onSelecionarLugar(lugar) }}
              >
                <Popup>
                  <div className="popup-card">
                    <div className="popup-top">
                      <div className={`popup-icon ${lugar.statusAcessibilidade === 'ACESSIVEL' ? 'verde' : lugar.statusAcessibilidade.includes('PARCIAL') ? 'amarelo' : 'vermelho'}`}>
                        <img src="/rodas.png" alt="" />
                      </div>
                      <div>
                        <h3>{lugar.nome}</h3>
                        <span className={`popup-badge ${lugar.statusAcessibilidade.includes('PARCIAL') ? 'parcial' : lugar.statusAcessibilidade === 'ACESSIVEL' ? 'acessivel' : 'nao'}`}>
                          {lugar.statusAcessibilidade}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })
        )}
      </MapContainer>

      <div className="bottom-legenda">
        {!mostrandoAlgumaRota ? (
          <>
            <div className="legenda-mini"><div className="dot verde"></div><span>Acessível</span></div>
            <div className="legenda-mini"><div className="dot amarelo"></div><span>Parcial</span></div>
            <div className="legenda-mini"><div className="dot vermelho"></div><span>Não acessível</span></div>
          </>
        ) : (
          <>
            <div className="legenda-mini"><div className="dot azul"></div><span>Início</span></div>
            <div className="legenda-mini"><div className="dot roxo"></div><span>Chegada</span></div>
            {mostrarRotaPrincipal && <div className="legenda-mini linha-rota"><div className="line azul"></div><span>Rota Principal</span></div>}
            {mostrarRotaAlternativa && <div className="legenda-mini linha-rota"><div className="line roxa tracejada"></div><span>Rota Alternativa</span></div>}
          </>
        )}
      </div>
    </div>
  );
}