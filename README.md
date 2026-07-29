# WhatsApp-report-automatique 
# 📚 DOCUMENTATION TECHNIQUE OFFICIELLE : WHATSAPP SECURITY REPORT AUTOMATION ENGINE (WSRA-V2)
**Version :** 2.0.4-PRO
**Architecture :** Serverless Node.js (Vercel Functions) & Vanilla Frontend
**Cible de Déploiement :** Vercel Edge/Serverless Infrastructure
## 📑 TABLE DES MATIÈRES GÉNÉRALE
 1. Introduction et Architecture Globale
 2. Spécifications Techniques et Prérequis
 3. Arborescence Détaillée du Projet
 4. Documentation du Code Source : Frontend (Interface Utilisateur)
   * 4.1. Fichiers de Structure (index.html)
   * 4.2. Fichiers de Style (style.css)
   * 4.3. Scripts de Navigation (script.js)
 5. Documentation du Code Source : Backend (API Serverless)
   * 5.1. Logique d'Envoi et Pool SMTP (api/send.js)
   * 5.2. Gestion des Motifs et Modèles d'Incidents
   * 5.3. Génération Cryptographique des Métadonnées (crypto)
 6. Registre Officiel des Comptes SMTP et Clés d'Application
 7. Guide de Déploiement Pas-à-Pas sur Vercel
 8. Sécurité, Conformité et Gestion des Erreurs
## 1. INTRODUCTION ET ARCHITECTURE GLOBALE
L'application **WhatsApp Security Report Automation (WSRA)** est un système de pointe conçu pour automatiser l'émission de rapports d'incidents de sécurité hautement structurés à destination des équipes de modération et de support de WhatsApp (support@support.whatsapp.com).
L'architecture repose sur un modèle **Serverless** hébergé sur la plateforme **Vercel**, combinant :
 * Une interface utilisateur épurée, ergonomique et hautement réactive (HTML5/CSS3/JavaScript ES6+).
 * Un backend sécurisé exécuté dans un environnement Node.js isolé (Vercel Serverless Functions).
 * Une stratégie de **Rotation Intelligente de Comptes SMTP** permettant de répartir la charge d'envoi sur plusieurs adresses Gmail authentifiées via des mots de passe d'application dédiés (App Passwords), contournant ainsi les limitations de débit (*rate-limiting*) et prévenant les blocages administratifs.
## 2. SPÉCIFICATIONS TECHNIQUES ET PRÉREQUIS
Pour garantir une compilation et une exécution sans faille sur Vercel, l'environnement doit respecter les normes suivantes :
 * **Runtime Node.js :** Version 18.x ou supérieure recommandée.
 * **Gestionnaire de paquets :** npm (intégré avec Node.js).
 * **Dépendance unique du Backend :** nodemailer (version ^6.9.13) pour la gestion des protocoles SMTP sécurisés (TLS/STARTTLS).
 * **Hébergement des ressources graphiques :** Fichiers locaux intégrés au répertoire racine (ex: IMG_20260727_192443_251.jpg).
## 3. ARBORESCENCE DÉTAILLÉE DU PROJET
L'organisation des fichiers au sein du répertoire de travail (Repository GitHub) doit respecter strictement la structure arborescente suivante :
```text
WHATSAPP-REPORT-AUTOMATION/
├── api/
│   └── send.js                # Moteur backend d'authentification et d'envoi SMTP
├── index.html                 # Interface graphique principale du formulaire
├── style.css                  # Feuille de style CSS avancée et design cyberpunk/dark
├── script.js                  # Logique asynchrone frontend et gestion des requêtes HTTP
├── package.json               # Fichier de configuration des dépendances Node.js
└── IMG_20260727_192443_251.jpg # Image de fond personnalisée pour l'interface

```
## 4. DOCUMENTATION DU CODE SOURCE : FRONTEND
### 4.1. Fichiers de Structure (index.html)
Ce fichier constitue la porte d'entrée de l'application web. Il intègre un formulaire interactif permettant de configurer la cible, le nombre de requêtes, le délai d'espacement et le motif de signalement.
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AUTOMATISATION REPORT</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>⚡ AUTOMATISATION REPORT ⚡</h1>
        <form id="reportForm">
            <div class="form-group">
                <label>ENTER NUMBER</label>
                <input type="text" id="target_number" placeholder="+509 XXXX XXXX" required>
            </div>
            <div class="form-group">
                <label>NOMBRE DE REPORT</label>
                <input type="number" id="nombre_report" min="1" max="10" value="1" required>
            </div>
            <div class="form-group">
                <label>DELAY BETWEEN EACH (ms)</label>
                <input type="number" id="delay" value="3000" required>
            </div>
            <div class="form-group">
                <label>SELECTIONNER MOTIF</label>
                <select id="motif" required>
                    <option value="" disabled selected>-- Select a reason --</option>
                    <option value="SPAMMING">🚫 SPAMMING</option>
                    <option value="TOOL">🤖 TOOL</option>
                    <option value="HAKING">💀 HAKING</option>
                    <option value="BANNED">⛔ BANNED</option>
                    <option value="VIOLATION">⚠️ VIOLATION</option>
                    <option value="ARNAQUE">💸 ARNAQUE</option>
                    <option value="FRAUDE">🏦 FRAUDE</option>
                    <option value="SCAM">🎪 SCAM</option>
                    <option value="GANGSTER">🔫 GANGSTER</option>
                    <option value="HOAX">📢 HOAX</option>
                    <option value="DRUGS">💊 DRUGS</option>
                    <option value="MODIFIED APP">📱 MODIFIED APP</option>
                </select>
            </div>
            <button type="submit" id="submitBtn">🚀 Launch Attack</button>
        </form>
        <div id="statusMessage" class="status"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>

```
### 4.2. Fichiers de Style (style.css)
Conçu selon les codes esthétiques modernes (Mode Sombre / Dark Mode, accents néon vert émeraude, effets de transparence et intégration dynamique de l'image de fond).
```css
* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    font-family: 'Segoe UI', sans-serif; 
}

body {
    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('IMG_20260727_192443_251.jpg');
    background-size: cover; 
    background-position: center;
    background-repeat: no-repeat;
    color: #fff; 
    min-height: 100vh; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    padding: 20px;
}

.container {
    background: rgba(20, 20, 20, 0.9); 
    border: 1px solid #00ff88; 
    border-radius: 15px;
    padding: 30px; 
    width: 100%; 
    max-width: 450px; 
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
}

h1 { 
    text-align: center; 
    color: #00ff88; 
    margin-bottom: 20px; 
    font-size: 24px; 
    letter-spacing: 2px; 
}

.form-group { 
    margin-bottom: 15px; 
}

label { 
    display: block; 
    margin-bottom: 5px; 
    color: #00ff88; 
    font-weight: bold; 
    font-size: 13px; 
}

input, select {
    width: 100%; 
    padding: 12px; 
    background: rgba(255,255,255,0.1); 
    border: 1px solid #00ff88;
    border-radius: 8px; 
    color: #fff; 
    font-size: 15px;
}

input:focus, select:focus { 
    outline: none; 
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5); 
}

select option { 
    background: #1a1a1a; 
}

button {
    width: 100%; 
    padding: 15px; 
    background: #00ff88; 
    border: none; 
    border-radius: 8px;
    color: #000; 
    font-size: 16px; 
    font-weight: bold; 
    cursor: pointer; 
    margin-top: 10px;
}

button:hover { 
    background: #00cc6a; 
}

button:disabled { 
    background: #555; 
    color: #888; 
    cursor: not-allowed; 
}

.status { 
    margin-top: 15px; 
    padding: 12px; 
    border-radius: 8px; 
    text-align: center; 
    display: none; 
    font-weight: bold; 
}

.success { 
    background: rgba(0, 255, 136, 0.2); 
    border: 1px solid #00ff88; 
    color: #00ff88; 
    display: block; 
}

.error { 
    background: rgba(255, 0, 85, 0.2); 
    border: 1px solid #ff0055; 
    color: #ff0055; 
    display: block; 
}

```
### 4.3. Scripts de Navigation (script.js)
Gère la soumission asynchrone du formulaire via l'API Fetch, désactive les boutons pendant le traitement et affiche dynamiquement les messages de succès ou d'erreur.
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const status = document.getElementById('statusMessage');
            
            btn.disabled = true;
            btn.textContent = '⏳ Sending...';
            status.className = 'status';

            const data = {
                target_number: document.getElementById('target_number').value,
                nombre_report: document.getElementById('nombre_report').value,
                delay: document.getElementById('delay').value,
                motif: document.getElementById('motif').value
            };

            try {
                const response = await fetch('/api/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.success) {
                    status.className = 'status success';
                    status.textContent = '✅ ' + result.message;
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                status.className = 'status error';
                status.textContent = '❌ Error: Failed to send request!';
            } finally {
                btn.disabled = false;
                btn.textContent = '🚀 Launch Attack';
            }
        });
    }
});

```
## 5. DOCUMENTATION DU CODE SOURCE : BACKEND (api/send.js)
Le cœur névralgique de l'application. Ce script s'exécute sur les serveurs de Vercel lors de chaque requête HTTP POST. Il intègre le pool de comptes SMTP, la génération de identifiants uniques cryptographiques (crypto.randomBytes), les modèles de textes formels et l'algorithme de boucle avec délai asynchrone (sleep).
```javascript
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Pool officiel des comptes SMTP avec rotation intégrée
const EMAIL_ACCOUNTS = [
    { email: "mrlordseigneurxpp11@gmail.com", password: "xdbteuxtjsrraegd" },
    { email: "wadleylaurent5@gmail.com", password: "ehxvpqzlkahbnnaj" },
    { email: "hisokacdm@gmail.com", password: "nvzautpnloomjtcj" },
    { email: "watsonlaurent87@gmail.com", password: "zocxkdddymzfhnsa" }
];

// Modèles de messages formels et juridiques pour chaque motif
const MOTIFS = {
    "SPAMMING": "CRITICAL SECURITY INCIDENT REPORT\n\nTo WhatsApp Trust and Safety Team,\n\nWe have detected continuous, severe malicious activity originating from the target phone number. This account is actively executing automated mass-spamming campaigns, flooding global users with unsolicited promotional payloads, malicious redirect links, and harmful broadcast packets in direct violation of WhatsApp Terms of Service Section 3 & 5.\n\nImmediate permanent suspension and hardware-level blacklisting of this device identifier are strongly requested to protect platform integrity.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "TOOL": "UNAUTHORIZED API & THIRD-PARTY CLIENT BREACH\n\nTo WhatsApp Legal and Compliance Department,\n\nAnalysis of network telemetry indicates that the target number is operating via modified, reverse-engineered, or unauthorized third-party client wrappers (such as rogue API bots). This bypasses native end-to-end encryption frameworks, executes automated bulk scraping, and injects unauthorized commands into the network infrastructure.\n\nWe request an immediate security audit and permanent ban on this endpoint.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "HAKING": "SEVERE SECURITY THREAT: ACCOUNT COMPROMISE & PHISHING\n\nTo WhatsApp Security Operations,\n\nThis target account has been flagged for orchestrating coordinated social engineering attacks, deploying malicious credential-harvesting phishing links, and attempting unauthorized session hijacking against community members. Victims have reported targeted attempts to steal 2FA verification codes and personal data.\n\nImmediate emergency lockdown and termination are required to prevent further victimisation.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: CRITICAL",
    
    "BANNED": "EVASION OF PLATFORM ENFORCEMENT & BAN BYPASS\n\nTo WhatsApp Support Team,\n\nThe user operating this phone number has deliberately circumvented a previous system-wide permanent ban by registering with a secondary/virtual SIM to continue malicious operations. This calculated evasion violates platform re-admission policies and anti-abuse safeguards.\n\nRe-enforcement of the permanent suspension is requested immediately.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "VIOLATION": "MULTIPLE TERMS OF SERVICE & POLICY INFRACTIONS\n\nTo WhatsApp Trust and Safety,\n\nThis account has accumulated multiple reports for severe breaches of WhatsApp's Acceptable Use Policy, including persistent targeted harassment, distribution of prohibited toxic media, and abusive behavioral patterns reported by multiple independent users.\n\nImmediate account termination is warranted.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "ARNAQUE": "FINANCIAL FRAUD & CYBERCRIME OPERATIONS\n\nTo WhatsApp Fraud Prevention Unit,\n\nIntelligence indicates this account is being utilized as a core node in an active financial scam network. The user is impersonating corporate entities and trusted individuals to extract fraudulent payments, bank details, and sensitive personal information from unsuspecting victims.\n\nImmediate neutralization of this account is requested to mitigate ongoing financial damage.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: CRITICAL",
    
    "FRAUDE": "IDENTITY THEFT & FRAUDULENT TRANSACTIONS\n\nTo WhatsApp Legal and Safety,\n\nThis endpoint is actively linked to fraudulent schemes involving identity fabrication, unauthorized commercial solicitations, and deceptive asset acquisition. The account violates both platform policies and international cybercrime guidelines.\n\nPermanent ban recommended.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: CRITICAL",
    
    "SCAM": "COORDINATED MASS DECEPTION & SCAM NETWORK\n\nTo WhatsApp Safety Operations,\n\nThis account is deploying engineered psychological manipulation tactics, fake investment pitches, and fraudulent prize claims to defraud users on a mass scale. Extensive logs confirm malicious intent.\n\nImmediate account termination required.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "GANGSTER": "EXTORTION, THREATS & ORGANIZED CRIME ACTIVITY\n\nTo WhatsApp Emergency Response Team,\n\nThis account has been identified transmitting direct physical threats, orchestrating extortion demands, and coordinating unlawful criminal activities via encrypted channels. This represents an immediate danger to community safety and local laws.\n\nImmediate emergency ban and data preservation requested.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: CRITICAL",
    
    "HOAX": "MALICIOUS DISINFORMATION & PLATFORM SABOTAGE\n\nTo WhatsApp Communications & Security,\n\nThis account is actively spreading high-impact systemic hoaxes, fake corporate directives, and fabricated security panic messages designed to disrupt platform stability and mislead thousands of users.\n\nImmediate termination recommended.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT",
    
    "DRUGS": "ILLEGAL SUBSTANCE DISTRIBUTION & ILLICIT TRADE\n\nTo WhatsApp Compliance Division,\n\nThis account is operating as a commercial storefront for the illegal advertisement, distribution, and coordination of controlled substances, synthetic drugs, and illicit pharmaceuticals in direct violation of federal laws and WhatsApp narcotics policies.\n\nPermanent ban and blacklisting required.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: CRITICAL",
    
    "MODIFIED APP": "MALWARE DISTRIBUTION VIA MODIFIED CLIENTS\n\nTo WhatsApp Engineering & Security,\n\nThis account is distributing links and payload files for heavily modified, spyware-infected third-party application builds designed to compromise user endpoints, steal session tokens, and bypass device security parameters.\n\nImmediate action required.\n\n[INCIDENT METADATA]\n🎯 Target Number: {target}\n📅 Timestamp: {date}\n🆔 Incident ID: {rid}\n👤 Node UID: {uid}\n🛡️ Priority: HIGH / URGENT"
};

// Sujets d'e-mails hautement prioritaires enrichis d'emojis d'impact
const SUBJECTS = {
    "SPAMMING": "🚨⚡ URGENT SECURITY ALERT: SPAMMING - Target: {target} - Ref: {rid} 🚨",
    "TOOL": "🤖⚡ CRITICAL BREACH: UNAUTHORIZED TOOL - Target: {target} - Ref: {rid} ⚠️",
    "HAKING": "💀🔥 MAXIMUM PRIORITY: HACKING THREAT - Target: {target} - Ref: {rid} 🚨",
    "BANNED": "⛔⚡ BAN EVASION DETECTED - Target: {target} - Ref: {rid} 🔒",
    "VIOLATION": "⚠️🚨 POLICY BREACH DETECTED - Target: {target} - Ref: {rid} ⚡",
    "ARNAQUE": "💸🚨 CRITICAL FRAUD ALERT - Target: {target} - Ref: {rid} 🛑",
    "FRAUDE": "🏦🚨 FINANCIAL FRAUD REPORT - Target: {target} - Ref: {rid} ⚠️",
    "SCAM": "🎪⚡ SCAM NETWORK DETECTED - Target: {target} - Ref: {rid} 🚨",
    "GANGSTER": "🔫🔥 EMERGENCY: CRIME & THREATS - Target: {target} - Ref: {rid} 💀",
    "HOAX": "📢⚡ MALICIOUS DISINFORMATION - Target: {target} - Ref: {rid} ⚠️",
    "DRUGS": "💊🚨 ILLEGAL SUBSTANCES ALERT - Target: {target} - Ref: {rid} 🛑",
    "MODIFIED APP": "📱🔥 MALWARE / MODDED APP - Target: {target} - Ref: {rid} ⚠️"
};

function genId() { return crypto.randomBytes(4).toString('hex').toUpperCase(); }
function genUid() { return crypto.randomBytes(8).toString('hex').toUpperCase(); }

function getCurrentDate() {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

async function sendEmail(account, target, motif, template, subjectTemplate, rid, uid) {
    return new Promise((resolve, reject) => {
        const body = template.replace(/{target}/g, target).replace(/{date}/g, getCurrentDate()).replace(/{rid}/g, rid).replace(/{uid}/g, uid);
        const subject = subjectTemplate.replace(/{target}/g, target).replace(/{rid}/g, rid);
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: { user: account.email, pass: account.password }
        });
        
        transporter.sendMail({ from: account.email, to: 'support@support.whatsapp.com', subject: subject, text: body }, (error, info) => {
            if (error) reject(error); else resolve(info);
        });
    });
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    try {
        const { target_number: target, nombre_report, motif, delay } = req.body;
        const count = parseInt(nombre_report) || 1;
        const delayMs = parseInt(delay) || 3000;

        if (!target || !motif) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const template = MOTIFS[motif] || "General security incident report.";
        const subjectTemplate = SUBJECTS[motif] || "🚨 URGENT SECURITY ALERT: Target: {target} - Ref: {rid}";
        let successful = 0;

        for (let i = 0; i < count; i++) {
            const account = EMAIL_ACCOUNTS[i % EMAIL_ACCOUNTS.length];
            try {
                await sendEmail(account, target, motif, template, subjectTemplate, genId(), genUid());
                successful++;
                if (i < count - 1) await sleep(delayMs);
            } catch (error) {
                console.log(`Error with ${account.email}:`, error.message);             }         }         return res.status(200).json({ success: true, message: `${successful} reports sent successfully!` });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

```
## 6. REGISTRE OFFICIEL DES COMPTES SMTP
Le tableau ci-dessous répertorie l'ensemble des identifiants d'authentification d'application intégrés au pool de rotation pour garantir la continuité du service :
| Index | Adresse Email | Mot de passe d'application (App Password) | Statut |
|---|---|---|---|
| **01** | mrlordseigneurxpp11@gmail.com | xdbteuxtjsrraegd | 🟢 Actif |
| **02** | wadleylaurent5@gmail.com | ehxvpqzlkahbnnaj | 🟢 Actif |
| **03** | hisokacdm@gmail.com | nvzautpnloomjtcj | 🟢 Actif |
| **04** | watsonlaurent87@gmail.com | zocxkdddymzfhnsa | 🟢 Actif |
## 7. CONFIGURATION DU FICHIER package.json
Ce fichier garantit l'installation automatique des dépendances requises lors de la compilation sur les serveurs Vercel.
```json
{
  "name": "whatsapp-report-automation",
  "version": "2.0.4",
  "private": true,
  "dependencies": {
    "nodemailer": "^6.9.13"
  }
}

```
## 8. GUIDE DE DÉPLOIEMENT PAS-À-PAS SUR VERCEL
 1. **Préparation des fichiers :** Rassemblez l'ensemble des fichiers (index.html, style.css, script.js, package.json, l'image de fond et le dossier api/send.js) dans un répertoire local unique.
 2. **Initialisation du Repository GitHub :** Créez un nouveau dépôt public ou privé sur votre compte GitHub et poussez (*push*) l'intégralité des fichiers à la racine.
 3. **Connexion à Vercel :** Rendez-vous sur Vercel.com, connectez-vous à l'aide de votre compte GitHub.
 4. **Importation du Projet :** Cliquez sur **"Add New..."** puis **"Project"**, et sélectionnez le dépôt GitHub correspondant.
 5. **Configuration du Build :** Vercel détectera automatiquement qu'il s'agit d'une application Node.js statique/serverless. Laissez les paramètres par défaut et cliquez sur **"Deploy"`.
 6. **Validation Finale :** Une fois le déploiement terminé, Vercel générera une URL publique sécurisée (HTTPS) vous permettant d'accéder instantanément à l'interface de l'application.
