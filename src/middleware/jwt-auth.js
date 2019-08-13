const AuthService = require('../auth/auth-service');

function requireAdminAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    AuthService.getAdminUsername(req.app.get('db'), payload.sub)
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' });
        req.user = user;
        next();
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
}

function requireSchoolAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

<<<<<<< HEAD
    try {
        const payload = AuthService.verifyJwt(bearerToken)
        console.log(payload)
        AuthService.getSchoolUsername(
            req.app.get('db'),
            payload.sub,
        )
            .then(user => {
                if (!user)
                    return res.status(401).json({ error: 'Unauthorized request' })
                console.log('hello2')
                req.user = user
                console.log(user)
                next()
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized request' })
    }
=======
  try {
    const payload = AuthService.verifyJwt(bearerToken);
    AuthService.getSchoolUsername(req.app.get('db'), payload.sub)
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' });
        // console.log('hello2')
        req.user = user;
        // console.log(user)
        next();
        return null;
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
>>>>>>> master
}

function requireTeacherAuth(req, res, next) {
    const authToken = req.get('Authorization') || ''
    let bearerToken
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Missing bearer token' })
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken)
        console.log('payload,', payload)
        AuthService.getTeacherWithUsername(
            req.app.get('db'),
            payload.sub,
        )
            .then(user => {
                if (!user)
                    return res.status(401).json({ error: 'Unauthorized request' })
                req.user = user
                res.json(user)
                next()
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized request' })
    }
}


module.exports = {
<<<<<<< HEAD
    requireAdminAuth,
    requireSchoolAuth,
    requireTeacherAuth
}
=======
  requireAdminAuth,
  requireSchoolAuth
};
>>>>>>> master
