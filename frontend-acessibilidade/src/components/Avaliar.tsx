import { useState } from 'react';

import './Avaliar.css';

interface Props {
  aberto: boolean;
  fechar: () => void;
}

export function Avaliar({
  aberto,
  fechar
}: Props) {

  const [nota, setNota] =
    useState(0);

  const [avaliacao, setAvaliacao] =
    useState('');

  if (!aberto) return null;

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <button
          className="fechar-x"
          onClick={fechar}
        >
          ✕
        </button>

        <h2>
          Avaliar local
        </h2>

        <p className="avaliar-subtitulo">
          Como foi sua experiência?
        </p>

        <div className="estrelas">

          {[1, 2, 3, 4, 5].map(
            (estrela) => (

              <span
                key={estrela}
                className={
                  estrela <= nota
                    ? 'estrela ativa'
                    : 'estrela'
                }

                onClick={() =>
                  setNota(estrela)
                }
              >
                ★
              </span>

            )
          )}

        </div>

        <textarea
          placeholder="Digite sua avaliação..."
          value={avaliacao}
          onChange={(e) =>
            setAvaliacao(
              e.target.value
            )
          }
        />

        <button className="salvar-btn">
          Salvar avaliação
        </button>

      </div>

    </div>
  );
}