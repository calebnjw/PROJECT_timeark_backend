import bcrypt from "bcrypt";
import BSON from "BSON";
import passport from "passport";
import passportLocal from "passport-local";

import IUsers from "../../interfaces/user";

const LocalStrategy = passportLocal.Strategy;

export default passport.use(
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username: username }, (error: Error, user: IUsers) => {
      if (error) throw error;
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

// saves user id in request.session.passport.user.
passport.serializeUser((user: any, done) => {
  console.log(user);
  done(null, user.id);
});

// then takes request.session.passport.user.id
// looks up user information in
passport.deserializeUser((id: string, done) => {
  console.log(id);
  UserModel.findOne({ _id: new BSON.ObjectId(id) }, (error, user: any) => {
    const userInformation = {
      username: user.username,
    };
    done(error, userInformation);
  });
});
