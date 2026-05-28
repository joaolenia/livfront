import './Perfil.css';
import { useState } from 'react';

import { EditarPerfil } from '../components/EditarPerfil';
import { Link } from 'react-router-dom';

export function Perfil() {

    const [modalAberto, setModalAberto] =
        useState(false);

    const [nome, setNome] =
        useState('João Pedro');

    const [email, setEmail] =
        useState('joao@email.com');

    const [cidade, setCidade] =
        useState('General Carneiro');

    return (
        <div className="per-perfil-page">

            <EditarPerfil
                aberto={modalAberto}
                fechar={() =>
                    setModalAberto(false)
                }

                nome={nome}
                email={email}
                cidade={cidade}

                setNome={setNome}
                setEmail={setEmail}
                setCidade={setCidade}
            />

            {/* BANNER */}

            <div className="per-perfil-banner">

                <div className="per-perfil-banner-overlay">

                    {/* TOPO */}

                    <div className="per-perfil-topbar">

                        <Link to="/home">
                            <button className="per-perfil-back">
                                ← Voltar
                            </button>
                        </Link>


                        <button
                            className="per-perfil-edit"
                            onClick={() =>
                                setModalAberto(true)
                            }
                        >
                            Editar perfil
                        </button>

                    </div>

                    {/* USUÁRIO */}

                    <div className="per-perfil-user">

                        <div className="per-perfil-avatar-wrapper">

                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Perfil"
                                className="per-perfil-avatar"
                            />

                            <button className="per-perfil-camera">
                                📷
                            </button>

                        </div>

                        <div className="per-perfil-user-info">

                            <h1>{nome}</h1>

                            <p>{email}</p>

                        </div>

                    </div>

                </div>

            </div>

            {/* CONTEÚDO */}

            <div className="per-perfil-content">

                {/* ESQUERDA */}

                <div className="per-perfil-left">

                    {/* INFORMAÇÕES */}

                    <div className="per-perfil-card">

                        <div className="per-perfil-card-header">
                            <h2>
                                Informações pessoais
                            </h2>
                        </div>

                        <div className="per-perfil-info-list">

                            <div className="per-perfil-info-item">
                                <span>Nome completo</span>

                                <strong>{nome}</strong>
                            </div>

                            <div className="per-perfil-info-item">
                                <span>Email</span>

                                <strong>{email}</strong>
                            </div>

                            <div className="per-perfil-info-item">
                                <span>Cidade</span>

                                <strong>{cidade}</strong>
                            </div>

                            <div className="per-perfil-info-item">
                                <span>Membro desde</span>

                                <strong>
                                    Março de 2026
                                </strong>
                            </div>

                        </div>

                    </div>

                    {/* CONFIGURAÇÕES */}

                    <div className="per-perfil-card">

                        <div className="per-perfil-card-header">
                            <h2>
                                Configurações
                            </h2>
                        </div>

                        <div className="per-perfil-settings">

                            <button>
                                🔔 Notificações
                            </button>

                            <button>
                                🔒 Privacidade
                            </button>

                            <button>
                                🌎 Idioma
                            </button>

                            <button className="per-perfil-logout">
                                🚪 Sair da conta
                            </button>

                        </div>

                    </div>

                </div>

                {/* DIREITA */}

                <div className="per-perfil-right">

                    {/* STATS */}

                    <div className="per-perfil-stats">

                        <div className="per-perfil-stat-card">
                            <h3>18</h3>

                            <p>
                                Locais cadastrados
                            </p>
                        </div>

                        <div className="per-perfil-stat-card">
                            <h3>42</h3>

                            <p>
                                Avaliações feitas
                            </p>
                        </div>

                        <div className="per-perfil-stat-card">
                            <h3>49,8%</h3>

                            <p>
                                Índice de acessibilidade da região
                            </p>
                        </div>

                    </div>

                    {/* LOCAIS */}

                    <div className="per-perfil-card">

                        <div className="per-perfil-card-header">
                            <h2>
                                Últimos locais adicionados
                            </h2>
                        </div>

                        <div className="per-perfil-locais">

                            <div className="per-perfil-local-item">

                                <div className="per-perfil-local-status per-verde"></div>

                                <div>

                                    <h4>
                                        Escola Elay
                                    </h4>

                                    <p>
                                        Local acessível
                                    </p>

                                </div>

                            </div>

                            <div className="per-perfil-local-item">

                                <div className="per-perfil-local-status per-amarelo"></div>

                                <div>

                                    <h4>
                                        Mercearia Bom Jesus
                                    </h4>

                                    <p>
                                        Parcialmente acessível
                                    </p>

                                </div>

                            </div>

                            <div className="per-perfil-local-item">

                                <div className="per-perfil-local-status per-vermelho"></div>

                                <div>

                                    <h4>
                                        Mercado Central
                                    </h4>

                                    <p>
                                        Não acessível
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}