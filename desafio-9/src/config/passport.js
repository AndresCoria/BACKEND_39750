const passport = require('passport')
const local = require('passport-local')
const GitHubStrategy = require('passport-github2')
const { userModel } = require('../dao/mongoDb/model/users.model')
const { hasData, compareData } = require('../utils/usersHash')

const LocalStrategy = local.Strategy

// const initPassportMid = () => {
//   passport.use('register', new LocalStrategy({
//     passReqToCallback: true,
//     usernameField: 'email'
//   }, async (req, username, password, done) =>{
//     const {first_name, last_name} = req.body
//     try {
//       let userDB = await userModel.findOne({email:username})
//       if (userDB) return done(null, false)

//       let newUser = {
//         first_name,
//         last_name,
//         email: username,
//         password: hashData(password)
//       }

//       let result = await userModel.create(newUser)
//       return done(null, result)
//     } catch (error) {
//       return done('error al obtener el usuario' + error)
//     }
//   }))
//   passport.serializeUser((user, done) => {
//     done(null, user._id)
//   })

//   passport.deserializeUser(async (id, done) => {
//     let user = await userModel.findOne({_id: id})
//     done(null, user)
//   })

//   passport.use('login', new LocalStrategy({
//     usernameField: 'email'
//   }, async (username, passqord, done) => {
//     const userDB = await userModel.findOne({email:username})
//     try {
//       if(!userDB) return done(null, false)

//       if(!compareData(password, user)) return done(null, false)
//       return done(null, userDB)
//     } catch (error) {
//       return done(error)
//     }
//   }))
// }

//register
const initPassportMid = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const userDB = await userModel.findOne({ email })
        if (userDB) {
          return done(null, false)
        }
        const hashPassword = await hasData (password)
        const newUser = { ...req.body, password: hashPassword }
        const newUserDB = await userModel.create(newUser)
        done(null, newUserDB)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
  })

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        const user = await userModel.findOne({ email })
        if (!user) {
          return done(null, false)
        }
        const passwordOk = await compareData(password, user.password)
        if (!passwordOk) {
          return done(null, false)
        }
        return done(null, user)
      }
    )
  )
}

const initPassportGitHub = () => {
    //github
passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: "Iv1.4aa3fbf9a93ae5d2",
      clientSecret: "b9275cd78dcbe025433dfc050172c929e3ae3aa2",
      callbackURL: "http://localhost:8080/api/usersMongo/githubcallback",
    },
    // async (accesToken, refresToken, profile, done) => {
    //   const email = profile._json.email
    //   const userDB = await userModel.findOne({ email })
    //   if (userDB) {
    //     done(null, false)
    //   }
    //   const newUser = {
    //     first_name: profile._json.name.split(" ")[0],
    //     last_name: profile._json.name.split(" ")[1] || "",
    //     email,
    //     password: "",
    //   }
    //   const newUserDB = await userModel.create(newUser)
    //   done(null, newUserDB)
    // }
    async (accessToken, refreshtoken, profile, done) => {
      console.log('profile', profile);
      try {
        let user = await userModel.findOne({email: profile._json.email})
        if(!user){
          let newUser = {
            first_name: profile.username,
            last_name: profile.username,
            email: profile._json.email,
            password: ''
          }
          let result = await userModel.create(newUser)
          return done(null, result)
        }
        return done(null, user)
      } catch (error) {
        console.log(error)
      }
    }
  ))
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
  })
}

module.exports = {
  initPassportMid,
  initPassportGitHub
}