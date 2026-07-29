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
