import zipfile
import os

zip_path = r'c:\Users\DELL\Desktop\archive.zip'
dest_path = r'c:\Users\DELL\Desktop\project\data'

os.makedirs(dest_path, exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    for member in zip_ref.infolist():
        # Clean up member filename to avoid trailing spaces/dots which fail on Windows
        clean_name = member.filename.replace(' /', '/').replace(' ', '_').replace('(', '').replace(')', '')
        # However, we want to keep some structure. Let's just strip trailing spaces from folder names.
        parts = member.filename.split('/')
        clean_parts = [p.strip() for p in parts]
        clean_filename = '/'.join(clean_parts)
        
        target_path = os.path.join(dest_path, clean_filename)
        
        if member.is_dir():
            os.makedirs(target_path, exist_ok=True)
        else:
            # Ensure directory exists
            os.makedirs(os.path.dirname(target_path), exist_ok=True)
            try:
                with zip_ref.open(member) as source, open(target_path, "wb") as target:
                    target.write(source.read())
            except Exception as e:
                print(f"Failed to extract {member.filename}: {e}")

print("Extraction complete.")
