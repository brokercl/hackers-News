// link on vote
function link (parent, args, context) {
    return context.prisma.vote( { id: parent.id }).link()
}

// user on vote
function user (parent, args, context) {
    return context.prisma.vote( { id: parent.id }).user()
}

module.exports = {
    user,
    link
}