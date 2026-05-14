import { useState } from 'react';
import './CadastroUsuarios.css';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  latitude: number | null;
  longitude: number | null;
  possuiDeficiencia: boolean;
  deficiencia: string;
  fotoPerfil: File | null;
}

interface Props {
  onCadastrarUsuario: (usuario: Usuario) => void;
}

export function CadastroUsuarios({ onCadastrarUsuario }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cidade, setCidade] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [possuiDeficiencia, setPossuiDeficiencia] = useState(false);
  const [deficiencia, setDeficiencia] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);

  async function pegarLocalizacao() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await response.json();

          const cidadeAtual =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            '';

          setCidade(cidadeAtual);
        } catch {
          alert('Erro ao obter localização.');
        }
      },
      () => {
        alert('Permissão de localização negada.');
      }
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const novoUsuario: Usuario = {
      id: Date.now(),
      nome,
      email,
      senha,
      cidade,
      latitude,
      longitude,
      possuiDeficiencia,
      deficiencia,
      fotoPerfil,
    };

    onCadastrarUsuario(novoUsuario);

    setNome('');
    setEmail('');
    setSenha('');
    setCidade('');
    setLatitude(null);
    setLongitude(null);
    setPossuiDeficiencia(false);
    setDeficiencia('');
    setFotoPerfil(null);
  }

  return (
    <div className="user-container">

      {/* SIDEBAR PADRÃO DO PROJETO */}
      <aside className="user-sidebar">
        <div className="sidebar-overlay">
          <h1>Cadastro de Usuário</h1>
          <p>Crie sua conta para acessar a plataforma.</p>
        </div>

        <button className="btn-home">HOME</button>
      </aside>

      {/* CONTEÚDO */}
      <main className="user-content">
        <form className="user-form" onSubmit={handleSubmit}>

          <div className="form-header">
            <h2>Novo Usuário</h2>
            <p>Preencha suas informações</p>
          </div>

          {/* GRID PRINCIPAL */}
          <div className="grid-2">
            <div className="input-group">
              <label>Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* LOCALIZAÇÃO */}
          <div className="section">
            <h3>Localização</h3>

            <div className="location-row">
              <input
                type="text"
                placeholder="Cidade detectada"
                value={cidade}
                disabled
              />

              <button
                type="button"
                onClick={pegarLocalizacao}
              >
                📍 Detectar
              </button>
            </div>
          </div>

          {/* ACESSIBILIDADE */}
          <div className="section">
            <h3>Acessibilidade</h3>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={possuiDeficiencia}
                onChange={(e) =>
                  setPossuiDeficiencia(e.target.checked)
                }
              />
              Possui alguma deficiência?
            </label>

            {possuiDeficiencia && (
              <input
                className="mt"
                type="text"
                placeholder="Ex: Visual, Auditiva..."
                value={deficiencia}
                onChange={(e) =>
                  setDeficiencia(e.target.value)
                }
                required
              />
            )}
          </div>

          {/* FOTO */}
          <div className="section">
            <h3>Foto de Perfil</h3>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFotoPerfil(e.target.files?.[0] || null)
              }
            />
          </div>

          <button type="submit" className="submit-btn">
            + Cadastrar Usuário
          </button>

        </form>
      </main>
    </div>
  );
}