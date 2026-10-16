interface StringProperty {
  type: 'string';
  jsonSchema?: {
    enum: Array<string>;
  };
}

interface DateProperty {
  type: 'date';
}

interface BooleanProperty {
  type: 'boolean';
}

interface NumberProperty {
  type: 'number';
}

export interface ObjectProperty {
  itemType: 'object';
  objectProperties: Record<string, { type: 'string' | 'date' | 'boolean' | 'number' }>;
}

export type EntityProperties =
  | StringProperty
  | DateProperty
  | BooleanProperty
  | NumberProperty
  | ObjectProperty;

export interface EntityModel {
  name: 'string';
  properties: {
    [key: string]: EntityProperties;
  };
  relations: Array<Array<string>>;
}

export interface EntityModelReformatted extends Omit<EntityModel, 'properties'> {
  properties: {
    // EntityModelReformatted is the same than EntityModel but we remove object properties
    [key: string]: Exclude<EntityProperties, ObjectProperty>;
  };
}

export interface GetEntitiesResponse {
  [key: string]: EntityModel;
}

export interface GetEntitiesReformatted {
  [key: string]: EntityModelReformatted;
}
