import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
import os
import json

def train_image_model():
    base_dir = 'data'
    train_dir = os.path.join(base_dir, 'train')
    valid_dir = os.path.join(base_dir, 'valid')
    
    if not os.path.exists(train_dir):
        print("Train directory not found!")
        return

    # Count classes
    classes = [d for d in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, d))]
    num_classes = len(classes)
    print(f"Detected {num_classes} classes.")

    # Data Augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    valid_datagen = ImageDataGenerator(rescale=1./255)

    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    valid_generator = valid_datagen.flow_from_directory(
        valid_dir,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    # Save class indices for inference mapping
    with open(os.path.join('backend', 'class_indices.json'), 'w') as f:
        json.dump(train_generator.class_indices, f)

    # Model Setup
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    predictions = Dense(num_classes, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)

    # Freeze base model layers
    for layer in base_model.layers:
        layer.trainable = False

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Fast Training (1 epoch for demo/integration, user should train longer later)
    print("Starting training (1 epoch for integration)...")
    model.fit(
        train_generator,
        steps_per_epoch=min(len(train_generator), 10), # Small subset for speed
        validation_data=valid_generator,
        validation_steps=min(len(valid_generator), 5),
        epochs=1
    )

    model_path = os.path.join('backend', 'RESNET50_PLANT_DISEASE.h5')
    model.save(model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_image_model()
