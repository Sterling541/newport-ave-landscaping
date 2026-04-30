#!/usr/bin/env python3
"""Replace old oversized image URLs with new compressed versions across all source files."""
import os
import glob

# Mapping: old filename fragment -> new manus-storage path
REPLACEMENTS = {
    "GLLPatio1_90e2e0c4_166b9312.webp": "compressed_GLLPatio1_90e2e0c4_166b9312_76dc891f.webp",
    "forest-home4_9324e5db_31f1b27d.webp": "compressed_forest-home4_9324e5db_31f1b27d_a2d60b76.webp",
    "NewportAveLandcaping-9_97b731b0_1204d3ca.webp": "compressed_NewportAveLandcaping-9_97b731b0_1204d3ca_c439672c.webp",
    "GLLPatio2_4916fcde_95c74f23.webp": "compressed_GLLPatio2_4916fcde_95c74f23_0a4c0f52.webp",
    "NewportLandscapingRVParkDay2Photos2_8e8d0bb1_cd405dc0.webp": "compressed_NewportLandscapingRVParkDay2Photos2_8e8d0bb1_cd405dc0_35d8eb74.webp",
    "plant-outdoor-1-nobg_700_a025a71d.webp": "compressed_plant-outdoor-1-nobg_700_a025a71d_1e9ac9da.webp",
    "plant-outdoor-2-nobg_700_94071400.webp": "compressed_plant-outdoor-2-nobg_700_94071400_15aa6a60.webp",
    "plant-outdoor-3-nobg_700_34a1c68f.webp": "compressed_plant-outdoor-3-nobg_700_34a1c68f_4a0b7b54.webp",
    "plant-outdoor-4-nobg_700_8f92f668.webp": "compressed_plant-outdoor-4-nobg_700_8f92f668_2dda2017.webp",
    "fire7_f0b582ff_56d05738.webp": "compressed_fire7_f0b582ff_56d05738_050989df.webp",
}

# Find all TSX, TS, HTML files
patterns = [
    "client/src/**/*.tsx",
    "client/src/**/*.ts",
    "index.html",
]

files_changed = 0
total_replacements = 0

for pattern in patterns:
    for filepath in glob.glob(pattern, recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        for old_name, new_name in REPLACEMENTS.items():
            if old_name in content:
                content = content.replace(old_name, new_name)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count = sum(original.count(old) for old in REPLACEMENTS.keys())
            print(f"Updated {filepath} ({count} replacements)")
            files_changed += 1
            total_replacements += count

print(f"\nDone: {total_replacements} replacements across {files_changed} files")
