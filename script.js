/**
 * Exam Seating Arranger
 * Intelligent seating arrangement tool for fair exam administration
 * @version 1.0.0
 * @license MIT
 */

// Global state
let processedData = [];
let originalHeaders = [];
let configState = {
    organizationColumn: 'Organization',
    nameColumn: 'Name',
    minSpacing: 2,
    hasHeaderRow: true,
    preserveOtherColumns: true,
    randomizeOrder: false
};

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadConfigFromLocalStorage();
    updatePlaceholder();
});

/**
 * Set up event listeners
 */
function initializeEventListeners() {
    // File upload
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    
    // Input data change
    document.getElementById('inputData').addEventListener('input', debounce(previewData, 500));
    
    // Config changes
    document.getElementById('organizationColumn').addEventListener('change', updateConfig);
    document.getElementById('nameColumn').addEventListener('change', updateConfig);
    document.getElementById('minSpacing').addEventListener('change', updateConfig);
    document.getElementById('hasHeaderRow').addEventListener('change', updateConfig);
    document.getElementById('preserveOtherColumns').addEventListener('change', updateConfig);
    document.getElementById('randomizeOrder').addEventListener('change', updateConfig);
}

/**
 * Debounce helper function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Update configuration state
 */
function updateConfig() {
    configState.organizationColumn = document.getElementById('organizationColumn').value.trim();
    configState.nameColumn = document.getElementById('nameColumn').value.trim();
    configState.minSpacing = parseInt(document.getElementById('minSpacing').value) || 2;
    configState.hasHeaderRow = document.getElementById('hasHeaderRow').checked;
    configState.preserveOtherColumns = document.getElementById('preserveOtherColumns').checked;
    configState.randomizeOrder = document.getElementById('randomizeOrder').checked;
    
    saveConfigToLocalStorage();
}

/**
 * Save configuration to localStorage
 */
function saveConfigToLocalStorage() {
    try {
        localStorage.setItem('examSeatingConfig', JSON.stringify(configState));
    } catch (e) {
        console.warn('Could not save config to localStorage:', e);
    }
}

/**
 * Load configuration from localStorage
 */
function loadConfigFromLocalStorage() {
    try {
        const saved = localStorage.getItem('examSeatingConfig');
        if (saved) {
            const config = JSON.parse(saved);
            configState = { ...configState, ...config };
            
            // Update UI
            document.getElementById('organizationColumn').value = configState.organizationColumn;
            document.getElementById('nameColumn').value = configState.nameColumn;
            document.getElementById('minSpacing').value = configState.minSpacing;
            document.getElementById('hasHeaderRow').checked = configState.hasHeaderRow;
            document.getElementById('preserveOtherColumns').checked = configState.preserveOtherColumns;
            document.getElementById('randomizeOrder').checked = configState.randomizeOrder;
        }
    } catch (e) {
        console.warn('Could not load config from localStorage:', e);
    }
}

/**
 * Toggle advanced options accordion
 */
function toggleAdvanced() {
    const content = document.getElementById('advancedContent');
    const button = content.previousElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('open');
}

/**
 * Handle file upload
 */
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        document.getElementById('inputData').value = content;
        previewData();
        showNotification(`File "${file.name}" loaded successfully!`, 'success');
    };
    
    reader.onerror = function() {
        showNotification('Error reading file. Please try again.', 'error');
    };
    
    reader.readAsText(file);
}

/**
 * Parse tab-separated or CSV data
 */
function parseData(text) {
    const lines = text.trim().split('\n');
    if (lines.length === 0) return { headers: [], data: [] };
    
    // Detect separator (tab or comma)
    const firstLine = lines[0];
    const separator = firstLine.includes('\t') ? '\t' : ',';
    
    let headers = [];
    let startIndex = 0;
    
    if (configState.hasHeaderRow && lines.length > 0) {
        headers = parseLine(lines[0], separator);
        startIndex = 1;
    } else {
        // Generate default headers
        const firstRow = parseLine(lines[0], separator);
        headers = firstRow.map((_, i) => `Column${i + 1}`);
        startIndex = 0;
    }
    
    const data = [];
    for (let i = startIndex; i < lines.length; i++) {
        const cells = parseLine(lines[i], separator);
        if (cells.length > 0 && cells.some(cell => cell.trim())) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = cells[index] || '';
            });
            data.push(row);
        }
    }
    
    return { headers, data };
}

/**
 * Parse a single line handling quoted values
 */
function parseLine(line, separator) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === separator && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

/**
 * Preview data in UI
 */
function previewData() {
    const inputText = document.getElementById('inputData').value.trim();
    const preview = document.getElementById('dataPreview');
    
    if (!inputText) {
        preview.classList.remove('visible');
        return;
    }
    
    try {
        const { headers, data } = parseData(inputText);
        
        if (data.length > 0) {
            preview.innerHTML = `
                <strong>Preview:</strong> ${data.length} rows detected with columns: 
                <em>${headers.join(', ')}</em>
            `;
            preview.classList.add('visible');
        }
    } catch (e) {
        console.error('Preview error:', e);
    }
}

/**
 * Main processing function
 */
function processData() {
    updateConfig();
    
    const inputText = document.getElementById('inputData').value.trim();
    
    if (!inputText) {
        showNotification('Please enter or upload data first!', 'error');
        return;
    }
    
    try {
        const { headers, data } = parseData(inputText);
        
        if (data.length === 0) {
            showNotification('No valid data found. Please check your input format.', 'error');
            return;
        }
        
        // Validate required columns exist
        const orgCol = configState.organizationColumn;
        const nameCol = configState.nameColumn;
        
        if (!headers.includes(orgCol)) {
            showNotification(`Column "${orgCol}" not found. Please check your configuration.`, 'error');
            return;
        }
        
        if (!headers.includes(nameCol)) {
            showNotification(`Column "${nameCol}" not found. Please check your configuration.`, 'error');
            return;
        }
        
        // Store original headers
        originalHeaders = headers;
        
        // Rearrange the data
        processedData = rearrangeSeating(data, orgCol, nameCol);
        
        // Display results
        displayResults(processedData, data);
        
        showNotification(`Successfully rearranged ${processedData.length} candidates!`, 'success');
        
    } catch (error) {
        console.error('Processing error:', error);
        showNotification('Error processing data. Please check the format and try again.', 'error');
    }
}

/**
 * Rearrange seating using round-robin algorithm
 */
function rearrangeSeating(data, orgColumn, nameColumn) {
    // Group by organization
    const groups = {};
    data.forEach(person => {
        const org = person[orgColumn] || 'Unknown';
        if (!groups[org]) groups[org] = [];
        groups[org].push(person);
    });
    
    // Get organization names
    let orgNames = Object.keys(groups);
    
    // Optionally randomize organization order
    if (configState.randomizeOrder) {
        shuffleArray(orgNames);
    }
    
    // Round-robin distribution
    const result = [];
    const maxPeoplePerOrg = Math.max(...orgNames.map(org => groups[org].length));
    
    for (let round = 0; round < maxPeoplePerOrg; round++) {
        for (const org of orgNames) {
            if (groups[org][round]) {
                result.push(groups[org][round]);
            }
        }
    }
    
    return result;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Display results in table
 */
function displayResults(rearrangedData, originalData) {
    // Show result section
    document.getElementById('resultSection').classList.remove('hidden');
    
    // Generate statistics
    const orgColumn = configState.organizationColumn;
    const orgGroups = {};
    originalData.forEach(person => {
        const org = person[orgColumn] || 'Unknown';
        orgGroups[org] = (orgGroups[org] || 0) + 1;
    });
    
    const statsHTML = `
        <div class="stat-card">
            <h3>${rearrangedData.length}</h3>
            <p>Total Candidates</p>
        </div>
        <div class="stat-card">
            <h3>${Object.keys(orgGroups).length}</h3>
            <p>Organizations</p>
        </div>
        <div class="stat-card">
            <h3>${Math.round(rearrangedData.length / Object.keys(orgGroups).length)}</h3>
            <p>Avg per Organization</p>
        </div>
        <div class="stat-card">
            <h3>${Math.max(...Object.values(orgGroups))}</h3>
            <p>Largest Organization</p>
        </div>
    `;
    document.getElementById('stats').innerHTML = statsHTML;
    
    // Generate table
    const thead = document.getElementById('resultHeader');
    const tbody = document.getElementById('resultBody');
    
    // Determine which columns to display
    let displayHeaders = ['Seat #'];
    if (configState.preserveOtherColumns) {
        displayHeaders = displayHeaders.concat(originalHeaders);
    } else {
        displayHeaders = displayHeaders.concat([
            configState.organizationColumn,
            configState.nameColumn
        ]);
    }
    
    // Create header row
    thead.innerHTML = `
        <tr>
            ${displayHeaders.map(h => `<th>${escapeHtml(h)}</th>`).join('')}
        </tr>
    `;
    
    // Create data rows
    tbody.innerHTML = '';
    rearrangedData.forEach((person, index) => {
        const row = document.createElement('tr');
        
        let cells = [`<td><strong>${index + 1}</strong></td>`];
        
        if (configState.preserveOtherColumns) {
            cells = cells.concat(
                originalHeaders.map(h => `<td>${escapeHtml(person[h] || '')}</td>`)
            );
        } else {
            cells.push(`<td>${escapeHtml(person[configState.organizationColumn] || '')}</td>`);
            cells.push(`<td>${escapeHtml(person[configState.nameColumn] || '')}</td>`);
        }
        
        row.innerHTML = cells.join('');
        tbody.appendChild(row);
    });
    
    // Scroll to results
    document.getElementById('resultSection').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Validate arrangement spacing
 */
function validateArrangement() {
    if (processedData.length === 0) {
        showNotification('No arrangement to validate. Please rearrange seats first.', 'warning');
        return;
    }
    
    const orgColumn = configState.organizationColumn;
    const minSpacing = configState.minSpacing;
    const violations = [];
    
    // Check spacing between same organization
    for (let i = 0; i < processedData.length; i++) {
        const org = processedData[i][orgColumn];
        
        // Check next minSpacing positions
        for (let j = i + 1; j < Math.min(i + minSpacing + 1, processedData.length); j++) {
            if (processedData[j][orgColumn] === org) {
                violations.push({
                    position: i + 1,
                    nextPosition: j + 1,
                    organization: org,
                    spacing: j - i
                });
            }
        }
    }
    
    if (violations.length === 0) {
        showNotification(
            `✓ Validation passed! All candidates from the same organization are spaced at least ${minSpacing} seats apart.`,
            'success'
        );
    } else {
        const message = `⚠ Found ${violations.length} spacing violation(s). Some candidates from the same organization are closer than ${minSpacing} seats. This may happen with organizations that have many candidates.`;
        showNotification(message, 'warning');
        console.log('Spacing violations:', violations);
    }
}

/**
 * Copy results to clipboard
 */
function copyResult() {
    if (processedData.length === 0) {
        showNotification('No results to copy. Please rearrange seats first.', 'error');
        return;
    }
    
    // Generate tab-separated text
    let displayHeaders = ['Seat #'];
    if (configState.preserveOtherColumns) {
        displayHeaders = displayHeaders.concat(originalHeaders);
    } else {
        displayHeaders = displayHeaders.concat([
            configState.organizationColumn,
            configState.nameColumn
        ]);
    }
    
    let resultText = displayHeaders.join('\t') + '\n';
    
    processedData.forEach((person, index) => {
        let row = [index + 1];
        
        if (configState.preserveOtherColumns) {
            row = row.concat(originalHeaders.map(h => person[h] || ''));
        } else {
            row.push(person[configState.organizationColumn] || '');
            row.push(person[configState.nameColumn] || '');
        }
        
        resultText += row.join('\t') + '\n';
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(resultText).then(() => {
        showNotification('Results copied to clipboard! You can now paste into Excel.', 'success');
    }).catch(() => {
        // Fallback method
        const textarea = document.createElement('textarea');
        textarea.value = resultText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Results copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy. Please try manually.', 'error');
        }
        
        document.body.removeChild(textarea);
    });
}

/**
 * Download results as CSV
 */
function downloadCSV() {
    if (processedData.length === 0) {
        showNotification('No results to download. Please rearrange seats first.', 'error');
        return;
    }
    
    // Generate CSV content
    let displayHeaders = ['Seat_Number'];
    if (configState.preserveOtherColumns) {
        displayHeaders = displayHeaders.concat(originalHeaders.map(h => h.replace(/[,\s]/g, '_')));
    } else {
        displayHeaders = displayHeaders.concat([
            configState.organizationColumn.replace(/[,\s]/g, '_'),
            configState.nameColumn.replace(/[,\s]/g, '_')
        ]);
    }
    
    let csvContent = displayHeaders.join(',') + '\n';
    
    processedData.forEach((person, index) => {
        let row = [index + 1];
        
        if (configState.preserveOtherColumns) {
            row = row.concat(originalHeaders.map(h => {
                const value = person[h] || '';
                // Escape commas and quotes
                return value.includes(',') || value.includes('"') 
                    ? `"${value.replace(/"/g, '""')}"` 
                    : value;
            }));
        } else {
            const org = person[configState.organizationColumn] || '';
            const name = person[configState.nameColumn] || '';
            row.push(org.includes(',') ? `"${org}"` : org);
            row.push(name.includes(',') ? `"${name}"` : name);
        }
        
        csvContent += row.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `seating_arrangement_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('CSV file downloaded successfully!', 'success');
}

/**
 * Load example data
 */
function loadExample() {
    const exampleData = `ID\tOrganization\tName\tRoom\tEmail
1\tCompany A\tJohn Doe\tRoom 101\tjohn.doe@companya.com
2\tCompany A\tJane Smith\tRoom 101\tjane.smith@companya.com
3\tCompany A\tBob Wilson\tRoom 101\tbob.wilson@companya.com
4\tCompany B\tAlice Johnson\tRoom 101\talice.j@companyb.com
5\tCompany B\tCharlie Brown\tRoom 101\tcharlie.b@companyb.com
6\tCompany C\tDiana Prince\tRoom 102\tdiana.p@companyc.com
7\tCompany C\tEthan Hunt\tRoom 102\tethan.h@companyc.com
8\tCompany C\tFiona Apple\tRoom 102\tfiona.a@companyc.com
9\tCompany D\tGeorge Martin\tRoom 102\tgeorge.m@companyd.com
10\tCompany D\tHannah Montana\tRoom 102\thannah.m@companyd.com
11\tCompany E\tIan Malcolm\tRoom 103\tian.m@companye.com
12\tCompany E\tJulia Roberts\tRoom 103\tjulia.r@companye.com
13\tCompany F\tKevin Hart\tRoom 103\tkevin.h@companyf.com
14\tCompany F\tLaura Croft\tRoom 103\tlaura.c@companyf.com
15\tCompany F\tMichael Scott\tRoom 103\tmichael.s@companyf.com`;
    
    document.getElementById('inputData').value = exampleData;
    previewData();
    showNotification('Example data loaded! Click "Rearrange Seats" to process.', 'info');
}

/**
 * Clear all data
 */
function clearData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        document.getElementById('inputData').value = '';
        document.getElementById('dataPreview').classList.remove('visible');
        document.getElementById('resultSection').classList.add('hidden');
        document.getElementById('fileInput').value = '';
        processedData = [];
        originalHeaders = [];
        showNotification('All data cleared successfully.', 'info');
    }
}

/**
 * Update placeholder text
 */
function updatePlaceholder() {
    const textarea = document.getElementById('inputData');
    textarea.placeholder = `ID\tOrganization\tName\tRoom\n1\tCompany A\tJohn Doe\tRoom 101\n2\tCompany A\tJane Smith\tRoom 101\n3\tCompany B\tBob Johnson\tRoom 101\n...`;
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    
    // Remove all type classes
    notification.classList.remove('error', 'info', 'warning', 'success');
    
    // Add appropriate class
    if (type !== 'success') {
        notification.classList.add(type);
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Expose functions to global scope for HTML onclick handlers
window.processData = processData;
window.loadExample = loadExample;
window.clearData = clearData;
window.copyResult = copyResult;
window.downloadCSV = downloadCSV;
window.validateArrangement = validateArrangement;
window.toggleAdvanced = toggleAdvanced;