export interface Lugar {
  id: number;
  nome: string;
  descricao?: string;

  localizacao: {
    type: 'Point';
    coordinates: [number, number];
  };

  statusAcessibilidade: 'ACESSIVEL' | 'PARCIALMENTE ACESSIVEL' | 'INACESSIVEL';

  urlImagem?: string;

  temRampa: boolean;
  temBanheiroAcessivel: boolean;
  temElevador: boolean;
  temPortaLarga: boolean;
}