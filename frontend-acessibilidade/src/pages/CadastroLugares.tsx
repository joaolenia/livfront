import { useState } from 'react';

import './CadastroLugares.css';

import type { Lugar } from '../types/lugar';

interface Props {
  onAdicionarLugar: (lugar: Lugar) => void;
}

export function CadastroLugares({
  onAdicionarLugar,
}: Props) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] =
    useState('');

  // ✅ TIPAGEM CORRETA
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

    // LIMPAR FORMULÁRIO

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
    <div className="cadastro-container">
      <aside className="cadastro-sidebar">
        <div className="cadastro-header">
          <img
            src="/fundo.png"
            alt="Cadastro"
            className="cadastro-image"
          />

          <div className="overlay">
            <h1>
              Cadastro de Lugares
            </h1>

            <p>
              Adicione locais acessíveis
              ao mapa
            </p>
          </div>
        </div>
      </aside>

      <main className="cadastro-content">
        <form
          className="cadastro-form"
          onSubmit={handleSubmit}
        >
          <h2>Novo Local</h2>

          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              placeholder="Nome do local"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
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

          <div className="grid-2">
            <div className="form-group">
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

            <div className="form-group">
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

          <div className="form-group">
            <label>
              Status de acessibilidade
            </label>

            <select
              value={
                statusAcessibilidade
              }

              // ✅ CAST CORRETO
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
                Parcialmente acessível
              </option>

              <option value="INACESSIVEL">
                Não acessível
              </option>
            </select>
          </div>

          <div className="checkbox-grid">
            <label>
              <input
                type="checkbox"
                checked={temRampa}
                onChange={(e) =>
                  setTemRampa(
                    e.target.checked
                  )
                }
              />

              Rampa
            </label>

            <label>
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

              Banheiro acessível
            </label>

            <label>
              <input
                type="checkbox"
                checked={temElevador}
                onChange={(e) =>
                  setTemElevador(
                    e.target.checked
                  )
                }
              />

              Elevador
            </label>

            <label>
              <input
                type="checkbox"
                checked={temPortaLarga}
                onChange={(e) =>
                  setTemPortaLarga(
                    e.target.checked
                  )
                }
              />

              Porta larga
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            + Cadastrar Lugar
          </button>
        </form>
      </main>
    </div>
  );
}