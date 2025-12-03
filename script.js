// Initialize companies data
let companies = [
    {
        id: 1,
        name: "Smart Communications Inc.",
        category: "Telecommunications",
        location: "Makati City",
        moaStatus: "Active",
        moaExpiry: "2025-12-31",
        contactPerson: "Ms. Maria Santos",
        email: "hr@smart.com.ph",
        phone: "(02) 8888-1234",
        website: "www.smart.com.ph",
        slots: 5,
        description: "Leading telecommunications company offering OJT in network engineering and systems development."
    },
    {
        id: 2,
        name: "Globe Telecom",
        category: "Telecommunications",
        location: "Taguig City",
        moaStatus: "Active",
        moaExpiry: "2026-03-15",
        contactPerson: "Mr. Juan Dela Cruz",
        email: "recruitment@globe.com.ph",
        phone: "(02) 7730-1000",
        website: "www.globe.com.ph",
        slots: 8,
        description: "Digital solutions company with opportunities in software development and telecommunications."
    },
    {
        id: 3,
        name: "Accenture Philippines",
        category: "IT Services",
        location: "Taguig City",
        moaStatus: "Active",
        moaExpiry: "2025-11-30",
        contactPerson: "Ms. Ana Reyes",
        email: "careers.ph@accenture.com",
        phone: "(02) 8876-5000",
        website: "www.accenture.com/ph",
        slots: 10,
        description: "Global professional services company with diverse technology consulting and development roles."
    },
    {
        id: 4,
        name: "Meralco",
        category: "Power & Utilities",
        location: "Pasig City",
        moaStatus: "Active",
        moaExpiry: "2026-06-20",
        contactPerson: "Engr. Roberto Cruz",
        email: "ojt@meralco.com.ph",
        phone: "(02) 16211",
        website: "www.meralco.com.ph",
        slots: 4,
        description: "Power distribution company offering OJT in electrical systems and automation."
    }
];

let nextId = 5;
let editingId = null;

// DOM Elements
const modal = document.getElementById('companyModal');
const addCompanyBtn = document.getElementById('addCompanyBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const companyForm = document.getElementById('companyForm');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const companiesGrid = document.getElementById('companiesGrid');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const exportBtn = document.getElementById('exportBtn');
const modalTitle = document.getElementById('modalTitle');

// Event Listeners
addCompanyBtn.addEventListener('click', openAddModal);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
companyForm.addEventListener('submit', handleSubmit);
searchInput.addEventListener('input', renderCompanies);
categoryFilter.addEventListener('change', renderCompanies);
exportBtn.addEventListener('click', exportToCSV);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize
renderCompanies();

// Functions
function openAddModal() {
    editingId = null;
    modalTitle.textContent = 'Add New Company';
    companyForm.reset();
    modal.style.display = 'block';
}

function openEditModal(id) {
    editingId = id;
    const company = companies.find(c => c.id === id);
    
    if (company) {
        modalTitle.textContent = 'Edit Company';
        document.getElementById('companyId').value = company.id;
        document.getElementById('companyName').value = company.name;
        document.getElementById('companyCategory').value = company.category;
        document.getElementById('companyLocation').value = company.location;
        document.getElementById('moaExpiry').value = company.moaExpiry;
        document.getElementById('availableSlots').value = company.slots;
        document.getElementById('description').value = company.description;
        document.getElementById('contactPerson').value = company.contactPerson;
        document.getElementById('phone').value = company.phone;
        document.getElementById('email').value = company.email;
        document.getElementById('website').value = company.website || '';
        
        modal.style.display = 'block';
    }
}

function closeModal() {
    modal.style.display = 'none';
    companyForm.reset();
    editingId = null;
}

function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('companyName').value,
        category: document.getElementById('companyCategory').value,
        location: document.getElementById('companyLocation').value,
        moaExpiry: document.getElementById('moaExpiry').value,
        slots: parseInt(document.getElementById('availableSlots').value),
        description: document.getElementById('description').value,
        contactPerson: document.getElementById('contactPerson').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        website: document.getElementById('website').value,
        moaStatus: 'Active'
    };
    
    if (editingId) {
        // Update existing company
        const index = companies.findIndex(c => c.id === editingId);
        if (index !== -1) {
            companies[index] = { ...companies[index], ...formData };
        }
    } else {
        // Add new company
        formData.id = nextId++;
        companies.push(formData);
    }
    
    closeModal();
    renderCompanies();
}

function deleteCompany(id) {
    if (confirm('Are you sure you want to delete this company?')) {
        companies = companies.filter(c => c.id !== id);
        renderCompanies();
    }
}

function filterCompanies() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    return companies.filter(company => {
        const matchesSearch = 
            company.name.toLowerCase().includes(searchTerm) ||
            company.location.toLowerCase().includes(searchTerm) ||
            company.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'All' || company.category === category;
        
        return matchesSearch && matchesCategory;
    });
}

function renderCompanies() {
    const filteredCompanies = filterCompanies();
    
    resultsCount.textContent = filteredCompanies.length;
    
    if (filteredCompanies.length === 0) {
        companiesGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    companiesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    companiesGrid.innerHTML = filteredCompanies.map(company => `
        <div class="company-card">
            <div class="card-header">
                <div class="card-header-content">
                    <h3>${company.name}</h3>
                    <div class="category-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        ${company.category}
                    </div>
                </div>
                <span class="status-badge">${company.moaStatus}</span>
            </div>
            
            <div class="card-body">
                <p class="description">${company.description}</p>
                
                <div class="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${company.location}</span>
                </div>
                
                <div class="info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span>MOA valid until: <strong>${company.moaExpiry}</strong></span>
                </div>
                
                <div class="slots-box">
                    <p><strong>Available slots:</strong> ${company.slots} student(s)</p>
                </div>
                
                <div class="contact-section">
                    <p class="contact-title">Contact Information:</p>
                    
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>${company.phone}</span>
                    </div>
                    
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>${company.email}</span>
                    </div>
                    
                    ${company.website ? `
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span>${company.website}</span>
                    </div>
                    ` : ''}
                    
                    <div class="info-item">
                        <span>Contact Person: <strong>${company.contactPerson}</strong></span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="openEditModal(${company.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteCompany(${company.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function exportToCSV() {
    const headers = ['ID', 'Company Name', 'Category', 'Location', 'MOA Expiry', 'Slots', 'Contact Person', 'Phone', 'Email', 'Website', 'Description'];
    
    const csvContent = [
        headers.join(','),
        ...companies.map(c => [
            c.id,
            `"${c.name}"`,
            `"${c.category}"`,
            `"${c.location}"`,
            c.moaExpiry,
            c.slots,
            `"${c.contactPerson}"`,
            `"${c.phone}"`,
            c.email,
            c.website || '',
            `"${c.description}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pup_ojt_companies_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}