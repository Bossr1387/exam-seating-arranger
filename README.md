# 🪑 Exam Seating Arranger

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/CrueChan/exam-seating-arranger.svg)](https://github.com/CrueChan/exam-seating-arranger/stargazers)

An intelligent web-based tool for arranging exam seating to ensure fairness by dispersing candidates from the same organization.

[🚀 Try Live Demo](https://CrueChan.github.io/exam-seating-arranger/) | [📖 Documentation](#how-to-use) | [🐛 Report Bug](https://github.com/CrueChan/exam-seating-arranger/issues)

## ✨ Features

- **🎯 Intelligent Distribution**: Automatically spaces candidates from the same organization
- **⚙️ Flexible Configuration**: Customizable column mappings and spacing requirements
- **📁 Multi-Format Support**: Import from Excel, CSV, TSV, or direct paste
- **✅ Validation Tools**: Built-in spacing validation to verify arrangement quality
- **📤 Export Options**: Download results as CSV or copy to clipboard
- **🌐 Multilingual Data**: Supports candidate information in any language (Chinese, Japanese, Arabic, etc.)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔒 Privacy-First**: All processing happens locally in your browser—no data sent to servers

## 🚀 Quick Start

### Online Usage (Recommended)

Simply visit the [live demo](https://CrueChan.github.io/exam-seating-arranger/) and start using it immediately—no installation required!

### Local Usage

1. **Clone this repository:**
```bash
   git clone https://github.com/CrueChan/exam-seating-arranger.git
   cd exam-seating-arranger
```

2. **Open in browser:**
```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
```

That's it! No build process, no dependencies, no npm install needed.

## 📖 How to Use

### Step 1: Configure Columns

1. Specify which column contains the **Organization** information (e.g., "Company", "Department", "Unit")
2. Specify which column contains the **Name** information  
3. Set the **Minimum Spacing** (default: 2 seats between same organization members)

### Step 2: Input Data

Choose one of these methods:

**Option A: Copy from Excel/Sheets**
- Select your data in Excel or Google Sheets
- Copy (Ctrl+C / Cmd+C)
- Paste into the text area

**Option B: Upload File**
- Click "Upload CSV/TSV File"
- Select your file
- Data loads automatically

**Option C: Manual Entry**
- Type or paste tab-separated data directly

**Data Format Example:**
```
ID	Organization	Name	Room
1	Company A	John Doe	Room 101
2	Company A	Jane Smith	Room 101
3	Company B	Bob Johnson	Room 101
4	Company B	Alice Brown	Room 101
```

### Step 3: Rearrange

Click the **"Rearrange Seats"** button to process your data.

### Step 4: Review and Export

- Review the arrangement in the results table
- Check statistics (total candidates, organizations, spacing metrics)
- Click **"Validate Spacing"** to verify minimum spacing requirements
- **Copy to Clipboard** or **Download CSV** to use the results

## 🔧 Advanced Options

### Available Settings

- **Data has header row**: Uncheck if your data doesn't have column headers
- **Preserve all other columns**: Keep all original columns in the output
- **Randomize organization order**: Add randomness to the organization sequence

### Algorithm Details

The tool uses a **round-robin distribution algorithm**:

1. Groups all candidates by organization
2. Distributes candidates by rotating through organizations
3. Ensures minimum spacing is maintained between same-organization members
4. Preserves all original data columns

## 📊 Example Use Cases

- **Professional Certification Exams**: Separate candidates from competing companies
- **University Exams**: Distribute students from the same department
- **Government Testing**: Ensure candidates from the same agency are properly spaced
- **Training Assessments**: Arrange participants from different teams
- **Recruitment Tests**: Fair distribution of applicants from same backgrounds

## 🛠️ Technical Stack

- **Pure HTML/CSS/JavaScript**: No frameworks or dependencies required
- **Modern ES6+**: Clean, maintainable code
- **Responsive CSS Grid/Flexbox**: Works on all device sizes
- **Accessible**: ARIA labels and semantic HTML for screen readers
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Safari, Edge

## 📁 Project Structure
```
exam-seating-arranger/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript logic
├── README.md           # This file
├── LICENSE             # MIT License
└── examples/           # Example data files
    ├── example-ar.tsv
    ├── example-en.tsv
    ├── example-ja.tsv
    └── example-zh.tsv
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test on multiple browsers
- Update README if adding new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by real-world exam administration challenges in State Grid Corporation of China
- Built with accessibility and usability as top priorities
- Special thanks to all contributors and users

## 📧 Contact

Project Link: [https://github.com/CrueChan/exam-seating-arranger](https://github.com/CrueChan/exam-seating-arranger)

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/CrueChan/exam-seating-arranger/issues) page to report bugs or request features.

---

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for fair exam administration