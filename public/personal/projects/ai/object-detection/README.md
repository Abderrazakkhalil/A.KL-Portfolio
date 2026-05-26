# FlexiNeck Project - Object Detection & Classification Architecture

<p align="center">
  <strong>A modular deep learning framework for object detection and image classification</strong>
</p>

---

## 🎯 Project Overview

This project explores and implements **modular architectures for object detection and classification**, focusing on the "neck" component of modern detection networks. It includes:

1. **FlexiNeck**: A configurable feature aggregation neck with FPN, PAN, SPP, and attention
2. **FLOC**: Fast Lightweight Object Classifier - A complete detection model
3. **Data Pipeline**: Tools for loading, preprocessing, and visualizing YOLO-format datasets
4. **Training Utilities**: Training loops, evaluation, and experiment comparison

## 📂 Project Structure

```
Flexineck/
├── src/
│   ├── flexineck/          # Modular neck architecture
│   │   ├── __init__.py
│   │   ├── neck.py         # Main FlexiNeck class
│   │   ├── components.py   # Building blocks (SPP, Attention, Fusion)
│   │   └── vision_model.py # Complete model with ResNet backbone
│   │
│   ├── floc/               # FLOC detection model
│   │   ├── __init__.py
│   │   ├── backbone.py     # Residual backbone
│   │   ├── neck_modules.py # FPN, PANet, SPP
│   │   ├── attention.py    # CBAM, SE attention
│   │   ├── losses.py       # Detection losses
│   │   └── model.py        # Main FLOC model
│   │
│   ├── data/               # Data processing
│   │   ├── __init__.py
│   │   ├── loader.py       # Data loading functions
│   │   ├── dataset.py      # PyTorch Dataset classes
│   │   ├── preprocessing.py # Preprocessing utilities
│   │   └── visualization.py # Visualization functions
│   │
│   └── utils/              # Training utilities
│       ├── __init__.py
│       ├── trainer.py      # Training and evaluation
│       └── experiment.py   # Experiment comparison
│
├── docs/                   # Documentation
│   ├── FLEXINECK_README.md # FlexiNeck detailed docs
│   └── FLOC_README.md      # FLOC detailed docs
│
├── experiments/            # Experiment scripts and results
│
├── FlexiNeck.ipynb        # Original FlexiNeck notebook
├── floc-fast-lightweight-object-classifier (1).ipynb  # Original FLOC notebook
│
└── README.md              # This file
```

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/flexineck.git
cd flexineck

# Install dependencies
pip install torch torchvision numpy opencv-python matplotlib tqdm
```

### Using FlexiNeck

```python
from src.flexineck import FlexiNeck, VisionModel

# Create a configurable neck
neck = FlexiNeck(
    in_channels=[256, 512, 1024, 2048],
    out_channels=256,
    use_fpn=True,
    use_pan=True,
    use_spp=True,
    use_attention=True,
    output_format="pyramid"
)

# Or use the complete vision model
model = VisionModel(
    num_classes=10,
    neck_config={
        'use_fpn': True,
        'use_pan': True,
        'use_spp': True,
        'use_attention': True,
        'output_format': 'single'
    }
)
```

### Using FLOC

```python
from src.floc import FLOC
from src.data import load_labels, load_images, prepare_data_for_model
from src.utils import train_model

# Load data
labels = load_labels("path/to/labels")
images = load_images("path/to/images")

# Prepare datasets
train_ds, val_ds, test_ds = prepare_data_for_model(images, labels)

# Create and train model
model = FLOC(input_channels=1, max_objects=7, num_classes=2)
model, history = train_model(model, train_loader, val_loader, num_epochs=30)
```

## 📊 Architecture Comparison

| Component | FlexiNeck | FLOC |
|-----------|-----------|------|
| **Backbone** | External (ResNet50) | Custom Residual |
| **FPN** | ✅ Configurable | ✅ Built-in |
| **PAN** | ✅ Configurable | ✅ Built-in |
| **SPP** | ✅ Enhanced (3 levels) | ✅ Standard (3 levels) |
| **Attention** | Channel/Spatial/Hybrid | CBAM or SE |
| **Fusion** | Simple/Weighted/Adaptive | Concatenation |
| **Task** | Generic (Det/Seg/Cls) | Detection only |

## 🔬 Key Concepts Explained

### Feature Pyramid Network (FPN)
Creates a pyramid of features with strong semantics at all scales using top-down pathway and lateral connections.

### Path Aggregation Network (PAN)
Adds bottom-up path after FPN to shorten information flow from low to high levels.

### Spatial Pyramid Pooling (SPP)
Pools features at multiple scales (1x1, 3x3, 5x5) to capture multi-scale context.

### Attention Mechanisms
- **Channel Attention**: Weights channels by importance ("what" to focus on)
- **Spatial Attention**: Weights spatial locations ("where" to focus)
- **CBAM**: Combines both sequentially

## 📈 Results Summary

### FlexiNeck Comparison (CIFAR-10)
| Configuration | Accuracy | Speed |
|--------------|----------|-------|
| FPN only | 72% | 12ms |
| FPN + SPP | 74% | 14ms |
| FPN + Attention | 75% | 13ms |
| Full | 76% | 18ms |

### FLOC Detection (Fruit Ninja)
| Metric | Value |
|--------|-------|
| Classification Loss | 0.05 |
| BBox Loss | 0.06 |
| Parameters | ~25M |

## 📝 Original Notebooks

The original research was conducted in Jupyter notebooks:

1. **FlexiNeck.ipynb**: Exploration of modular neck architectures
   - Implements configurable FPN, PAN, SPP, Attention
   - Compares different configurations on CIFAR-10
   - Tests with VisionModel (ResNet50 backbone)

2. **floc-fast-lightweight-object-classifier.ipynb**: Object detection model
   - Custom backbone with residual blocks
   - FPN + PANet + SPP + CBAM architecture
   - Trained on Fruit Ninja dataset
   - Includes data loading, training, evaluation

## 🛠️ Development

### Running Experiments

```python
from src.utils import compare_neck_configurations

# Compare different neck configurations
results = compare_neck_configurations(
    dataset='cifar10',
    batch_size=32,
    num_epochs=5
)
```

### Adding New Components

1. Add component to appropriate module (`components.py`, `attention.py`, etc.)
2. Register in `__init__.py`
3. Integrate in main model class
4. Add configuration option

## 🔮 Future Directions

1. **BiFPN**: Bidirectional feature pyramid
2. **YOLOX-style head**: Decoupled classification and regression
3. **Transformer attention**: DETR-style attention
4. **EfficientDet scaling**: Compound scaling rules
5. **Advanced augmentation**: Mosaic, MixUp, CutMix

## 📚 References

- [Feature Pyramid Networks (FPN)](https://arxiv.org/abs/1612.03144)
- [Path Aggregation Network (PANet)](https://arxiv.org/abs/1803.01534)
- [Spatial Pyramid Pooling (SPP)](https://arxiv.org/abs/1406.4729)
- [CBAM: Convolutional Block Attention Module](https://arxiv.org/abs/1807.06521)
- [Squeeze-and-Excitation Networks](https://arxiv.org/abs/1709.01507)
- [YOLOv4: Optimal Speed and Accuracy](https://arxiv.org/abs/2004.10934)

## 📄 License

MIT License - See LICENSE file for details.

## 👤 Author

Built as an exploration of modern object detection architectures.
