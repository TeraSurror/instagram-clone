import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['Boolean'];
  register: User;
  login: User;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  image: Scalars['String'];
  caption: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  image: Scalars['String'];
  caption: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['Int']>;
  creator: User;
};

export type Query = {
  __typename?: 'Query';
  post: Post;
  posts: Array<Maybe<Post>>;
  me?: Maybe<User>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'caption' | 'likes' | 'image' | 'creatorId'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    ) }
  )>> }
);


export const PostsDocument = gql`
    query Posts {
  posts {
    id
    caption
    likes
    image
    creatorId
    creator {
      id
      username
      email
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;