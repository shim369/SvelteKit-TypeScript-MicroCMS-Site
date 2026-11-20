<script lang="ts">
	import { tick } from 'svelte';
	import { createForm } from 'felte';
	import { reveal } from '#lib/reveal.ts';

	const SITE_KEY = '6LeqhF0oAAAAADkJSBBJpobIpl-lVdijocIIDBrB';

	type FormValues = {
		name: string;
		email: string;
		message: string;
		googleReCaptchaToken: string;
	};

	let sent = $state(false);
	let failed = $state(false);

	const getToken = () =>
		new Promise<string>((resolve, reject) => {
			grecaptcha.ready(() => {
				grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(resolve, reject);
			});
		});

	const { form, errors, isSubmitting } = createForm<FormValues>({
		validate: (values) => {
			const errors: Partial<Record<keyof FormValues, string>> = {};
			const name = values.name?.trim() ?? '';
			const email = values.email?.trim() ?? '';
			const message = values.message?.trim() ?? '';
			if (!name) errors.name = 'お名前を入力してください';
			if (!email) errors.email = 'メールアドレスを入力してください';
			else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
				errors.email = 'メールアドレスの形式で入力してください';
			if (message.length < 10) errors.message = '10文字以上で入力してください';
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
		}
	});

	// 送信時にエラーがあれば、最初のエラー項目へフォーカス（felte の検証結果が DOM に反映された後）
	let formEl = $state<HTMLFormElement>();
	const focusFirstError = async () => {
		await new Promise(requestAnimationFrame);
		await tick();
		formEl?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
	};
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={SITE_KEY}&hl=ja" async defer></script>
</svelte:head>

<section class="section contact" id="contact" data-alt="Contact">
	<span class="contact__mark" aria-hidden="true">Hello</span>
	<div class="wrap contact__grid">
		<div class="reveal" use:reveal>
			<span class="head__num">04</span>
			<h2><span>Let's build</span><span>something</span><span>light.</span></h2>
			<p class="contact__lead">
				サイト制作や記事の内容について、お気軽にご連絡ください。内容を確認して、メールでお返事します。
			</p>
		</div>

		{#if sent}
			<div class="form__done" role="status">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
					><circle cx="12" cy="12" r="10" /><path d="m7 12.5 3.2 3L17 9" /></svg
				>
				<h3>Thank you!</h3>
				<p>送信が完了しました。内容を確認のうえ、メールでご連絡します。</p>
			</div>
		{:else}
			<form
				use:form
				class="form reveal"
				style:--d=".1s"
				use:reveal
				novalidate
				bind:this={formEl}
				onsubmit={focusFirstError}
			>
				<div class="field" class:is-invalid={$errors.name}>
					<input
						id="name"
						name="name"
						placeholder=" "
						autocomplete="name"
						aria-describedby="err-name"
						aria-invalid={!!$errors.name}
						required
					/>
					<label for="name">お名前</label>
					<span class="field__err" id="err-name" aria-live="polite">{$errors.name ?? ''}</span>
				</div>
				<div class="field" class:is-invalid={$errors.email}>
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
					<label for="email">メールアドレス</label>
					<span class="field__err" id="err-email" aria-live="polite">{$errors.email ?? ''}</span>
				</div>
				<div class="field" class:is-invalid={$errors.message}>
					<textarea
						id="message"
						name="message"
						placeholder=" "
						maxlength="1000"
						aria-describedby="err-message"
						aria-invalid={!!$errors.message}
						required
					></textarea>
					<label for="message">お問い合わせ内容</label>
					<span class="field__err" id="err-message" aria-live="polite">{$errors.message ?? ''}</span>
				</div>
				{#if failed}
					<p class="form__error" role="alert">送信に失敗しました。時間をおいて再度お試しください。</p>
				{/if}
				<div class="form__foot">
					<p class="form__note">
						reCAPTCHA で迷惑な送信を防いでいます。<br />
						Google の<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
							>プライバシーポリシー</a
						>と<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">利用規約</a
						>が適用されます。
					</p>
					<button class="btn btn--dark" type="submit" disabled={$isSubmitting}>
						{$isSubmitting ? '送信中…' : '送信する'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"
							><path d="M5 12h14M13 6l6 6-6 6" /></svg
						>
					</button>
				</div>
			</form>
		{/if}
	</div>
</section>
