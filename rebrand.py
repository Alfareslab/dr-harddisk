import os
import re

root_dir = r"f:\Myprojects\Dr.Harddisk"
exclude_dirs = {'.git', 'node_modules', 'dist', '.vscode', '.astro', '.github', '.gemini'}
include_exts = {'.md', '.mdx', '.astro', '.ts', '.tsx', '.mjs', '.json', '.txt'}

patterns = [
    re.compile(r'Dr\.\s*Hard\s*Disk', re.IGNORECASE),
    re.compile(r'دكتور\s*هارد\s*ديسك'),
    re.compile(r'د\.\s*هارد\s*ديسك'),
    re.compile(r'Dr\.Harddisk', re.IGNORECASE),
    # Also catch some variants with possible typos or extra spaces
    re.compile(r'دكتور\s+هارد\s+ديسك'),
]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return False
        
    new_content = content
    for pattern in patterns:
        new_content = pattern.sub('Datacodex', new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {os.path.relpath(filepath, root_dir)}")
        return True
    return False

modified_count = 0
for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
    for file in files:
        if any(file.endswith(ext) for ext in include_exts):
            if replace_in_file(os.path.join(root, file)):
                modified_count += 1
                
print(f"\nTotal files modified: {modified_count}")
