import './Home.css';

import estabelecimentos from '../mock/stabelecimentos.json';

import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

import { Link } from 'react-router-dom';

import { Avaliar } from '../components/Avaliar';
import { Avaliacoes } from '../components/Avaliacoes';

import {
  useEffect,
  useMemo,
  useState
} from 'react';

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

  const [categoriaFiltro, setCategoriaFiltro] =
    useState('TODOS');

  const [textoFiltro, setTextoFiltro] =
    useState('☰ Filtros');

    useEffect(() => {

  const dados = estabelecimentos as Lugar[];

  setLugares(dados);

  if (dados.length > 0) {
    setLugarSelecionado(dados[0]);
  }

}, []);

  const lugaresFiltrados =
    useMemo(() => {

      return lugares.filter((lugar) => {

        const buscaMatch =
          lugar.nome
            .toLowerCase()
            .includes(
              busca.toLowerCase()
            );

        const categoriaMatch =
          categoriaFiltro === 'TODOS'
            ? true
            : lugar.categoria === categoriaFiltro;

        return buscaMatch && categoriaMatch;

      });

    }, [
      lugares,
      busca,
      categoriaFiltro
    ]);

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

      {/* SIDEBAR */}

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
                    {lugarSelecionado.statusAcessibilidade}
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

                  <img
                    src="/avaliacao.png"
                    alt=""
                    className="btn-icon"
                  />

                  Ver avaliações

                </button>

                <button
                  className="btn-avaliar"
                  onClick={() =>
                    setModalAvaliar(true)
                  }
                >

                  <img
                    src="/avaliar.png"
                    alt=""
                    className="btn-icon"
                  />

                  Avaliar local

                </button>

              </div>

            </div>

          )}

        </div>

      </aside>

      {/* MAPA */}

      <main className="map-content">

        <div className="top-search">

          {/* BUSCA */}

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Buscar endereço ou comércio..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
            />

          </div>

          {/* FILTROS */}

          <div className="filter-container">

            <button className="filter-btn">
              {textoFiltro}
            </button>

            <div className="filter-menu">

              <button
                onClick={() => {
                  setCategoriaFiltro('TODOS');
                  setTextoFiltro('☰ Filtros');
                }}
              >
                🌎 Todos
              </button>

              <button
                onClick={() => {
                  setCategoriaFiltro('FARMACIA');
                  setTextoFiltro('🏥 Farmácias');
                }}
              >
                🏥 Farmácias
              </button>

              <button
                onClick={() => {
                  setCategoriaFiltro('MERCADO');
                  setTextoFiltro('🛒 Mercados');
                }}
              >
                🛒 Mercados
              </button>

              <button
                onClick={() => {
                  setCategoriaFiltro('LOJA');
                  setTextoFiltro('🛍️ Lojas');
                }}
              >
                🛍️ Lojas
              </button>

              <button
                onClick={() => {
                  setCategoriaFiltro('ESCOLA');
                  setTextoFiltro('🏫 Escolas');
                }}
              >
                🏫 Escolas
              </button>

            </div>

          </div>

          {/* PERFIL */}

          <Link to="/perfil">

            <button className="perfil-btn">

              <img
                src="/perfil.png"
                alt=""
                className="btn-icon"
              />

              Perfil

            </button>

          </Link>

          {/* CADASTRO */}

          <Link to="/cadastro">

            <button className="cadastro-btn">

              <img
                src="/cadastro.png"
                alt=""
                className="btn-icon"
              />

              Cadastro

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