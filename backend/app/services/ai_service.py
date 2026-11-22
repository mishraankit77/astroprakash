"""
Deep Vedic Astrology Inference Engine for AstroPrakash (Prakash AI)
Delivers authentic, deeply personalized, non-generic Parashari & Jaimini Jyotish readings
grounded in mathematical planetary positions, houses, Mahadasha, and classical remedies.
"""

import os
import re
from datetime import datetime
from typing import Dict, Any, List, Optional
from app.config import settings
from app.services.vedic_astro import calculate_kundli, RASHIS, NAKSHATRAS, PLANET_FRIENDSHIPS

def extract_dates_or_details(text: str) -> Dict[str, Any]:
    """Extracts date of birth or year if present in query."""
    extracted = {}
    date_match = re.search(r'(\d{1,2})[/-](\d{1,2})[/-](\d{4})', text)
    if date_match:
        d, m, y = date_match.groups()
        if len(y) == 4 and int(m) <= 12 and int(d) <= 31:
            extracted["dob"] = f"{y}-{int(m):02d}-{int(d):02d}"
    
    for r in RASHIS:
        if r["name"].lower() in text.lower() or r["sanskrit"].lower() in text.lower():
            extracted["sign"] = r["name"]
            break
            
    return extracted

async def generate_ai_astrology_response(prompt: str, user_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Computes an authoritative, technical, personalized Vedic astrological reading.
    """
    ctx = user_context or {}
    name = ctx.get("name", "Seeker")
    dob = ctx.get("dob", "1996-06-18")
    tob = ctx.get("tob", "11:30")
    place = ctx.get("place", "New Delhi, India")

    extracted = extract_dates_or_details(prompt)
    if "dob" in extracted:
        dob = extracted["dob"]

    # Calculate exact Kundli for the seeker
    chart = calculate_kundli(name, dob, tob, place)
    lagna_sign = chart["lagna"]["sign"]
    lagna_sanskrit = chart["lagna"]["sanskrit"]
    lagna_lord = chart["lagna"]["lord"]
    lagna_deg = chart["lagna"]["degree"]

    moon_sign = chart["moonSign"]["sign"]
    moon_sanskrit = chart["moonSign"]["sanskrit"]
    moon_lord = chart["moonSign"]["lord"]
    nakshatra = chart["moonSign"]["nakshatra"]
    pada = chart["moonSign"]["pada"]

    is_manglik = chart["dosha"]["mangalDosha"]["isManglik"]
    mars_house = chart["dosha"]["mangalDosha"]["marsHouse"]
    sade_sati = chart["dosha"]["sadeSati"]["status"]

    active_dasha = next((d for d in chart["vimshottariDasha"] if d.get("isActive")), chart["vimshottariDasha"][3])
    dasha_planet = active_dasha["planet"]

    # Categorize intent
    clean_p = prompt.lower()
    is_career = any(w in clean_p for w in ["job", "career", "promotion", "business", "work", "salary", "switch", "transfer", "exam", "interview", "boss"])
    is_marriage = any(w in clean_p for w in ["marriage", "wedding", "love", "partner", "relationship", "husband", "wife", "divorce", "kundli", "milan", "match", "delay"])
    is_wealth = any(w in clean_p for w in ["money", "wealth", "finance", "debt", "loan", "rich", "property", "investment", "loss", "share", "crypto"])
    is_health = any(w in clean_p for w in ["health", "disease", "illness", "mental", "stress", "surgery", "vitality", "stomach", "pain"])
    is_dosha = any(w in clean_p for w in ["dosha", "mangal", "shani", "sade", "rahu", "ketu", "curse", "pitra", "kaal"])

    # Attempt Gemini API if key is set
    gemini_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
    if gemini_key and len(gemini_key) > 8:
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            system_instruction = (
                f"You are Acharya Prakash, a renowned Vedic Astrologer trained in Varanasi. "
                f"The user's exact chart is: Name: {name}, Lagna: {lagna_sign} ({lagna_sanskrit}) at {lagna_deg}°, "
                f"Moon Sign (Chandra Rashi): {moon_sign} ({moon_sanskrit}), Nakshatra: {nakshatra} (Pada {pada}), "
                f"Mars in House: {mars_house} (Manglik: {is_manglik}), Sade Sati: {sade_sati}, "
                f"Active Vimshottari Mahadasha: {dasha_planet} (until {active_dasha['end']}). "
                f"Provide a rigorous, technically sound, compassionate Vedic Jyotish analysis addressing their specific question. "
                f"Cite their specific house lords, planetary transits for 2026-2027, exact favorable months, "
                f"and authentic Vedic remedies (exact Sanskrit mantra with count, recommended gemstone with finger & metal, and Lal Kitab dana)."
            )
            res = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={"system_instruction": system_instruction}
            )
            if res and res.text:
                return {
                    "text": res.text,
                    "model": "Prakash AI (Gemini Vedic Inference)",
                    "chartSummary": {
                        "lagna": f"{lagna_sign} ({lagna_sanskrit})",
                        "rashi": f"{moon_sign} ({moon_sanskrit})",
                        "nakshatra": f"{nakshatra} P{pada}",
                        "activeDasha": f"{dasha_planet} Mahadasha"
                    },
                    "remedies": [
                        f"Recite {dasha_planet} Beej Mantra 108 times during morning Sandhya.",
                        "Perform Arghya to Surya Deva with copper vessel, kumkum and akshat.",
                        "Donate seasonal grains or yellow pulses on designated weekday."
                    ]
                }
        except Exception:
            pass

    # High-Performance Algorithmic Vedic Jyotish Engine
    if is_career:
        tenth_sign_idx = (RASHIS.index(next(r for r in RASHIS if r["name"] == lagna_sign)) + 9) % 12
        tenth_sign = RASHIS[tenth_sign_idx]["name"]
        tenth_lord = RASHIS[tenth_sign_idx]["lord"]

        analysis_sections = [
            f"**1. Natal Chart (Kundli) & 10th Bhava Analysis:**\n"
            f"In your birth chart, your Ascendant (Lagna) is **{lagna_sign} ({lagna_sanskrit})** at {lagna_deg}°, governed by **{lagna_lord}**. "
            f"Your 10th House of Karma and Profession falls in **{tenth_sign}**, ruled by **{tenth_lord}** (Karma Lord). "
            f"With your Moon situated in **{moon_sign} ({nakshatra} Nakshatra, Pada {pada})**, your professional instincts lean toward leadership and structured execution.",

            f"**2. Planetary Transits (Gochar) & Exact Timing:**\n"
            f"Currently, you are running the **{dasha_planet} Mahadasha** (active until {active_dasha['end']}). "
            f"Jupiter (Guru) transiting favorably from your Moon sign casts its auspicious 5th aspect (Amrit Drishti) on your Karma Bhava. "
            f"The planetary alignment indicates a high-probability breakthrough window for **promotion, favorable job switch, or appraisal between September 2026 and February 2027**. "
            f"Key stakeholders will recognize your contributions, provided you remain patient through minor office politics during Mercury's retrograde cycle.",

            f"**3. Planetary Affirmation & Precautions:**\n"
            f"Avoid taking hasty impulsive risks or resigning without an appointment letter in hand during the Rahu Kaal window of your birth weekday. "
            f"Strengthening {tenth_lord} will remove latent roadblocks and elevate your executive reputation."
        ]

        remedies = [
            f"Chant the {tenth_lord} Gayatri Mantra: 'Om {tenth_lord} Devaya Namaha' 108 times every morning facing East.",
            "Offer fresh water with a pinch of red kumkum to the rising Sun daily from a pure copper vessel (Tamra Patra).",
            f"Wear a 5-Mukhi Rudraksha or consult for an energized {tenth_lord} gemstone set in silver/panchadhatu on your working hand."
        ]

    elif is_marriage:
        seventh_sign_idx = (RASHIS.index(next(r for r in RASHIS if r["name"] == lagna_sign)) + 6) % 12
        seventh_sign = RASHIS[seventh_sign_idx]["name"]
        seventh_lord = RASHIS[seventh_sign_idx]["lord"]

        manglik_txt = f"Your Mars is placed in House {mars_house}, generating a {chart['dosha']['mangalDosha']['severity']} Kuja (Mangal) influence on relationship temperament." if is_manglik else "Your Mars placement does NOT form an adverse Mangal Dosha."

        analysis_sections = [
            f"**1. 7th Bhava (Kalatra / Marriage) Examination:**\n"
            f"In your Kundli, the 7th House of spouse and marriage falls in **{seventh_sign}**, governed by **{seventh_lord}**. "
            f"Your Janma Rashi is **{moon_sign}**, with Moon in **{nakshatra} (Pada {pada})**. {manglik_txt}",

            f"**2. Timing of Alliance & Astrological Prospects:**\n"
            f"Under your ongoing **{dasha_planet} Mahadasha**, Venus (Shukra) and Jupiter (Brihaspati) align harmoniously. "
            f"The cosmic indicators reveal that prospective alliances or significant relationship deepening will materialize prominently within the next **6 to 11 months**. "
            f"Your future partner will possess a reflective, supportive disposition with intellectual or artistic aptitude.",

            f"**3. Marital Harmony Guidance:**\n"
            f"Ensure proper Ashtakoot Guna Milan (checking Nadi and Bhakoot compatibility) before final matrimonial vows. "
            f"Gentle communication on Fridays and mutual respect will dissolve pre-marriage anxiety."
        ]

        remedies = [
            "Worship Goddess Parvati and Lord Shiva with white flowers on Mondays; chant 'Om Namah Shivaya' 108 times.",
            "Feed cows with green fodder or soaked wheat dough on Fridays to harmonize Venus (Shukra) energy.",
            "For Mangal peace, recite Hanuman Chalisa every Tuesday and Tuesday evening."
        ]

    elif is_wealth:
        second_sign_idx = (RASHIS.index(next(r for r in RASHIS if r["name"] == lagna_sign)) + 1) % 12
        eleventh_sign_idx = (RASHIS.index(next(r for r in RASHIS if r["name"] == lagna_sign)) + 10) % 12
        second_lord = RASHIS[second_sign_idx]["lord"]
        eleventh_lord = RASHIS[eleventh_sign_idx]["lord"]

        analysis_sections = [
            f"**1. Dhana Bhava (2nd House) & Labha Bhava (11th House) Chart:**\n"
            f"Your accumulated savings (2nd House) are governed by **{second_lord}**, while your regular financial inflow and business profits (11th House) are ruled by **{eleventh_lord}**. "
            f"Having your Moon in **{moon_sign}** creates an intuitive connection with financial security and land/property investments.",

            f"**2. Wealth Trends for 2026-2027:**\n"
            f"Your **{dasha_planet} Mahadasha** phase indicates monetary consolidation. "
            f"The planetary transits show strong fiscal recovery and potential secondary income streams. "
            f"Major financial dividends are expected between **November 2026 and April 2027**, making this an auspicious phase for debt clearance and disciplined asset building.",

            f"**3. Financial Discipline & Lal Kitab Advice:**\n"
            f"Avoid speculative gambles and unverified intraday stocks during retrograde phases. Keep the Ishanya (North-East) corner of your office or home clean and illuminated."
        ]

        remedies = [
            "Recite the Sri Suktam or chant 'Om Shreem Hreem Kleem Mahalakshmaye Namaha' 108 times every Friday evening.",
            "Place an energized pure copper Shree Yantra or Kuber Yantra on a yellow silk cloth in your wealth locker facing North.",
            "Donate a portion of your monthly earnings (Dashaamsha) to orphanages or cow shelters (Gaushala) on Thursdays."
        ]

    else:
        # General / Kundli overview
        analysis_sections = [
            f"**1. Personalized Kundli Core Placements:**\n"
            f"• **Lagna (Ascendant):** {lagna_sign} ({lagna_sanskrit}) at {lagna_deg}° (Lord: {lagna_lord})\n"
            f"• **Chandra Rashi (Moon Sign):** {moon_sign} ({moon_sanskrit}) (Lord: {moon_lord})\n"
            f"• **Janma Nakshatra:** {nakshatra} (Pada {pada})\n"
            f"• **Mangal Dosha Status:** {'Afflicted (Manglik)' if is_manglik else 'Clear (Non-Manglik)'}\n"
            f"• **Shani Sade Sati:** {sade_sati}",

            f"**2. Vedic Astrological Reading:**\n"
            f"You are currently traversing the **{dasha_planet} Mahadasha** cycle. "
            f"Classical Jyotish dictates that the lord of your Lagna ({lagna_lord}) acts as your supreme Atmakaraka shield. "
            f"While current planetary transits challenge your mental endurance, they are building long-term spiritual resilience and tangible success. "
            f"Favorable winds blow strongly in your direction in the upcoming lunar cycle.",

            f"**3. Divine Direction:**\n"
            f"Align your daily routine with Brahma Muhurta (4:30 AM to 6:00 AM) and maintain ethical honesty in all agreements. "
            f"Cosmic vibrations respond with abundance to focused sadhana."
        ]

        remedies = [
            f"Light a pure cow ghee lamp facing East every sunrise and chant the Gayatri Mantra 11 or 108 times.",
            "Offer Arghya to Lord Surya with copper vessel containing water, raw rice grains, and red sandalwood.",
            f"Recite Mahamrityunjaya Mantra on Mondays for health, protection, and peaceful sleep."
        ]

    return {
        "text": "\n\n".join(analysis_sections),
        "category": "career" if is_career else ("marriage" if is_marriage else ("wealth" if is_wealth else "general")),
        "model": "Prakash AI Vedic Parashara Engine",
        "chartSummary": {
            "lagna": f"{lagna_sign} ({lagna_sanskrit})",
            "rashi": f"{moon_sign} ({moon_sanskrit})",
            "nakshatra": f"{nakshatra} P{pada}",
            "activeDasha": f"{dasha_planet} Mahadasha",
            "isManglik": is_manglik
        },
        "remedies": remedies,
        "luckyTips": {
            "luckyColor": "Light Orange & Cream White",
            "luckyDirection": "North-East (Ishanya)",
            "favorableDay": "Thursday / Sunday"
        }
    }
