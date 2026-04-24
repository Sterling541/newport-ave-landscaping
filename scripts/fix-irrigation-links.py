#!/usr/bin/env python3
"""
Add external link to all 'Priority Irrigation Membership' text mentions
and replace any internal /membership or /irrigation-membership hrefs
with the external URL.
"""
import re
import os

EXTERNAL_URL = "https://newportavelandscaping.com/irrigation-membership"

FILES = [
    "client/src/components/ContactSection.tsx",
    "client/src/components/MembershipBanner.tsx",
    "client/src/components/MembershipSection.tsx",
    "client/src/pages/Maintenance.tsx",
    "client/src/pages/Membership.tsx",
    "client/src/pages/Services.tsx",
    "client/src/pages/blog/SprinklerWinterizationBend.tsx",
    "client/src/pages/resources/FaqIrrigationBend.tsx",
    "client/src/pages/resources/IrrigationRepairBend.tsx",
    "client/src/pages/resources/IrrigationRepairCostBend.tsx",
]

BASE = "/home/ubuntu/newport-ave-landscaping"

# Patterns to replace existing internal links
INTERNAL_LINK_PATTERNS = [
    # href="/membership" or href="/irrigation-membership" (with or without quotes)
    (r'href="/(irrigation-membership|membership)"', f'href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer"'),
    (r"href='/(irrigation-membership|membership)'", f'href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer"'),
    # to="/membership" or to="/irrigation-membership" (wouter Link)
    (r'to="/(irrigation-membership|membership)"', f'href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer"'),
]

# Wrap bare "Priority Irrigation Membership" text in an anchor tag
# Only when NOT already inside an <a> tag
MEMBERSHIP_TEXT_PATTERN = re.compile(
    r'(?<!href=")(?<!href=\')(?<!["\'])(?<!</a>)'
    r'(Priority Irrigation Membership)'
    r'(?![^<]*</a>)'
)

LINK_TAG = f'<a href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900">Priority Irrigation Membership</a>'

for rel_path in FILES:
    filepath = os.path.join(BASE, rel_path)
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {rel_path}")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    original = content

    # 1. Replace internal links
    for pattern, replacement in INTERNAL_LINK_PATTERNS:
        content = re.sub(pattern, replacement, content)

    # 2. Wrap bare "Priority Irrigation Membership" text that isn't already linked
    # Strategy: find all occurrences and check if they're already inside an <a href="...irrigation-membership...">
    # Simple approach: replace occurrences that are NOT preceded by href= context
    # We'll do a line-by-line check
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        # Skip lines that already have the external URL (already linked)
        if EXTERNAL_URL in line:
            new_lines.append(line)
            continue
        # Skip lines that are pure href/link definitions (avoid double-wrapping)
        if 'href=' in line and 'Priority Irrigation Membership' in line:
            new_lines.append(line)
            continue
        # Wrap bare text mentions
        if 'Priority Irrigation Membership' in line:
            # Check if it's inside JSX text (not already an anchor)
            # Replace <strong>Priority Irrigation Membership</strong> too
            line = line.replace(
                '<strong>Priority Irrigation Membership</strong>',
                f'<a href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900 font-semibold">Priority Irrigation Membership</a>'
            )
            # Replace bare text
            line = line.replace(
                'Priority Irrigation Membership',
                f'<a href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900">Priority Irrigation Membership</a>'
            )
        new_lines.append(line)
    content = '\n'.join(new_lines)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"UPDATED: {rel_path}")
    else:
        print(f"NO CHANGE: {rel_path}")

print("\nDone!")
