import { useState } from 'react';
import './Login.css';

interface Props {
  onLogin: (email: string, senha: string) => void;
}

export function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(email, senha);
  }

  return (
    <div className="login-container">

   

      {/* CONTEÚDO */}
      <main className="login-content">

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-header">
            <h2>Entrar</h2>
            <p>Digite seus dados para acessar</p>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <button
              type="button"
              className="forgot"
            >
              Esqueci a senha
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Entrar
          </button>

          <div className="register-link">
            Não possui conta?
            <span> Criar conta</span>
          </div>

        </form>

      </main>

    </div>
  );
}