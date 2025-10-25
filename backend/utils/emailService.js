import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send order confirmation email
export const sendOrderConfirmationEmail = async (order, userEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B3D2E;">Thank You For Your Order!</h1>
          <p>Your order has been confirmed and will be shipped soon.</p>
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
          <p><strong>Order Status:</strong> ${order.orderStatus}</p>
          <h3>Items:</h3>
          <ul>
            ${order.items.map(item => `<li>${item.title} x ${item.quantity} - $${item.price.toFixed(2)}</li>`).join('')}
          </ul>
          <p>We'll notify you when your order ships.</p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>Luxury Store Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0B3D2E;">Password Reset</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #D4AF37; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>Luxury Store Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

