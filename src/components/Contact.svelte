<section id="a04" class="contact">
    <div class="container">
    <h1>Contact</h1>
    <form use:form class="form-box" data-aos="fade-up">
        <div class="form-item">
            <input id="name" name="name" placeholder="Name" aria-describedby="error-name-required" autocomplete="name">
            {#if $errors.name}
            <span id="error-name-required" aria-live="assertive">
                {$errors.name}
            </span>
            {/if}
            <input id="email" name="email" type="email" placeholder="Email" aria-describedby="error-email-required" autocomplete="email">
            {#if $errors.email}
            <span id="error-email-required" aria-live="assertive">
                {$errors.email}
            </span>
            {/if}
            <textarea id="message" name="message" placeholder="Message" aria-describedby="error-message-required"></textarea>
            {#if $errors.message}
            <span id="error-message-required" aria-live="assertive">
                {$errors.message}
            </span>
            {/if}
            <button type="submit">Submit</button>
        </div>
    </form>
    <p class="reCAPTCHA">This site is protected by reCAPTCHA and the Google<br>
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
    </div>
</section>

<script lang="ts">
    import { goto } from '$app/navigation'
    import { createForm } from 'felte'
  
    type FormValues = {
      name: string
      email: string
      message: string
      googleReCaptchaToken: string
    }
  
    const { form, errors } = createForm<FormValues>({
      validate: (values) => {
        const errors: Record<string, string> = {}
        if (!values.name) {
          errors.name = 'Name is required'
        }
        if (!values.email) {
          errors.email = 'Email is required'
        }
        if (!values.message) {
          errors.message = 'Message is required'
        }
        return errors
      },
      onSubmit: async (values) => {
        grecaptcha.ready(() => {
            grecaptcha
            .execute('6LeqhF0oAAAAADkJSBBJpobIpl-lVdijocIIDBrB', { action: 'submit' })
            .then(async (token) => {
                values.googleReCaptchaToken = token

                const formData = new FormData()
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value)
                })

                try {
                    const response = await sendRequest(formData)
                if (response.ok) {
                    goto('/thanks')
                } else {
                    goto('/error')
                }
                } catch (err) {
                    goto('/error')
                }
            })
        })

        const sendRequest = async (formData: FormData) => {
            return await fetch('https://shim.form.newt.so/v1/ZouLTYvKM', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            })
        }
      }
    })
</script>
<svelte:head>
<script
    src="https://www.google.com/recaptcha/api.js?render=6LeqhF0oAAAAADkJSBBJpobIpl-lVdijocIIDBrB&hl=ja"
    async
    defer
></script>
</svelte:head>