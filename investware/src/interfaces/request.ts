export interface IRequest {
  securityType: string;
  faceAmt: number | null;
  CpnRt: string;
  dtMaturity: Date | null | any;
  settlePrc: number | null;
  dtSettle: Date | null | any;
  calcRequest: number[];

  // TODO: for now security type Mortgage is remove in security type
  // Mortgage values
  // DTPASSFACTOR: Date | null;
  // PASSWARM: number | null;
  // PASSFACTOR: number | null;
  // PASSMODEL: string;
  // PREPAYSPEED: number | null;

  // TODO: for now security type Indexed is remove in security type
  // Indexed values
  // IDXRATIOATSETTLE: number | null;
  // INFLATIONRT: number | null;
  // ADJUSTMATURITYYN: boolean;
}
