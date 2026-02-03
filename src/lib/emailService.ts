import emailjs from '@emailjs/browser';

// EmailJS service configuration
// Get these values from https://www.emailjs.com/
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

export interface ConsultationFormData {
  name: string;
  email: string;
  company: string;
  currentSystem: string;
  requirements: string;
}

export const sendConsultationEmail = async (formData: ConsultationFormData): Promise<void> => {
  // Validate environment variables
  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  try {
    // Initialize EmailJS with public key
    emailjs.init(PUBLIC_KEY);

    // Prepare email template parameters
    // These variable names must match your EmailJS template
    const templateParams = {
      to_email: 'jack_li@reallife.sg',
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not provided',
      current_system: formData.currentSystem || 'Not provided',
      requirements: formData.requirements,
      reply_to: formData.email,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      console.log('Email sent successfully:', response);
    } else {
      throw new Error(`Email service returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
