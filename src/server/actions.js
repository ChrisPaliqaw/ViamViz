import HttpError from '@wasp/core/HttpError.js'

export const createRobot = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Robot.create({
    data: {
      name: args.name,
      secret: args.secret,
      url: args.url,
      user: { connect: { id: context.user.id } }
    }
  });
}
