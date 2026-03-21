import { defineSchema, defineTable } from 'convex/schema'
import { v } from 'convex/values'

const blogTable = defineTable({
  title: v.string(),
  exam: v.string(),
  subject: v.string(),
  slug: v.string(),
  description: v.string(),
  createdAt: v.number(),
}).index('bySlug', ['slug'])

const schema = defineSchema({
  blogs: blogTable,
})

export default schema
