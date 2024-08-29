const express = require("express");
const server = express();
const http = require("http");
const SamlStrategy = require("@node-saml/passport-saml").Strategy;

passport.use(
  new SamlStrategy(
    {
      issuer: sp.issuer,
      callbackUrl: sp.callbackUrl,
      entryPoint: idp.signonUrl,
      logoutUrl: idp.logoutUrl,
      cert: idp.cert,
      disableRequestedAuthnContext: true,
      privateCert: readFileSync(CONFIG.authentication.privateCert, "utf-8"),
      acceptedClockSkewMs: -1,
      identifierFormat: null,
      signatureAlgorithm: "sha256",
    },
    function (profile, done) {
      // for signon
      console.log(profile);
    },
    function (profile, done) {
      // for logout
      findByNameID(profile.nameID, function (err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    }
  )
);

const httpServer = http.createServer(server);
httpServer.listen("3000", () => {
  console.log("server is running");
});
