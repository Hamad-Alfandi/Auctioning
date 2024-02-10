const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const Seller = require("../models/seller")
const Buyer = require("../models/buyer")
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        let seller = await Seller.findOne({ googleId: profile.id })

        if (seller) return cb(null, seller)

        seller = await Seller.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        })
        return cb(null, seller)
      } catch (err) {
        return cb(err)
      }
    }
  )
)

passport.serializeSeller(function (seller, cb) {
  try {
    if (!seller._id) {
      throw new Error("Seseller object is missing _id property")
    }
    cb(null, seller._id)
  } catch (err) {
    cb(err)
  }
})

passport.deserializeSeller(async function (id, cb) {
  try {
    const seller = await Seller.findById(id)
    cb(null, seller)
  } catch (err) {
    cb(err)
  }
})
