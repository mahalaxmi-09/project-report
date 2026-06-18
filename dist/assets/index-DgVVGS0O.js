(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function l(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=l(n);fetch(n.href,a)}})();document.addEventListener("DOMContentLoaded",()=>{lucide.createIcons(),se(),re(),oe(),ie()});function E(g,o="success"){const l=document.getElementById("toast-container");if(!l)return;const r=document.createElement("div");r.className=`toast toast-${o}`;const n=o==="success"?"check-circle":"alert-circle";r.innerHTML=`
        <i data-lucide="${n}"></i>
        <span>${g}</span>
    `,l.appendChild(r),lucide.createIcons(),setTimeout(()=>{r.style.animation="toastIn 0.3s ease reverse forwards",setTimeout(()=>{r.remove()},300)},3e3)}function se(){const g=document.querySelector(".navbar-header"),o=document.getElementById("mobile-menu-btn"),l=document.getElementById("mobile-menu"),r=document.querySelectorAll(".nav-link, .mobile-link");window.addEventListener("scroll",()=>{window.scrollY>50?g.classList.add("scrolled"):g.classList.remove("scrolled"),n()}),o.addEventListener("click",()=>{const a=l.style.display==="flex";l.style.display=a?"none":"flex";const s=o.querySelector("i");s&&(s.setAttribute("data-lucide",a?"menu":"x"),lucide.createIcons())}),r.forEach(a=>{a.addEventListener("click",()=>{l.style.display="none";const s=o.querySelector("i");s&&(s.setAttribute("data-lucide","menu"),lucide.createIcons())})});function n(){const a=window.scrollY+120;let s="home";document.querySelectorAll("section").forEach(c=>{const L=c.offsetTop,S=c.offsetHeight,j=c.getAttribute("id");a>=L&&a<L+S&&(s=j)}),document.querySelectorAll(".nav-link").forEach(c=>{c.classList.remove("active"),c.getAttribute("href")===`#${s}`&&c.classList.add("active")})}}function re(){[{id:"project-deliverables",countId:"count-deliverables"},{id:"client-feedback",countId:"count-feedback"},{id:"lessons-learned",countId:"count-lessons"}].forEach(o=>{const l=document.getElementById(o.id),r=document.getElementById(o.countId);!l||!r||l.addEventListener("input",()=>{const n=l.value.length;r.innerText=`${n} characters`})})}function oe(){const g=document.getElementById("project-closure-form"),o=document.getElementById("load-sample-btn");document.getElementById("submit-btn");const l=document.getElementById("retry-btn"),r=document.getElementById("state-pre-gen"),n=document.getElementById("state-generating"),a=document.getElementById("state-report-ready"),s=document.getElementById("state-error"),c=document.getElementById("report-status-tag"),L=document.getElementById("rep-proj-title"),S=document.getElementById("rep-proj-manager"),j=document.getElementById("rep-proj-id"),F=document.getElementById("rep-proj-date"),C=document.getElementById("report-text-container"),$=document.getElementById("copy-report-btn"),A=document.getElementById("export-pdf-btn"),N=document.getElementById("regenerate-report-btn"),P=document.getElementById("rating-widget"),H=document.getElementById("rating-comment"),K=document.getElementById("submit-rating-btn"),Y=document.getElementById("star-rating"),O=document.getElementById("report-history-container");let v=null,k=0,d=JSON.parse(localStorage.getItem("brandsparkx_reports_history")||"[]");const T={name:"Enterprise ERP Cloud Handoff",manager:"Kieran Varma",deliverables:`1. Migrated 4 on-prem legacy database systems to cloud clusters with zero service interruptions.
2. Configured security IAM access tokens, multi-factor logins, and enterprise VPN tunnels.
3. Audited page loading velocity, achieving an average response rate of 1.4s (reduced from 5s).`,feedback:'"The transition was incredibly smooth. We expected at least a weekend of system downtime, but our staff was able to login and query records without delays. Great documentation handover."',lessons:`1. Legacy database schema mapping was more fragmented than expected, requiring 14 hours of manual cleaning.
2. Early user acceptance tests prevented several dashboard integration glitches.`};V(),R(),o.addEventListener("click",()=>{document.getElementById("project-name").value=T.name,document.getElementById("project-manager").value=T.manager,document.getElementById("project-deliverables").value=T.deliverables,document.getElementById("client-feedback").value=T.feedback,document.getElementById("lessons-learned").value=T.lessons,document.getElementById("count-deliverables").innerText=`${T.deliverables.length} characters`,document.getElementById("count-feedback").innerText=`${T.feedback.length} characters`,document.getElementById("count-lessons").innerText=`${T.lessons.length} characters`,E("Sample project closure data loaded.","success")}),g.addEventListener("submit",e=>{e.preventDefault(),q()}),l.addEventListener("click",()=>{q()}),N.addEventListener("click",()=>{q()});function q(){const e=document.getElementById("project-name").value.trim(),t=document.getElementById("project-manager").value.trim(),y=document.getElementById("project-deliverables").value.trim(),u=document.getElementById("client-feedback").value.trim(),b=document.getElementById("lessons-learned").value.trim();if(!e||!t||!y||!u||!b){E("Please complete all required fields.","error");return}r.style.display="none",a.style.display="none",s.style.display="none",n.style.display="flex",c.innerText="Analyzing",c.className="status-badge status-generating",$.disabled=!0,A.disabled=!0,N.disabled=!0,P.classList.add("disabled-block"),z();const i=[document.getElementById("step-1"),document.getElementById("step-2"),document.getElementById("step-3"),document.getElementById("step-4")];i.forEach((f,x)=>{f.className=x===0?"step-line active":"step-line"}),setTimeout(()=>{i[0].className="step-line",i[1].className="step-line active",setTimeout(()=>{i[1].className="step-line",i[2].className="step-line active",setTimeout(()=>{i[2].className="step-line",i[3].className="step-line active",setTimeout(()=>{Q(e,t,y,u,b)},400)},400)},400)},450)}function Q(e,t,y,u,b){n.style.display="none",a.style.display="flex",c.innerText="Completed",c.className="status-badge status-success";const i=`BSP-${Math.floor(1e3+Math.random()*9e3)}-AI`,f=new Date().toISOString().split("T")[0],x=U(e,t,y,u,b,f,i);L.innerText=e,S.innerText=t,j.innerText=i,F.innerText=f,C.innerHTML=x,v={id:"report-"+Date.now(),name:e,manager:t,sysId:i,date:f,deliverables:y,feedback:u,lessons:b,htmlContent:x,rating:0,ratingComment:""},d.unshift(v),localStorage.setItem("brandsparkx_reports_history",JSON.stringify(d)),_(),V(),R(),J(v.id),E("Report generated successfully.","success")}function U(e,t,y,u,b,i,f){const x=y.split(`
`).map(m=>m.trim()).filter(m=>m).map(m=>`<li><strong>[Verified]</strong> ${m}</li>`).join(""),I=b.split(`
`).map(m=>m.trim()).filter(m=>m).map(m=>`<li>${m}</li>`).join("");return`
            <h3>1. Executive Project Summary</h3>
            <p>This document verifies the formal closure and administrative handoff of the project <strong>"${e}"</strong> led by Project Manager <strong>${t}</strong>. Initiated to resolve core department capabilities, all deliverables have been executed in compliance with operational objectives. The project is transitioned to client maintenance support phase.</p>
            
            <h3>2. Deliverables Checklist & Integrity Audit</h3>
            <ul>
                ${x||"<li>No specific deliverables checklist supplied. General transition completed.</li>"}
                <li><strong>Quality Metric:</strong> Handoff validation completed against target metrics with zero critical bugs.</li>
                <li><strong>Security Audit:</strong> Operations evaluated. Database encryption protocols successfully configured.</li>
            </ul>
            
            <h3>3. Stakeholder Sentiment & Feedback Analysis</h3>
            <blockquote>
                <p>"${u}"</p>
            </blockquote>
            <p><strong>Sentiment Insights:</strong> Natural language processing indicates highly aligned outcomes, showing satisfaction in deployment speed, communication flow, and delivery accuracy.</p>
            
            <h3>4. Lessons Learned & Recommendations</h3>
            <ul>
                ${I||"<li>No technical hurdles documented. Future efforts will inherit standard agile templates.</li>"}
                <li><strong>Optimization Action:</strong> Document configuration workflows to prevent legacy translation friction on future deployments.</li>
            </ul>
            
            <h3>5. Transition Sign-Off</h3>
            <p>With all objectives certified, assets archived, and client validation finalized, this project is declared officially closed.</p>
            <ul>
                <li><strong>PMO Sign-off Authority:</strong> Brandsparkx Governance Council</li>
                <li><strong>Date of Closure:</strong> ${i}</li>
                <li><strong>Report Integrity Reference ID:</strong> ${f}</li>
            </ul>
        `}function _(){$.disabled=!1,A.disabled=!1,N.disabled=!1,P.classList.remove("disabled-block")}const G=Y.querySelectorAll(".star-btn");G.forEach(e=>{e.addEventListener("click",()=>{const t=parseInt(e.getAttribute("data-value"),10);k=t,D(t)})});function D(e){G.forEach(t=>{parseInt(t.getAttribute("data-value"),10)<=e?t.classList.add("active-star"):t.classList.remove("active-star")})}function z(){k=0,D(0),H.value=""}K.addEventListener("click",()=>{if(!v)return;if(k===0){E("Please select a star rating first.","error");return}const e=d.findIndex(t=>t.id===v.id);e!==-1&&(d[e].rating=k,d[e].ratingComment=H.value.trim(),localStorage.setItem("brandsparkx_reports_history",JSON.stringify(d)),E("Thank you for your quality feedback.","success"),R())}),$.addEventListener("click",()=>{if(!v)return;const e=C.innerText;navigator.clipboard.writeText(e).then(()=>{E("Report plain text copied to clipboard.","success")}).catch(()=>{E("Failed to copy report text.","error")})}),A.addEventListener("click",()=>{v&&window.print()});function V(){if(O.innerHTML="",d.length===0){O.innerHTML=`
                <div class="empty-state-box padding-tb-lg text-center" style="padding: 24px 0;">
                    <i data-lucide="history" style="width: 20px; height: 20px; color: var(--secondary-color); margin-bottom: 8px;"></i>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">No reports found</p>
                </div>
            `;return}d.forEach(e=>{const t=document.createElement("div");t.className="history-item",t.setAttribute("data-report-id",e.id),t.innerHTML=`
                <div class="h-info">
                    <span class="h-title">${e.name}</span>
                    <span class="h-date">${e.date} • ${e.manager}</span>
                </div>
                <button type="button" class="h-delete-btn" aria-label="Delete Report">
                    <i data-lucide="trash-2"></i>
                </button>
            `,t.addEventListener("click",u=>{u.target.closest(".h-delete-btn")||X(e)}),t.querySelector(".h-delete-btn").addEventListener("click",u=>{u.stopPropagation(),Z(e.id)}),O.appendChild(t)}),lucide.createIcons()}function X(e){v=e,J(e.id),document.getElementById("project-name").value=e.name,document.getElementById("project-manager").value=e.manager,document.getElementById("project-deliverables").value=e.deliverables,document.getElementById("client-feedback").value=e.feedback,document.getElementById("lessons-learned").value=e.lessons,document.getElementById("count-deliverables").innerText=`${e.deliverables.length} characters`,document.getElementById("count-feedback").innerText=`${e.feedback.length} characters`,document.getElementById("count-lessons").innerText=`${e.lessons.length} characters`,r.style.display="none",n.style.display="none",s.style.display="none",a.style.display="flex",L.innerText=e.name,S.innerText=e.manager,j.innerText=e.sysId,F.innerText=e.date,C.innerHTML=e.htmlContent,c.innerText="Completed",c.className="status-badge status-success",_(),z(),e.rating>0&&(k=e.rating,D(e.rating),H.value=e.ratingComment||""),document.getElementById("output-viewer-screen").scrollTop=0}function Z(e){d=d.filter(t=>t.id!==e),localStorage.setItem("brandsparkx_reports_history",JSON.stringify(d)),V(),R(),v&&v.id===e&&(v=null,a.style.display="none",r.style.display="flex",c.innerText="Ready",c.className="status-badge status-idle",$.disabled=!0,A.disabled=!0,N.disabled=!0,P.classList.add("disabled-block"),z()),E("Report deleted from history.","success")}function J(e){document.querySelectorAll(".history-item").forEach(t=>{t.getAttribute("data-report-id")===e?t.classList.add("active-item"):t.classList.remove("active-item")})}function R(){const e=document.getElementById("admin-total-reports"),t=document.getElementById("admin-avg-rating"),y=document.getElementById("admin-feedback-rate"),u=document.getElementById("admin-active-pms"),b=document.getElementById("analytics-rating-placeholder"),i=document.getElementById("analytics-chart-placeholder"),f=d.length;if(f===0){e.innerText="--",t.innerText="--",y.innerText="--",u.innerText="--",b.innerHTML=`
                <div class="empty-state-box">
                    <i data-lucide="award"></i>
                    <p>No quality rating data available.</p>
                    <span class="sub-placeholder">Submit ratings in the workspace sidebar to display metrics.</span>
                </div>
            `,i.innerHTML=`
                <div class="empty-state-box">
                    <i data-lucide="trending-up"></i>
                    <p>Awaiting report volume trends...</p>
                    <span class="sub-placeholder">Monthly trends and generation velocity charts will populate here when closure reports are saved.</span>
                </div>
            `,lucide.createIcons();return}const x=d.filter(h=>h.rating>0),I=x.length;let m="--";I>0&&(m=`${(x.reduce((p,B)=>p+B.rating,0)/I).toFixed(1)} / 5.0`);const ee=new Set(d.map(h=>h.manager.toLowerCase().trim())),te=f>0?`${Math.round(I/f*100)}%`:"--";if(e.innerText=f,t.innerText=m,y.innerText=te,u.innerText=ee.size,I>0){const h={5:0,4:0,3:0,2:0,1:0};x.forEach(p=>{h[p.rating]++});let w="";for(let p=5;p>=1;p--){const B=Math.round(h[p]/I*100);w+=`
                    <div class="rating-bar-row" style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; margin-bottom: 6px; color: var(--text-dark);">
                        <span style="width: 45px; display: inline-flex; align-items: center; gap: 2px;">
                            ${p} <i data-lucide="star" style="width: 12px; height: 12px; fill: #F59E0B; color: #F59E0B;"></i>
                        </span>
                        <div style="flex-grow: 1; height: 8px; background: #E2E8F0; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${B}%; height: 100%; background: var(--primary-bg); border-radius: 4px;"></div>
                        </div>
                        <span style="width: 30px; text-align: right; color: var(--text-muted); font-size: 0.72rem;">${B}%</span>
                    </div>
                `}b.innerHTML=`
                <div class="rating-stats-active" style="width: 100%;">
                    <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px;">
                        <span style="font-size: 2.2rem; font-weight: 700; color: var(--primary-bg); line-height: 1;">${(x.reduce((p,B)=>p+B.rating,0)/I).toFixed(1)}</span>
                        <span style="font-size: 0.88rem; color: var(--text-muted);">average rating out of ${I} logs</span>
                    </div>
                    ${w}
                </div>
            `}else b.innerHTML=`
                <div class="empty-state-box">
                    <i data-lucide="award"></i>
                    <p>No ratings submitted yet.</p>
                    <span class="sub-placeholder">Submit ratings in the workspace sidebar to display metrics.</span>
                </div>
            `;const M={};d.forEach(h=>{M[h.date]=(M[h.date]||0)+1});const W=Object.keys(M).sort().slice(-7);if(W.length>0){const h=Math.max(...Object.values(M));let w="";W.forEach(p=>{const B=M[p],ne=Math.max(10,Math.round(B/h*100)),ae=p.split("-").slice(1).join("/");w+=`
                    <div style="display: flex; flex-direction: column; align-items: center; flex-grow: 1; height: 100%; justify-content: flex-end; gap: 8px;">
                        <span style="font-size: 0.75rem; font-weight: 600; color: var(--primary-bg);">${B}</span>
                        <div style="width: 24px; height: ${ne}%; background-color: var(--primary-bg); border-radius: 4px 4px 0 0; transition: height 0.3s ease;"></div>
                        <span style="font-size: 0.7rem; color: var(--text-muted); white-space: nowrap;">${ae}</span>
                    </div>
                `}),i.innerHTML=`
                <div style="width: 100%; height: 160px; display: flex; align-items: flex-end; justify-content: space-around; padding-top: 10px; border-bottom: 1px solid var(--border-color-light);">
                    ${w}
                </div>
            `}else i.innerHTML=`
                <div class="empty-state-box">
                    <i data-lucide="trending-up"></i>
                    <p>Awaiting report volume trends...</p>
                    <span class="sub-placeholder">Monthly trends and generation velocity charts will populate here when closure reports are saved.</span>
                </div>
            `;lucide.createIcons()}}function ie(){const g=document.getElementById("brandsparkx-contact-form");g&&g.addEventListener("submit",o=>{o.preventDefault();const l=document.getElementById("contact-name").value.trim(),r=document.getElementById("contact-email").value.trim(),n=document.getElementById("contact-subject").value.trim(),a=document.getElementById("contact-message").value.trim();if(!l||!r||!n||!a){E("All contact form fields are required.","error");return}const s=document.getElementById("contact-submit-btn");s.disabled=!0,s.innerText="Sending Message...",setTimeout(()=>{E("Message sent! Brandsparkx PMO support will contact you shortly.","success"),g.reset(),s.disabled=!1,s.innerText="Send Message"},1200)})}
