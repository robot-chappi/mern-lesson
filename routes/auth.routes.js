const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router()

router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({min: 6})
], async (req, res) => {
    try {
        // console.log('Body:', req.body)

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
            message: 'Incorrect data'})
        }

        const {email, password} = req.body 

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'Occupied'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'The user is created'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.post(
    '/login',
    [
      check('email', 'Введите корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }
  
      const {email, password} = req.body
  
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
      
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecter'),
        { expiresIn: '1h' }
      )
      
      res.json({ token, userId: user.id })
  
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
  })

module.exports = router