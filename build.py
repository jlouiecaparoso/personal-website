import json
import gzip
import base64
import re
import os

base_html_path = r"index.html"
dest_html_paths = [r"index.html", r"andrianne.html"]

# Helper to pack file
def pack_file(file_path, compress=True):
    with open(file_path, "r", encoding="utf-8") as f:
        data = f.read().encode("utf-8")
    
    if compress:
        compressed_data = gzip.compress(data)
        encoded = base64.b64encode(compressed_data).decode("utf-8")
    else:
        encoded = base64.b64encode(data).decode("utf-8")
        
    return {
        "compressed": compress,
        "data": encoded
    }

def main():
    # Load base file content
    with open(base_html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Extract manifest
    manifest_match = re.search(r'<script type="__bundler/manifest">(.*?)</script>', html_content, re.DOTALL)
    if not manifest_match:
        print("Error: manifest script not found!")
        return

    manifest = json.loads(manifest_match.group(1))

    # Define files to repack from unpacked_andrianne
    mappings = {
        "2d9a7494-a10b-45a9-970a-9ad26440f554": ("unpacked_andrianne/data.js", "application/javascript"),
        "6f731459-7dbf-4dcf-8b2b-ce103a608cd5": ("unpacked_andrianne/components.js", "application/javascript"),
        "536abcf3-3c6d-4cc3-bc66-913853723053": ("unpacked_andrianne/app.js", "application/javascript"),
        "399b404f-097d-4759-ab60-a9f64a59e687": ("unpacked_andrianne/atoms.js", "text/jsx")
    }

    for key, (path, mime) in mappings.items():
        if os.path.exists(path):
            packed = pack_file(path, compress=True)
            manifest[key]["data"] = packed["data"]
            manifest[key]["compressed"] = packed["compressed"]
            manifest[key]["mime"] = mime
            print(f"Repacked {path} into manifest key {key}")
        else:
            print(f"Warning: file {path} not found, keeping original key {key}")

    # Load template
    template_path = "unpacked_andrianne/template.html"
    with open(template_path, "r", encoding="utf-8") as f:
        template_content = f.read()

    # Build new manifest block and template block with correct unicode escape
    new_manifest_str = f'<script type="__bundler/manifest">{json.dumps(manifest).replace("</", "<\\u002f")}</script>'
    new_template_str = f'<script type="__bundler/template">{json.dumps(template_content).replace("</", "<\\u002f")}</script>'

    # Replace manifest in html content
    html_content = html_content[:manifest_match.start()] + new_manifest_str + html_content[manifest_match.end():]

    # Re-find the template start/end because manifest replacement changed indices
    template_match = re.search(r'<script type="__bundler/template">(.*?)</script>', html_content, re.DOTALL)
    if not template_match:
        print("Error: template script not found!")
        return

    html_content = html_content[:template_match.start()] + new_template_str + html_content[template_match.end():]

    # Save to all destination paths
    for dest in dest_html_paths:
        with open(dest, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Successfully compiled standalone portfolio to: {dest}")

if __name__ == "__main__":
    main()
