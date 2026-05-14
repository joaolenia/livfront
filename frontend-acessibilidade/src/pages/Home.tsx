import './Home.css';

import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

import { Link } from 'react-router-dom';

import { Avaliar } from '../components/Avaliar';
import { Avaliacoes } from '../components/Avaliacoes';
import { useEffect, useMemo, useState } from 'react';

export function Home() {

  const [lugares, setLugares] =
    useState<Lugar[]>([]);

  const [busca, setBusca] =
    useState('');

  const [
    lugarSelecionado,
    setLugarSelecionado,
  ] = useState<Lugar | null>(null);

  const [
    modalAvaliar,
    setModalAvaliar
  ] = useState(false);

  const [
    modalAvaliacoes,
    setModalAvaliacoes
  ] = useState(false);

  useEffect(() => {

    const dados: Lugar[] = [

      {
        id: 1,
        nome: 'Escola Elay',

        descricao:
          'R. Carlos Rotta, X - Gen. Carneiro',

        statusAcessibilidade:
          'ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [
            -51.306651,
            -26.426072
          ],
        },

        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: true,
      },

      {
        id: 2,
        nome: 'Mercearia Bom Jesus',

        descricao:
          'R. Dom Carlos Eduardo Savóia Bandeira de Mello, X - Gen. Carneiro',

        statusAcessibilidade:
          'PARCIALMENTE ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [
            -51.30490685753136,
            -26.425417544594616
          ],
        },

        temRampa: false,
        temBanheiroAcessivel: false,
        temElevador: false,
        temPortaLarga: true,
      },

      {
        id: 3,
        nome: 'Mercearia São Miguel',

        descricao:
          'Rua Tancredo Neves, X - Gen. Carneiro',

        statusAcessibilidade:
          'INACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [
            -51.305645646717565,
            -26.42419511158366
          ],
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

      <Avaliar
        aberto={modalAvaliar}
        fechar={() =>
          setModalAvaliar(false)
        }
      />

      <Avaliacoes
        aberto={modalAvaliacoes}
        fechar={() =>
          setModalAvaliacoes(false)
        }
      />

      <aside className="sidebar">

        <div className="sidebar-top">

          <img
            src="/fundo.png"
            alt="Mapa acessível"
            className="top-image"
          />

        </div>

        <div className="sidebar-scroll">

          {lugarSelecionado && (

            <div className="info-box">

              <div className="info-header">

                <div
                  className={`status-icon ${
                    lugarSelecionado.statusAcessibilidade ===
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
                    {lugarSelecionado.nome}
                  </h2>

                  <span
                    className={`status-badge ${
                      lugarSelecionado.statusAcessibilidade ===
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
                {lugarSelecionado.descricao}
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

              <div className="acoes-lugar">

                <button
                  className="btn-avaliacoes"
                  onClick={() =>
                    setModalAvaliacoes(true)
                  }
                >
                  ⭐ Ver avaliações
                </button>

                <button
                  className="btn-avaliar"
                  onClick={() =>
                    setModalAvaliar(true)
                  }
                >
                  ✍️ Avaliar local
                </button>

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

          <Link to="/perfil">
            <button className="perfil-btn">
              👤 Perfil
            </button>
          </Link>

          <Link to="/cadastro">
            <button className="cadastro-btn">
              ➕ Cadastro
            </button>
          </Link>

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