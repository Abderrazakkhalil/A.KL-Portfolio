# FLOC - Fast Lightweight Object Classifier

## 📋 Overview

**FLOC** (Fast Lightweight Object Classifier) is a custom object detection model designed for the Fruit Ninja game dataset. It detects and classifies objects (Fruits and Bombs) in game screenshots.

### Problem Statement
Given a game screenshot, detect all objects (fruits and bombs) and predict:
1. **Classification**: Is it a Fruit or a Bomb?
2. **Localization**: Where is the object (bounding box)?

## 🏗️ Architecture

```
Input Image (320x320x1, grayscale)
         │
         ▼
┌─────────────────────────────────────────────┐
│              BACKBONE NETWORK               │
│  ┌─────────────────────────────────────┐   │
│  │ Initial Conv (7x7, stride=2)        │   │
│  │ MaxPool (3x3, stride=2)             │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ Layer 1: ResBlock×2 (64→128)        │   │ → C2
│  │ Layer 2: ResBlock×3 (128→256)       │   │ → C3
│  │ Layer 3: ResBlock×3 (256→512)       │   │ → C4
│  │ Layer 4: ResBlock×2 (512→1024)      │   │ → C5
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
         │
         ▼ [C5, C4, C3, C2]
┌─────────────────────────────────────────────┐
│         FEATURE PYRAMID NETWORK             │
│  Top-down pathway with lateral connections  │
│  [P5, P4, P3, P2] - 256 channels each      │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│        PATH AGGREGATION NETWORK             │
│  Bottom-up pathway for better localization  │
│  [N5, N4, N3, N2] - 256 channels each      │
└─────────────────────────────────────────────┘
         │
         ├──────────────────────┐
         │                      │
         ▼                      ▼
┌─────────────────┐   ┌─────────────────┐
│   FPN+PANet     │   │   SPP + PANet   │
│   (High Res)    │   │   (Semantics)   │
│      N2         │   │      N5→SPP     │
└─────────────────┘   └─────────────────┘
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────┐
         │   Fusion Module   │
         │  Concatenate→Conv │
         └──────────────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  CBAM Attention   │
         │ Channel + Spatial │
         └──────────────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  Detection Conv  │
         │    256→256×2     │
         └──────────────────┘
                    │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│  Class Head     │ │  BBox Head      │
│  7 × 2 classes  │ │  7 × 4 coords   │
│  (max_objects)  │ │  (x1,y1,x2,y2)  │
└─────────────────┘ └─────────────────┘
```

## 🧩 Key Components

### 1. Residual Backbone
Custom residual network with:
- **LeakyReLU** activation (0.1 slope) for better gradient flow
- **Projection shortcuts** for dimension matching
- **Dropout** (10%) in deeper layers to prevent overfitting

### 2. Feature Pyramid Network (FPN)
- Builds a feature pyramid from C2-C5
- Top-down pathway with lateral connections
- Each level has 256 channels

### 3. Path Aggregation Network (PANet)
- Bottom-up path after FPN
- Shortens information path
- Improves localization accuracy

### 4. Spatial Pyramid Pooling (SPP)
- Pool sizes: [1, 2, 4]
- Creates fixed-length representation
- Captures multi-scale context

### 5. CBAM Attention
- Channel attention: "What" to focus on
- Spatial attention: "Where" to focus
- Sequential application

### 6. Detection Heads
Two separate heads:
- **Classification head**: Predicts object classes (Sigmoid activation)
- **Bounding box head**: Predicts box coordinates (decoded from offsets)

## 📊 Training Details

### Loss Functions

#### Masked Classification Loss
```python
# BCE loss only for valid objects (non-padded)
loss = BCE(pred, target) * valid_mask
```

#### Masked BBox Loss
```python
# Smooth L1 with curriculum learning
if epoch < 10:
    loss = L1(pred, target)  # Start with L1
else:
    loss = SmoothL1(pred, target)  # Then SmoothL1
```

### Curriculum Learning
The bbox loss weight increases during training:
```python
bbox_weight = min(0.1 * (epoch + 1), 2.0)
total_loss = cls_loss + bbox_weight * bbox_loss
```

This helps the model:
1. First learn to classify objects
2. Then gradually learn to localize them

### Optimizer & Scheduler
- **Optimizer**: Adam (lr=0.0005, weight_decay=1e-5)
- **Scheduler**: ReduceLROnPlateau (patience=2, factor=0.3)

## 📈 Training Results

Training on Fruit Ninja dataset (30 epochs):

| Metric | Value |
|--------|-------|
| Final Train Loss | ~0.15 |
| Final Val Loss | ~0.18 |
| Classification Loss | ~0.05 |
| BBox Loss | ~0.06 |
| Total Parameters | ~25M |

## 🎯 Data Pipeline

### YOLO Format Labels
```
class_id x_center y_center width height
0 0.45 0.32 0.15 0.20
1 0.72 0.55 0.12 0.18
```

### Preprocessing
1. Load images (BGR format)
2. Resize to 320x320
3. Convert to grayscale
4. Normalize to [0, 1]
5. Pad annotations to max_objects (7)

### Data Augmentation (potential)
Currently not implemented, but could add:
- Random horizontal flip
- Color jitter
- Random crop/zoom
- Mosaic augmentation

## 🔍 Critical Analysis

### Strengths ✅

1. **Multi-scale feature fusion**: FPN + PANet provides strong features
2. **Attention mechanism**: CBAM refines important features
3. **Curriculum learning**: Gradual bbox loss helps training
4. **Flexible max_objects**: Handles variable number of detections

### Weaknesses ❌

1. **Fixed max_objects**: Limited to 7 objects per image
2. **No anchor boxes**: Uses fixed anchor size (0.1, 0.1)
3. **Simple NMS**: No post-processing for overlapping detections
4. **Grayscale input**: Loses color information

### Potential Improvements 🔧

1. **Multi-scale anchors**: Different anchor sizes/ratios
2. **Dynamic object handling**: Use attention for variable objects
3. **Color information**: Use RGB instead of grayscale
4. **Data augmentation**: Add augmentation pipeline
5. **Better box encoding**: Use GIoU/DIoU loss
6. **Post-processing**: Add NMS for overlapping boxes
7. **Focal loss**: Handle class imbalance better

## 📁 File Structure

```
src/floc/
├── __init__.py       # Module exports
├── backbone.py       # ResidualBlock
├── neck_modules.py   # SPP, FPN, PANet
├── attention.py      # ChannelAttention, SpatialAttention, CBAM, SEBlock
├── losses.py         # MaskedClassificationLoss, MaskedBBoxLoss
└── model.py          # Main FLOC model
```

## 🚀 Usage

### Training
```python
from src.floc import FLOC
from src.utils import train_model
from src.data import prepare_data_for_model, create_data_loaders

# Prepare data
train_dataset, val_dataset, test_dataset = prepare_data_for_model(
    images_dict, labels_dict, target_size=(320, 320)
)
train_loader, val_loader, test_loader = create_data_loaders(
    train_dataset, val_dataset, test_dataset, batch_size=16
)

# Create model
model = FLOC(input_channels=1, max_objects=7, num_classes=2)

# Train
model, history = train_model(
    model, train_loader, val_loader,
    num_epochs=30, learning_rate=0.0005
)
```

### Inference
```python
model.eval()
with torch.no_grad():
    image = preprocess(image)  # [1, 1, 320, 320]
    class_output, bbox_output = model(image)
    
    # class_output: [1, 7, 2, H, W]
    # bbox_output: [1, 7, 4, H, W]
    
    # Get predictions
    classes = class_output.mean(dim=(3, 4))  # [1, 7, 2]
    boxes = bbox_output.mean(dim=(4, 5))  # [1, 7, 4]
```

## 📚 References

- **ResNet**: [Deep Residual Learning](https://arxiv.org/abs/1512.03385)
- **FPN**: [Feature Pyramid Networks](https://arxiv.org/abs/1612.03144)
- **PANet**: [Path Aggregation Network](https://arxiv.org/abs/1803.01534)
- **CBAM**: [Convolutional Block Attention Module](https://arxiv.org/abs/1807.06521)
- **Smooth L1**: [Fast R-CNN](https://arxiv.org/abs/1504.08083)

## 🎮 Dataset

The model is trained on the **Fruit Ninja** game dataset:
- **Classes**: Bomb (0), Fruit (1)
- **Format**: YOLO annotation format
- **Resolution**: Variable (resized to 320x320)
- **Color**: Converted to grayscale
