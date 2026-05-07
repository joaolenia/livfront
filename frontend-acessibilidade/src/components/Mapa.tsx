import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Lugar } from '../types/lugar';

interface Props {
  lugares: Lugar[];
}

export function Mapa({ lugares }: Props) {
 const center = [-26.426072, -51.306651] as LatLngExpression;

  return (
    <MapContainer
      center={center as any}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {lugares.map((lugar) => {
        const [lng, lat] = lugar.localizacao.coordinates;

        return (
          <Marker key={lugar.id} position={[lat, lng] as LatLngExpression}>
            <Popup>
              <strong>{lugar.nome}</strong>
              <br />
              {lugar.descricao}
              <br />
              {lugar.statusAcessibilidade}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}