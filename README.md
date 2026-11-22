# 🕉️ AstroPrakash — Two-Sided Vedic Astrology & Consultation Platform

**AstroPrakash** is an Astrotalk-grade spiritual tech platform built with a **Two-Sided Architecture** (Seeker Portal & Astrologer Portal), complete with **100% Real-time Phone Number Masking**, **Chat DLP Security**, and an **Audio Speech Privacy Sentinel** that automatically severs calls if a phone number is spoken.

---

## 🏛️ Two-Sided Platform Architecture

### 1. 👤 Seeker / Client Portal
* **Homepage (`/`):** Live astrologer ticker, search bar, Prakash AI teaser, categories, verified guru grid, and testimonials.
* **Onboarding & Sign-In (`/signup`, `/login`):** Phone number registration with OTP verification, saving full birth specifics into MongoDB and awarding **₹100 Free Welcome Credit**.
* **Consultations (`/chat-with-astrologer`, `/talk-to-astrologer`):** Direct audio call and live chat directories with per-minute billing and **First Chat FREE** badges.
* **Prakash AI (`/ai-astrologer`):** Interactive AI Vedic astrologer with custom birth chart integration, computing exact Lagna, Moon sign, 10th/7th lords, Mahadasha, and classical Parashari & Lal Kitab remedies.
* **Vedic Self-Service Tools:** Free Janam Kundli (`/free-kundli`), 36 Gunas Kundli Milan (`/kundli-matching`), Daily Horoscopes (`/horoscopes`), and Today's Panchang (`/panchang`).
* **AstroMall (`/astromall`):** Certified gemstones, Rudraksha, pure copper Yantras, and Trimbakeshwar Puja bookings.
* **Razorpay Wallet (`WalletModal`):** Instant top-up via UPI (GPay, PhonePe, Paytm, BHIM), NetBanking, and Cards.

### 2. 🪔 Astrologer / Guru Partner Portal
* **Partner Hub (`/astrologer`):** Onboarding landing page highlighting earnings (₹75k - ₹3.5L/month), weekly payouts, and zero-harassment privacy guarantees.
* **Astrologer Registration (`/astrologer/register`):** Registration for gurus (Vedic, Tarot, Numerology, Vastu) with credentials, experience, consultation rates, and bio.
* **Astrologer Cockpit (`/astrologer/dashboard`):**
  * One-tap **Online / Offline** status switch.
  * Live **Incoming Call Ringing Alert** with Seeker birth details, masked phone ID, and Accept/Decline actions.
  * Earnings tracking (Today's earnings, total payout, customer rating, completed calls/chats).
* **Consultation Desk Screen (`/astrologer/workspace`):**
  * Real-time **North Indian Diamond Kundli (D-1 Lagna Chart)** and planetary degrees of the caller displayed simultaneously during the live call/chat.

---

## 🛡️ AstroShield Privacy & Anti-Leak System

1. **100% Phone Number Masking (Cloud Bridge):**
   * Real phone numbers are never revealed to either party.
   * Calls connect through virtual masked cloud IDs: `+91 98XXX-XX210 (AstroShield Masked ID)` and `Virtual Bridge #409`.
2. **Chat Data Loss Prevention (DLP) Filter:**
   * Both client-side and backend message processors continuously scan chat messages.
   * If a seeker or astrologer types a 10-digit number, numbers disguised with spaces/hyphens (`9 8 7 6 5...`), spelled-out number words, or external links/emails, the message is **immediately blocked**:
     `⚠️ MESSAGE BLOCKED BY ASTROSHIELD: Phone number sequence detected. Personal contact sharing is prohibited.`
3. **Voice Call Audio Sentinel (Automatic Call Drop):**
   * Live audio streams are monitored for prohibited contact sharing.
   * If either party speaks their personal phone number on a live call, the audio bridge is **instantly severed/disconnected**:
     `🚨 CALL TERMINATED BY ASTROSHIELD: Prohibited phone number speech detected in audio stream. Personal contact sharing on calls violates AstroPrakash Trust & Safety rules.`
   * Interactive test button provided on screen for demonstration of instant call severance.

---

## 🚀 Quick Launch
* **Seeker Portal:** [http://localhost:3000](http://localhost:3000)
* **Astrologer Portal:** [http://localhost:3000/astrologer](http://localhost:3000/astrologer)
* **Astrologer Cockpit:** [http://localhost:3000/astrologer/dashboard](http://localhost:3000/astrologer/dashboard)
* **Backend API Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
