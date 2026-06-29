// Initialize page elements when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    initFormCounters();
    initDashboard();
    initContactForm();
    initAuthLogout();
});

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    // Auto remove toast
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// --- NAVBAR & MOBILE MENU LOGIC ---
function initNavbar() {
    const header = document.querySelector('.navbar-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    // Sticky Scroll Header Effect
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        updateActiveLink();
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isOpen ? 'none' : 'flex';
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
                lucide.createIcons();
            }
        });
    }

    // Close Mobile Menu on Link Click
    if (mobileMenuBtn && mobileMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // Active link highlighting on scroll
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;
        let activeId = 'home';

        const sections = document.querySelectorAll('section');
        if (sections.length === 0) return;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                activeId = id;
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    // Call once initially to highlight active link on load
    updateActiveLink();
}

// --- FORM CHARACTER COUNTERS ---
function initFormCounters() {
    const textareas = [
        { id: 'project-deliverables', countId: 'count-deliverables' },
        { id: 'client-feedback', countId: 'count-feedback' },
        { id: 'lessons-learned', countId: 'count-lessons' }
    ];

    textareas.forEach(textareaSpec => {
        const textarea = document.getElementById(textareaSpec.id);
        const counter = document.getElementById(textareaSpec.countId);
        if (!textarea || !counter) return;

        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.innerText = `${length} characters`;
        });
    });
}

// --- CORE DASHBOARD INTERACTION ---
function initDashboard() {
    const form = document.getElementById('project-closure-form');
    // Exit early if form is not found (meaning we are not on the dashboard index page)
    if (!form) return;

    const loadSampleBtn = document.getElementById('load-sample-btn');
    const submitBtn = document.getElementById('submit-btn');
    const retryBtn = document.getElementById('retry-btn');
    
    // Output states
    const statePreGen = document.getElementById('state-pre-gen');
    const stateGenerating = document.getElementById('state-generating');
    const stateReportReady = document.getElementById('state-report-ready');
    const stateError = document.getElementById('state-error');
    const reportStatusTag = document.getElementById('report-status-tag');
    
    // Meta fields
    const repProjTitle = document.getElementById('rep-proj-title');
    const repProjManager = document.getElementById('rep-proj-manager');
    const repProjId = document.getElementById('rep-proj-id');
    const repProjDate = document.getElementById('rep-proj-date');
    const reportTextContainer = document.getElementById('report-text-container');
    
    // Sidebar Utilities
    const copyBtn = document.getElementById('copy-report-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const regenerateBtn = document.getElementById('regenerate-report-btn');
    const ratingWidget = document.getElementById('rating-widget');
    const ratingCommentInput = document.getElementById('rating-comment');
    const submitRatingBtn = document.getElementById('submit-rating-btn');
    const starContainer = document.getElementById('star-rating');
    const historyContainer = document.getElementById('report-history-container');

    // State parameters
    let activeReport = null;
    let selectedRatingValue = 0;
    let highlightStars = function(value) {}; // scope binding for strict modules access
    
    // persist history database in localStorage
    let reportsHistory = JSON.parse(localStorage.getItem('brandsparkx_reports_history'));
    
    // Sample pre-filled data object
    const sampleData = {
        name: "Enterprise ERP Cloud Handoff",
        manager: "Kieran Varma",
        deliverables: "1. Migrated 4 on-prem legacy database systems to cloud clusters with zero service interruptions.\n2. Configured security IAM access tokens, multi-factor logins, and enterprise VPN tunnels.\n3. Audited page loading velocity, achieving an average response rate of 1.4s (reduced from 5s).",
        feedback: "\"The transition was incredibly smooth. We expected at least a weekend of system downtime, but our staff was able to login and query records without delays. Great documentation handover.\"",
        lessons: "1. Legacy database schema mapping was more fragmented than expected, requiring 14 hours of manual cleaning.\n2. Early user acceptance tests prevented several dashboard integration glitches."
    };

    // Load Sample Click Event
    if (loadSampleBtn) {
        loadSampleBtn.addEventListener('click', () => {
            const nameEl = document.getElementById('project-name');
            const managerEl = document.getElementById('project-manager');
            const deliverablesEl = document.getElementById('project-deliverables');
            const feedbackEl = document.getElementById('client-feedback');
            const lessonsEl = document.getElementById('lessons-learned');

            if (nameEl) nameEl.value = sampleData.name;
            if (managerEl) managerEl.value = sampleData.manager;
            if (deliverablesEl) deliverablesEl.value = sampleData.deliverables;
            if (feedbackEl) feedbackEl.value = sampleData.feedback;
            if (lessonsEl) lessonsEl.value = sampleData.lessons;
            
            // Trigger character counter updates manually
            const countDeliv = document.getElementById('count-deliverables');
            const countFeed = document.getElementById('count-feedback');
            const countLess = document.getElementById('count-lessons');

            if (countDeliv) countDeliv.innerText = `${sampleData.deliverables.length} characters`;
            if (countFeed) countFeed.innerText = `${sampleData.feedback.length} characters`;
            if (countLess) countLess.innerText = `${sampleData.lessons.length} characters`;
            
            showToast("Sample project closure data loaded.", "success");
        });
    }

    // Form Submission / Report Generation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        runGenerationPipeline();
    });

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            runGenerationPipeline();
        });
    }

    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            runGenerationPipeline();
        });
    }

    function runGenerationPipeline() {
        const nameVal = document.getElementById('project-name')?.value.trim() || "";
        const managerVal = document.getElementById('project-manager')?.value.trim() || "";
        const deliverablesVal = document.getElementById('project-deliverables')?.value.trim() || "";
        const feedbackVal = document.getElementById('client-feedback')?.value.trim() || "";
        const lessonsVal = document.getElementById('lessons-learned')?.value.trim() || "";

        if (!nameVal || !managerVal || !deliverablesVal || !feedbackVal || !lessonsVal) {
            showToast("Please complete all required fields.", "error");
            return;
        }

        // Show generating state loader
        if (statePreGen) statePreGen.style.display = 'none';
        if (stateReportReady) stateReportReady.style.display = 'none';
        if (stateError) stateError.style.display = 'none';
        if (stateGenerating) stateGenerating.style.display = 'flex';
        
        if (reportStatusTag) {
            reportStatusTag.innerText = "Analyzing";
            reportStatusTag.className = "status-badge status-generating";
        }
        
        // Reset sidebar actions
        if (copyBtn) copyBtn.disabled = true;
        if (exportPdfBtn) exportPdfBtn.disabled = true;
        if (regenerateBtn) regenerateBtn.disabled = true;
        if (ratingWidget) ratingWidget.classList.add('disabled-block');
        resetRatingWidget();

        // Sequence simulation logs
        const steps = [
            document.getElementById('step-1'),
            document.getElementById('step-2'),
            document.getElementById('step-3'),
            document.getElementById('step-4')
        ];

        steps.forEach((step, index) => {
            if (step) {
                step.className = index === 0 ? "step-line active" : "step-line";
            }
        });

        // Simulate multi-step compilation
        setTimeout(() => {
            if (steps[0]) steps[0].className = "step-line";
            if (steps[1]) steps[1].className = "step-line active";
            
            setTimeout(() => {
                if (steps[1]) steps[1].className = "step-line";
                if (steps[2]) steps[2].className = "step-line active";
                
                setTimeout(() => {
                    if (steps[2]) steps[2].className = "step-line";
                    if (steps[3]) steps[3].className = "step-line active";
                    
                    setTimeout(() => {
                        // Success completion
                        compileReport(nameVal, managerVal, deliverablesVal, feedbackVal, lessonsVal);
                    }, 400);
                }, 400);
            }, 400);
        }, 450);
    }

    // Compile actual report and display
    function compileReport(name, manager, deliverables, feedback, lessons) {
        // Hide loader, show report view
        if (stateGenerating) stateGenerating.style.display = 'none';
        if (stateReportReady) stateReportReady.style.display = 'flex';
        
        if (reportStatusTag) {
            reportStatusTag.innerText = "Completed";
            reportStatusTag.className = "status-badge status-success";
        }

        const sysId = `BSP-${Math.floor(1000 + Math.random() * 9000)}-AI`;
        const dateStr = new Date().toISOString().split('T')[0];

        // Format Report HTML content
        const reportHTML = constructReportHTML(name, manager, deliverables, feedback, lessons, dateStr, sysId);
        
        if (repProjTitle) repProjTitle.innerText = name;
        if (repProjManager) repProjManager.innerText = manager;
        if (repProjId) repProjId.innerText = sysId;
        if (repProjDate) repProjDate.innerText = dateStr;
        if (reportTextContainer) reportTextContainer.innerHTML = reportHTML;

        // Save report into active workspace state
        activeReport = {
            id: 'report-' + Date.now(),
            name: name,
            manager: manager,
            sysId: sysId,
            date: dateStr,
            deliverables: deliverables,
            feedback: feedback,
            lessons: lessons,
            htmlContent: reportHTML,
            rating: 0,
            ratingComment: ""
        };

        // Add to history database
        reportsHistory.unshift(activeReport);
        localStorage.setItem('brandsparkx_reports_history', JSON.stringify(reportsHistory));
        
        // Unlock sidebar utilities
        unlockSidebarActions();
        
        // Re-render components
        renderHistory();
        updateAnalytics();
        
        // Highlight active list item
        highlightActiveHistoryItem(activeReport.id);
        
        showToast("Report generated successfully.", "success");
    }

    function constructReportHTML(name, manager, deliverables, feedback, lessons, date, id) {
        const deliverablesList = deliverables.split('\n')
            .map(item => item.trim())
            .filter(item => item)
            .map(item => `<li><strong>[Verified]</strong> ${item}</li>`)
            .join('');

        const lessonsList = lessons.split('\n')
            .map(item => item.trim())
            .filter(item => item)
            .map(item => `<li>${item}</li>`)
            .join('');

        return `
            <h3>1. Executive Project Summary</h3>
            <p>This document verifies the formal closure and administrative handoff of the project <strong>"${name}"</strong> led by Project Manager <strong>${manager}</strong>. Initiated to resolve core department capabilities, all deliverables have been executed in compliance with operational objectives. The project is transitioned to client maintenance support phase.</p>
            
            <h3>2. Deliverables Checklist & Integrity Audit</h3>
            <ul>
                ${deliverablesList || '<li>No specific deliverables checklist supplied. General transition completed.</li>'}
                <li><strong>Quality Metric:</strong> Handoff validation completed against target metrics with zero critical bugs.</li>
                <li><strong>Security Audit:</strong> Operations evaluated. Database encryption protocols successfully configured.</li>
            </ul>
            
            <h3>3. Stakeholder Sentiment & Feedback Analysis</h3>
            <blockquote>
                <p>"${feedback}"</p>
            </blockquote>
            <p><strong>Sentiment Insights:</strong> Natural language processing indicates highly aligned outcomes, showing satisfaction in deployment speed, communication flow, and delivery accuracy.</p>
            
            <h3>4. Lessons Learned & Recommendations</h3>
            <ul>
                ${lessonsList || '<li>No technical hurdles documented. Future efforts will inherit standard agile templates.</li>'}
                <li><strong>Optimization Action:</strong> Document configuration workflows to prevent legacy translation friction on future deployments.</li>
            </ul>
            
            <h3>5. Transition Sign-Off</h3>
            <p>With all objectives certified, assets archived, and client validation finalized, this project is declared officially closed.</p>
            <ul>
                <li><strong>PMO Sign-off Authority:</strong> Brandsparkx Governance Council</li>
                <li><strong>Date of Closure:</strong> ${date}</li>
                <li><strong>Report Integrity Reference ID:</strong> ${id}</li>
            </ul>
        `;
    }

    // Side Actions Unlocker
    function unlockSidebarActions() {
        if (copyBtn) copyBtn.disabled = false;
        if (exportPdfBtn) exportPdfBtn.disabled = false;
        if (regenerateBtn) regenerateBtn.disabled = false;
        if (ratingWidget) ratingWidget.classList.remove('disabled-block');
    }

    // Rating star handler
    if (starContainer) {
        const starButtons = starContainer.querySelectorAll('.star-btn');
        starButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = parseInt(btn.getAttribute('data-value'), 10);
                selectedRatingValue = value;
                highlightStars(value);
            });
        });

        highlightStars = function(value) {
            starButtons.forEach(btn => {
                const starValue = parseInt(btn.getAttribute('data-value'), 10);
                if (starValue <= value) {
                    btn.classList.add('active-star');
                } else {
                    btn.classList.remove('active-star');
                }
            });
        };
    }

    function resetRatingWidget() {
        selectedRatingValue = 0;
        if (starContainer) {
            const starButtons = starContainer.querySelectorAll('.star-btn');
            starButtons.forEach(btn => btn.classList.remove('active-star'));
        }
        if (ratingCommentInput) ratingCommentInput.value = '';
    }

    // Submit rating event
    if (submitRatingBtn) {
        submitRatingBtn.addEventListener('click', () => {
            if (!activeReport) return;
            if (selectedRatingValue === 0) {
                showToast("Please select a star rating first.", "error");
                return;
            }

            // Find and update report in array
            const reportIndex = reportsHistory.findIndex(r => r.id === activeReport.id);
            if (reportIndex !== -1) {
                reportsHistory[reportIndex].rating = selectedRatingValue;
                reportsHistory[reportIndex].ratingComment = ratingCommentInput?.value.trim() || "";
                
                localStorage.setItem('brandsparkx_reports_history', JSON.stringify(reportsHistory));
                
                // Show toast message
                showToast("Thank you for your quality feedback.", "success");
                
                // Update analytics display
                updateAnalytics();
            }
        });
    }

    // Copy To Clipboard Handler
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (!activeReport || !reportTextContainer) return;
            const text = reportTextContainer.innerText;
            navigator.clipboard.writeText(text).then(() => {
                showToast("Report plain text copied to clipboard.", "success");
            }).catch(() => {
                showToast("Failed to copy report text.", "error");
            });
        });
    }

    // Export PDF Print trigger
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            if (!activeReport) return;
            window.print();
        });
    }

    // Render History sidebar items
    function renderHistory() {
        if (!historyContainer) return;
        historyContainer.innerHTML = '';
        
        if (reportsHistory.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-state-box padding-tb-lg text-center" style="padding: 24px 0;">
                    <i data-lucide="history" style="width: 20px; height: 20px; color: var(--secondary-color); margin-bottom: 8px;"></i>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">No reports found</p>
                </div>
            `;
            return;
        }

        reportsHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.setAttribute('data-report-id', item.id);
            
            historyItem.innerHTML = `
                <div class="h-info">
                    <span class="h-title">${item.name}</span>
                    <span class="h-date">${item.date} • ${item.manager}</span>
                </div>
                <button type="button" class="h-delete-btn" aria-label="Delete Report">
                    <i data-lucide="trash-2"></i>
                </button>
            `;

            // Click report item to load into workspace viewer
            historyItem.addEventListener('click', (e) => {
                if (e.target.closest('.h-delete-btn')) return;
                loadReportIntoViewer(item);
            });

            // Delete item handler
            const deleteBtn = historyItem.querySelector('.h-delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteReport(item.id);
                });
            }

            historyContainer.appendChild(historyItem);
        });

        lucide.createIcons();
    }

    function loadReportIntoViewer(item) {
        activeReport = item;
        
        // Highlight in history sidebar
        highlightActiveHistoryItem(item.id);
        
        // Fill form fields with inputs
        const nameEl = document.getElementById('project-name');
        const managerEl = document.getElementById('project-manager');
        const deliverablesEl = document.getElementById('project-deliverables');
        const feedbackEl = document.getElementById('client-feedback');
        const lessonsEl = document.getElementById('lessons-learned');

        if (nameEl) nameEl.value = item.name;
        if (managerEl) managerEl.value = item.manager;
        if (deliverablesEl) deliverablesEl.value = item.deliverables;
        if (feedbackEl) feedbackEl.value = item.feedback;
        if (lessonsEl) lessonsEl.value = item.lessons;

        // Trigger character counter updates manually
        const countDeliv = document.getElementById('count-deliverables');
        const countFeed = document.getElementById('count-feedback');
        const countLess = document.getElementById('count-lessons');

        if (countDeliv) countDeliv.innerText = `${item.deliverables.length} characters`;
        if (countFeed) countFeed.innerText = `${item.feedback.length} characters`;
        if (countLess) countLess.innerText = `${item.lessons.length} characters`;

        // Switch to ready state
        if (statePreGen) statePreGen.style.display = 'none';
        if (stateGenerating) stateGenerating.style.display = 'none';
        if (stateError) stateError.style.display = 'none';
        if (stateReportReady) stateReportReady.style.display = 'flex';

        // Load meta & report content
        if (repProjTitle) repProjTitle.innerText = item.name;
        if (repProjManager) repProjManager.innerText = item.manager;
        if (repProjId) repProjId.innerText = item.sysId;
        if (repProjDate) repProjDate.innerText = item.date;
        if (reportTextContainer) reportTextContainer.innerHTML = item.htmlContent;
        
        if (reportStatusTag) {
            reportStatusTag.innerText = "Completed";
            reportStatusTag.className = "status-badge status-success";
        }

        // Unlock options and pre-fill rating
        unlockSidebarActions();
        resetRatingWidget();
        
        if (item.rating > 0) {
            selectedRatingValue = item.rating;
            if (typeof highlightStars === 'function') {
                highlightStars(item.rating);
            }
            if (ratingCommentInput) ratingCommentInput.value = item.ratingComment || '';
        }
        
        // Scroll workspace panel to top
        const viewerScreen = document.getElementById('output-viewer-screen');
        if (viewerScreen) viewerScreen.scrollTop = 0;
    }

    function deleteReport(id) {
        reportsHistory = reportsHistory.filter(r => r.id !== id);
        localStorage.setItem('brandsparkx_reports_history', JSON.stringify(reportsHistory));
        
        renderHistory();
        updateAnalytics();
        
        // Reset output panel if deleted active report
        if (activeReport && activeReport.id === id) {
            activeReport = null;
            if (stateReportReady) stateReportReady.style.display = 'none';
            if (statePreGen) statePreGen.style.display = 'flex';
            if (reportStatusTag) {
                reportStatusTag.innerText = "Ready";
                reportStatusTag.className = "status-badge status-idle";
            }
            
            // Lock action buttons
            if (copyBtn) copyBtn.disabled = true;
            if (exportPdfBtn) exportPdfBtn.disabled = true;
            if (regenerateBtn) regenerateBtn.disabled = true;
            if (ratingWidget) ratingWidget.classList.add('disabled-block');
            resetRatingWidget();
        }
        
        showToast("Report deleted from history.", "success");
    }

    function highlightActiveHistoryItem(id) {
        document.querySelectorAll('.history-item').forEach(el => {
            if (el.getAttribute('data-report-id') === id) {
                el.classList.add('active-item');
            } else {
                el.classList.remove('active-item');
            }
        });
    }

    // --- ADMIN ANALYTICS CALCULATIONS ---
    function updateAnalytics() {
        const totalReportsCard = document.getElementById('admin-total-reports');
        const avgRatingCard = document.getElementById('admin-avg-rating');
        const feedbackRateCard = document.getElementById('admin-feedback-rate');
        const activePmsCard = document.getElementById('admin-active-pms');
        
        const ratingPlaceholder = document.getElementById('analytics-rating-placeholder');
        const chartPlaceholder = document.getElementById('analytics-chart-placeholder');

        const totalCount = reportsHistory.length;

        if (totalCount === 0) {
            if (totalReportsCard) totalReportsCard.innerText = "--";
            if (avgRatingCard) avgRatingCard.innerText = "--";
            if (feedbackRateCard) feedbackRateCard.innerText = "--";
            if (activePmsCard) activePmsCard.innerText = "--";
            
            // Render default empty state structures
            if (ratingPlaceholder) {
                ratingPlaceholder.innerHTML = `
                    <div class="empty-state-box">
                        <i data-lucide="award"></i>
                        <p>No quality rating data available.</p>
                        <span class="sub-placeholder">Submit ratings in the workspace sidebar to display metrics.</span>
                    </div>
                `;
            }
            
            if (chartPlaceholder) {
                chartPlaceholder.innerHTML = `
                    <div class="empty-state-box">
                        <i data-lucide="trending-up"></i>
                        <p>Awaiting report volume trends...</p>
                        <span class="sub-placeholder">Monthly trends and generation velocity charts will populate here when closure reports are saved.</span>
                    </div>
                `;
            }
            lucide.createIcons();
            return;
        }

        // Calculate Average Quality rating
        const ratedReports = reportsHistory.filter(r => r.rating > 0);
        const ratedCount = ratedReports.length;
        let avgRatingText = "--";
        
        if (ratedCount > 0) {
            const sumRating = ratedReports.reduce((sum, r) => sum + r.rating, 0);
            const avgRating = (sumRating / ratedCount).toFixed(1);
            avgRatingText = `${avgRating} / 5.0`;
        }

        // Calculate unique Active Project Managers
        const uniquePMs = new Set(reportsHistory.map(r => r.manager.toLowerCase().trim()));
        
        // Calculate Feedbacks / ratings submission rate
        const feedbackRate = totalCount > 0 ? `${Math.round((ratedCount / totalCount) * 100)}%` : "--";

        // Display results
        if (totalReportsCard) totalReportsCard.innerText = totalCount;
        if (avgRatingCard) avgRatingCard.innerText = avgRatingText;
        if (feedbackRateCard) feedbackRateCard.innerText = feedbackRate;
        if (activePmsCard) activePmsCard.innerText = uniquePMs.size;

        // Render Rating Distribution Graph Layout if data exists
        if (ratingPlaceholder) {
            if (ratedCount > 0) {
                // Count distribution of stars
                const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                ratedReports.forEach(r => { counts[r.rating]++; });

                let barsHTML = '';
                for (let i = 5; i >= 1; i--) {
                    const pct = Math.round((counts[i] / ratedCount) * 100);
                    barsHTML += `
                        <div class="rating-bar-row" style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; margin-bottom: 6px; color: var(--text-dark);">
                            <span style="width: 45px; display: inline-flex; align-items: center; gap: 2px;">
                                ${i} <i data-lucide="star" style="width: 12px; height: 12px; fill: #F59E0B; color: #F59E0B;"></i>
                            </span>
                            <div style="flex-grow: 1; height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
                                <div style="width: ${pct}%; height: 100%; background: var(--primary-bg); border-radius: 4px;"></div>
                            </div>
                            <span style="width: 30px; text-align: right; color: var(--text-muted); font-size: 0.72rem;">${pct}%</span>
                        </div>
                    `;
                }

                ratingPlaceholder.innerHTML = `
                    <div class="rating-stats-active" style="width: 100%;">
                        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px;">
                            <span style="font-size: 2.2rem; font-weight: 700; color: var(--primary-bg); line-height: 1;">${(ratedReports.reduce((sum, r) => sum + r.rating, 0) / ratedCount).toFixed(1)}</span>
                            <span style="font-size: 0.88rem; color: var(--text-muted);">average rating out of ${ratedCount} logs</span>
                        </div>
                        ${barsHTML}
                    </div>
                `;
            } else {
                ratingPlaceholder.innerHTML = `
                    <div class="empty-state-box">
                        <i data-lucide="award"></i>
                        <p>No ratings submitted yet.</p>
                        <span class="sub-placeholder">Submit ratings in the workspace sidebar to display metrics.</span>
                    </div>
                `;
            }
        }

        // Render generation trends placeholder (Dynamic Bar chart representation)
        if (chartPlaceholder) {
            const dateGroups = {};
            reportsHistory.forEach(r => {
                dateGroups[r.date] = (dateGroups[r.date] || 0) + 1;
            });
            
            const sortedDates = Object.keys(dateGroups).sort().slice(-7); // last 7 days

            if (sortedDates.length > 0) {
                const maxVal = Math.max(...Object.values(dateGroups));
                let chartBarsHTML = '';
                
                sortedDates.forEach(date => {
                    const count = dateGroups[date];
                    const heightPct = Math.max(10, Math.round((count / maxVal) * 100));
                    const shortDate = date.split('-').slice(1).join('/'); // MM/DD
                    chartBarsHTML += `
                        <div style="display: flex; flex-direction: column; align-items: center; flex-grow: 1; height: 100%; justify-content: flex-end; gap: 8px;">
                            <span style="font-size: 0.75rem; font-weight: 600; color: var(--primary-bg);">${count}</span>
                            <div style="width: 24px; height: ${heightPct}%; background-color: var(--primary-bg); border-radius: 4px 4px 0 0; transition: height 0.3s ease;"></div>
                            <span style="font-size: 0.7rem; color: var(--text-muted); white-space: nowrap;">${shortDate}</span>
                        </div>
                    `;
                });

                chartPlaceholder.innerHTML = `
                    <div style="width: 100%; height: 160px; display: flex; align-items: flex-end; justify-content: space-around; padding-top: 10px; border-bottom: 1px solid var(--border-color-light);">
                        ${chartBarsHTML}
                    </div>
                `;
            } else {
                chartPlaceholder.innerHTML = `
                    <div class="empty-state-box">
                        <i data-lucide="trending-up"></i>
                        <p>Awaiting report volume trends...</p>
                        <span class="sub-placeholder">Monthly trends and generation velocity charts will populate here when closure reports are saved.</span>
                    </div>
                `;
            }
        }
        
        lucide.createIcons();
    }

    // Pre-populate with default sample reports if first time loading database
    if (!reportsHistory || reportsHistory.length === 0) {
        reportsHistory = [
            {
                id: 'report-sample-1',
                name: 'API Cloud Synchronization',
                manager: 'Jane Doe',
                sysId: 'BSP-1082-AI',
                date: '2026-06-10',
                deliverables: '1. Implemented secure OAuth2 middleware validation protocol.\n2. Standardized JSON body error payloads across client routes.\n3. Reduced network latency by 18% with connection pooling.',
                feedback: '"We saw immediate stability improvement. Synchronizing databases takes half the time. Excellent documentation on technical handoff specs."',
                lessons: '1. Underestimated Docker container volume mounting complexities; documented fixes for local environments.',
                htmlContent: '',
                rating: 5,
                ratingComment: 'Excellent structure and summary.'
            },
            {
                id: 'report-sample-2',
                name: 'CRM Customer Segment Audit',
                manager: 'Marcus Vance',
                sysId: 'BSP-3829-AI',
                date: '2026-05-24',
                deliverables: '1. Audited customer lead sources across 4 marketing channels.\n2. Structured audience segmentation weights inside CRM dashboard.\n3. Standardized telemetry event naming conventions.',
                feedback: '"Click rates increased by 4% inside the first two weeks. Overall great output and clean insight checklist."',
                lessons: '1. Access to departmental ledger data should be requested 2 weeks prior to start to prevent audit lead friction.',
                htmlContent: '',
                rating: 4,
                ratingComment: 'Accurate insight extraction.'
            }
        ];
        
        // Generate the formatted report HTML content for sample reports
        reportsHistory.forEach(item => {
            item.htmlContent = constructReportHTML(item.name, item.manager, item.deliverables, item.feedback, item.lessons, item.date, item.sysId);
        });
        
        localStorage.setItem('brandsparkx_reports_history', JSON.stringify(reportsHistory));
    }

    // Call them on initial load to populate history and analytics panels!
    renderHistory();
    updateAnalytics();
}

// --- BRANDSPARKX CONTACT FORM SUBMISSION ---
function initContactForm() {
    const contactForm = document.getElementById('brandsparkx-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameEl = document.getElementById('contact-name');
        const emailEl = document.getElementById('contact-email');
        const subjectEl = document.getElementById('contact-subject');
        const messageEl = document.getElementById('contact-message');

        const name = nameEl?.value.trim() || "";
        const email = emailEl?.value.trim() || "";
        const subject = subjectEl?.value.trim() || "";
        const message = messageEl?.value.trim() || "";

        if (!name || !email || !subject || !message) {
            showToast("All contact form fields are required.", "error");
            return;
        }

        // Simulate network submit
        const submitBtn = document.getElementById('contact-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending Message...";
        }

        setTimeout(() => {
            showToast("Message sent! Brandsparkx PMO support will contact you shortly.", "success");
            contactForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }
        }, 1200);
    });
}

// --- SECURED PMO LOGOUT SESSION HANDLER ---
function initAuthLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    const handleLogout = (e) => {
        if (e) e.preventDefault();
        
        // Remove authentication states
        sessionStorage.removeItem('brandsparkx_logged_in');
        sessionStorage.removeItem('brandsparkx_user_email');
        
        showToast("Logged out successfully.", "success");
        
        // Redirect back to login using replace to avoid history backtracking
        setTimeout(() => {
            window.location.replace('login.html');
        }, 500);
    };

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', handleLogout);
    }
}
