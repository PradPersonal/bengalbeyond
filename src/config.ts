/**
 * Business details — edit this one file to change name, phone, WhatsApp, etc.
 * everywhere on the site.
 */
export const site = {
  name: 'Kolkata Local Tours',
  tagline: 'Discover the City of Joy with a local',
  description:
    'Guided heritage walks, food trails and day trips from Kolkata — Sundarbans, Shantiniketan, Bishnupur, Mayapur and more. Book directly with a local guide.',

  // WhatsApp number in international format, digits only (91 = India).
  whatsapp: '916290038274',
  phone: '+91 62900 38274',
  email: 'pradyutsah123@gmail.com',
  address: 'Kolkata, West Bengal, India',

  // Optional: free key from https://web3forms.com — enquiries are then emailed to you.
  // Leave empty and the enquiry form opens WhatsApp with the details pre-filled instead.
  web3formsKey: '',

  social: {
    instagram: '',
    facebook: '',
    googleReviews: '',
  },
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(inr: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr);
}
