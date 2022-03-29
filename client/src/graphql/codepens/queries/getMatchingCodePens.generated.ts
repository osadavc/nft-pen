import * as Types from '../../graphql';

export type GetMatchingCodePensQueryVariables = Types.Exact<{
  penId: Types.Scalars['String'];
  penAuthor: Types.Scalars['String'];
  penTitle: Types.Scalars['String'];
}>;


export type GetMatchingCodePensQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', codepens: Array<{ __typename?: 'codepens', id: number, nftId: number }> }> };
