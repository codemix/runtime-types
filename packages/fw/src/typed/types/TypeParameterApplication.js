/* @flow */

import Type from './Type';

import type {IApplicableType} from './';

/**
 * # TypeParameterApplication
 *
 */
export default class TypeParameterApplication extends Type {
  typeName: string = 'TypeParameterApplication';
  parent: IApplicableType;
  typeInstances: Type[] = [];

  accepts (input: any): boolean {
    const {parent, typeInstances} = this;
    return parent.accepts(input, ...typeInstances);
  }

  acceptsType (input: Type): boolean {
    return this.parent.acceptsType(input);
  }

  makeErrorMessage (): string {
    return 'Invalid type parameter application.';
  }

  toString (): string {
    const {parent, typeInstances} = this;
    const {name} = parent;
    if (typeInstances.length) {
      const items = [];
      for (let i = 0; i < typeInstances.length; i++) {
        const typeInstance = typeInstances[i];
        items.push(typeInstance.toString());
      }
      return `${name}<${items.join(', ')}>`;
    }
    else {
      return name;
    }
  }

  toJSON () {
    return {
      typeName: this.typeName,
      typeInstances: this.typeInstances
    };
  }
}
