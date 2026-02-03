# EmailJS Setup Instructions

This application uses EmailJS to send consultation form submissions to `jack_li@reallife.sg`.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. **Save your Service ID** - you'll need this later

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Subject:** New Consultation Request from {{from_name}}

**Content:**
```
New consultation request received!

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Current System: {{current_system}}

Requirements:
{{requirements}}

---
You can reply directly to this email to respond to {{from_name}}.
```

4. **Important:** Make sure to use these exact variable names in your template:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{company}}`
   - `{{current_system}}`
   - `{{requirements}}`
   - `{{to_email}}` (optional, but set to jack_li@reallife.sg)

5. In template settings:
   - Set **To Email** to: `jack_li@reallife.sg`
   - Set **From Name** to: `{{from_name}}`
   - Set **Reply To** to: `{{from_email}}`

6. **Save your Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (or go to **API Keys**)
3. Copy the Public Key

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Replace the placeholder values with your actual values from EmailJS

## Step 6: Restart Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Testing

1. Fill out the consultation form on your website
2. Submit the form
3. Check the email inbox for `jack_li@reallife.sg`
4. You should receive the consultation request email

## Troubleshooting

- **"EmailJS configuration is missing"**: Make sure all three environment variables are set in your `.env` file
- **Email not received**: Check your EmailJS dashboard for error logs
- **Template variables not working**: Make sure variable names in your template match exactly (case-sensitive)
- **CORS errors**: EmailJS handles CORS automatically, but make sure your domain is allowed in EmailJS settings if needed

## Security Notes

- Never commit your `.env` file to version control (it's already in `.gitignore`)
- The Public Key is safe to expose in frontend code (it's designed for client-side use)
- EmailJS free tier has rate limits (200 emails/month)
