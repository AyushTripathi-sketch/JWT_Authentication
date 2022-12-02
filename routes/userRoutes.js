const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { upload,getFile } = require('../utils/uploadFile')
const sendEmail = require('../utils/email')
const { User } = require("../models/userModel")
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, city, age } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPass = await bcrypt.hash(password, 12);

    user = new User({
      email: email,
      password: hashedPass,
      first_name: first_name,
      last_name: last_name,
      city: city,
    });

    const newUser = await user.save();

    payload = {
      user: {
        _id: newUser._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(201).json({ token: token, success: true, message: "User created" });

    await sendEmail({
      email: user.email,
      subject: 'Account Created',
      message: 'Congratulations!!, Your new account has been created',
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    payload = {
      user: {
        _id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    return res.status(200).json({ success: true, message: "User Logged In", token:token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.post('/upload', upload.single('image'), (req, res) => {
    res.send(req.file.location);
})

router.get('/image/',(req,res)=>{
    const key = req.query.image_id;
    console.log(key)
    try{
        return res.status(200).sendFile(getFile(key));
    }catch(error){
        return res.status(500).json({success: false,message:"Server Error"});
    }
})


module.exports = router;
