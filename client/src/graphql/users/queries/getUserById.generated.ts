import * as Types from '../../graphql';

export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', email: string, id: string, name: string } | null };
