import { defineEnvVars } from '@sveltejs/kit/env';

/** 空文字は未設定として扱う */
const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	MICROCMS_SERVICE_DOMAIN: {
		description: 'microCMS service domain (the `xxx` in xxx.microcms.io)'
	},
	MICROCMS_API_KEY: {
		description: 'microCMS API key'
	},
	CONTACT_TO_EMAIL: {
		schema: optional,
		description: 'Address that receives contact form submissions'
	},
	SMTP_HOST: {
		schema: (value) => value || 'smtp.gmail.com',
		description: 'SMTP host (default: smtp.gmail.com)'
	},
	SMTP_PORT: {
		schema: (value) => {
			const port = Number(value || 465);
			if (!Number.isInteger(port)) throw new Error('SMTP_PORT must be an integer');
			return port;
		},
		description: 'SMTP port (default: 465)'
	},
	SMTP_USER: {
		schema: optional,
		description: 'SMTP user'
	},
	SMTP_PASS: {
		schema: optional,
		description: 'SMTP password (e.g. a Gmail app password)'
	},
	RECAPTCHA_SECRET_KEY: {
		schema: optional,
		description: 'reCAPTCHA v3 secret key. When unset, verification is skipped.'
	}
});
