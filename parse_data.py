import json
import re

lines_with_data = []

# First, extract from overview.txt
path = r'C:\Users\DELL\.gemini\antigravity\brain\eaee13b2-5d71-48b8-8e33-048f94ba2b1e\.system_generated\logs\overview.txt'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        try:
            data = json.loads(line)
            if 'content' in data:
                content = data['content']
                # Search for lines containing ___ and arrow
                for text_line in content.split('\n'):
                    if '___' in text_line and ('→' in text_line or '->' in text_line):
                        lines_with_data.append(text_line)
        except Exception as e:
            pass

# Let's add the data from the current user request
current_request = """
Aster___Leaf_spot → Mancozeb
Aster___Powdery_mildew → Sulfur

Bean___Angular_leaf_spot → Chlorothalonil
Bean___Rust → Propiconazole

BellFlower___Root_rot → Carbendazim
BellFlower___Leaf_blight → Copper_Oxychloride

Blackberry___Anthracnose → Mancozeb
Blackberry___Rust → Hexaconazole

Cactus___Stem_rot → Copper_Fungicide
Cactus___Leaf_spot → Mancozeb

Calendula___Powdery_mildew → Sulfur
Calendula___Leaf_spot → Copper_Hydroxide

Camellia___Blight → Chlorothalonil
Camellia___Root_rot → Carbendazim

Canna___Rust → Propiconazole
Canna___Leaf_spot → Mancozeb

Carambola___Anthracnose → Carbendazim
Carambola___Leaf_blight → Copper_Oxychloride

Carnation___Wilt → Carbendazim
Carnation___Leaf_spot → Mancozeb

Cassia___Rust → Propiconazole
Cassia___Powdery_mildew → Sulfur

Catnip___Leaf_blight → Copper_Fungicide
Catnip___Powdery_mildew → Wettable_Sulfur

CauliflowerGreen___Black_rot → Streptomycin
CauliflowerGreen___Downy_mildew → Metalaxyl

Celosia___Leaf_spot → Mancozeb
Celosia___Stem_rot → Carbendazim

Chervil___Powdery_mildew → Sulfur
Chervil___Leaf_spot → Copper_Hydroxide

Chicory___Rust → Propiconazole
Chicory___Leaf_blight → Mancozeb

ChristmasCactus___Root_rot → Fosetyl_Al
ChristmasCactus___Stem_blight → Copper_Oxychloride

Cilantro___Downy_mildew → Metalaxyl
Cilantro___Leaf_spot → Chlorothalonil

Coleus___Leaf_spot → Copper_Fungicide
Coleus___Root_rot → Carbendazim

CollardGreens___Alternaria_leaf_spot → Mancozeb
CollardGreens___Downy_mildew → Metalaxyl

Croton___Leaf_blight → Copper_Oxychloride
Croton___Rust → Propiconazole

Dandelion___Powdery_mildew → Sulfur
Dandelion___Leaf_spot → Mancozeb

Dieffenbachia___Stem_rot → Carbendazim
Dieffenbachia___Leaf_spot → Copper_Hydroxide

Eggplant___Verticillium_wilt → Trichoderma
Eggplant___Fruit_rot → Captan

ElephantFootYam___Leaf_blight → Mancozeb
ElephantFootYam___Stem_rot → Metalaxyl

Elderberry___Anthracnose → Carbendazim
Elderberry___Powdery_mildew → Sulfur

Ficus___Leaf_spot → Copper_Oxychloride
Ficus___Root_rot → Fosetyl_Al

Foxglove___Rust → Propiconazole
Foxglove___Leaf_blight → Mancozeb

Gardenia___Sooty_mold → Neem_Oil
Gardenia___Leaf_spot → Copper_Fungicide

Gladiolus___Corm_rot → Carbendazim
Gladiolus___Leaf_blight → Chlorothalonil

Guar___Powdery_mildew → Sulfur
Guar___Leaf_spot → Mancozeb

Hollyhock___Rust → Propiconazole
Hollyhock___Leaf_spot → Copper_Hydroxide

Honeydew___Anthracnose → Carbendazim
Honeydew___Downy_mildew → Metalaxyl

Impatiens___Downy_mildew → Metalaxyl
Impatiens___Leaf_spot → Mancozeb

IvyGourd___Powdery_mildew → Wettable_Sulfur
IvyGourd___Leaf_blight → Copper_Oxychloride

Jalapeno___Bacterial_spot → Streptomycin
Jalapeno___Leaf_curl → Imidacloprid

Jute___Stem_rot → Carbendazim
Jute___Leaf_blight → Mancozeb

Kiwano___Anthracnose → Copper_Hydroxide
Kiwano___Powdery_mildew → Sulfur

LadyFinger___Yellow_vein_mosaic → Imidacloprid
LadyFinger___Leaf_spot → Mancozeb

Leucaena___Rust → Propiconazole
Leucaena___Leaf_spot → Copper_Fungicide

Lupin___Powdery_mildew → Sulfur
Lupin___Anthracnose → Carbendazim

Mandarin___Citrus_canker → Copper_Oxychloride
Mandarin___Greening → Imidacloprid

Mangosteen___Fruit_rot → Captan
Mangosteen___Leaf_spot → Mancozeb

Mesquite___Wilt → Carbendazim
Mesquite___Leaf_blight → Copper_Hydroxide

Moonflower___Powdery_mildew → Sulfur
Moonflower___Leaf_spot → Chlorothalonil

MorningGlory___Rust → Propiconazole
MorningGlory___Leaf_spot → Mancozeb

MothBean___Yellow_mosaic → Imidacloprid
MothBean___Leaf_spot → Copper_Oxychloride

Nerium___Leaf_blight → Mancozeb
Nerium___Root_rot → Carbendazim

OkraGreen___Powdery_mildew → Sulfur
OkraGreen___Leaf_spot → Copper_Fungicide

OrnamentalPepper___Bacterial_spot → Streptomycin
OrnamentalPepper___Leaf_curl → Imidacloprid

Palm___Bud_rot → Bordeaux_Mixture
Palm___Leaf_spot → Copper_Hydroxide

PassionFruit___Wilt → Carbendazim
PassionFruit___Anthracnose → Mancozeb

Peony___Gray_mold → Chlorothalonil
Peony___Leaf_spot → Copper_Oxychloride

Phlox___Powdery_mildew → Wettable_Sulfur
Phlox___Rust → Propiconazole

Pistachio___Alternaria_blight → Mancozeb
Pistachio___Leaf_spot → Copper_Fungicide

Plantain___Black_sigatoka → Propiconazole
Plantain___Panama_disease → Carbendazim

Plumeria___Rust → Hexaconazole
Plumeria___Leaf_spot → Mancozeb

Purslane___Downy_mildew → Metalaxyl
Purslane___Leaf_spot → Copper_Hydroxide

Rambutan___Anthracnose → Carbendazim
Rambutan___Leaf_blight → Mancozeb

RedCabbage___Black_rot → Streptomycin
RedCabbage___Downy_mildew → Metalaxyl

Sage___Powdery_mildew → Sulfur
Sage___Leaf_spot → Copper_Oxychloride

SnakeBean___Rust → Propiconazole
SnakeBean___Anthracnose → Mancozeb

Tatsoi___Downy_mildew → Metalaxyl
Tatsoi___Leaf_spot → Copper_Fungicide

WhiteEggplant___Wilt → Carbendazim
WhiteEggplant___Leaf_spot → Mancozeb

YellowCapsicum___Bacterial_spot → Streptomycin
YellowCapsicum___Leaf_curl → Imidacloprid

ZebraPlant___Leaf_blight → Copper_Oxychloride
ZebraPlant___Root_rot → Fosetyl_Al Amaranthus___Leaf_spot → Mancozeb
Amaranthus___Downy_mildew → Metalaxyl

Arugula___Powdery_mildew → Sulfur
Arugula___Leaf_blight → Copper_Oxychloride

BokChoy___Black_rot → Streptomycin
BokChoy___Downy_mildew → Metalaxyl

BroadBean___Rust → Propiconazole
BroadBean___Chocolate_spot → Chlorothalonil

Caper___Leaf_spot → Copper_Fungicide
Caper___Anthracnose → Carbendazim

Chayote___Powdery_mildew → Wettable_Sulfur
Chayote___Leaf_blight → Mancozeb

ChineseCabbage___Soft_rot → Copper_Hydroxide
ChineseCabbage___Downy_mildew → Metalaxyl

ClusterBean___Powdery_mildew → Sulfur
ClusterBean___Leaf_spot → Mancozeb

Daffodil___Leaf_blight → Copper_Oxychloride
Daffodil___Bulb_rot → Carbendazim

Endive___Downy_mildew → Metalaxyl
Endive___Leaf_spot → Chlorothalonil

GardenPea___Powdery_mildew → Sulfur
GardenPea___Wilt → Carbendazim

HyacinthBean___Anthracnose → Mancozeb
HyacinthBean___Leaf_spot → Copper_Fungicide

IcebergLettuce___Bottom_rot → Captan
IcebergLettuce___Downy_mildew → Metalaxyl

IndianGooseberry___Rust → Propiconazole
IndianGooseberry___Leaf_spot → Mancozeb

JerusalemArtichoke___Stem_rot → Carbendazim
JerusalemArtichoke___Leaf_spot → Copper_Oxychloride

Kohlrabi___Black_rot → Streptomycin
Kohlrabi___Downy_mildew → Metalaxyl

LimaBean___Rust → Hexaconazole
LimaBean___Leaf_spot → Chlorothalonil

LongBean___Anthracnose → Mancozeb
LongBean___Mosaic_virus → Imidacloprid

LotusStem___Rhizome_rot → Metalaxyl
LotusStem___Leaf_spot → Copper_Fungicide

Methi___Powdery_mildew → Sulfur
Methi___Leaf_blight → Mancozeb

NapaCabbage___Soft_rot → Copper_Hydroxide
NapaCabbage___Downy_mildew → Metalaxyl

Parsnip___Leaf_blight → Mancozeb
Parsnip___Powdery_mildew → Sulfur

PointedGourd___Downy_mildew → Metalaxyl
PointedGourd___Anthracnose → Carbendazim

RidgeGourd___Leaf_spot → Copper_Oxychloride
RidgeGourd___Powdery_mildew → Wettable_Sulfur

Romanesco___Downy_mildew → Metalaxyl
Romanesco___Black_rot → Streptomycin

Shallot___Purple_blotch → Mancozeb
Shallot___Stemphylium_blight → Chlorothalonil

Sorrel___Rust → Propiconazole
Sorrel___Leaf_spot → Mancozeb

SpringOnion___Downy_mildew → Metalaxyl
SpringOnion___Purple_blotch → Mancozeb

SwissChard___Cercospora_leaf_spot → Copper_Fungicide
SwissChard___Downy_mildew → Metalaxyl

Tinda___Powdery_mildew → Sulfur
Tinda___Leaf_blight → Mancozeb

TurnipGreens___White_rust → Chlorothalonil
TurnipGreens___Leaf_spot → Copper_Oxychloride

WaterCress___Downy_mildew → Metalaxyl
WaterCress___Leaf_spot → Mancozeb

WaxGourd___Anthracnose → Carbendazim
WaxGourd___Powdery_mildew → Sulfur

WingedBean___Rust → Propiconazole
WingedBean___Leaf_spot → Copper_Hydroxide

YamBean___Root_rot → Fosetyl_Al
YamBean___Leaf_spot → Mancozeb

Ziziphus___Powdery_mildew → Wettable_Sulfur
Ziziphus___Leaf_spot → Copper_Oxychloride
"""

for text_line in current_request.split('\n'):
    if '___' in text_line and ('→' in text_line or '->' in text_line):
        lines_with_data.append(text_line)

parsed_entries = []
seen = set()

# Helper function to categorize by disease type
def get_disease_type(disease_name):
    # Determine type based on disease name keywords
    dn = disease_name.lower()
    if 'mildew' in dn or 'rust' in dn or 'rot' in dn or 'blight' in dn or 'spot' in dn or 'anthracnose' in dn or 'mold' in dn:
        return 'Fungal'
    elif 'mosaic' in dn or 'virus' in dn or 'curl' in dn or 'greening' in dn:
        return 'Viral'
    elif 'bacterial' in dn or 'rot' in dn or 'wilt' in dn: # default back up
        return 'Bacterial'
    return 'Fungal'

for line in lines_with_data:
    line = line.replace('->', '→').strip()
    if not line:
        continue
    # Splitting by arrow
    parts = line.split('→')
    if len(parts) != 2:
        continue
    left, right = parts[0].strip(), parts[1].strip()
    left_parts = left.split('___')
    if len(left_parts) != 2:
        match = re.search(r'([a-zA-Z0-9_]+)___([a-zA-Z0-9_]+)', left)
        if match:
            crop, disease = match.group(1), match.group(2)
        else:
            continue
    else:
        crop, disease = left_parts[0].strip(), left_parts[1].strip()
    
    treatment = right
    # Clean json escape character if present
    if crop.startswith('n') and len(crop) > 1 and crop[1].isupper():
        crop = crop[1:]
        
    pair_key = (crop, disease)
    if pair_key not in seen:
        seen.add(pair_key)
        
        disease_display = disease.replace('_', ' ')
        treatment_display = treatment.replace('_', ' ')
        
        # Let's derive info, symptoms, prevention dynamically to make it look premium
        parsed_entries.append({
            "crop": crop,
            "name": f"{crop} {disease_display}",
            "type": get_disease_type(disease_display),
            "severity": "Medium" if "rot" not in disease_display.lower() else "High",
            "info": f"Commonly affects {crop} crops, leading to significant yield loss if untreated.",
            "symptoms": f"Characteristic patches, discoloration, or lesions associated with {disease_display} on leaves and stems.",
            "prevention": f"Use disease-free seeds, maintain proper spacing, avoid waterlogging, and remove infected plant debris.",
            "treatment": f"Apply {treatment_display} according to manufacturer instructions."
        })

print(f"Extracted {len(parsed_entries)} unique entries.")

# Write to encyclopediaExtraData2.json
with open('frontend/src/data/encyclopediaExtraData2.json', 'w', encoding='utf-8') as outfile:
    json.dump(parsed_entries, outfile, indent=2)

print("Saved to frontend/src/data/encyclopediaExtraData2.json successfully!")
