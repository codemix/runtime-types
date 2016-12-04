/* @flow */

import Type from './Type';

import type Validation, {IdentifierPath} from '../Validation';

export default class ObjectTypeProperty<T> extends Type {
  typeName: string = 'ObjectTypeProperty';
  key: string;
  value: Type<T>;
  optional: boolean;

  collectErrors (validation: Validation<any>, path: IdentifierPath, input: any): boolean {
    const {optional, key, value} = this;
    if (optional && input[key] === undefined) {
      return false;
    }
    return value.collectErrors(validation, path.concat(key), input[key]);
  }

  accepts (input: Object): boolean {
    if (this.optional && input[this.key] === undefined) {
      return true;
    }
    return this.value.accepts(input[this.key]);
  }

  acceptsType (input: Type<any>): boolean {
    if (!(input instanceof ObjectTypeProperty)) {
      return false;
    }
    return this.value.acceptsType(input.value);
  }

  makeErrorMessage (): string {
    return `Invalid value for property: ${this.key}.`;
  }

  toString (): string {
    return `${this.key}${this.optional ? '?' : ''}: ${this.value.toString()};`;
  }

  toJSON () {
    return {
      typeName: this.typeName,
      key: this.key,
      value: this.value,
      optional: this.optional
    };
  }
}