var express = require('express')
var request = require('request')
var jwt = require('jsonwebtoken')
var app = express()
var port = 4000

var CONFIG = require('./config')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function(req,res) {
  res.render('home',{
    oauthAuthorizeUrl: CONFIG.oauthAuthorizeUrl,
    oauthClientId: CONFIG.clientId,
    oauthScope: CONFIG.oauthScope
  })  
})

app.get('/callback', function(req, res) {
  var code = req.query.code

  console.info(`Auth Code: ${code}`)

  var oauthConfig = {
    json: {
      client_id: CONFIG.clientId,
      client_secret: CONFIG.clientSecret,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:4000/callback"
    },
    rejectUnauthorized: false
  }

  var url = CONFIG.oauthTokenUrl
  request.post(url, oauthConfig, function(error1, res1, body1) {
    var accessToken = body1.access_token;
    var idToken = body1.id_token;

    console.info(`Access Token: ${accessToken}`)

    var JWT = jwt.decode(idToken);
    console.info("JWT:")
    console.info(JSON.stringify(JWT))

    var userinfoUrl = CONFIG.oauthUserInfoUrl
    var userinfoConfig = {
      rejectUnauthorized: false,
      headers: {
        "Authorization":`Bearer ${accessToken}`
      }
    }
    request.get(userinfoUrl, userinfoConfig, function(error2, res2, body2) {
      var userInfo = JSON.parse(body2)

      console.info("User Info:")
      console.info(userInfo)

      res.render('results', {
        code: code, 
        accessToken: accessToken,
        jwt: JWT,
        userInfo: userInfo
      })
    })
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})