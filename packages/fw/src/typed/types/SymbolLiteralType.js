/* @flow */

import Type from './Type';

export default class SymbolLiteralType extends Type {
  typeName: string = 'SymbolLiteralType';
  value: Symbol;

  accepts (input: any): boolean {
    return input === this.value;
  }

  acceptsType (input: Type): boolean {
    return input instanceof SymbolLiteralType && input.value === this.value;
  }

  makeErrorMessage (): string {
    return `Value must be exactly: ${this.value.toString()}.`;
  }

  toString () {
    return `typeof ${this.value.toString()}`;
  }

  toJSON () {
    return {
      typeName: this.typeName,
      value: this.value
    };
  }
}