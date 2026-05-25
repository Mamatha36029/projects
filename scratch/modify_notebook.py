import json

notebook_path = r'c:\Users\DELL\Desktop\project\backend\plant-disease-resnet50.ipynb'

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        source = cell['source']
        new_source = []
        for line in source:
            # Change base model definition
            if "base_model_tf=ResNet50" in line:
                line = line.replace(",classes=38", "")
            
            # Change paths
            if "path_train='/kaggle/input/" in line:
                line = "path_train='c:/Users/DELL/Desktop/project/data/train'\n"
            if "path_valid='/kaggle/input/" in line:
                line = "path_valid='c:/Users/DELL/Desktop/project/data/valid'\n"
            
            # Change output layer and add num_classes
            if "model_resnet=Dense(38,activation='softmax')" in line:
                new_source.append("num_classes = 34 # Updated to 34 (29 original subset + 5 Cassava)\n")
                line = "model_resnet=Dense(num_classes,activation='softmax')(model_resnet)\n"
            
            # Remove steps_per_epoch and update filepath for model checkpoint
            if "model_main.fit" in line:
                line = line.replace(",steps_per_epoch=200", "")
            if "ModelCheckpoint(filepath='/content'" in line:
                line = line.replace("filepath='/content'", "filepath='RESNET50_PLANT_DISEASE.h5'")

            new_source.append(line)
        cell['source'] = new_source

with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Notebook updated successfully.")
