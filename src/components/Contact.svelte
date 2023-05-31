
<svelte:head>
  <title>Newt・SvelteKitフォーム</title>
  <meta name="description" content="NewtとSvelteKitを利用した問い合わせフォームです" />
</svelte:head>
<section id="a04" class="contact">
    <div class="container">
    <h1>Contact</h1>
    <form class="form-box" data-aos="fade-up" action="https://shim.form.newt.so/v1/vUf_6rML6" method="post">
        <div class="form-item">
            <input id="name" name="name" placeholder="Name" autocomplete="name" required>
            <input id="email" name="email" type="email" placeholder="Email" autocomplete="email" required>
            <textarea id="message" name="message" placeholder="Message" required></textarea>
            <button type="submit">Submit</button>
        </div>
    </form>
    </div>
</section>