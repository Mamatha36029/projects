import csv
import os
import shutil
import json
import random

# Paths
CSV_PATH = r'c:\Users\DELL\Desktop\project\dataset\train.csv'
IMAGES_SRC = r'c:\Users\DELL\Desktop\project\dataset\train_images'
DATA_ROOT = r'c:\Users\DELL\Desktop\project\data'
MAP_PATH = r'c:\Users\DELL\Desktop\project\dataset\label_num_to_disease_map.json'

# Load mapping
with open(MAP_PATH, 'r') as f:
    label_map = json.load(f)

# Create directories
# We'll use 'train' and 'valid' folders if they exist (from the other dataset)
# or create them if not.
for label_name in label_map.values():
    os.makedirs(os.path.join(DATA_ROOT, 'train', label_name), exist_ok=True)
    os.makedirs(os.path.join(DATA_ROOT, 'valid', label_name), exist_ok=True)

# Load and shuffle data
data = []
with open(CSV_PATH, 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

random.seed(42)
random.shuffle(data)

# Split 80-20
split_idx = int(len(data) * 0.8)
train_data = data[:split_idx]
valid_data = data[split_idx:]

def move_images(subset_data, target_folder):
    for row in subset_data:
        img_id = row['image_id']
        label = row['label']
        label_name = label_map[label]
        src = os.path.join(IMAGES_SRC, img_id)
        dst = os.path.join(DATA_ROOT, target_folder, label_name, img_id)
        if os.path.exists(src):
            shutil.copy(src, dst)

print("Moving train images...")
move_images(train_data, 'train')
print("Moving valid images...")
move_images(valid_data, 'valid')
print("Done.")
