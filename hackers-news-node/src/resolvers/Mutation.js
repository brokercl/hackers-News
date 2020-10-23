const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

var randomPassword = require('../randomString');
var sendEmail = require('../SendEmail');


async function signup(parent, args, context, info) {
    const isEmail = await context.prisma.user({ email: args.email })
    if (!isEmail) {
        const password = await bcrypt.hash(args.password, 10)
        const user = await context.prisma.createUser({ ...args, password})
        const token = jwt.sign({ userId: user.id}, APP_SECRET)
        return {
            token,
            user
        }
    } else {
        throw new Error('The entered email ' + args.email + ' already exists')
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such email found! ' + args.email)
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid Password!')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user
    }
}

var length = 12;
var tryPassword = '';
var randomPassword = randomPassword.randomString(tryPassword, length); // create new random(length) password
// function that send a Gmail to the email user for recover his forgot password
async function updatePassword (parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (user) {
        console.log(user);

        const hashedRandomPassword = await bcrypt.hash(randomPassword, 10)

        const updatedPassword = await context.prisma.updateUser({
            where: {
              email: args.email,
            },
            data: {
                password: hashedRandomPassword
            },
          })

        if (!updatedPassword) {
           throw new Error('error trying updating password..') 
        } else {
            try {
                sendEmail.sendEmail(randomPassword);
            } catch (error) {
                
            }
            
        }
    } else {
            throw new Error("The entered email " + args.email + " doesn't exists")
    }
    return {
        user
    }

}

function post(parent, { url, description }, context) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url,
    description,
    postedBy: {
      connect: {
        id: userId
      }
    }
  })
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context)
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId }
    })
    if (linkExists) {
        throw new Error(`Already vote for link: ${args.linkId}`)
    }

    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } }        
    })
}

module.exports = {
    signup,
    login,
    updatePassword,
    post,
    vote
}