import { useEffect, useMemo, useState } from 'react';

import './Home.css';

import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

export function Home() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('TODOS');

  useEffect(() => {
    setLugares([
      {
        id: 1,
        nome: 'COMÉRCIO DE PEÇAS MABE E',
        descricao: 'Provavelmente vende peças',
        statusAcessibilidade: 'PARCIALMENTE ACESSIVEL',
        localizacao: {
          type: 'Point',
          coordinates: [-51.30595050181997, -26.424325200966045],
        },
        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: false,
      },
      {
        id: 3,
        nome: 'SEBBEN BEM VIVER',
        descricao: 'Local acessível para atendimento',
        statusAcessibilidade: 'ACESSIVEL',
        localizacao: {
          type: 'Point',
          coordinates: [-51.306546041677315, -26.424730573443192],
        },
        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: true,
      },
    ]);
  }, []);

  const lugaresFiltrados = useMemo(() => {
    return lugares.filter((lugar) => {
      const nomeMatch = lugar.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      if (filtro === 'TODOS') return nomeMatch;

      return (
        nomeMatch &&
        lugar.statusAcessibilidade.includes(filtro)
      );
    });
  }, [lugares, busca, filtro]);

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="logo-area">
          <h1>AcessMap</h1>
          <p>
            Plataforma de acessibilidade urbana
          </p>
        </div>

        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar local..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="TODOS">
              Todos os locais
            </option>

            <option value="ACESSIVEL">
              Acessível
            </option>

            <option value="PARCIALMENTE">
              Parcialmente acessível
            </option>
          </select>
        </div>

        <div className="lista-lugares">
          {lugaresFiltrados.map((lugar) => (
            <div
              key={lugar.id}
              className="card-lugar"
            >
              <h3>{lugar.nome}</h3>

              <p>{lugar.descricao}</p>

              <span
                className={`badge ${
                  lugar.statusAcessibilidade
                    .toLowerCase()
                    .includes('parcial')
                    ? 'parcial'
                    : 'acessivel'
                }`}
              >
                {lugar.statusAcessibilidade}
              </span>

              <div className="infos">
                <span>
                  {lugar.temRampa
                    ? '♿ Rampa'
                    : '❌ Sem rampa'}
                </span>

                <span>
                  {lugar.temBanheiroAcessivel
                    ? '🚻 Banheiro'
                    : '❌ Banheiro'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="mapa-area">
        <Mapa lugares={lugaresFiltrados} />
      </main>
    </div>
  );
}