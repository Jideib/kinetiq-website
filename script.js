/// ============================================================
// GOOGLE APPS SCRIPT - NEWSLETTER SIGNUP (with Name + Email)
// ============================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrjKmlSqq55TVzr9Q8Rt7CpTHVedSm8fkajL8rz0bxRYjvf0bliNSmbeRbvYOD7PcrZw/exec";

const form = document.getElementById('waitlist-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const feedbackDiv = document.getElementById('form-feedback');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            feedbackDiv.innerHTML = 'Please enter your name.';
            feedbackDiv.style.color = '#F5A623';
            return;
        }

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
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
            });

            const result = await response.json();

            if (result.status === 'success') {
                feedbackDiv.innerHTML = `Thanks ${name}! Your first intelligence brief arrives next week.`;
                feedbackDiv.style.color = '#F5A623';
                nameInput.value = '';
                emailInput.value = '';
            } else {
                feedbackDiv.innerHTML = result.message || 'Something went wrong. Please try again.';
                feedbackDiv.style.color = '#D48A14';
            }
        } catch (err) {
            console.error('Error:', err);
            feedbackDiv.innerHTML = 'Unable to connect. Please try again later.';
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
const GOOGLE_CALENDAR_URL = "https://calendar.app.google/wAUe5YahJJEQs8He6";

const calendarBtn = document.getElementById('googleCalendarTrigger');
if (calendarBtn) {
  calendarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (GOOGLE_CALENDAR_URL !== "https://calendar.app.google/wAUe5YahJJEQs8He6") {
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
    if (GOOGLE_CALENDAR_URL !== "https://calendar.app.google/wAUe5YahJJEQs8He6") {
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
