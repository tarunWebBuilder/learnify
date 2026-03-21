// Minimal generated shim to keep type-checks working without running convex codegen.
export { query, mutation, action } from 'convex/server'

export type DatabaseReader = any
export type DatabaseWriter = any
export type QueryCtx = { db: any; auth?: any }
export type MutationCtx = { db: any; auth?: any }
export type ActionCtx = { runQuery: any; runMutation: any; auth?: any }
export type TableNames = 'blogs'
export type Id<TableName extends string = string> = string
