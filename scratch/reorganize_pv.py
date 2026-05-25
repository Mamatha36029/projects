import os
import shutil

DATA_ROOT = r'c:\Users\DELL\Desktop\project\data'

# Crops we found in archive.zip
crops = ['Apple', 'Bell Pepper', 'Cherry', 'Corn (Maize)', 'Grape', 'Peach', 'Potato', 'Strawberry', 'Tomato']

for crop in crops:
    crop_path = os.path.join(DATA_ROOT, crop)
    if not os.path.exists(crop_path):
        continue
    
    for set_type in ['Train', 'Val']:
        set_path = os.path.join(crop_path, set_type)
        if not os.path.exists(set_path):
            continue
        
        target_set = 'train' if set_type == 'Train' else 'valid'
        
        for disease in os.listdir(set_path):
            disease_path = os.path.join(set_path, disease)
            if not os.path.isdir(disease_path):
                continue
            
            # Create clean class name: Crop___Disease
            clean_disease = disease.replace(' ', '_')
            clean_crop = crop.replace(' ', '_').replace('(', '').replace(')', '')
            class_name = f"{clean_crop}___{clean_disease}"
            
            dst_path = os.path.join(DATA_ROOT, target_set, class_name)
            os.makedirs(dst_path, exist_ok=True)
            
            # Move images
            for img in os.listdir(disease_path):
                shutil.move(os.path.join(disease_path, img), os.path.join(dst_path, img))

print("Reorganization of PV dataset complete.")

# Clean up original folders
for crop in crops:
    shutil.rmtree(os.path.join(DATA_ROOT, crop), ignore_errors=True)
