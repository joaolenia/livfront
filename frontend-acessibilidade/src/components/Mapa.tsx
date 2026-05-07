import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './Mapa.css';

import type { Lugar } from '../types/lugar';

interface Props {
  lugares: Lugar[];
}

const iconAcessivel = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
});

export function Mapa({ lugares }: Props) {
  const center = [-26.426072, -51.306651] as LatLngExpression;

  return (
    <div className="mapa-container">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className="mapa"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {lugares.map((lugar) => {
          const [lng, lat] = lugar.localizacao.coordinates;

          return (
            <Marker
              key={lugar.id}
              position={[lat, lng]}
              icon={iconAcessivel}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{lugar.nome}</h3>

                  <p>{lugar.descricao}</p>

                  <span
                    className={`status ${
                      lugar.statusAcessibilidade
                        .toLowerCase()
                        .includes('parcial')
                        ? 'parcial'
                        : 'acessivel'
                    }`}
                  >
                    {lugar.statusAcessibilidade}
                  </span>

                  <div className="recursos">
                    <span>
                      {lugar.temRampa ? '✅ Rampa' : '❌ Sem rampa'}
                    </span>

                    <span>
                      {lugar.temBanheiroAcessivel
                        ? '✅ Banheiro'
                        : '❌ Banheiro'}
                    </span>

                    <span>
                      {lugar.temElevador
                        ? '✅ Elevador'
                        : '❌ Elevador'}
                    </span>

                    <span>
                      {lugar.temPortaLarga
                        ? '✅ Porta larga'
                        : '❌ Porta larga'}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}