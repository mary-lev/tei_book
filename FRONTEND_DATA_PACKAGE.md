# Frontend Data Package: What to Provide Your Developer

## Required Files

### 1. TEI Book File
**File:** `book.xml` (or `test_line_facsimile.xml`)
**Content:** Complete TEI document with:
- Text content in `<text><body><div>` structure
- Facsimile zones in `<facsimile><surface><zone>` elements
- Linking attributes (`facs="#zone_id"`) connecting text to images

### 2. Page Images
**Files:** All images referenced in the TEI facsimile section
**Format:** JPEG, PNG, or TIFF
**Location:** Same directory or organized folder structure

## Example Data Package Structure

```
book-data/
├── book.xml                    # Main TEI file
├── images/                     # Page images folder
│   ├── page_5.jpg             # Page 1 image
│   ├── page_6.jpg             # Page 2 image
│   ├── page_7.jpg             # Page 3 image
│   └── ...                    # All page images
└── metadata.json              # Optional: extracted metadata
```

## TEI File Contents (book.xml)

Your TEI file contains everything the frontend needs:

### Facsimile Data
```xml
<facsimile>
  <surface xml:id="facs_page_1" source="page_5.jpg">
    <graphic url="page_5.jpg" width="1500" height="2800"/>
    
    <!-- Block-level zones -->
    <zone xml:id="facs_block_1_1" ulx="197" uly="310" lrx="1320" lry="2392" 
          type="textblock" points="197 310 1265 310 1320 2392 231 2389"/>
    
    <!-- Line-level zones -->
    <zone xml:id="facs_line_1_1_1" ulx="416" uly="376" lrx="1056" lry="462" 
          type="textline" baseline="416 462 1056 462"/>
  </surface>
</facsimile>
```

### Text Content with Linking
```xml
<text>
  <body>
    <div type="book">
      <pb n="1" facs="#facs_page_1"/>
      
      <p facs="#facs_block_1_1">
        <seg facs="#facs_line_1_1_1">ПРИМТРЪ</seg>
        <lb facs="#facs_line_1_1_2"/>
        <seg facs="#facs_line_1_1_2">Добродѣтельныя</seg>
      </p>
    </div>
  </body>
</text>
```

## Image Requirements

### File Naming
Images must match the `source` and `url` attributes in TEI:
- TEI: `<surface source="page_5.jpg">`
- TEI: `<graphic url="page_5.jpg">`
- File: `page_5.jpg` must exist

### Image Specifications
- **Resolution:** High-quality (1500x2800px or similar)
- **Format:** JPEG preferred for photographs, PNG for line art
- **File size:** Optimized for web delivery (typically 200KB-2MB per page)
- **Color space:** RGB for web display

## Data Validation Checklist

Before providing data to your frontend developer, verify:

### ✅ TEI File Validation
- [ ] Valid XML structure
- [ ] All `facs` attributes reference existing zone IDs
- [ ] All zone IDs are unique
- [ ] Page breaks (`<pb>`) reference correct surface IDs

### ✅ Image File Validation
- [ ] All images referenced in TEI exist
- [ ] Image filenames match exactly (case-sensitive)
- [ ] Images are accessible and not corrupted
- [ ] Image dimensions match those in `<graphic>` elements

### ✅ Linking Validation
- [ ] Text segments have corresponding facsimile zones
- [ ] Zone coordinates are within image boundaries
- [ ] Page numbers in TEI match actual page sequence

## Testing Your Data Package

Run these commands to validate your data package:

```bash
# 1. Check TEI file structure
xmllint --noout book.xml

# 2. Verify all referenced images exist
grep 'url="' book.xml | sed 's/.*url="\([^"]*\)".*/\1/' | while read img; do
  if [ ! -f "images/$img" ]; then
    echo "Missing image: $img"
  fi
done

# 3. Check facsimile zone references
grep 'facs="#' book.xml | sed 's/.*facs="#\([^"]*\)".*/\1/' | sort | uniq > referenced_zones.txt
grep 'xml:id="facs_' book.xml | sed 's/.*xml:id="\([^"]*\)".*/\1/' | sort > defined_zones.txt
diff referenced_zones.txt defined_zones.txt
```

## Optional: Metadata File

Create a `metadata.json` file for easier frontend processing:

```json
{
  "title": "Book converted from ALTO (pages 1-21)",
  "totalPages": 21,
  "imageFormat": "jpg",
  "imageDirectory": "images/",
  "pages": [
    {
      "number": 1,
      "image": "page_5.jpg",
      "dimensions": {"width": 1500, "height": 2800},
      "zones": 13
    },
    {
      "number": 2,
      "image": "page_6.jpg",
      "dimensions": {"width": 1500, "height": 2800},
      "zones": 0
    }
  ],
  "statistics": {
    "totalZones": 157,
    "textBlocks": 42,
    "textLines": 115,
    "pageBreaks": 21
  }
}
```

## Delivery Methods

### Option 1: File Package
```
compressed-package.zip
├── book.xml
├── images/
│   └── [all page images]
└── README.txt
```

### Option 2: Web-Accessible URLs
Provide base URLs where files can be accessed:
- TEI file: `https://yourserver.com/books/book.xml`
- Images: `https://yourserver.com/books/images/page_5.jpg`

### Option 3: API Endpoints
If using a backend system:
- `GET /api/books/1/tei` - Returns TEI XML
- `GET /api/books/1/images/page_5.jpg` - Returns image
- `GET /api/books/1/metadata` - Returns book info

## Example Complete Package

Based on your current `test_line_facsimile.xml`, provide:

1. **TEI File:** `test_line_facsimile.xml` (793 lines, 47KB)
2. **Images:** 21 JPEG files (`page_5.jpg` through `page_25.jpg`)
3. **Total Package:** ~50MB (depending on image sizes)

## Developer Handoff Instructions

Tell your frontend developer:

> **"Here's your data package for the TEI book viewer:**
> 
> **1. TEI File:** `book.xml` contains the complete book with text content and facsimile coordinate data
> 
> **2. Images:** `images/` folder contains all page images (21 files)
> 
> **3. Key Features:** Each text line is linked to image coordinates via `facs` attributes - this enables the click-to-navigate functionality
> 
> **4. Structure:** Pages are numbered 1-21, with page breaks marked as `<pb n="X" facs="#facs_page_X"/>`
> 
> **5. Zones:** Text segments have `facs="#facs_line_X_Y_Z"` pointing to specific image regions
> 
> **Start with parsing the TEI to extract text content and coordinate mappings, then implement the dual-pane viewer as specified in the requirements document.**"

## That's It!

Your `alto2teibook.py` converter has already done the hard work of creating the spatial data. The frontend developer just needs these two components to build a fully-functional digital edition viewer with precise text-image synchronization! 🎯