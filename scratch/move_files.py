import os
import shutil

source_dir = r"c:\Users\DELL\Desktop"
dest_dir = r"c:\Users\DELL\Desktop\project"

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
    src_path = os.path.join(source_dir, item)
    dest_path = os.path.join(dest_dir, item)
    
    if os.path.exists(src_path):
        if os.path.exists(dest_path):
            backup_name = f"desktop_backup_{item}"
            dest_path = os.path.join(dest_dir, backup_name)
        
        try:
            shutil.move(src_path, dest_path)
            print(f"Successfully moved: {item} -> {dest_path}")
        except Exception as e:
            print(f"Error moving {item}: {e}")
