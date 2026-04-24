#!/usr/bin/env python3
"""
Revert corrupted Priority Irrigation Membership link insertions
that ended up inside JS strings, alt attributes, title attributes, etc.
"""
import re
import os
import glob

EXTERNAL_URL = "https://newportavelandscaping.com/irrigation-membership"

# The link HTML that was incorrectly inserted into string contexts
LINK_VARIANTS = [
    f'<a href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900">Priority Irrigation Membership</a>',
    f'<a href="{EXTERNAL_URL}" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900 font-semibold">Priority Irrigation Membership</a>',
]

PLAIN_TEXT = "Priority Irrigation Membership"

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Find all string literals (JS strings and JSX attribute values) that contain the link
    # Strategy: find lines where the link appears inside a quoted string context
    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        new_line = line
        
        # Check if this line has the link inside a string attribute or JS string
        # Indicators: the link appears after = " or = ' or inside a string that has other content
        # Key patterns to revert:
        # 1. alt="...Priority Irrigation Membership link..."  
        # 2. title="...Priority Irrigation Membership link..."
        # 3. description: "...Priority Irrigation Membership link..."
        # 4. note: "...Priority Irrigation Membership link..."
        # 5. Any JS object property string value
        
        for link_html in LINK_VARIANTS:
            if link_html in new_line:
                # Check if this is inside a JSX attribute string (not free JSX content)
                # Signs: the link is followed by " or ' closing the string
                # Or the link is preceded by = " or = '
                # Also check: the link is inside a non-JSX context (data object, alt, title, etc.)
                
                # Pattern: the link appears inside a quoted string (has " after the closing </a>)
                # or the line doesn't look like pure JSX content
                
                # Revert if: line contains the link AND (ends with " or has " after </a> or has : " before)
                after_link = new_line[new_line.find(link_html) + len(link_html):]
                before_link = new_line[:new_line.find(link_html)]
                
                # If the closing </a> is followed by " or ' it's inside a string
                if after_link.lstrip().startswith('"') or after_link.lstrip().startswith("'"):
                    new_line = new_line.replace(link_html, PLAIN_TEXT)
                    changed = True
                # If before the link we have = " or : " (JS object property)
                elif re.search(r'[=:]\s*["\']', before_link):
                    # Check it's not a proper JSX href= assignment
                    if 'href=' not in before_link[-20:]:
                        new_line = new_line.replace(link_html, PLAIN_TEXT)
                        changed = True
                # If the line has alt= or title= before the link
                elif re.search(r'\b(alt|title|placeholder|name|value|content)\s*=\s*["\']', before_link):
                    new_line = new_line.replace(link_html, PLAIN_TEXT)
                    changed = True
        
        new_lines.append(new_line)
    
    content = '\n'.join(new_lines)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

# Run on all tsx/ts files in client/src
base = '/home/ubuntu/newport-ave-landscaping/client/src'
files = glob.glob(f'{base}/**/*.tsx', recursive=True) + glob.glob(f'{base}/**/*.ts', recursive=True)

total_fixed = 0
for filepath in sorted(files):
    if fix_file(filepath):
        print(f"FIXED: {filepath.replace('/home/ubuntu/newport-ave-landscaping/', '')}")
        total_fixed += 1

print(f"\nTotal files fixed: {total_fixed}")
