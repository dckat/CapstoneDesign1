export class DroneDto {
  private _id: number;
  private _model_name: string;
  private _maker: string;
  private _usage: string;
  private _picture: string;
  private _specification: number;
  private _weight: number;

  constructor(
    id: number,
    model_name: string,
    maker: string,
    usage: string,
    picture: string,
    specification: number,
    weight: number,
  ) {
    this._id = id;
    this._model_name = model_name;
    this._maker = maker;
    this._usage = usage;
    this._picture = picture;
    this._specification = specification;
    this._weight = weight;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get model_name(): string {
    return this._model_name;
  }
  set model_name(value: string) {
    this._model_name = value;
  }

  get maker(): string {
    return this._maker;
  }
  set maker(value: string) {
    this._maker = value;
  }

  get usage(): string {
    return this._usage;
  }
  set usage(value: string) {
    this._usage = value;
  }

  get picture(): string {
    return this._picture;
  }
  set picture(value: string) {
    this._picture = value;
  }

  get specification(): number {
    return this._specification;
  }
  set specification(value: number) {
    this._specification = value;
  }

  get weight(): number {
    return this._weight;
  }
  set weight(value: number) {
    this._weight = value;
  }
}
