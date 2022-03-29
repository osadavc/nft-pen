import * as Types from '../../graphql';

export type GetCodePensByMeQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type GetCodePensByMeQuery = { __typename?: 'query_root', codepens: Array<{ __typename?: 'codepens', id: number, nftId: number, penAuthor: string, penId: string, penTitle: string }> };
