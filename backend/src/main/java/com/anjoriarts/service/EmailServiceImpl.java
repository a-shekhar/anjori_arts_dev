package com.anjoriarts.service;

import com.anjoriarts.common.Consonants;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void sendOTP(String recipientEmail, String firstName, String term, String otp) {
        try{
            String subject = term + " Verification - " + Consonants.COMPANY_NAME;
            String htmlContent = this.generateHtmlOtpVerificationEmailContent(firstName, term, otp);

            this.sendEmail(recipientEmail, subject, htmlContent);
        } catch (Exception e) {
            logger.error("Email could not be sent", e);
        }
    }

    @Override
    public void sendWelcomeEmail(String recipientEmail, String firstName) {
        try{
            String subject = "Welcome to " + Consonants.COMPANY_NAME;
            String htmlContent = this.generateHtmlWelcomeEmailContent(firstName);
            //this.sendEmail(recipientEmail, subject, htmlContent);
        } catch (Exception e) {
            logger.error("Email could not be sent", e);
        }
    }


    private void sendEmail(String recipientEmail, String subject, String htmlContent){
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            helper.addTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent , true); // if send as html content

            mailSender.send(message);

            logger.info("Email sent successfully to " + recipientEmail);

        } catch (Exception e) {
            logger.error("Email could not be sent", e);
        }
    }


    private String generateHtmlOtpVerificationEmailContent(String firstName, String term, String otp){
        return """
                <html>
                <body style="font-family: 'Segoe UI', sans-serif; background: #f9f3f0; color: #333; padding: 20px;">
                  <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">
                    <div style="background: #ff9f9f; padding: 24px; text-align: center;">
                      <h1 style="margin: 0; font-size: 24px; color: white;">Anjori Arts</h1>
                      <p style="margin: 6px 0 0; color: white; font-size: 14px;">Bringing your imagination to life</p>
                    </div>
                    <div style="padding: 30px 24px;">
                      <p style="font-size: 18px; margin: 0 0 16px;">Hi <strong>%s</strong>,</p>
                      <p style="font-size: 16px; margin: 0 0 24px;">
                        Thank you for choosing Anjori Arts. To continue with your <strong>%s</strong> process, please use the following OTP:
                      </p>
                      <div style="text-align: center; margin: 30px 0;">
                        <div style="display: inline-block; padding: 12px 24px; background: #222; color: white; font-size: 24px; border-radius: 8px; letter-spacing: 4px;">
                          %s
                        </div>
                      </div>
                      <p style="font-size: 14px; color: #666;">
                        This code is valid for the next %s minutes. Please do not share it with anyone.
                      </p>
                      <p style="font-size: 14px; margin-top: 30px;">
                        With love,<br/>
                        <strong>The Anjori Arts Team</strong>
                      </p>
                    </div>
                    <div style="background: #f1e7e0; padding: 16px; text-align: center; font-size: 12px; color: #777;">
                     Need help? Reach out to us at\s
                     <a href="mailto:%s" style="color: #222;">%s</a> or
                     <a href="mailto:%s" style="color: #222;">%s</a>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(firstName, term, otp, Consonants.EXPIRATION_TIME_IN_MINUTES,
                Consonants.COMPANY_EMAIL_1,  Consonants.COMPANY_EMAIL_1,  Consonants.COMPANY_EMAIL_2,  Consonants.COMPANY_EMAIL_2);
    }

    private String generateHtmlWelcomeEmailContent(String firstName) {
        String htmlContent = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #f9f4f0;
                  font-family: 'Segoe UI', sans-serif;
                }
              </style>
            </head>
            <body>
              <table width="100%%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <tr style="background: linear-gradient(to right, #ff9a9e, #fad0c4);">
                  <td style="padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 26px; color: #3b0a45;">Welcome to <span style="color: #ff4d6d;">Anjori Arts</span> 🎨</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <p style="font-size: 16px; color: #333;">Hello <strong>%s</strong>,</p>
                    <p style="font-size: 16px; color: #555;">
                      We're absolutely thrilled to welcome you to <strong>%s</strong> – a space where imagination dances on canvas. 🌟
                    </p>
                    <p style="font-size: 15px; color: #666; font-style: italic;">
                      “Every artist was first an amateur.” — Ralph Waldo Emerson
                    </p>
                    <p style="font-size: 16px; color: #555;">
                      Whether you're here to browse, buy, or bring your custom visions to life, we promise you a joyful, colorful experience.
                    </p>
        
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://anjori-arts.vercel.app/" target="_blank"
                        style="background: #ff4d6d; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 16px;">
                        Visit Anjori Arts
                      </a>
                    </div>
        
                    <p style="font-size: 15px; color: #888;">
                      If you have any questions or want something custom, just hit reply. We're here to help.
                    </p>
        
                    <p style="font-size: 15px; color: #444;">With color and creativity,</p>
                    <p style="font-size: 16px; color: #3b0a45;"><strong>The Anjori Team</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #f0eaf4; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                    © 2025 Anjori Arts • Made with ❤️ in India
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """.formatted(firstName, Consonants.COMPANY_NAME);
        return htmlContent;
    }
}
