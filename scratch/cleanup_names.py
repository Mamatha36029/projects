import os
import shutil

DATA_ROOT = r'c:\Users\DELL\Desktop\project\data'

mapping = {
    "Cassava Bacterial Blight (CBB)": "Cassava___Bacterial_Blight",
    "Cassava Brown Streak Disease (CBSD)": "Cassava___Brown_Streak_Disease",
    "Cassava Green Mottle (CGM)": "Cassava___Green_Mottle",
    "Cassava Mosaic Disease (CMD)": "Cassava___Mosaic_Disease",
    "Healthy": "Cassava___Healthy"
}

for set_type in ['train', 'valid']:
    set_path = os.path.join(DATA_ROOT, set_type)
    if not os.path.exists(set_path):
        continue
    
    for old_name, new_name in mapping.items():
        old_path = os.path.join(set_path, old_name)
        new_path = os.path.join(set_path, new_name)
        
        if os.path.exists(old_path):
            if os.path.exists(new_path):
                # Merge if new_path already exists (shouldn't happen here but safe)
                for img in os.listdir(old_path):
                    shutil.move(os.path.join(old_path, img), os.path.join(new_path, img))
                os.rmdir(old_path)
            else:
                os.rename(old_path, new_path)

print("Naming cleanup complete.")
