// ============================================================
// GOOGLE APPS SCRIPT EMAIL COLLECTION
// ============================================================
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
// After deploying your Apps Script, copy the URL and paste it below
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

const form = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email-input');
const feedbackDiv = document.getElementById('form-feedback');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      feedbackDiv.innerHTML = 'Please enter a valid email address.';
      feedbackDiv.style.color = '#F5A623';
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending ...';
    submitBtn.disabled = true;

    try {
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        localStorage.setItem('kinetiq_waitlist_email', email);
        feedbackDiv.innerHTML = 'Thanks! Your email has been saved. (Demo mode - Apps Script not configured)';
        feedbackDiv.style.color = '#F5A623';
        emailInput.value = '';
        console.log('Lead captured (localStorage fallback):', email);
      } else {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `email=${encodeURIComponent(email)}`
        });

        feedbackDiv.innerHTML = 'Thanks! Your first intelligence brief arrives next week.';
        feedbackDiv.style.color = '#F5A623';
        emailInput.value = '';
        console.log('Lead sent to Google Sheet:', email);
      }
    } catch (err) {
      console.error('Error:', err);
      feedbackDiv.innerHTML = 'Unable to subscribe. Please try again later.';
      feedbackDiv.style.color = '#D48A14';
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      setTimeout(() => {
        if (feedbackDiv.innerHTML.includes('Thanks')) {
          feedbackDiv.innerHTML = '';
        }
      }, 4000);
    }
  });
}

// ============================================================
// GOOGLE CALENDAR APPOINTMENT SCHEDULER
// ============================================================
// Replace this URL with your Google Calendar booking link
// To get your link: Google Calendar → Create → Appointment schedule → Share → Copy link
const GOOGLE_CALENDAR_URL = "YOUR_GOOGLE_CALENDAR_BOOKING_LINK_HERE";

const calendarBtn = document.getElementById('googleCalendarTrigger');
if (calendarBtn) {
  calendarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (GOOGLE_CALENDAR_URL !== "YOUR_GOOGLE_CALENDAR_BOOKING_LINK_HERE") {
      window.open(GOOGLE_CALENDAR_URL, '_blank');
    } else {
      alert('📅 Google Calendar booking link coming soon. For now, please email hello@kinetiqgrowthlab.com to schedule a call.');
    }
  });
}

// Nav CTA triggers the same booking flow
const navCta = document.querySelector('.btn-outline-gold');
if (navCta) {
  navCta.addEventListener('click', (e) => {
    e.preventDefault();
    if (GOOGLE_CALENDAR_URL !== "YOUR_GOOGLE_CALENDAR_BOOKING_LINK_HERE") {
      window.open(GOOGLE_CALENDAR_URL, '_blank');
    } else {
      alert('📅 Google Calendar booking link coming soon. For now, please email hello@kinetiqgrowthlab.com to schedule a call.');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    if (targetId === "#lead-form" || targetId === "#services" || targetId === "#work" || targetId === "#consulting") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Intelligence briefs button scroll
const briefButton = document.querySelector('.btn-secondary');
if(briefButton) {
  briefButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
  });
}
