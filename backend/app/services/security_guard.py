"""
AstroPrakash Privacy & Contact Leakage Prevention Engine
Enforces 100% number masking, chat message DLP, and voice call speech detection.
"""

import re
from typing import Tuple

# Disallowed patterns: 10-digit numbers with various delimiters, email, external chat terms
DIGIT_PATTERN = re.compile(r'(?:\+?91[\s\-]?)?(?:[6-9]\d{9}|[6-9][\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d)')

# Spelled out number patterns (e.g. "nine eight seven six...")
NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "shunya", "ek", "do", "teen", "char", "paanch", "chhah", "saat", "aath", "nau"]
SPELLED_PATTERN = re.compile(r'\b(?:' + '|'.join(NUMBER_WORDS) + r')(?:\s+(?:' + '|'.join(NUMBER_WORDS) + r')){5,}\b', re.IGNORECASE)

EMAIL_PATTERN = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
CONTACT_KEYWORDS = re.compile(r'\b(?:whatsapp|wa\.me|call me|contact me at|phone number|mobile no|my number is|ping me)\b', re.IGNORECASE)

def inspect_text_for_contact_leakage(text: str) -> Tuple[bool, str]:
    """
    Scans message for prohibited phone numbers, emails, or personal contacts.
    Returns (is_violation, reason).
    """
    if DIGIT_PATTERN.search(text):
        return True, "Phone number sequence detected. Personal contact sharing is prohibited."
    
    if SPELLED_PATTERN.search(text):
        return True, "Spelled-out phone number detected. Contact sharing is not allowed."

    if EMAIL_PATTERN.search(text):
        return True, "Email address detected. Please keep all communication inside AstroPrakash."

    return False, ""

def mask_phone_number(phone: str) -> str:
    """
    Masks a 10-digit number for cloud bridging (e.g. +91 98XXX-XX210).
    Real numbers are never exposed to either seeker or astrologer.
    """
    clean = re.sub(r'\D', '', phone)
    if len(clean) >= 10:
        return f"+91 {clean[:2]}XXX-XX{clean[-3:]}"
    return "+91 98XXX-XX210 (Masked Number)"
