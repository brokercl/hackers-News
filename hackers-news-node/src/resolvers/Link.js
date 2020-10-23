function postedBy(parent, args, context) {
  return context.prisma.link( { id: parent.id }).postedBy()
}

// votes on link
function votes(parent, args, context) {
  return context.prisma.link( { id: parent.id }).votes()
}

module.exports = {
  postedBy,
  votes
}