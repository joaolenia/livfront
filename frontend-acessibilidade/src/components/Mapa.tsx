import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';

import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './Mapa.css';

import type { Lugar } from '../types/lugar';

interface Props {
  lugares: Lugar[];

  onSelecionarLugar: (
    lugar: Lugar
  ) => void;
}

const criarIcone = (cor: string) =>
  new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${cor}-dot.png`,
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -38],
  });

const icones = {
  verde: criarIcone('green'),
  amarelo: criarIcone('yellow'),
  vermelho: criarIcone('red'),
};

export function Mapa({
  lugares,
  onSelecionarLugar,
}: Props) {
  const center = [-26.426072, -51.306651] as LatLngExpression;

  return (
    <div className="mapa-wrapper">

      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className="mapa"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {lugares.map((lugar) => {
          const [lng, lat] =
            lugar.localizacao.coordinates;

          const icon =
            lugar.statusAcessibilidade === 'ACESSIVEL'
              ? icones.verde
              : lugar.statusAcessibilidade.includes(
                  'PARCIAL'
                )
              ? icones.amarelo
              : icones.vermelho;

          return (
            <Marker
              key={lugar.id}
              position={[lat, lng]}
              icon={icon}

              eventHandlers={{
                click: () =>
                  onSelecionarLugar(lugar),
              }}
            >
              <Popup>
                <div className="popup-card">

                  <div className="popup-top">

                    <div className="popup-icon">
                      ♿
                    </div>

                    <div>
                      <h3>{lugar.nome}</h3>

                      <span
                        className={`popup-badge ${
                          lugar.statusAcessibilidade.includes(
                            'PARCIAL'
                          )
                            ? 'parcial'
                            : lugar.statusAcessibilidade ===
                              'ACESSIVEL'
                            ? 'acessivel'
                            : 'nao'
                        }`}
                      >
                        {lugar.statusAcessibilidade}
                      </span>
                    </div>
                  </div>

                  <p className="popup-endereco">
                    {lugar.descricao}
                  </p>

                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="bottom-legenda">

        <div className="legenda-mini">
          <div className="dot verde"></div>
          <span>Acessível</span>
        </div>

        <div className="legenda-mini">
          <div className="dot amarelo"></div>
          <span>Parcialmente acessível</span>
        </div>

        <div className="legenda-mini">
          <div className="dot vermelho"></div>
          <span>Não acessível</span>
        </div>

      </div>
    </div>
  );
} 