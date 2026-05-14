import './Avaliacoes.css';

interface Props {
  aberto: boolean;
  fechar: () => void;
}

export function Avaliacoes({
  aberto,
  fechar
}: Props) {

  if (!aberto) return null;

  const avaliacoes = [

    {
      id: 1,
      nome: 'Maria Clara',
      nota: 5,
      data: '14 Maio 2026',
      comentario:
        'Lugar extremamente acessível, entrada ampla e funcionários muito atenciosos.',
    },

    {
      id: 2,
      nome: 'Carlos Henrique',
      nota: 4,
      data: '10 Maio 2026',
      comentario:
        'Possui rampa e banheiro acessível, porém o estacionamento poderia ser melhor.',
    },

    {
      id: 3,
      nome: 'Fernanda Lima',
      nota: 3,
      data: '08 Maio 2026',
      comentario:
        'O local é parcialmente acessível. Algumas áreas ainda possuem degraus.',
    },

    {
      id: 4,
      nome: 'João Batista',
      nota: 5,
      data: '03 Maio 2026',
      comentario:
        'Muito bom! Ambiente organizado e fácil locomoção.',
    },

    {
      id: 5,
      nome: 'Ana Paula',
      nota: 2,
      data: '01 Maio 2026',
      comentario:
        'Ainda precisa melhorar bastante a acessibilidade.',
    },

  ];

  return (

    <div className="avaliacoes-overlay">

      <div className="avaliacoes-modal">

        <button
          className="avaliacoes-fechar"
          onClick={fechar}
        >
          ✕
        </button>

        <div className="avaliacoes-topo">

          <h2>
            Avaliações do local
          </h2>

          <p>
            Veja a opinião de outras pessoas
          </p>

        </div>

        <div className="avaliacoes-lista">

          {avaliacoes.map(
            (avaliacao) => (

              <div
                key={avaliacao.id}
                className="avaliacao-card"
              >

                <div className="avaliacao-header">

                  <div className="avaliacao-user">

                    <div className="avaliacao-avatar">
                      {
                        avaliacao.nome[0]
                      }
                    </div>

                    <div>

                      <h3>
                        {avaliacao.nome}
                      </h3>

                      <span>
                        {avaliacao.data}
                      </span>

                    </div>

                  </div>

                  <div className="avaliacao-nota">

                    {'★'.repeat(
                      avaliacao.nota
                    )}

                    {'☆'.repeat(
                      5 - avaliacao.nota
                    )}

                  </div>

                </div>

                <p className="avaliacao-texto">
                  {
                    avaliacao.comentario
                  }
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}