import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

export const postCartEmail = async (req, res) => {
  const { user_email, user_name } = req.body;
  console.log(user_email, user_name);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });
  const mailOptions = {
    from: NODEMAILER_USER,
    to: `${user_email}`,
    subject: 'Bienvenido a HenryTech!',
    html: `
        <div style="margin:0;padding:0">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff">               
                <tr>
                    <td align="center" style="padding:0">
                        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left">                       
                            <tbody>
                                <tr>
                                    <td style="padding:20px 0px 20px 25px;background:#000000;border:#000000 1px solid;">                        
                                        <img 
                                            src="https://res.cloudinary.com/dd9tlax1c/image/upload/v1669917243/Logo/HenryTechText.png.png"
                                            alt="" width="150" style="height:auto;display:block" class="CToWUd" data-bit="iit"     
                                        >
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:25px;background-color:#fff">
                                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0">
                                            <tbody>
                                                <tr>
                                                    <td style="padding:0;color:#333">
                                                        <h3 style="font-size:18px;margin:0 0 20px 0;font-weight:400;font-family:'Montserrat',sans-serif">
                                                        Hola ${user_name} tienes productos en tu carrito! <img src="https://res.cloudinary.com/dd9tlax1c/image/upload/v1670525604/Images/cart.png" alt="Logo Cart" height="40px">
                                                        </h3>
                                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-weight:300;font-family:'Montserrat',sans-serif">
                                                            Recuerda que tienes productos almacenados en tu carrito, ven a buscarlos antes que se agoten 😞.
                                                        </p>
                                                        <p style="margin:0 0 12px 0;font-size:14px;line-height:24px;font-family:'Montserrat',sans-serif">
                                                            El Staff de HenryTech
                                                        </p>
                                                        <p style="margin:0 0 12px 0;font-size:14px;line-height:24px;font-family:'Montserrat',sans-serif">
                                                            Haz click <a href="https://henry-tech-app.vercel.app/">aquí</a> para volver a nuestra pagina.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
               </tr>
            </table>
        </div>         
        `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).json(req.body);
    }
  });
};
