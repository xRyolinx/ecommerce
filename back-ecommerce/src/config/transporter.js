import nodemailer from "nodemailer"

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_USE_SSL, // Utiliser true pour SSL/TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
  
// Vérification de la connexion SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur lors de la connexion au serveur SMTP:', error);
    }
    else {
        console.log('Serveur SMTP prêt à envoyer des e-mails.');
    }
});

export default transporter;