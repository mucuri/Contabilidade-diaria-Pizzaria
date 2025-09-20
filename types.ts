
export interface PizzaCounts {
  mesa: number;
  levar: number;
  entrega: number;
}

export type PaymentType = 'pix' | 'dinheiro' | 'cartao' | 'online';

export interface Payments {
  pix: number[];
  dinheiro: number[];
  cartao: number[];
  online: number[];
}
