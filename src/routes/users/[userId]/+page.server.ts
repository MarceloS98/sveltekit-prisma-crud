import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from '@sveltejs/kit' 
import { prisma } from "$lib/server/prisma";

export const load = (async ({params}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.userId)
    }
  })
  if(!user){
    throw error (404, {message: 'User not found'})
  }

  return user

}) satisfies PageServerLoad

export const actions = {

  updateUser: async({ request, params }) => {
    const { userId } = params
    const { name, email } = Object.fromEntries(await request.formData()) as { name: string, email: string }

    if (!name || !email) {
      throw fail(400, { message: 'Name and email are required' })
    }
    
    try {
      await prisma.user.update({
        where: {
          id: Number(userId)
        },
        data: {
          name: name,
          email: email
        }
      })      
    } catch (error) {
      console.error(error)
      return fail(500, { message: 'Something went wrong' })
    }
    
    throw redirect(303, `/users`)
    

  }

} satisfies Actions