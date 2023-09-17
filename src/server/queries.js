import HttpError from '@wasp/core/HttpError.js'

export const getRobots = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Robot.findMany({
    where: {
      userId: context.user.id
    }
  });
}
