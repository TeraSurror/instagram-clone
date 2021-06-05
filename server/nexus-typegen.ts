/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { MyContext } from "./src/types/MyContext"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Post: { // root type
    caption?: string | null; // String
    creatorId?: number | null; // Int
    id?: number | null; // Int
    image?: string | null; // String
    likes?: number | null; // Int
  }
  Query: {};
  User: { // root type
    email?: string | null; // String
    id?: number | null; // Int
    username?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createPost: NexusGenRootTypes['Post']; // Post!
    deletePost: boolean; // Boolean!
    deleteUser: boolean; // Boolean!
    login: NexusGenRootTypes['User']; // User!
    logout: boolean; // Boolean!
    register: NexusGenRootTypes['User']; // User!
    updatePost: NexusGenRootTypes['Post']; // Post!
  }
  Post: { // field return type
    caption: string | null; // String
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number | null; // Int
    id: number | null; // Int
    image: string | null; // String
    likes: number | null; // Int
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    post: NexusGenRootTypes['Post']; // Post!
    posts: Array<NexusGenRootTypes['Post'] | null>; // [Post]!
  }
  User: { // field return type
    email: string | null; // String
    id: number | null; // Int
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    username: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createPost: 'Post'
    deletePost: 'Boolean'
    deleteUser: 'Boolean'
    login: 'User'
    logout: 'Boolean'
    register: 'User'
    updatePost: 'Post'
  }
  Post: { // field return type name
    caption: 'String'
    creator: 'User'
    creatorId: 'Int'
    id: 'Int'
    image: 'String'
    likes: 'Int'
  }
  Query: { // field return type name
    me: 'User'
    post: 'Post'
    posts: 'Post'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    posts: 'Post'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createPost: { // args
      caption: string; // String!
      image: string; // String!
    }
    deletePost: { // args
      id: number; // Int!
    }
    deleteUser: { // args
      id: number; // Int!
    }
    login: { // args
      password: string; // String!
      usernameOrEmail: string; // String!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    updatePost: { // args
      caption: string; // String!
      id: number; // Int!
      image: string; // String!
    }
  }
  Query: {
    post: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: MyContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}