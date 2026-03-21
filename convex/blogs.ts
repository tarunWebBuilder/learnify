import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const listBlogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('blogs').order('desc').collect()
  },
})

export const upsertBlog = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    exam: v.string(),
    subject: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('blogs')
      .withIndex('bySlug', (q) => q.eq('slug', args.slug))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        exam: args.exam,
        subject: args.subject,
        description: args.description,
      })
      return existing._id
    }

    return await ctx.db.insert('blogs', {
      ...args,
      createdAt: Date.now(),
    })
  },
})
