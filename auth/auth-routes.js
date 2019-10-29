//import express and cookies
var cookieSession = require('cookie-session')
var express = require('express')

//import assert for checking and keygrip for key generation/handling
var assert = require('assert')
var Keygrip = require('keygrip'), keylist, keys, hash, index

//establish a name for usage throughout
var app = express()

//set the keys
keylist = ["SEKRIT3", "SEKRIT2", "SEKRIT1"]
keys = Keygrip(keylist)

// .sign returns the hash for the first key
hash = keys.sign("bieberschnitzel")
assert.ok(/^[\w\-]{27}$/.test(hash))
 
// .index returns the index of the first matching key
index = keys.index("bieberschnitzel", hash)
assert.equal(index, 0)
 
// .verify returns the a boolean indicating a matched key
matched = keys.verify("bieberschnitzel", hash)
assert.ok(matched)
 
// .index returns -1 if no item in the array matches
index = keys.index("bieberschnitzel", "o_O")
assert.equal(index, -1)
 
// rotate a new key in, and an old key out
keylist.unshift("SEKRIT4")
keylist.pop()
 
// if index > 0, it's time to re-sign
index = keys.index("bieberschnitzel", hash)
assert.equal(index, 1)
hash = keys.sign("bieberschnitzel")

app.use(cookieSession({
  name: 'loggedIN',
  keys: [/* secret keys */],
  
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  //httpOnly prevents any type of non server side access, like someone injecting a script
  httpOnly: true,
  //sends a duplicate of the key with an encrypted value to reference to check and make sure the key has not been tampered with since being sent/created
  signed: true,
  //if a new key is made with the same name/value as a current one it will simply replace it
  overwrite: true,

}))

module.exports = app;