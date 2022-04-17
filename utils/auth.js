// code copied from the University of Texas Code Bootcamp module 14 project
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
};
  
module.exports = withAuth;