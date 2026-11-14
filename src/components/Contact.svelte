<script lang="ts">
	import { createForm } from 'felte';
	import { reveal } from '$lib/reveal';

	const SITE_KEY = '6LeqhF0oAAAAADkJSBBJpobIpl-lVdijocIIDBrB';
	const MAX = 1000;

	type FormValues = {
		name: string;
		email: string;
		message: string;
		googleReCaptchaToken: string;
	};

	let sent = $state(false);
	let failed = $state(false);
	let messageLength = $state(0);

	const getToken = () =>
		new Promise<string>((resolve, reject) => {
			grecaptcha.ready(() => {
				grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(resolve, reject);
			});
		});

	const { form, errors, isSubmitting } = createForm<FormValues>({
		validate: (values) => {
			const errors: Partial<Record<keyof FormValues, string>> = {};
			if (!values.name?.trim()) errors.name = 'Name is required';
			if (!values.email?.trim()) errors.email = 'Email is required';
			else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
				errors.email = 'Please enter a valid email';
			if (!values.message?.trim()) errors.message = 'Message is required';
			return errors;
		},
		onSubmit: async (values) => {
			failed = false;
			try {
				values.googleReCaptchaToken = await getToken();
				const response = await fetch('/api/contact', {
					method: 'POST',
					body: JSON.stringify(values),
					headers: { 'Content-Type': 'application/json' }
				});
				if (response.ok) sent = true;
				else failed = true;
			} catch {
				failed = true;
			}
		},
		onError: () => {
			// 最初のエラー項目へフォーカス
			queueMicrotask(() =>
				document.querySelector<HTMLElement>('.form [aria-invalid="true"]')?.focus()
			);
		}
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={SITE_KEY}&hl=ja" async defer></script>
</svelte:head>

<section class="section section--dark" id="contact">
	<div class="container">
		<div class="section-head reveal" use:reveal>
			<span class="section-head__num">04</span>
			<h2 class="section-head__title">Contact</h2>
			<p class="section-head__sub">お問い合わせ</p>
		</div>
		<div class="contact__wrap">
			<div class="contact__intro reveal" data-reveal="left" use:reveal>
				<h3>Let's work together.</h3>
				<p>
					サイト制作・改修のご相談やご質問など、お気軽にお問い合わせください。通常2営業日以内にご返信します。
				</p>
				<ul class="contact__list">
					<li>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg
						>返信目安:2営業日以内
					</li>
					<li>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
							><path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" /></svg
						>reCAPTCHA で保護されています
					</li>
				</ul>
			</div>
			<form use:form class="form reveal" class:is-sent={sent} data-reveal="right" use:reveal novalidate>
				<div class="form__fields">
					<div class="field" class:is-error={$errors.name}>
						<input
							id="name"
							name="name"
							placeholder=" "
							autocomplete="name"
							aria-describedby="err-name"
							aria-invalid={!!$errors.name}
							required
						/>
						<label for="name">Name</label>
						<p class="field__error" id="err-name" aria-live="polite">{$errors.name ?? ''}</p>
					</div>
					<div class="field" class:is-error={$errors.email}>
						<input
							id="email"
							name="email"
							type="email"
							placeholder=" "
							autocomplete="email"
							aria-describedby="err-email"
							aria-invalid={!!$errors.email}
							required
						/>
						<label for="email">Email</label>
						<p class="field__error" id="err-email" aria-live="polite">{$errors.email ?? ''}</p>
					</div>
					<div class="field" class:is-error={$errors.message}>
						<textarea
							id="message"
							name="message"
							placeholder=" "
							maxlength={MAX}
							aria-describedby="err-message"
							aria-invalid={!!$errors.message}
							required
							oninput={(e) => (messageLength = e.currentTarget.value.length)}
						></textarea>
						<label for="message">Message</label>
						<span class="field__count" aria-hidden="true">{messageLength} / {MAX}</span>
						<p class="field__error" id="err-message" aria-live="polite">{$errors.message ?? ''}</p>
					</div>
					{#if failed}
						<p class="form__error" role="alert">送信に失敗しました。時間をおいて再度お試しください。</p>
					{/if}
					<div class="form__foot">
						<p class="recaptcha">
							This site is protected by reCAPTCHA and the Google<br />
							<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>
							and
							<a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a> apply.
						</p>
						<button type="submit" class="btn btn--primary" disabled={$isSubmitting}>
							{$isSubmitting ? 'Sending…' : 'Submit'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
								><path d="M5 12h14M13 6l6 6-6 6" /></svg
							>
						</button>
					</div>
				</div>
				<div class="form__done" role="status">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
						><circle cx="12" cy="12" r="10" /><path d="m7 12.5 3.2 3L17 9" /></svg
					>
					<h3 style="font-family:var(--font-display);font-weight:400;margin-bottom:8px">Thank you!</h3>
					<p style="color:rgba(226,232,234,.8)">送信が完了しました。内容を確認のうえご連絡します。</p>
				</div>
			</form>
		</div>
	</div>
</section>
