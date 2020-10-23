async function feed(parent, args, context) {
  const where = args.filter ? {
      OR: [
          { description_contains: args.filter},
          { url_contains: args.filter}
      ],
  } : {}

  const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
  })

  // contador total links en BBDD
  const count = await context.prisma
  .linksConnection({
      where,
      skip: args.skip
  })
  .aggregate()
  .count()

  return  {
    links,
    count
  } 
}

function users (parent, args, context, info) {
  return context.prisma.users()
}

/* the user resolver function, is to retrieve a single user,
  for this use case,
  the function receive as argument the {id},
  then, the function return the id of the requested user.
*/
function user (parent, {id}, context, info) {
  return context.prisma.user( {id} )
}

module.exports = {
  feed,
  users,
  user
}
