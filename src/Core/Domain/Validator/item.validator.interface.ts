export interface ItemValidatorInterface {
  getFieldName(): string;

  required(customMessage?: string): ItemValidatorInterface;

  date(customMessage?: string): ItemValidatorInterface;

  boolean(customMessage?: string): ItemValidatorInterface;

  string(customMessage?: string): ItemValidatorInterface;

  min(min: number, customMessage?: string): ItemValidatorInterface;

  max(max: number, customMessage?: string): ItemValidatorInterface;
}
