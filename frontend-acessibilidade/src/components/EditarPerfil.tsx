import './EditarPerfil.css';

type Props = {
  aberto: boolean;
  fechar: () => void;

  nome: string;
  email: string;
  cidade: string;

  setNome: (valor: string) => void;
  setEmail: (valor: string) => void;
  setCidade: (valor: string) => void;
};

export function EditarPerfil({
  aberto,
  fechar,
  nome,
  email,
  cidade,
  setNome,
  setEmail,
  setCidade
}: Props) {

  if (!aberto) return null;

  return (
    <div className="editar-overlay">

      <div className="editar-modal">

        <div className="editar-header">

          <h2>Editar perfil</h2>

          <button
            className="editar-close"
            onClick={fechar}
          >
            ✕
          </button>

        </div>

        <div className="editar-form">

          <div className="editar-group">
            <label>Nome</label>

            <input
              type="text"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />
          </div>

          <div className="editar-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="editar-group">
            <label>Cidade</label>

            <input
              type="text"
              value={cidade}
              onChange={(e) =>
                setCidade(e.target.value)
              }
            />
          </div>

          <button
            className="editar-salvar"
            onClick={fechar}
          >
            Salvar alterações
          </button>

        </div>

      </div>

    </div>
  );
}