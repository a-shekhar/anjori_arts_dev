package com.anjoriarts.service;

import com.anjoriarts.common.Consonants;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Override
    public void sendOTP(String recipientEmail, String firstName, String term, String otp) {
        try{
            String subject = term + " Verification - " + Consonants.COMPANY_NAME;
            String htmlContent = this.generateHtmlOtpVerificationEmailContent(firstName, term, otp);

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
}
