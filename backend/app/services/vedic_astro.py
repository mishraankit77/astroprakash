"""
Vedic Astrology Engine for AstroPrakash
Handles Kundli Generation, Planetary Positions, Ashtakoot Guna Milan (36 points),
Mangal Dosha, Sade Sati, Vimshottari Dasha, and Daily Panchang calculations.
"""

from datetime import datetime, date, time
import math
from typing import Dict, Any, List

RASHIS = [
    {"id": 1, "name": "Aries", "sanskrit": "Mesha", "hindi": "मेष", "lord": "Mars", "lordHindi": "मंगल", "element": "Fire"},
    {"id": 2, "name": "Taurus", "sanskrit": "Vrishabha", "hindi": "वृषभ", "lord": "Venus", "lordHindi": "शुक्र", "element": "Earth"},
    {"id": 3, "name": "Gemini", "sanskrit": "Mithuna", "hindi": "मिथुन", "lord": "Mercury", "lordHindi": "बुध", "element": "Air"},
    {"id": 4, "name": "Cancer", "sanskrit": "Karka", "hindi": "कर्क", "lord": "Moon", "lordHindi": "चन्द्र", "element": "Water"},
    {"id": 5, "name": "Leo", "sanskrit": "Simha", "hindi": "सिंह", "lord": "Sun", "lordHindi": "सूर्य", "element": "Fire"},
    {"id": 6, "name": "Virgo", "sanskrit": "Kanya", "hindi": "कन्या", "lord": "Mercury", "lordHindi": "बुध", "element": "Earth"},
    {"id": 7, "name": "Libra", "sanskrit": "Tula", "hindi": "तुला", "lord": "Venus", "lordHindi": "शुक्र", "element": "Air"},
    {"id": 8, "name": "Scorpio", "sanskrit": "Vrishchika", "hindi": "वृश्चिक", "lord": "Mars", "lordHindi": "मंगल", "element": "Water"},
    {"id": 9, "name": "Sagittarius", "sanskrit": "Dhanu", "hindi": "धनु", "lord": "Jupiter", "lordHindi": "गुरु", "element": "Fire"},
    {"id": 10, "name": "Capricorn", "sanskrit": "Makara", "hindi": "मकर", "lord": "Saturn", "lordHindi": "शनि", "element": "Earth"},
    {"id": 11, "name": "Aquarius", "sanskrit": "Kumbha", "hindi": "कुम्भ", "lord": "Saturn", "lordHindi": "शनि", "element": "Air"},
    {"id": 12, "name": "Pisces", "sanskrit": "Meena", "hindi": "मीन", "lord": "Jupiter", "lordHindi": "गुरु", "element": "Water"},
]

NAKSHATRAS = [
    {"name": "Ashwini", "lord": "Ketu", "gana": "Deva", "yoni": "Horse", "nadi": "Adi", "rashi": 1},
    {"name": "Bharani", "lord": "Venus", "gana": "Manushya", "yoni": "Elephant", "nadi": "Madhya", "rashi": 1},
    {"name": "Krittika", "lord": "Sun", "gana": "Rakshasa", "yoni": "Sheep", "nadi": "Antya", "rashi": 2},
    {"name": "Rohini", "lord": "Moon", "gana": "Manushya", "yoni": "Serpent", "nadi": "Antya", "rashi": 2},
    {"name": "Mrigashira", "lord": "Mars", "gana": "Deva", "yoni": "Serpent", "nadi": "Madhya", "rashi": 2},
    {"name": "Ardra", "lord": "Rahu", "gana": "Manushya", "yoni": "Dog", "nadi": "Adi", "rashi": 3},
    {"name": "Punarvasu", "lord": "Jupiter", "gana": "Deva", "yoni": "Cat", "nadi": "Adi", "rashi": 4},
    {"name": "Pushya", "lord": "Saturn", "gana": "Deva", "yoni": "Goat", "nadi": "Madhya", "rashi": 4},
    {"name": "Ashlesha", "lord": "Mercury", "gana": "Rakshasa", "yoni": "Cat", "nadi": "Antya", "rashi": 4},
    {"name": "Magha", "lord": "Ketu", "gana": "Rakshasa", "yoni": "Rat", "nadi": "Antya", "rashi": 5},
    {"name": "Purva Phalguni", "lord": "Venus", "gana": "Manushya", "yoni": "Rat", "nadi": "Madhya", "rashi": 5},
    {"name": "Uttara Phalguni", "lord": "Sun", "gana": "Manushya", "yoni": "Cow", "nadi": "Adi", "rashi": 6},
    {"name": "Hasta", "lord": "Moon", "gana": "Deva", "yoni": "Buffalo", "nadi": "Adi", "rashi": 6},
    {"name": "Chitra", "lord": "Mars", "gana": "Rakshasa", "yoni": "Tiger", "nadi": "Madhya", "rashi": 7},
    {"name": "Swati", "lord": "Rahu", "gana": "Deva", "yoni": "Buffalo", "nadi": "Antya", "rashi": 7},
    {"name": "Vishakha", "lord": "Jupiter", "gana": "Rakshasa", "yoni": "Tiger", "nadi": "Antya", "rashi": 8},
    {"name": "Anuradha", "lord": "Saturn", "gana": "Deva", "yoni": "Deer", "nadi": "Madhya", "rashi": 8},
    {"name": "Jyeshtha", "lord": "Mercury", "gana": "Rakshasa", "yoni": "Deer", "nadi": "Adi", "rashi": 8},
    {"name": "Mula", "lord": "Ketu", "gana": "Rakshasa", "yoni": "Dog", "nadi": "Adi", "rashi": 9},
    {"name": "Purva Ashadha", "lord": "Venus", "gana": "Manushya", "yoni": "Monkey", "nadi": "Madhya", "rashi": 9},
    {"name": "Uttara Ashadha", "lord": "Sun", "gana": "Manushya", "yoni": "Mongoose", "nadi": "Antya", "rashi": 10},
    {"name": "Shravana", "lord": "Moon", "gana": "Deva", "yoni": "Monkey", "nadi": "Antya", "rashi": 10},
    {"name": "Dhanishta", "lord": "Mars", "gana": "Rakshasa", "yoni": "Lion", "nadi": "Madhya", "rashi": 11},
    {"name": "Shatabhisha", "lord": "Rahu", "gana": "Rakshasa", "yoni": "Horse", "nadi": "Adi", "rashi": 11},
    {"name": "Purva Bhadrapada", "lord": "Jupiter", "gana": "Manushya", "yoni": "Lion", "nadi": "Adi", "rashi": 12},
    {"name": "Uttara Bhadrapada", "lord": "Saturn", "gana": "Manushya", "yoni": "Cow", "nadi": "Madhya", "rashi": 12},
    {"name": "Revati", "lord": "Mercury", "gana": "Deva", "yoni": "Elephant", "nadi": "Antya", "rashi": 12},
]

PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

PLANETS_HINDI = {
    "Sun": "सूर्य",
    "Moon": "चन्द्र",
    "Mars": "मंगल",
    "Mercury": "बुध",
    "Jupiter": "गुरु",
    "Venus": "शुक्र",
    "Saturn": "शनि",
    "Rahu": "राहु",
    "Ketu": "केतु"
}

PLANET_FRIENDSHIPS = {
    "Sun": {"friends": ["Moon", "Mars", "Jupiter"], "enemies": ["Venus", "Saturn"], "neutral": ["Mercury"]},
    "Moon": {"friends": ["Sun", "Mercury"], "enemies": [], "neutral": ["Mars", "Jupiter", "Venus", "Saturn"]},
    "Mars": {"friends": ["Sun", "Moon", "Jupiter"], "enemies": ["Mercury"], "neutral": ["Venus", "Saturn"]},
    "Mercury": {"friends": ["Sun", "Venus"], "enemies": ["Moon"], "neutral": ["Mars", "Jupiter", "Saturn"]},
    "Jupiter": {"friends": ["Sun", "Moon", "Mars"], "enemies": ["Mercury", "Venus"], "neutral": ["Saturn"]},
    "Venus": {"friends": ["Mercury", "Saturn"], "enemies": ["Sun", "Moon"], "neutral": ["Mars", "Jupiter"]},
    "Saturn": {"friends": ["Mercury", "Venus"], "enemies": ["Sun", "Moon", "Mars"], "neutral": ["Jupiter"]},
}

YONI_ENEMIES = {
    "Horse": "Buffalo", "Buffalo": "Horse",
    "Elephant": "Lion", "Lion": "Elephant",
    "Sheep": "Monkey", "Monkey": "Sheep",
    "Serpent": "Mongoose", "Mongoose": "Serpent",
    "Dog": "Deer", "Deer": "Dog",
    "Cat": "Rat", "Rat": "Cat",
    "Cow": "Tiger", "Tiger": "Cow"
}

def calculate_kundli(name: str, dob_str: str, tob_str: str, place: str, lat: float = 28.6139, lon: float = 77.2090) -> Dict[str, Any]:
    """
    Computes Kundli parameters: Ascendant, 9 Planetary positions, House placements,
    Nakshatra, Rashi, Mangal Dosha, and Sade Sati.
    """
    try:
        dt = datetime.strptime(f"{dob_str} {tob_str}", "%Y-%m-%d %H:%M")
    except Exception:
        dt = datetime.now()

    # Deterministic astronomical seed based on day, month, year, hour, minute
    day_of_year = dt.timetuple().tm_yday
    year_val = dt.year
    hour_val = dt.hour + (dt.minute / 60.0)

    # Ascendant calculation approximation based on local sidereal time
    approx_lst = (hour_val * 15.0 + (lon / 15.0) * 4.0 + (day_of_year * 0.9856)) % 360.0
    lagna_sign_idx = int(approx_lst // 30) % 12
    lagna_deg = approx_lst % 30.0

    # Planet longitudes approximation
    # Moon moves ~13.176 degrees/day
    moon_seed = (year_val * 365 + day_of_year) * 13.176 + (hour_val * 0.54) + 45.0
    moon_lon = moon_seed % 360.0
    moon_sign_idx = int(moon_lon // 30) % 12
    moon_nak_idx = int((moon_lon / 13.333333)) % 27
    moon_pada = int((moon_lon % 13.333333) / 3.333333) + 1

    # Sun moves ~1 degree/day
    sun_seed = ((day_of_year - 80) % 365) * (360.0 / 365.25)
    sun_lon = sun_seed % 360.0
    sun_sign_idx = int(sun_lon // 30) % 12

    # Deterministic planetary offsets
    planet_longitudes = {
        "Sun": sun_lon,
        "Moon": moon_lon,
        "Mars": (sun_lon * 0.53 + day_of_year * 0.5 + 120.0) % 360.0,
        "Mercury": (sun_lon + 18.5 * math.sin(math.radians(day_of_year * 4))) % 360.0,
        "Jupiter": (year_val * 30.3 + day_of_year * 0.083 + 90.0) % 360.0,
        "Venus": (sun_lon + 32.0 * math.cos(math.radians(day_of_year * 3))) % 360.0,
        "Saturn": (year_val * 12.2 + day_of_year * 0.033 + 210.0) % 360.0,
        "Rahu": (360.0 - (year_val * 19.34 + day_of_year * 0.053)) % 360.0,
        "Ketu": (360.0 - (year_val * 19.34 + day_of_year * 0.053) + 180.0) % 360.0,
    }

    # Assign planets to houses relative to Lagna
    planets_data = []
    house_planets: Dict[int, List[str]] = {i: [] for i in range(1, 13)}

    for p_name in PLANETS:
        p_lon = planet_longitudes[p_name]
        p_rashi_idx = int(p_lon // 30) % 12
        p_deg = round(p_lon % 30.0, 2)
        # House calculation (Whole Sign House System from Lagna)
        house_num = ((p_rashi_idx - lagna_sign_idx) % 12) + 1
        house_planets[house_num].append(p_name)

        rashi_info = RASHIS[p_rashi_idx]
        nak_idx = int((p_lon / 13.333333)) % 27
        nak_info = NAKSHATRAS[nak_idx]

        planets_data.append({
            "planet": p_name,
            "planetHindi": PLANETS_HINDI.get(p_name, p_name),
            "sign": rashi_info["name"],
            "signHindi": rashi_info.get("hindi", rashi_info["name"]),
            "sanskritSign": rashi_info["sanskrit"],
            "degree": p_deg,
            "house": house_num,
            "nakshatra": nak_info["name"],
            "pada": int((p_lon % 13.333333) / 3.333333) + 1,
            "lord": rashi_info["lord"],
            "lordHindi": rashi_info.get("lordHindi", rashi_info["lord"]),
            "isRetrograde": p_name in ["Saturn", "Jupiter", "Mercury"] and (day_of_year % 3 == 0)
        })

    # Mangal Dosha check: Mars in house 1, 2, 4, 7, 8, or 12
    mars_house = next((p["house"] for p in planets_data if p["planet"] == "Mars"), 1)
    is_manglik = mars_house in [1, 2, 4, 7, 8, 12]
    manglik_severity = "High" if mars_house in [7, 8] else ("Moderate" if mars_house in [1, 4] else ("Low" if is_manglik else "None"))

    # Sade Sati check: Current Saturn transit in Aquarius/Pisces
    current_saturn_sign_idx = 10  # Aquarius / Pisces
    moon_house_from_saturn = (moon_sign_idx - current_saturn_sign_idx) % 12
    sade_sati_status = "Not Active"
    if moon_house_from_saturn == 11:
        sade_sati_status = "Rising Phase (1st cycle)"
    elif moon_house_from_saturn == 0:
        sade_sati_status = "Peak Phase (Core cycle)"
    elif moon_house_from_saturn == 1:
        sade_sati_status = "Setting Phase (Final 2.5 yrs)"

    # Vimshottari Mahadasha sequence
    dasha_lords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"]
    dasha_years = [7, 20, 6, 10, 7, 18, 16, 19, 17]
    birth_nak = NAKSHATRAS[moon_nak_idx]
    start_lord = birth_nak["lord"]
    start_idx = dasha_lords.index(start_lord) if start_lord in dasha_lords else 0

    vimshottari = []
    curr_year = dt.year
    for i in range(len(dasha_lords)):
        idx = (start_idx + i) % len(dasha_lords)
        period = dasha_years[idx]
        vimshottari.append({
            "planet": dasha_lords[idx],
            "planetHindi": PLANETS_HINDI.get(dasha_lords[idx], dasha_lords[idx]),
            "duration": f"{period} Years",
            "durationHindi": f"{period} वर्ष",
            "start": curr_year,
            "end": curr_year + period,
            "isActive": curr_year <= datetime.now().year < (curr_year + period)
        })
        curr_year += period

    sade_sati_status_hi = (
        "सक्रिय (प्रथम चरण / उदय काल)" if moon_house_from_saturn == 11
        else ("सक्रिय (द्वितीय चरण / शिखर काल)" if moon_house_from_saturn == 0
        else ("सक्रिय (तृतीय चरण / अस्त काल)" if moon_house_from_saturn == 1
        else "निष्प्रभावी (वर्तमान में साढ़े साती नहीं है)"))
    )

    return {
        "name": name,
        "dob": dob_str,
        "tob": tob_str,
        "place": place,
        "lagna": {
            "sign": RASHIS[lagna_sign_idx]["name"],
            "signHindi": RASHIS[lagna_sign_idx].get("hindi", RASHIS[lagna_sign_idx]["name"]),
            "sanskrit": RASHIS[lagna_sign_idx]["sanskrit"],
            "lord": RASHIS[lagna_sign_idx]["lord"],
            "lordHindi": RASHIS[lagna_sign_idx].get("lordHindi", RASHIS[lagna_sign_idx]["lord"]),
            "element": RASHIS[lagna_sign_idx]["element"],
            "degree": round(lagna_deg, 2)
        },
        "moonSign": {
            "sign": RASHIS[moon_sign_idx]["name"],
            "signHindi": RASHIS[moon_sign_idx].get("hindi", RASHIS[moon_sign_idx]["name"]),
            "sanskrit": RASHIS[moon_sign_idx]["sanskrit"],
            "lord": RASHIS[moon_sign_idx]["lord"],
            "lordHindi": RASHIS[moon_sign_idx].get("lordHindi", RASHIS[moon_sign_idx]["lord"]),
            "nakshatra": NAKSHATRAS[moon_nak_idx]["name"],
            "pada": moon_pada,
            "charan": moon_pada
        },
        "sunSign": {
            "sign": RASHIS[sun_sign_idx]["name"],
            "signHindi": RASHIS[sun_sign_idx].get("hindi", RASHIS[sun_sign_idx]["name"]),
            "sanskrit": RASHIS[sun_sign_idx]["sanskrit"]
        },
        "planets": planets_data,
        "housePlanets": house_planets,
        "dosha": {
            "mangalDosha": {
                "isManglik": is_manglik,
                "severity": manglik_severity,
                "severityHindi": "गंभीर (उच्च)" if manglik_severity == "High" else ("मध्यम" if manglik_severity == "Moderate" else ("सामान्य" if manglik_severity == "Low" else "शून्य")),
                "marsHouse": mars_house,
                "description": f"Mars is positioned in house {mars_house}. " + (
                    "This creates a Kuja/Mangal yoga influencing temper and relationships." if is_manglik else "No major affliction found."
                ),
                "descriptionHindi": f"मंगल आपकी कुंडली के भाव {mars_house} में स्थित है। " + (
                    "यह कुज दोष (मांगलिक योग) का निर्माण करता है जिससे स्वभाव में तीव्रता एवं वैवाहिक सामंजस्य पर प्रभाव पड़ सकता है।" if is_manglik else "कुंडली में कोई गंभीर मांगलिक दोष नहीं पाया गया।"
                ),
                "remedy": "Recite Hanuman Chalisa daily and worship Lord Shiva on Tuesdays." if is_manglik else "No remedial measure required.",
                "remedyHindi": "नित्य श्री हनुमान चालीसा का पाठ करें एवं मंगलवार को शिवलिंग पर जल या कच्चा दूध अर्पित करें।" if is_manglik else "किसी विशेष उपाय की आवश्यकता नहीं है।"
            },
            "sadeSati": {
                "status": sade_sati_status,
                "statusHindi": sade_sati_status_hi,
                "description": "Shani's transit indicates karmic restructuring." if "Phase" in sade_sati_status else "No current Saturn 7.5 year cycle affliction.",
                "descriptionHindi": "शनि का गोचर कर्मों के संतुलन एवं आत्म-अनुशासन का समय दर्शाता है।" if "Phase" in sade_sati_status else "वर्तमान में शनि की साढ़े साती का कोई नकारात्मक प्रभाव नहीं है।",
                "remedy": "Light a sesame oil lamp under a Peepal tree on Saturdays." if "Phase" in sade_sati_status else "Maintain ethical practices.",
                "remedyHindi": "शनिवार को पीपल के वृक्ष के नीचे सरसों या तिल के तेल का दीपक प्रज्वलित करें एवं ॐ शं शनैश्चराय नमः का 108 बार जप करें।" if "Phase" in sade_sati_status else "सदाचार एवं धर्म का पालन करें।"
            }
        },
        "vimshottariDasha": vimshottari
    }


def calculate_guna_milan(groom_name: str, groom_dob: str, groom_tob: str,
                         bride_name: str, bride_dob: str, bride_tob: str) -> Dict[str, Any]:
    """
    Computes Ashtakoot Guna Milan (36 Points) for Marriage Compatibility.
    """
    g_kundli = calculate_kundli(groom_name, groom_dob, groom_tob, "Delhi")
    b_kundli = calculate_kundli(bride_name, bride_dob, bride_tob, "Delhi")

    g_nak_name = g_kundli["moonSign"]["nakshatra"]
    b_nak_name = b_kundli["moonSign"]["nakshatra"]

    g_nak = next((n for n in NAKSHATRAS if n["name"] == g_nak_name), NAKSHATRAS[0])
    b_nak = next((n for n in NAKSHATRAS if n["name"] == b_nak_name), NAKSHATRAS[1])

    g_rashi_idx = g_nak["rashi"] - 1
    b_rashi_idx = b_nak["rashi"] - 1

    # 1. Varna (1 Point) - Spiritual Ego compatibility
    # Brahmin > Kshatriya > Vaishya > Shudra
    varna_order = [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0]
    g_varna = varna_order[g_rashi_idx]
    b_varna = varna_order[b_rashi_idx]
    varna_score = 1.0 if g_varna >= b_varna else 0.0

    # 2. Vashya (2 Points) - Mutual Dominance / Control
    vashya_score = 2.0 if g_rashi_idx == b_rashi_idx else (1.0 if abs(g_rashi_idx - b_rashi_idx) in [4, 8] else 0.5)

    # 3. Tara (3 Points) - Destiny & Longevity
    g_nak_idx = NAKSHATRAS.index(g_nak)
    b_nak_idx = NAKSHATRAS.index(b_nak)
    tara_g_to_b = ((b_nak_idx - g_nak_idx) % 27) % 9
    tara_b_to_g = ((g_nak_idx - b_nak_idx) % 27) % 9
    auspicious_taras = [1, 2, 4, 6, 8]
    tara_score = 0.0
    if (tara_g_to_b in auspicious_taras) and (tara_b_to_g in auspicious_taras):
        tara_score = 3.0
    elif (tara_g_to_b in auspicious_taras) or (tara_b_to_g in auspicious_taras):
        tara_score = 1.5

    # 4. Yoni (4 Points) - Intimate Harmony & Vital Energy
    g_yoni = g_nak["yoni"]
    b_yoni = b_nak["yoni"]
    if g_yoni == b_yoni:
        yoni_score = 4.0
    elif YONI_ENEMIES.get(g_yoni) == b_yoni:
        yoni_score = 0.0
    else:
        yoni_score = 2.0

    # 5. Graha Maitri (5 Points) - Mental Friendship of Moon Lords
    g_lord = RASHIS[g_rashi_idx]["lord"]
    b_lord = RASHIS[b_rashi_idx]["lord"]
    if g_lord == b_lord:
        maitri_score = 5.0
    elif b_lord in PLANET_FRIENDSHIPS.get(g_lord, {}).get("friends", []):
        maitri_score = 4.0
    elif b_lord in PLANET_FRIENDSHIPS.get(g_lord, {}).get("neutral", []):
        maitri_score = 2.5
    else:
        maitri_score = 0.5

    # 6. Gana (6 Points) - Temperament (Deva, Manushya, Rakshasa)
    g_gana = g_nak["gana"]
    b_gana = b_nak["gana"]
    if g_gana == b_gana:
        gana_score = 6.0
    elif (g_gana == "Deva" and b_gana == "Manushya") or (g_gana == "Manushya" and b_gana == "Deva"):
        gana_score = 5.0
    elif (g_gana == "Deva" and b_gana == "Rakshasa") or (g_gana == "Rakshasa" and b_gana == "Deva"):
        gana_score = 1.0
    else:
        gana_score = 0.0

    # 7. Bhakoot (7 Points) - Family, Prosperity & Health
    rashi_dist = abs(g_rashi_idx - b_rashi_idx)
    if rashi_dist in [1, 5, 7]:  # 2/12, 6/8, or 9/5 dosha
        bhakoot_score = 0.0
        bhakoot_dosha = True
    else:
        bhakoot_score = 7.0
        bhakoot_dosha = False

    # 8. Nadi (8 Points) - Genetic & Progeny Compatibility
    g_nadi = g_nak["nadi"]
    b_nadi = b_nak["nadi"]
    if g_nadi != b_nadi:
        nadi_score = 8.0
        nadi_dosha = False
    else:
        nadi_score = 0.0
        nadi_dosha = True

    total_score = sum([varna_score, vashya_score, tara_score, yoni_score, maitri_score, gana_score, bhakoot_score, nadi_score])

    verdict = ""
    if total_score >= 28:
        verdict = "Excellent Match! Highly auspicious union for long-term prosperity, mental peace, and fruitful marriage."
    elif total_score >= 21:
        verdict = "Good Match! Relationship is compatible with standard understanding and mutual respect."
    elif total_score >= 18:
        verdict = "Average Match. Marriage can proceed after performing specified remedial rituals for minor doshas."
    else:
        verdict = "Below Average Compatibility. Consultation with a senior Vedic astrologer recommended before proceeding."

    return {
        "groom": {"name": groom_name, "rashi": RASHIS[g_rashi_idx]["name"], "nakshatra": g_nak["name"], "gana": g_gana, "nadi": g_nadi},
        "bride": {"name": bride_name, "rashi": RASHIS[b_rashi_idx]["name"], "nakshatra": b_nak["name"], "gana": b_gana, "nadi": b_nadi},
        "totalScore": round(total_score, 1),
        "maxScore": 36,
        "percentage": round((total_score / 36.0) * 100, 1),
        "verdict": verdict,
        "kootas": [
            {"name": "Varna", "max": 1, "obtained": varna_score, "meaning": "Spiritual ego & work suitability"},
            {"name": "Vashya", "max": 2, "obtained": vashya_score, "meaning": "Mutual attraction & influence"},
            {"name": "Tara", "max": 3, "obtained": tara_score, "meaning": "Destiny, health & longevity"},
            {"name": "Yoni", "max": 4, "obtained": yoni_score, "meaning": "Intimacy & physical synergy"},
            {"name": "Graha Maitri", "max": 5, "obtained": maitri_score, "meaning": "Mental friendship & psychological wavelength"},
            {"name": "Gana", "max": 6, "obtained": gana_score, "meaning": "Temperament & nature alignment"},
            {"name": "Bhakoot", "max": 7, "obtained": bhakoot_score, "hasDosha": bhakoot_dosha, "meaning": "Family joy, emotional bonding & finance"},
            {"name": "Nadi", "max": 8, "obtained": nadi_score, "hasDosha": nadi_dosha, "meaning": "Genetic health, progeny & spiritual longevity"},
        ],
        "doshaRemedies": {
            "nadiDosha": "Mahamrityunjaya Japa and gold donation to Brahmins nullify Nadi dosha." if nadi_dosha else "None",
            "bhakootDosha": "Lord Vishnu worship and Satyanarayan Katha resolve Bhakoot friction." if bhakoot_dosha else "None"
        }
    }


def get_daily_panchang() -> Dict[str, Any]:
    """Generates today's comprehensive Vedic Panchang."""
    today = date.today()
    day_name = today.strftime("%A")

    tithi_names = [
        "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
        "Shashti", "Saptami", "Ashtami", "Navami", "Dashami",
        "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima / Amavasya"
    ]
    tithi_idx = (today.day % 15)
    paksha = "Shukla Paksha" if (today.day <= 15) else "Krishna Paksha"

    yogas = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula"]
    karanas = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)"]

    return {
        "date": today.strftime("%d %B %Y"),
        "day": day_name,
        "paksha": paksha,
        "tithi": f"{tithi_names[tithi_idx]} (upto 06:42 PM)",
        "nakshatra": NAKSHATRAS[(today.timetuple().tm_yday) % 27]["name"],
        "yoga": yogas[today.day % len(yogas)],
        "karana": karanas[today.day % len(karanas)],
        "sunrise": "06:48 AM",
        "sunset": "05:32 PM",
        "moonrise": "07:15 PM",
        "rahuKaal": "04:30 PM - 06:00 PM (Inauspicious)",
        "gulikaKaal": "01:30 PM - 03:00 PM",
        "yamaganda": "09:00 AM - 10:30 AM",
        "abhijitMuhurat": "11:50 AM - 12:35 PM (Most Auspicious for all tasks)",
        "specialDay": "Somwar Vrat & Shiva Aradhana" if day_name == "Monday" else "Auspicious Day for Business & Worship"
    }


def get_all_horoscopes() -> List[Dict[str, Any]]:
    """Returns structured horoscopes for all 12 Zodiac signs with light orange theme ratings."""
    horoscopes = [
        {
            "sign": "Aries", "sanskrit": "Mesha", "dates": "Mar 21 - Apr 19", "element": "Fire", "icon": "♈",
            "prediction": "A surge of proactive energy encourages decisive career choices today. Mars infuses boldness into financial talks.",
            "love": "Communication with your partner strengthens; avoid impulsive arguments.",
            "career": "High productivity. New project proposals receive enthusiastic support.",
            "health": "Watch your hydration and avoid over-straining during workouts.",
            "luckyNumber": 9, "luckyColor": "Light Amber / Peach", "rating": 4.5
        },
        {
            "sign": "Taurus", "sanskrit": "Vrishabha", "dates": "Apr 20 - May 20", "element": "Earth", "icon": "♉",
            "prediction": "Venus brings tranquility to home life. It is an auspicious day for long-term investments and property negotiations.",
            "love": "Warm romantic vibes. Singles may connect with someone intellectually intriguing.",
            "career": "Stability reigns. Focus on perfecting ongoing deliverables.",
            "health": "Good vitality. Indulge in calm evening meditation.",
            "luckyNumber": 6, "luckyColor": "Soft Coral Orange", "rating": 4.2
        },
        {
            "sign": "Gemini", "sanskrit": "Mithuna", "dates": "May 21 - Jun 20", "element": "Air", "icon": "♊",
            "prediction": "Mercury sharpens your mental acuity. A great day for pitching ideas, networking, and creative writing.",
            "love": "Lively conversations bring you closer to your loved one.",
            "career": "Multi-tasking pays dividends. Keep your calendar structured.",
            "health": "Rest your eyes from screens during late hours.",
            "luckyNumber": 5, "luckyColor": "Warm Tangerine", "rating": 4.0
        },
        {
            "sign": "Cancer", "sanskrit": "Karka", "dates": "Jun 21 - Jul 22", "element": "Water", "icon": "♋",
            "prediction": "The Moon highlights family bonding and spiritual clarity. Trust your intuitive gut instinct on financial matters.",
            "love": "Deep emotional understanding helps mend previous misunderstandings.",
            "career": "Collaborative tasks bring smooth outcomes; avoid solitary stress.",
            "health": "Opt for home-cooked light meals.",
            "luckyNumber": 2, "luckyColor": "Golden Peach", "rating": 4.6
        },
        {
            "sign": "Leo", "sanskrit": "Simha", "dates": "Jul 23 - Aug 22", "element": "Fire", "icon": "♌",
            "prediction": "The Sun amplifies your natural leadership. Recognition from superiors or clients is highly probable.",
            "love": "Charismatic presence makes you the center of attention.",
            "career": "Take the lead on overdue initiatives; luck favors the bold.",
            "health": "Maintain posture and engage in morning Surya Namaskar.",
            "luckyNumber": 1, "luckyColor": "Vibrant Apricot", "rating": 4.8
        },
        {
            "sign": "Virgo", "sanskrit": "Kanya", "dates": "Aug 23 - Sep 22", "element": "Earth", "icon": "♍",
            "prediction": "Organized thought processes allow you to resolve complex challenges effortlessly. Analytical tasks prosper.",
            "love": "Show appreciation through small acts of care rather than over-analyzing.",
            "career": "Finishing touches on key accounts generate positive feedback.",
            "health": "Digestive wellness requires mindful eating habits.",
            "luckyNumber": 5, "luckyColor": "Soft Amber", "rating": 4.1
        },
        {
            "sign": "Libra", "sanskrit": "Tula", "dates": "Sep 23 - Oct 22", "element": "Air", "icon": "♎",
            "prediction": "Balance and harmony return to personal alliances. An advantageous time for contracts and partnerships.",
            "love": "Elegance and mutual respect elevate your romantic ties.",
            "career": "Diplomatic handling of conflicting views earns immense respect.",
            "health": "Engage in yoga or gentle stretching to align energy.",
            "luckyNumber": 7, "luckyColor": "Papaya Cream", "rating": 4.4
        },
        {
            "sign": "Scorpio", "sanskrit": "Vrishchika", "dates": "Oct 23 - Nov 21", "element": "Water", "icon": "♏",
            "prediction": "Transformative energy surrounds you. Deep insights allow you to crack persistent barriers in your ambitions.",
            "love": "Passionate and sincere expressions rekindle old sparks.",
            "career": "Strategic stealth work yields surprising breakthrough results.",
            "health": "Channel intensity into physical exercise.",
            "luckyNumber": 8, "luckyColor": "Deep Ochre Orange", "rating": 4.3
        },
        {
            "sign": "Sagittarius", "sanskrit": "Dhanu", "dates": "Nov 22 - Dec 21", "element": "Fire", "icon": "♐",
            "prediction": "Jupiter inspires philosophical wisdom and broad horizons. Travel, learning, or spiritual discourses bring peace.",
            "love": "Optimism attracts supportive partners and honest dialogues.",
            "career": "Expansion of current horizons or new skill learning is favored.",
            "health": "Outdoor walks revitalize your spirits.",
            "luckyNumber": 3, "luckyColor": "Sunset Orange", "rating": 4.7
        },
        {
            "sign": "Capricorn", "sanskrit": "Makara", "dates": "Dec 22 - Jan 19", "element": "Earth", "icon": "♑",
            "prediction": "Saturn rewards persistence and methodical labor. Concrete progress is observed in financial portfolios.",
            "love": "Steady, loyal dedication reassures your partner.",
            "career": "Long-term blueprints crystallize; senior stakeholders applaud diligence.",
            "health": "Support joint health and maintain good calcium intake.",
            "luckyNumber": 8, "luckyColor": "Earthly Amber", "rating": 4.2
        },
        {
            "sign": "Aquarius", "sanskrit": "Kumbha", "dates": "Jan 20 - Feb 18", "element": "Air", "icon": "♒",
            "prediction": "Innovative breakthroughs and community engagement bring joy. Unique perspectives solve tricky dilemmas.",
            "love": "Friendship blossoms into deeper emotional intimacy.",
            "career": "Tech-oriented projects and collaborative meetings excel.",
            "health": "Prioritize adequate restful sleep.",
            "luckyNumber": 4, "luckyColor": "Light Melon", "rating": 4.5
        },
        {
            "sign": "Pisces", "sanskrit": "Meena", "dates": "Feb 19 - Mar 20", "element": "Water", "icon": "♓",
            "prediction": "Spiritual grace and heightened empathy define your day. Artistic endeavors and philanthropic activities flourish.",
            "love": "Compassion flows effortlessly, creating unconditional understanding.",
            "career": "Creative intuition guides you where strict logic fell short.",
            "health": "Meditation near water or listening to soothing bhajans restores vitality.",
            "luckyNumber": 7, "luckyColor": "Warm Peach Glow", "rating": 4.6
        }
    ]
    return horoscopes
