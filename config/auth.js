const auth = {}

auth.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/users/login');
}

auth.checkAlreadyLoggedIn =  function(req,res,next) {
    if (!req.user) {
      return next();
    } else {
  // If the user object exists, the user is logged in and if they try to log in we redirect them to the home page
      return res.redirect('/');
    }
  }

module.exports = auth;