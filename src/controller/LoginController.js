const users = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = async  (req, res) => {
    try {
        // Get user input
        // console.log(req.body);
        // return;
        const { username, password } = req.body;
    
        // console.log(username,password);
        // return;

        // Validate user input
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await  users.findOne(
            { where: {
                username: username,
            },
        });

        // console.log(user);
        // return;
    
        if (user && ( await  bcrypt.compare(password, user.password))) {
            // console.log(jwt.sign(user.id));
            // return;
          // Create token
          var token = jwt.sign({
            id: user.id,
        }, process.env.JWT_KEY, {
            expiresIn: "2h" //24h expired
        });
        //   console.log(token);
        //   return;
    
          // save user token    
          user.jwt_token = token;
    
        //   console.log(user.jwt_token);
        //   return;
          var jwt_token ={};
          jwt_token['jwt_token']=user.jwt_token;
          // user
          res.status(200).json(jwt_token);
        }else{
            res.status(400).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
      }
}

