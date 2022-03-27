import * as Types from '../../graphql';

export type AddNewUserMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  id: Types.Scalars['String'];
  name: Types.Scalars['String'];
  picture: Types.Scalars['String'];
}>;


export type AddNewUserMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', id: string } | null };
