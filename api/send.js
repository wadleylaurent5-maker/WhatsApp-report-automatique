const nodemailer = require('nodemailer');
const crypto = require('crypto');

const EMAIL_ACCOUNTS = [
    { email: "mrlordseigneurxpp11@gmail.com", password: "xdbteuxtjsrraegd" },
    { email: "wadleylaurent5@gmail.com", password: "ehxvpqzlkahbnnaj" },
    { email: "hisokacdm@gmail.com", password: "nvzautpnloomjtcj" },
    { email: "watsonlaurent87@gmail.com", password: "zocxkdddymzfhnsa" }
];

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
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
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
                console.log(`Error with ${account.email}:`, error.message);
            }
        }
        return res.status(200).json({ success: true, message: `${successful} reports sent successfully!` });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
