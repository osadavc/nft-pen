export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "codepens" */
export type Codepens = {
  __typename?: 'codepens';
  createdBy: Scalars['String'];
  id: Scalars['Int'];
  nftId: Scalars['Int'];
  penAuthor: Scalars['String'];
  penId: Scalars['String'];
  penTitle: Scalars['String'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "codepens" */
export type Codepens_Aggregate = {
  __typename?: 'codepens_aggregate';
  aggregate?: Maybe<Codepens_Aggregate_Fields>;
  nodes: Array<Codepens>;
};

/** aggregate fields of "codepens" */
export type Codepens_Aggregate_Fields = {
  __typename?: 'codepens_aggregate_fields';
  avg?: Maybe<Codepens_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Codepens_Max_Fields>;
  min?: Maybe<Codepens_Min_Fields>;
  stddev?: Maybe<Codepens_Stddev_Fields>;
  stddev_pop?: Maybe<Codepens_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Codepens_Stddev_Samp_Fields>;
  sum?: Maybe<Codepens_Sum_Fields>;
  var_pop?: Maybe<Codepens_Var_Pop_Fields>;
  var_samp?: Maybe<Codepens_Var_Samp_Fields>;
  variance?: Maybe<Codepens_Variance_Fields>;
};


/** aggregate fields of "codepens" */
export type Codepens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Codepens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "codepens" */
export type Codepens_Aggregate_Order_By = {
  avg?: InputMaybe<Codepens_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Codepens_Max_Order_By>;
  min?: InputMaybe<Codepens_Min_Order_By>;
  stddev?: InputMaybe<Codepens_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Codepens_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Codepens_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Codepens_Sum_Order_By>;
  var_pop?: InputMaybe<Codepens_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Codepens_Var_Samp_Order_By>;
  variance?: InputMaybe<Codepens_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "codepens" */
export type Codepens_Arr_Rel_Insert_Input = {
  data: Array<Codepens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Codepens_On_Conflict>;
};

/** aggregate avg on columns */
export type Codepens_Avg_Fields = {
  __typename?: 'codepens_avg_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "codepens" */
export type Codepens_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "codepens". All fields are combined with a logical 'AND'. */
export type Codepens_Bool_Exp = {
  _and?: InputMaybe<Array<Codepens_Bool_Exp>>;
  _not?: InputMaybe<Codepens_Bool_Exp>;
  _or?: InputMaybe<Array<Codepens_Bool_Exp>>;
  createdBy?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  nftId?: InputMaybe<Int_Comparison_Exp>;
  penAuthor?: InputMaybe<String_Comparison_Exp>;
  penId?: InputMaybe<String_Comparison_Exp>;
  penTitle?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "codepens" */
export enum Codepens_Constraint {
  /** unique or primary key constraint */
  CodepensPkey = 'codepens_pkey'
}

/** input type for incrementing numeric columns in table "codepens" */
export type Codepens_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  nftId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "codepens" */
export type Codepens_Insert_Input = {
  createdBy?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  nftId?: InputMaybe<Scalars['Int']>;
  penAuthor?: InputMaybe<Scalars['String']>;
  penId?: InputMaybe<Scalars['String']>;
  penTitle?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Codepens_Max_Fields = {
  __typename?: 'codepens_max_fields';
  createdBy?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  nftId?: Maybe<Scalars['Int']>;
  penAuthor?: Maybe<Scalars['String']>;
  penId?: Maybe<Scalars['String']>;
  penTitle?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "codepens" */
export type Codepens_Max_Order_By = {
  createdBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
  penAuthor?: InputMaybe<Order_By>;
  penId?: InputMaybe<Order_By>;
  penTitle?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Codepens_Min_Fields = {
  __typename?: 'codepens_min_fields';
  createdBy?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  nftId?: Maybe<Scalars['Int']>;
  penAuthor?: Maybe<Scalars['String']>;
  penId?: Maybe<Scalars['String']>;
  penTitle?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "codepens" */
export type Codepens_Min_Order_By = {
  createdBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
  penAuthor?: InputMaybe<Order_By>;
  penId?: InputMaybe<Order_By>;
  penTitle?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "codepens" */
export type Codepens_Mutation_Response = {
  __typename?: 'codepens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Codepens>;
};

/** on_conflict condition type for table "codepens" */
export type Codepens_On_Conflict = {
  constraint: Codepens_Constraint;
  update_columns?: Array<Codepens_Update_Column>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};

/** Ordering options when selecting data from "codepens". */
export type Codepens_Order_By = {
  createdBy?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
  penAuthor?: InputMaybe<Order_By>;
  penId?: InputMaybe<Order_By>;
  penTitle?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: codepens */
export type Codepens_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "codepens" */
export enum Codepens_Select_Column {
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  Id = 'id',
  /** column name */
  NftId = 'nftId',
  /** column name */
  PenAuthor = 'penAuthor',
  /** column name */
  PenId = 'penId',
  /** column name */
  PenTitle = 'penTitle'
}

/** input type for updating data in table "codepens" */
export type Codepens_Set_Input = {
  createdBy?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  nftId?: InputMaybe<Scalars['Int']>;
  penAuthor?: InputMaybe<Scalars['String']>;
  penId?: InputMaybe<Scalars['String']>;
  penTitle?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Codepens_Stddev_Fields = {
  __typename?: 'codepens_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "codepens" */
export type Codepens_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Codepens_Stddev_Pop_Fields = {
  __typename?: 'codepens_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "codepens" */
export type Codepens_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Codepens_Stddev_Samp_Fields = {
  __typename?: 'codepens_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "codepens" */
export type Codepens_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Codepens_Sum_Fields = {
  __typename?: 'codepens_sum_fields';
  id?: Maybe<Scalars['Int']>;
  nftId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "codepens" */
export type Codepens_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** update columns of table "codepens" */
export enum Codepens_Update_Column {
  /** column name */
  CreatedBy = 'createdBy',
  /** column name */
  Id = 'id',
  /** column name */
  NftId = 'nftId',
  /** column name */
  PenAuthor = 'penAuthor',
  /** column name */
  PenId = 'penId',
  /** column name */
  PenTitle = 'penTitle'
}

/** aggregate var_pop on columns */
export type Codepens_Var_Pop_Fields = {
  __typename?: 'codepens_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "codepens" */
export type Codepens_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Codepens_Var_Samp_Fields = {
  __typename?: 'codepens_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "codepens" */
export type Codepens_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Codepens_Variance_Fields = {
  __typename?: 'codepens_variance_fields';
  id?: Maybe<Scalars['Float']>;
  nftId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "codepens" */
export type Codepens_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  nftId?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "codepens" */
  delete_codepens?: Maybe<Codepens_Mutation_Response>;
  /** delete single row from the table: "codepens" */
  delete_codepens_by_pk?: Maybe<Codepens>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "codepens" */
  insert_codepens?: Maybe<Codepens_Mutation_Response>;
  /** insert a single row into the table: "codepens" */
  insert_codepens_one?: Maybe<Codepens>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "codepens" */
  update_codepens?: Maybe<Codepens_Mutation_Response>;
  /** update single row of the table: "codepens" */
  update_codepens_by_pk?: Maybe<Codepens>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_CodepensArgs = {
  where: Codepens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Codepens_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_CodepensArgs = {
  objects: Array<Codepens_Insert_Input>;
  on_conflict?: InputMaybe<Codepens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Codepens_OneArgs = {
  object: Codepens_Insert_Input;
  on_conflict?: InputMaybe<Codepens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CodepensArgs = {
  _inc?: InputMaybe<Codepens_Inc_Input>;
  _set?: InputMaybe<Codepens_Set_Input>;
  where: Codepens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Codepens_By_PkArgs = {
  _inc?: InputMaybe<Codepens_Inc_Input>;
  _set?: InputMaybe<Codepens_Set_Input>;
  pk_columns: Codepens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  codepens: Array<Codepens>;
  /** An aggregate relationship */
  codepens_aggregate: Codepens_Aggregate;
  /** fetch data from the table: "codepens" using primary key columns */
  codepens_by_pk?: Maybe<Codepens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootCodepensArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};


export type Query_RootCodepens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};


export type Query_RootCodepens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  codepens: Array<Codepens>;
  /** An aggregate relationship */
  codepens_aggregate: Codepens_Aggregate;
  /** fetch data from the table: "codepens" using primary key columns */
  codepens_by_pk?: Maybe<Codepens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootCodepensArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};


export type Subscription_RootCodepens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};


export type Subscription_RootCodepens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  codepens: Array<Codepens>;
  /** An aggregate relationship */
  codepens_aggregate: Codepens_Aggregate;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};


/** columns and relationships of "users" */
export type UsersCodepensArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCodepens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Codepens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Codepens_Order_By>>;
  where?: InputMaybe<Codepens_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  codepens?: InputMaybe<Codepens_Bool_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  picture?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  codepens?: InputMaybe<Codepens_Arr_Rel_Insert_Input>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  codepens_aggregate?: InputMaybe<Codepens_Aggregate_Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  picture?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture'
}
