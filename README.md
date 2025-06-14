🌐 https://04task-bleh.vercel.app

🚀 Overview
As part of the Front-End Developer Test, I was tasked to recreate a responsive UI similar to GoStudent’s order form while integrating advanced front-end techniques AND ensuring WordPress compatibility.

This project is a complete solution that delivers:

✅ Full front-end UI
✅ API connection via WordPress
✅ Dynamic form with validation
✅ RTL support
✅ WordPress theme structure

🧱 Technologies Used

Area               | Stack
------------------|-------------------------------
Front-End          | React (Vite), MUI
Form Validation    | React Hook Form + Zod
State Management   | React Hook Form context
i18n / RTL Support | react-i18next
WP API Integration | Custom REST API in functions.php
Theme Integration  | Built as a WordPress theme

🖌️ UI Details
The UI consists of a multi-section form styled with Material UI:

📱 Phone number fields (with country code dropdown)
💬 Contact info fields (email, full name)
🏠 Billing address section
📆 Monthly session selection (with dynamic pricing)
💳 Payment method (SEPA / Credit Card – with icons)
✅ Terms acceptance (validated)

Everything is responsive using MUI Grid/Flexbox, and RTL support is activated on language change.

✅ Validation Logic
Form is validated using:

- Zod schema in schema.js
- React Hook Form for easy integration
- Error messages show instantly, and invalid inputs are prevented

💡 Example validations:
- Phone must contain digits only
- Email must be valid
- Fields like full name, address, sessions, payment method are all required
- Checkbox for terms must be checked

💳 Card Validation & Phone Input
- قمت بعمل validation لبطاقات الدفع من خلال ملف schema.js باستخدام مكتبة Zod.
- استخدمت مكتبة react-phone-input-2 لعرض قائمة الدول بالأعلام وكود الدولة في حقل الهاتف.
- وتم دمجها بالكامل مع React Hook Form لتحقيق التكامل وسهولة التحقق من صحة البيانات.

📦 Pricing Logic
We use a base object for session prices like:

const pricing = {
  8: { regular: 14.8, discounted: 14.0 },
  12: { regular: 29.6, discounted: 28.6 },
  16: { regular: 44.4, discounted: 42.9 },
};

When the user changes session count or months, the total price updates dynamically in the order preview.

🌍 RTL & Multilingual Support
Integrated using react-i18next.

Language switcher in the UI (🇬🇧 / 🇪🇬)

When language is switched:
- Text direction (dir) flips (ltr/rtl)
- Translations come from locales/en/translation.json and locales/ar/translation.json

🧩 WordPress Theme Integration
The React app was turned into a full WordPress theme by:

- Building React using vite build
- Moving output into a custom theme folder
- Enqueuing CSS/JS in functions.php with type="module" for ES modules
- Adding fallback index.php and style.css with WP metadata

Once copied into wp-content/themes, the theme:
- Appears in the WP dashboard
- Can be activated directly
- Loads the React app as the full front-end

🔁 API Integration
I created a custom REST endpoint in WordPress via functions.php:

add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/submit', [
    'methods' => 'POST',
    'callback' => 'handle_form_submission',
    'permission_callback' => '__return_true',
  ]);
});

When the form is submitted in React, it POSTs to:

http://localhost:10010/wp-json/custom/v1/submit

In the backend:
- The data is logged / processed
- You can later extend it to store in DB / send email / etc.

📂 Project Structure

task-04/
├── gostudent-theme/
│   ├── dist/               → React build files
│   ├── functions.php       → Enqueue + API
│   ├── index.php           → WordPress entry
│   └── style.css           → Theme metadata
│
└── reactapp/
    └── src/Components/     → All React components
        └── BookingForm.jsx
        └── OrderReview.jsx
        └── UserFormFields.jsx
    └── src/schema.js       → Zod validation

📦 How to Run

🔧 In WordPress:
1. Copy gostudent-theme/ to your local WordPress /wp-content/themes
2. Activate the theme from Appearance → Themes
3. Make sure WordPress is running locally (e.g., localhost:10010)
4. Open the site — React UI is fully embedded!

💡 Optional:
You can also explore the original reactapp/ folder for development or improvements.

📝 Notes
- No need for Contact Form 7, everything is handled via custom REST endpoint
- Fully client-side rendered and responsive
- Works inside WordPress without using iframes or plugins
