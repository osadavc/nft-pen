import * as Types from '../../graphql';

export type AddNewCodePenMutationVariables = Types.Exact<{
  nftId: Types.Scalars['Int'];
  penAuthor: Types.Scalars['String'];
  penId: Types.Scalars['String'];
  penTitle: Types.Scalars['String'];
}>;


export type AddNewCodePenMutation = { __typename?: 'mutation_root', insert_codepens_one?: { __typename?: 'codepens', createdBy: string, id: number, nftId: number, penAuthor: string, penId: string, penTitle: string } | null };
