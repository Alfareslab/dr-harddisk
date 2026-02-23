import os
import re

root_dir = os.path.dirname(os.path.abspath(__file__))
exclude_dirs = {'.git', 'node_modules', 'dist', '.vscode', '.astro', '.github', '.gemini'}

include_exts = {'.md', '.mdx', '.astro', '.ts', '.tsx', '.mjs', '.json', '.txt'}

# Safe default placeholder for the new brand
replacements = {
    'drharddisk.sa': 'datacodex.com',
    'drharddisk.com': 'datacodex.com'
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return False
        
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated domain in: {os.path.relpath(filepath, root_dir)}")
        return True
    return False

modified_count = 0
for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
    for file in files:
        if any(file.endswith(ext) for ext in include_exts):
            if replace_in_file(os.path.join(root, file)):
                modified_count += 1

print(f"\nTotal files domain-modified: {modified_count}")
