import { v4 } from 'uuid';

export function toCamelCase(str) {
  str = str.replace(/[-_]/g, ' ');
  const words = str.split(' ');
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return camelCaseWords.join('');
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter, index) => {
    return (index !== 0 ? '_' : '') + letter.toLowerCase();
  });
}

export function classToPlainObject<U = any>(
  instance: InstanceType<any>,
  camel: boolean,
): U {
  const plainObject: any = {};
  const properties = Object.getOwnPropertyNames(instance);

  for (const property of properties) {
    const adjustProperty = camel
      ? toCamelCase(property)
      : toSnakeCase(property);

    plainObject[adjustProperty] = instance[property];
  }
  return plainObject;
}

export function uuidV4(): string {
  return v4();
}
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  } else if (typeof value === 'string' && value.trim() === '') {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  } else if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  } else {
    return false;
  }
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}
