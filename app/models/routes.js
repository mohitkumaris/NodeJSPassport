/**
 * Created by Mohit Kumar on 11/24/2017.
 */
module.exports=function (app,passport) {

    app.get('/',function (req,res) {
        res.render('index.ejs');
    });

    app.get('/login',function (req,res) {

        res.render('login.ejs',{message:req.flash('loginmessage')});
    });

    // sign up

    app.get('/signup',function (req,res) {

        res.render('signup.ejs',{message:req.flash('signupmessage')});
    });


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)

    app.get('/profile',function (req,res) {

        res.render('profile.ejs',{
            user:req.user
        });
    });

    app.get('/logout',function (req,res) {

        req.logout();

        res.redirect('/')
    });

    // process for sign up

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect:'/profile',
        failerRedirect:'/signup',
        failureFlash:true


    }))


    // route middleware to make sure a user is logged in
    function isloggedIn(req,res,next) {

        if(req.isAuthenticated()){

            next();
        }

        res.redirect('/');
    }


}