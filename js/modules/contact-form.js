/* contact-form.js — Client enquiry form.
   Localises placeholders/option labels and posts the enquiry to a Google
   Apps Script Web App, which appends a row to the ARCTEX leads spreadsheet.
   Re-localises on the 'localechange' event from language-toggle.js — so it stays in
   sync with the language toggle without importing the locale module. */

const root = document.documentElement;

/* currentLang — يقرا اللغة الجهاز و اذا ماقدر الافتراضي انجليزي */
function currentLang() {
  return root.getAttribute('lang') === 'ar' ? 'ar' : 'en';
}

/* localiseForm — swap input placeholders + <select> option labels to match
   the given locale, reading the per-language text from data-* attributes. */
function localiseForm(form, lang) {
  form.querySelectorAll('[data-ph-en]').forEach(function (el) {
    el.setAttribute('placeholder', el.getAttribute('data-ph-' + lang) || el.getAttribute('data-ph-en'));
  });
  form.querySelectorAll('option[data-en]').forEach(function (opt) {
    opt.textContent = opt.getAttribute('data-' + lang) || opt.getAttribute('data-en');
  });
}

/* initForm — بالتعريب نستخدم AJAX
   تعريب اولي من 'localechange'
   نرسل عن طريق honeypot
   و الحماية تطبق من Google Sheets
   اذا مافي نموذج استفسار مايصير شي بال#enquiryForm */
export function initForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

/* localiseForm — يطابق اللغة بالفورم و الكتابة */
  localiseForm(form, currentLang());
  document.addEventListener('localechange', function (e) {
    localiseForm(form, e.detail.lang);
  });

  /* Phone field: numbers only. Strip any character that isn't a digit, and
     allow a single leading "+" for the international format (e.g. +96594707575). */
  const phone = form.querySelector('[name="phone"]');
  if (phone) {
    phone.addEventListener('input', function () {
      const v = this.value.replace(/[^0-9+]/g, '');
      this.value = v.replace(/(?!^)\+/g, '');
    });
  }

  /* Name field: require at least two names (first + last). Set a custom
     validity message so the submit handler's checkValidity()/reportValidity()
     surfaces it. Trim + collapse spaces so trailing/double spaces don't count.
     Re-runs on 'localechange' so the message follows the active language. */
  const nameField = form.querySelector('[name="name"]');
  if (nameField) {
    const validateName = function () {
      const words = nameField.value.trim().split(/\s+/).filter(Boolean);
      nameField.setCustomValidity(words.length >= 2 ? '' :
        t('Please enter your full name — first and last.',
          'يُرجى إدخال الاسم الكامل — الاسم الأول واسم العائلة.'));
    };
    nameField.addEventListener('input', validateName);
    document.addEventListener('localechange', validateName);
    validateName();
  }

  /* Email field: require a proper name@domain.tld address with NO subdomains.
     The domain must be a single label + TLD (example.com), OR a single label +
     a known multi-part country TLD (firm.com.kw, name@example.co.uk). Real
     subdomains (sub.example.com) are rejected. Bilingual message, same flow. */
  const emailField = form.querySelector('[name="email"]');
  if (emailField) {
    const EMAIL_RE = /^[^\s@]+@[A-Za-z0-9-]+\.(?:[A-Za-z]{2,}|(?:com|net|org|edu|gov|mil|co)\.[A-Za-z]{2})$/i;
    const validateEmail = function () {
      const v = emailField.value.trim();
      emailField.setCustomValidity(v === '' || EMAIL_RE.test(v) ? '' :
        t('Please enter a valid email address (e.g. name@example.com).',
          'يُرجى إدخال بريد إلكتروني صحيح (مثال: name@example.com).'));
    };
    emailField.addEventListener('input', validateEmail);
    document.addEventListener('localechange', validateEmail);
    validateEmail();
  }

  /* Google Apps Script Web App endpoint (Deploy → Web app, "Anyone" access).
     The bound script's doPost appends a row to the ARCTEX leads sheet from the
     JSON body below. To change destination, redeploy the script on the new
     sheet and swap this /exec URL. Leave empty for DEMO mode (no send). */
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxix0zlPGvFJ9kAVEma1rcFNvVgBkwY6UJ_MpCuexg_8H082mVsaODgLeMUG73MuWeH/exec';

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('f-submit');

  /* t — pick the English or Arabic string for the current locale. */
  function t(en, ar) {
    return currentLang() === 'ar' ? ar : en;
  }

  /* setStatus — write a message into the status line with an ok/err style. */
  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  /* Submit handler: spam-guard, validate, then send (or simulate in demo). */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Honeypot: a filled hidden field means a bot — silently drop. */
    const honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;

    /* Let the browser surface native validation errors and stop. */
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.setAttribute('disabled', 'disabled');
    setStatus(t('Sending…', 'جارٍ الإرسال…'), null);

    /* DEMO mode if no endpoint is configured: fake a short delay, show a
       success notice, reset — but send nothing. */
    if (!ENDPOINT) {
      window.setTimeout(function () {
        setStatus(t('Demo mode — connect a form endpoint to send for real.',
                    'وضع تجريبي — أضف نقطة الإرسال للإرسال الفعلي.'), 'ok');
        submitBtn.removeAttribute('disabled');
        form.reset();
        localiseForm(form, currentLang());
      }, 700);
      return;
    }

    /* Build a plain payload keyed to the sheet columns. We send only the named
       fields (not the honeypot) so the row matches the spreadsheet exactly. */
    const payload = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      phone: (form.querySelector('[name="phone"]') || {}).value || '',
      project_type: (form.querySelector('[name="project_type"]') || {}).value || '',
      message: form.querySelector('[name="message"]').value
    };

    /* POST to the Apps Script Web App as URL-encoded form fields, so the
       script reads each value off e.parameter (e.parameter.name, etc.).
       URLSearchParams sets Content-Type application/x-www-form-urlencoded,
       which is CORS-safelisted — no preflight, so no-cors works. The response
       is opaque (cannot be read), so we treat a settled request as success and
       surface only true network failures as errors. */
    fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(payload)
    })
      /* Request reached Google: thank the visitor and reset the form. */
      .then(function () {
        setStatus(t('Thank you — your enquiry has been sent. We will reply within one business day.',
                    'شكرًا لك — تم إرسال طلبك. سنردّ خلال يوم عملٍ واحد.'), 'ok');
        form.reset();
        localiseForm(form, currentLang());
      })
      /* Network failure: tell the visitor to email us directly. */
      .catch(function () {
        setStatus(t('Network error. Please email us directly at Info@Arctex.co.',
                    'خطأ في الشبكة. يُرجى مراسلتنا مباشرةً على Info@Arctex.co.'), 'err');
      })
      /* Always re-enable the submit button when the request settles. */
      .finally(function () {
        submitBtn.removeAttribute('disabled');
      });
  });
}

/* Done by Mohammed.Moh.M (Triple M) */