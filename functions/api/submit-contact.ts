export async function onRequestPost({ request, env }) {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const turnstileToken = formData.get('cf-turnstile-response');

        // 1. Validate Turnstile Token
        const ip = request.headers.get('CF-Connecting-IP');
        const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: '1x0000000000000000000000000000000AA', // Testing Secret Key
                response: turnstileToken,
                remoteip: ip,
            }),
        });

        const turnstileOutcome = await turnstileResult.json();

        if (!turnstileOutcome.success) {
            return new Response(JSON.stringify({ success: false, error: 'Invalid CAPTCHA' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        // 2. Validate Form Data
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ success: false, error: 'Missing fields' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }

        // 3. Send Email (Placeholder logic - requires API Key in Env)
        // In production, you would use fetch() to call SendGrid/Mailgun API here.
        // Example:
        /*
        await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ... })
        });
        */

        // For now, we just simulate success
        return new Response(JSON.stringify({ success: true, message: 'Message received' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}
