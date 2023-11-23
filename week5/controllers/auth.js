const sql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const util = require('util');
const promisify = util.promisify

const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_password,
    database: process.env.DATABASE
});

exports.register = async (req, res) => {
    console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await dbQuery('SELECT email FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.render('registration', {
                message: 'That email is already in use'
            });
        } else if (password !== confirmPassword) {
            return res.render('registration', {
                message: 'Passwords do not match'
            });
        }
        const hashedPass = await bcrypt.hash(password, 8);
        await dbQuery('INSERT into users SET ?', { username: name, email: email, password: hashedPass });

        return res.render('registration', {
            message: 'User registered'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

function dbQuery(sqlQuery, values) {
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).render('login', {
                message: "Please provide an email and password"
            })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
            console.log(result);
            if(!result || !(await bcrypt.compare(password, result[0].password))){
                res.status(400).render('login', {
                    message: 'Email or password is not correct'
                })
            } else {
                const id = result[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: ", token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                return res.redirect('/profile');
            }
        })
    } catch (error) {
        console.log(error);
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
};

exports.isLoggedIn = async (req, res, next) => {
    console.log("this is the cookies: " , req.cookies);

    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log(decoded);

            // Promisify the database query
            const queryAsync = promisify(db.query).bind(db);
            const result = await queryAsync('SELECT * FROM users WHERE id = ?', [decoded.id]);

            if (!result || result.length === 0) {
                return next();
            }

            req.user = result[0];
            console.log("User is:");
            console.log(req.user);
            return next();
        } catch (error) {
            console.error(error);
            return next(error); // Pass error to error-handling middleware
        }
    } else {
        next();
    }
};
