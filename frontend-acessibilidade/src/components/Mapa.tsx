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

/* ÍCONE PERSONALIZADO */

const criarIcone = (
  cor: string
) =>
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
            lugar.statusAcessibilidade ===
            'ACESSIVEL'
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

                    <div
                      className={`popup-icon ${
                        lugar.statusAcessibilidade ===
                        'ACESSIVEL'
                          ? 'verde'
                          : lugar.statusAcessibilidade.includes(
                              'PARCIAL'
                            )
                          ? 'amarelo'
                          : 'vermelho'
                      }`}
                    >
                      <img
                        src="/rodas.png"
                        alt=""
                      />
                    </div>

                    <div>

                      <h3>
                        {lugar.nome}
                      </h3>

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
                        {
                          lugar.statusAcessibilidade
                        }
                      </span>
                    </div>
                  </div>

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