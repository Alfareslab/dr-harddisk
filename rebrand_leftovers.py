import os
import re

root_dir = r"f:\Myprojects\Dr.Harddisk"
exclude_dirs = {'.git', 'node_modules', 'dist', '.vscode', '.astro', '.github', '.gemini'}

# We will check text-based files
include_exts = {'.md', '.mdx', '.astro', '.ts', '.tsx', '.mjs', '.json', '.txt', '.svg'}

replacements = {
    'DrHardDisk': 'Datacodex',
    'DrHarddisk': 'Datacodex',
    'drharddisk': 'datacodex',  # Might hit domains if any, we'll exclude domains below
    'Dr_Hard_Disk': 'Datacodex',
    'Dr_Hard Disk': 'Datacodex',
    'Dr. Hard Disk': 'Datacodex', # In case the svg placeholders have it
}

urls_to_preserve = [
    ('https://datacodex.sa', 'https://drharddisk.sa'),
    ('github.com/Alfareslab/datacodex', 'github.com/Alfareslab/dr-harddisk'),
    ('name": "datacodex"', 'name": "dr-harddisk"'),
    ('dr-harddisk-sa', 'drharddisk-sa'), # keep original if it's an ID
]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        # For .jpg that are actually SVGs, we can try
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if '<svg' not in content:
                    return False
        except:
            return False
        
    new_content = content
    # Handle specific string replacements
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    # Revert specific URLs
    for changed, original in urls_to_preserve:
        new_content = new_content.replace(changed, original)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated text in: {os.path.relpath(filepath, root_dir)}")
        return True
    return False

modified_count = 0
for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
    for file in files:
        if any(file.endswith(ext) for ext in include_exts) or file.endswith('.jpg'):
            if replace_in_file(os.path.join(root, file)):
                modified_count += 1

# Now rename files
renamed_count = 0
for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
    for file in files:
        new_name = file
        for old, new in replacements.items():
            new_name = new_name.replace(old, new)
            
        if new_name != file:
            old_path = os.path.join(root, file)
            new_path = os.path.join(root, new_name)
            os.rename(old_path, new_path)
            print(f"Renamed file: {file} -> {new_name}")
            renamed_count += 1

print(f"\nTotal files text-modified: {modified_count}")
print(f"Total files renamed: {renamed_count}")
