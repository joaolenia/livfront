import { useEffect, useMemo, useState } from 'react';

import './Home.css';

import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

export function Home() {
  const [lugares, setLugares] =
    useState<Lugar[]>([]);

  const [busca, setBusca] =
    useState('');

  const [
    lugarSelecionado,
    setLugarSelecionado,
  ] = useState<Lugar | null>(null);
  useEffect(() => {
    const dados: Lugar[] = [
      {
        id: 1,
        nome: 'Café Inclusivo',
        descricao: 'R. Frei Caneca, 1234 - Consolação',

        statusAcessibilidade: 'ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.30595, -26.42432],
        },

        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: true,
      },

      {
        id: 2,
        nome: 'Mercado Central',
        descricao: 'Av. Principal, 550',

        statusAcessibilidade:
          'PARCIALMENTE ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.30654, -26.42473],
        },

        temRampa: true,
        temBanheiroAcessivel: false,
        temElevador: false,
        temPortaLarga: false,
      },

      {
        id: 3,
        nome: 'Loja Antiga',
        descricao: 'Rua XV, 221',

        statusAcessibilidade:
          'INACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.3078, -26.4255],
        },

        temRampa: false,
        temBanheiroAcessivel: false,
        temElevador: false,
        temPortaLarga: false,
      },
    ];

    setLugares(dados);
    setLugarSelecionado(dados[0]);
  }, []);

  const lugaresFiltrados =
    useMemo(() => {
      return lugares.filter(
        (lugar) =>
          lugar.nome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            )
      );
    }, [lugares, busca]);

  return (
    <div className="home-container">

      <aside className="sidebar">

        <div className="sidebar-top">

          <img
            src="/fundo.png"
            alt="Mapa acessível"
            className="top-image"
          />

        </div>

        {/* SOMENTE ESSA ÁREA ROLA */}
        <div className="sidebar-scroll">

          {lugarSelecionado && (
            <div className="info-box">

              <div className="info-header">

                <div
                  className={`status-icon ${lugarSelecionado.statusAcessibilidade ===
                      'ACESSIVEL'
                      ? 'verde'
                      : lugarSelecionado.statusAcessibilidade.includes(
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

                  <h2>
                    {
                      lugarSelecionado.nome
                    }
                  </h2>

                  <span
                    className={`status-badge ${lugarSelecionado.statusAcessibilidade ===
                        'ACESSIVEL'
                        ? 'badge-verde'
                        : lugarSelecionado.statusAcessibilidade.includes(
                          'PARCIAL'
                        )
                          ? 'badge-amarelo'
                          : 'badge-vermelho'
                      }`}
                  >
                    {
                      lugarSelecionado.statusAcessibilidade
                    }
                  </span>
                </div>
              </div>

              <p className="endereco">
                {
                  lugarSelecionado.descricao
                }
              </p>

              <div className="recursos-info">

                {lugarSelecionado.temRampa && (
                  <div className="recurso-item">
                    ✅ Rampa de acesso
                  </div>
                )}

                {lugarSelecionado.temBanheiroAcessivel && (
                  <div className="recurso-item">
                    ✅ Banheiro acessível
                  </div>
                )}

                {lugarSelecionado.temPortaLarga && (
                  <div className="recurso-item">
                    ✅ Porta larga
                  </div>
                )}

                {lugarSelecionado.temElevador && (
                  <div className="recurso-item">
                    ✅ Elevador
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </aside>

      <main className="map-content">

        <div className="top-search">

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Buscar endereço ou comércio..."
              value={busca}
              onChange={(e) =>
                setBusca(
                  e.target.value
                )
              }
            />
          </div>

          <button className="filter-btn">
            ☰ Filtros
          </button>
        </div>

        <Mapa
          lugares={lugaresFiltrados}
          onSelecionarLugar={
            setLugarSelecionado
          }
        />

      </main>
    </div>
  );
}