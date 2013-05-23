var helper          = require('../test-helper'),
    Factory         = helper.Factory,
    passwordHash    = require('password-hash'),
    User            = helper.User;


describe("User", function() {
  describe("validPassword", function(){
    it("should authenticate with a password", function(done) {
        Factory.create("user", { password: passwordHash.generate("p455w0rd") }, function(){ 
        User.findOne({ username: "admin" }, "username password", function(err, user) {
          var testUser = new User(user);
          testUser.validPassword("p455w0rd").should == true
          testUser.validPassword("somethingElse").should == false
        });
        done(); 
      });
    });
  });
});
