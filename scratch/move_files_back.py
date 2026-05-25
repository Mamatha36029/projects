import os
import shutil

source_dir = r"c:\Users\DELL\Desktop\project"
dest_dir = r"c:\Users\DELL\Desktop"

items_to_move = [
    "AgroVision_Presentation.pdf",
    "apikeys.txt",
    "archive (1).zip",
    "archive (2).zip",
    "archive (3).zip",
    "archive.zip",
    "crop-disease-prediction-end-to-end.ipynb",
    "crop-s-pest-and-disease-detection.ipynb",
    "plant-disease-resnet50.ipynb",
    "plant-health-prediction-with-ml.ipynb",
    "run-me.cmd",
    "server.js",
    "data sets",
    "future notes",
    "ppt",
    "python",
    "syp",
    "3 notes",
    "Sound recordings"
]

for item in items_to_move:
    # Check both the exact name and any desktop_backup_ prefix
    possible_names = [item, f"desktop_backup_{item}"]
    for name in possible_names:
        src_path = os.path.join(source_dir, name)
        dest_path = os.path.join(dest_dir, item)
        
        if os.path.exists(src_path):
            try:
                shutil.move(src_path, dest_path)
                print(f"Moved back: {name} -> {dest_path}")
                break
            except Exception as e:
                print(f"Error moving {name} back: {e}")
