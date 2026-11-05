import './Home.css';

import estabelecimentos from '../mock/stabelecimentos.json';
import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';
import { Link } from 'react-router-dom';
import { Avaliar } from '../components/Avaliar';
import { Avaliacoes } from '../components/Avaliacoes';
import { useEffect, useMemo, useState } from 'react';

export function Home() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [busca, setBusca] = useState('');
  const [lugarSelecionado, setLugarSelecionado] = useState<Lugar | null>(null);
  const [modalAvaliar, setModalAvaliar] = useState(false);
  const [modalAvaliacoes, setModalAvaliacoes] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODOS');
  const [textoFiltro, setTextoFiltro] = useState('☰ Filtros');
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  // CARREGAR ESTABELECIMENTOS
  useEffect(() => {
    const dados = estabelecimentos as Lugar[];
    setLugares(dados);

    if (dados.length > 0) {
      setLugarSelecionado(dados[0]);
    }
  }, []);

  // NORMALIZAR TEXTO
  const normalizar = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // BUSCA E FILTROS
  const lugaresFiltrados = useMemo(() => {
    return lugares.filter((lugar) => {
      const termo = normalizar(busca);
      const nome = normalizar(lugar.nome || '');
      const descricao = normalizar(lugar.descricao || '');
      const categoria = normalizar(lugar.categoria || '');

      const buscaMatch =
        nome.includes(termo) ||
        descricao.includes(termo) ||
        categoria.includes(termo);

      const categoriaMatch =
        categoriaFiltro === 'TODOS'
          ? true
          : lugar.categoria === categoriaFiltro;

      return buscaMatch && categoriaMatch;
    });
  }, [lugares, busca, categoriaFiltro]);

  // SELECIONAR FILTRO
  const selecionarFiltro = (categoria: string, texto: string) => {
    setCategoriaFiltro(categoria);
    setTextoFiltro(texto);
    setFiltrosAbertos(false);
  };

  // SELECIONAR ESTABELECIMENTO
  const selecionarLugar = (lugar: Lugar) => {
    setLugarSelecionado(lugar);
    setBusca(lugar.nome);
  };

  return (
    <div className="home-container">
      {/* MODAL AVALIAR */}
      <Avaliar
        aberto={modalAvaliar}
        fechar={() => setModalAvaliar(false)}
      />

      {/* MODAL AVALIAÇÕES */}
      <Avaliacoes
        aberto={modalAvaliacoes}
        fechar={() => setModalAvaliacoes(false)}
      />

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-banner">
          <img
            src="/fundocad.png"
            alt="Mapa de acessibilidade - Encontre comércios acessíveis para cadeirantes"
            className="banner-img"
          />
        </div>

        <div className="sidebar-scroll">
          {lugarSelecionado && (
            <div className="info-box">
              {/* CABEÇALHO DO LOCAL */}
              <div className="info-header">
                <div
                  className={`status-icon ${
                    lugarSelecionado.statusAcessibilidade === 'ACESSIVEL'
                      ? 'verde'
                      : lugarSelecionado.statusAcessibilidade.includes('PARCIAL')
                      ? 'amarelo'
                      : 'vermelho'
                  }`}
                >
                  <img src="/rodas.png" alt="Acessibilidade" />
                </div>

                <div className="info-title-group">
                  <h2>{lugarSelecionado.nome}</h2>
                  <span
                    className={`status-badge ${
                      lugarSelecionado.statusAcessibilidade === 'ACESSIVEL'
                        ? 'badge-verde'
                        : lugarSelecionado.statusAcessibilidade.includes('PARCIAL')
                        ? 'badge-amarelo'
                        : 'badge-vermelho'
                    }`}
                  >
                    {lugarSelecionado.statusAcessibilidade}
                  </span>
                </div>
              </div>

              {/* ENDEREÇO / DESCRIÇÃO */}
              <p className="endereco">
                <span className="location-pin">📍</span> {lugarSelecionado.descricao}
              </p>

              {/* LISTA DE RECURSOS */}
              <div className="recursos-info">
                {lugarSelecionado.temRampa && (
                  <div className="recurso-item">
                    <span className="check-icon">✓</span> Rampa de acesso
                  </div>
                )}
                {lugarSelecionado.temBanheiroAcessivel && (
                  <div className="recurso-item">
                    <span className="check-icon">✓</span> Banheiro acessível
                  </div>
                )}
                {lugarSelecionado.temPortaLarga && (
                  <div className="recurso-item">
                    <span className="check-icon">✓</span> Porta larga
                  </div>
                )}
                {lugarSelecionado.temElevador && (
                  <div className="recurso-item">
                    <span className="check-icon">✓</span> Elevador
                  </div>
                )}
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className="acoes-lugar">
                <button
                  type="button"
                  className="btn-avaliacoes"
                  onClick={() => setModalAvaliacoes(true)}
                >
                  <img src="/avaliacao.png" alt="" className="btn-icon" />
                  Ver avaliações
                </button>

                <button
                  type="button"
                  className="btn-avaliar"
                  onClick={() => setModalAvaliar(true)}
                >
                  <img src="/avaliar.png" alt="" className="btn-icon" />
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
          <div className="search-area">
            <div className="search-box">
              <button
                className="search-icon-btn"
                type="button"
                aria-label="Pesquisar"
              >
                <span>⌕</span>
              </button>

              <input
                type="text"
                placeholder="Para onde você quer ir?"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar endereço ou comércio"
              />

              {busca && (
                <button
                  className="clear-search"
                  type="button"
                  onClick={() => setBusca('')}
                  title="Limpar pesquisa"
                >
                  ✕
                </button>
              )}
            </div>

            {/* SUGESTÕES */}
            {busca.trim() !== '' && (
              <div className="search-suggestions">
                <div className="suggestion-title">
                  RESULTADOS ENCONTRADOS
                </div>

                {lugaresFiltrados.length > 0 ? (
                  lugaresFiltrados.slice(0, 5).map((lugar) => (
                    <button
                      key={lugar.nome}
                      className="suggestion-item"
                      type="button"
                      onClick={() => selecionarLugar(lugar)}
                    >
                      <span className="suggestion-icon">📍</span>

                      <span className="suggestion-text">
                        <strong>{lugar.nome}</strong>
                        <small>{lugar.descricao}</small>
                      </span>

                      <span className="suggestion-arrow">→</span>

                    </button>
                  ))
                ) : (
                  <div className="no-results">
                    <span>🔎</span>
                    <strong>Nenhum local encontrado</strong>
                    <small>Tente pesquisar outro nome ou endereço.</small>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FILTROS */}
          <div className="filter-container">
            <button
              className="filter-btn"
              type="button"
              onClick={() => setFiltrosAbertos(!filtrosAbertos)}
              aria-expanded={filtrosAbertos}
            >
              <span className="filter-icon">☷</span>

              <span className="filter-label">
                {textoFiltro === '☰ Filtros'
                  ? 'Filtros'
                  : textoFiltro.replace(/^[^\s]+\s/, '')}
              </span>

              <span
                className={`filter-arrow ${
                  filtrosAbertos ? 'aberto' : ''
                }`}
              >
                ⌄
              </span>
            </button>

            {filtrosAbertos && (
              <div className="filter-menu">
                <div className="filter-menu-header">
                  <strong>Filtrar locais</strong>
                  <small>Escolha uma categoria</small>
                </div>

                <button
                  type="button"
                  className={
                    categoriaFiltro === 'TODOS'
                      ? 'filter-option active'
                      : 'filter-option'
                  }
                  onClick={() => selecionarFiltro('TODOS', '☰ Filtros')}
                >
                  <span className="filter-option-icon">🌎</span>
                  <span>Todos os locais</span>
                  {categoriaFiltro === 'TODOS' && (
                    <span className="filter-check">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  className={
                    categoriaFiltro === 'FARMACIA'
                      ? 'filter-option active'
                      : 'filter-option'
                  }
                  onClick={() => selecionarFiltro('FARMACIA', '🏥 Farmácias')}
                >
                  <span className="filter-option-icon">🏥</span>
                  <span>Farmácias</span>
                  {categoriaFiltro === 'FARMACIA' && (
                    <span className="filter-check">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  className={
                    categoriaFiltro === 'MERCADO'
                      ? 'filter-option active'
                      : 'filter-option'
                  }
                  onClick={() => selecionarFiltro('MERCADO', '🛒 Mercados')}
                >
                  <span className="filter-option-icon">🛒</span>
                  <span>Mercados</span>
                  {categoriaFiltro === 'MERCADO' && (
                    <span className="filter-check">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  className={
                    categoriaFiltro === 'LOJA'
                      ? 'filter-option active'
                      : 'filter-option'
                  }
                  onClick={() => selecionarFiltro('LOJA', '🛍️ Lojas')}
                >
                  <span className="filter-option-icon">🛍️</span>
                  <span>Lojas</span>
                  {categoriaFiltro === 'LOJA' && (
                    <span className="filter-check">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  className={
                    categoriaFiltro === 'ESCOLA'
                      ? 'filter-option active'
                      : 'filter-option'
                  }
                  onClick={() => selecionarFiltro('ESCOLA', '🏫 Escolas')}
                >
                  <span className="filter-option-icon">🏫</span>
                  <span>Escolas</span>
                  {categoriaFiltro === 'ESCOLA' && (
                    <span className="filter-check">✓</span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* PERFIL */}
          <Link to="/perfil" className="perfil-btn link-botao">
            <span className="top-button-icon perfil-icon">
              <img src="/perfil.png" alt="" className="btn-icon" />
            </span>

            <span className="top-button-text">
              <strong>Meu perfil</strong>
              <small>Minha conta</small>
            </span>

          </Link>

          {/* CADASTRO */}
          <Link to="/cadastro" className="cadastro-btn link-botao">
            <span className="top-button-icon cadastro-icon">
              <img src="/cadastro.png" alt="" className="btn-icon" />
            </span>

            <span className="top-button-text">
              <strong>Cadastro</strong>
              <small>Crie sua conta</small>
            </span>

          </Link>
        </div>

        {/* MAPA */}
        <Mapa
          lugares={lugaresFiltrados}
          onSelecionarLugar={setLugarSelecionado}
        />
      </main>
    </div>
  );
}