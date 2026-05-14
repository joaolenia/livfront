import { useState } from 'react';

import './CadastroLugares.css';

import type { Lugar } from '../types/lugar';
import { Link } from 'react-router-dom';

interface Props {
  onAdicionarLugar: (
    lugar: Lugar
  ) => void;
}

export function CadastroLugares({
  onAdicionarLugar,
}: Props) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] =
    useState('');

  const [
    statusAcessibilidade,
    setStatusAcessibilidade,
  ] = useState<
    | 'ACESSIVEL'
    | 'PARCIALMENTE ACESSIVEL'
    | 'INACESSIVEL'
  >('ACESSIVEL');

  const [latitude, setLatitude] =
    useState('');

  const [longitude, setLongitude] =
    useState('');

  const [temRampa, setTemRampa] =
    useState(false);

  const [
    temBanheiroAcessivel,
    setTemBanheiroAcessivel,
  ] = useState(false);

  const [temElevador, setTemElevador] =
    useState(false);

  const [temPortaLarga, setTemPortaLarga] =
    useState(false);

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const novoLugar: Lugar = {
      id: Date.now(),

      nome,

      descricao,

      statusAcessibilidade,

      localizacao: {
        type: 'Point',

        coordinates: [
          Number(longitude),
          Number(latitude),
        ],
      },

      temRampa,

      temBanheiroAcessivel,

      temElevador,

      temPortaLarga,
    };

    onAdicionarLugar(novoLugar);

    setNome('');
    setDescricao('');
    setLatitude('');
    setLongitude('');

    setStatusAcessibilidade(
      'ACESSIVEL'
    );

    setTemRampa(false);
    setTemBanheiroAcessivel(false);
    setTemElevador(false);
    setTemPortaLarga(false);
  }

  return (
    <div className="cad-container">
      <aside className="cad-sidebar">
        <img
          src="/fundo.png"
          alt="Mapa"
          className="cad-image"
        />

        <div className="cad-overlay">

          <h1 className="cad-title">
            Cadastro de Lugares
          </h1>

          <p className="cad-text">
            Adicione locais
            acessíveis ao mapa.
          </p>
        </div>
        <Link to="/home">
          <button className='voltar'>HOME</button>
        </Link>
      </aside>

      <main className="cad-content">
        <form
          className="cad-form"
          onSubmit={handleSubmit}
        >
          <div className="cad-top">
            <h2>Novo Local</h2>

            <p>
              Preencha os dados do
              estabelecimento.
            </p>
          </div>

          <div className="cad-group">
            <label>
              Nome do local
            </label>

            <input
              type="text"
              placeholder="Ex: Mercado Central"
              value={nome}
              onChange={(e) =>
                setNome(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="cad-group">
            <label>Endereço</label>

            <input
              type="text"
              placeholder="Rua, número..."
              value={descricao}
              onChange={(e) =>
                setDescricao(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="cad-grid-2">
            <div className="cad-group">
              <label>Latitude</label>

              <input
                type="number"
                step="any"
                placeholder="-26.42432"
                value={latitude}
                onChange={(e) =>
                  setLatitude(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="cad-group">
              <label>Longitude</label>

              <input
                type="number"
                step="any"
                placeholder="-51.30595"
                value={longitude}
                onChange={(e) =>
                  setLongitude(
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="cad-group">
            <label>
              Status de
              acessibilidade
            </label>

            <select
              value={
                statusAcessibilidade
              }
              onChange={(e) =>
                setStatusAcessibilidade(
                  e.target.value as
                  | 'ACESSIVEL'
                  | 'PARCIALMENTE ACESSIVEL'
                  | 'INACESSIVEL'
                )
              }
            >
              <option value="ACESSIVEL">
                Acessível
              </option>

              <option value="PARCIALMENTE ACESSIVEL">
                Parcialmente
                acessível
              </option>

              <option value="INACESSIVEL">
                Não acessível
              </option>
            </select>
          </div>

          <div className="cad-check-grid">
            <label className="cad-check">
              <input
                type="checkbox"
                checked={temRampa}
                onChange={(e) =>
                  setTemRampa(
                    e.target.checked
                  )
                }
              />

              <span>Rampa</span>
            </label>

            <label className="cad-check">
              <input
                type="checkbox"
                checked={
                  temBanheiroAcessivel
                }
                onChange={(e) =>
                  setTemBanheiroAcessivel(
                    e.target.checked
                  )
                }
              />

              <span>
                Banheiro acessível
              </span>
            </label>

            <label className="cad-check">
              <input
                type="checkbox"
                checked={temElevador}
                onChange={(e) =>
                  setTemElevador(
                    e.target.checked
                  )
                }
              />

              <span>Elevador</span>
            </label>

            <label className="cad-check">
              <input
                type="checkbox"
                checked={temPortaLarga}
                onChange={(e) =>
                  setTemPortaLarga(
                    e.target.checked
                  )
                }
              />

              <span>
                Porta larga
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="cad-button"
          >
            + Cadastrar Lugar
          </button>
        </form>
      </main>
    </div>
  );
}