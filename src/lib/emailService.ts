import emailjs from '@emailjs/browser';

// Email delivery strategy (works on static GitHub Pages — no server needed):
//   1) EmailJS  — used when VITE_EMAILJS_* env vars are configured (primary, 200 free/mo)
//   2) FormSubmit.co — zero-config AJAX sender, free tier (fallback so the form ALWAYS works)
//   3) mailto: — last-resort fallback that opens the visitor's own email app
// The Ecomwin inbox is ecomwin.admin@gmail.com (verified working via himalaya).

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const INBOX = 'ecomwin.admin@gmail.com';

export interface ConsultationFormData {
  name: string;
  email: string;
  company: string;
  currentSystem: string;
  requirements: string;
}

async function sendViaFormSubmit(formData: ConsultationFormData): Promise<void> {
  const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not provided',
      current_system: formData.currentSystem || 'Not provided',
      requirements: formData.requirements,
      _subject: `[reallife.sg] Enquiry from ${formData.name} (${formData.company || 'no company'})`,
      _template: 'table',
      _captcha: 'false',
    }),
  });
  if (!res.ok) {
    throw new Error(`FormSubmit returned ${res.status}`);
  }
}

function openMailtoFallback(formData: ConsultationFormData): void {
  const subject = encodeURIComponent(`[reallife.sg] Enquiry from ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\nCurrent system: ${formData.currentSystem || 'Not provided'}\n\nRequirements:\n${formData.requirements}\n\n---\nSent from reallife.sg consultation form`
  );
  window.location.href = `mailto:${INBOX}?subject=${subject}&body=${body}`;
}

export const sendConsultationEmail = async (formData: ConsultationFormData): Promise<void> => {
  if (PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID) {
    try {
      emailjs.init(PUBLIC_KEY);
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: INBOX,
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        current_system: formData.currentSystem || 'Not provided',
        requirements: formData.requirements,
        reply_to: formData.email,
      });
      if (response.status === 200) {
        console.log('Email sent successfully:', response);
        return;
      }
      throw new Error(`Email service returned status: ${response.status}`);
    } catch (error) {
      console.error('EmailJS failed, trying FormSubmit:', error);
    }
  }

  try {
    await sendViaFormSubmit(formData);
    console.log('Enquiry delivered via FormSubmit');
  } catch (error) {
    console.error('FormSubmit failed, opening mailto fallback:', error);
    openMailtoFallback(formData);
  }
};
