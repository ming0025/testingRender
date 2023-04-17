"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
        const user = await User.findOneAndUpdate(
          {
            googleId: profile.id,
          },
          {
            $set: {
              fullName: profile.displayName,
              googleId: profile.id,
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
