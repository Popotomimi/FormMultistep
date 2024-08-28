const nodemailer = require("nodemailer");
const User = require("../models/Users");

exports.addUser = async (req, res) => {
  const { name, email, review, comment } = req.body;

  const user = new User({
    name,
    email,
    review,
    comment,
  });

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422).json({
      message: "E-mail já cadastrado, utilize outro",
    });
    return;
  }

  try {
    await user.save();

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "roberto_o7@outlook.com",
        pass: "coloca sua senha aqui",
      },
    });

    // Opções do e-mail
    const mailOptions = {
      from: "roberto_o7@outlook.com",
      to: email,
      subject: "Bem-vindo!",
      text: `Olá ${name}, obrigado por se cadastrar! \n Seu cupom de desconto: CUPOM10%`,
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("E-mail enviado: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
