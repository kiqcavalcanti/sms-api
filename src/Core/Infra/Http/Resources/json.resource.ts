type ResponseData<ToObject> = { data: ToObject[] | ToObject };
type ResponseSingular<ToObject> = { data: ToObject };
type ResponseCollection<ToObject> = { data: ToObject[] };

export abstract class JsonResource<InputData = object, ToObject = object> {
  constructor(
    protected readonly data: InputData | InputData[],
    protected additional: object = Object.create({}),
    protected extra: object = Object.create({}),
  ) {}

  protected abstract toObject(item: InputData | InputData[]): ToObject;

  protected resolveCollection(): ToObject[] {
    if (!Array.isArray(this.data)) {
      throw new Error('invalid parameter');
    }

    return this.data.map(this.toObject);
  }

  protected response(): ResponseData<ToObject> {
    const data = Array.isArray(this.data)
      ? this.resolveCollection()
      : this.toObject(this.data);

    return { data: data, ...this.additional };
  }

  setAdditional<Additional extends object>(data: Additional) {
    this.additional = data;
    return this;
  }

  setExtra<Extra extends object>(data: Extra) {
    this.extra = data;
    return this;
  }

  responseCollection() {
    if (!Array.isArray(this.data)) {
      throw new Error('invalid data');
    }

    console.log(this.response());

    return this.response() as ResponseCollection<ToObject>;
  }

  responseSingular() {
    if (Array.isArray(this.data)) {
      throw new Error('invalid data');
    }

    return this.response() as ResponseSingular<ToObject>;
  }
}
