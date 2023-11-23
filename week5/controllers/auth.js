const sql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    const { email, password } = req.body;

    try {
        const user = await dbQuery('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }

        const match = await bcrypt.compare(password, user[0].password);

        if (match) {
            // Passwords match, create session or token and redirect to a dashboard or profile page
            return res.render('profile', {
                message: 'Login successful!'
            });
        } else {
            return res.render('login', {
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};
