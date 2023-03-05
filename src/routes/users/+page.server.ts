import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'

export const load = (async () => {
  return {
    users: await prisma.user.findMany()
  }
}) satisfies PageServerLoad

export const actions = {
  createUser: async ({request}) => {
    const data = Object.fromEntries(await request.formData())
    const { name, email } = data as { name: string, email: string }
    
    try {
      await prisma.user.create({
        data: {
          name,
          email
        },
      })
    } catch (error) {
      console.error(error)
      return fail(500, {message: 'Failed to create user'})
    }

    return {
      status: 201,
    }
  },

  deleteUser: async ({ url }) => {
    const id = url.searchParams.get('id')    
    if(!id){
      return fail(400, {message: 'Invalid request'})
    }

    try {
      await prisma.user.delete({
        where: {
          id: Number(id)
        }
      })
    } catch (error) {
      console.error(error)
      return fail(500, {message: 'Failed to delete'})
    }

    return {
      status: 200,
    }
  }
} satisfies Actions