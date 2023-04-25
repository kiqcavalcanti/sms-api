export abstract class BaseValueObject<Value> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  protected get value(): Value {
    return this._value;
  }
}
