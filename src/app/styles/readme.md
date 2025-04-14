ви можете додати новий колір до свого проекту, визначивши змінну теми, наприклад --color-mint-500:

@theme {
--color-_ Кольорові утиліти, такі як bg-red-500, text-sky-300та багато інших
--font-_ Утиліти сімейства шрифтів, якfont-sans
--text-_ Такі утиліти розміру шрифтуtext-xl
--font-weight-_ Такі утиліти, як вага шрифтуfont-bold
--tracking-_ Утиліти міжлітерного інтервалу, якtracking-wide
--leading-_ Такі утиліти, як висота рядкаleading-tight
--breakpoint-_ Чуйні варіанти точки зупину, якsm:_
--container-* Варіанти запитів контейнерів, як @sm:*і утиліти розміру, якmax-w-md
--spacing-_ Утиліти встановлення інтервалів і розмірів, такі як px-4, max-h-16та багато інших
--radius-_ Утиліти радіусу кордону, якrounded-sm
--shadow-_ Box shadow утиліти типуshadow-md
--inset-shadow-_ Утиліти тіні вставного поля, якinset-shadow-xs
--drop-shadow-_ Такі утиліти фільтрування тіні, якdrop-shadow-md
--blur-_ Утиліти фільтрів розмиття, якblur-md
--perspective-_ Перспективні утиліти типуperspective-near
--aspect-_ Такі утиліти, як співвідношення сторінaspect-video
--ease-_ Утиліти функції визначення часу переходу, якease-out
--animate-_ Утиліти для анімації, якanimate-spin

--animate-fade-in-scale: fade-in-scale 0.3s ease-out;
@keyframes fade-in-scale {
0% {
opacity: 0;
transform: scale(0.95);
}
100% {
opacity: 1;
transform: scale(1);
}
}

}

Використання

<div class="bg-mint-500 font-Fira"  style="background-color: var(--color-mint-500)"/>

Визначення звичайних змінних CSS :rootможе бути корисним у проектах Tailwind, коли ви хочете визначити змінну, яка не призначена для підключення до службового класу. Використовуйте @theme, коли ви хочете, щоб маркер дизайну зіставлявся безпосередньо з класом корисності, і використовуйте :root для визначення звичайних змінних CSS, які не повинні мати відповідні класи корисності.

\*: -Styling direct children

inert -Styling inert elements

<div inert class="inert:opacity-50" />

has ---
Ви можете використовувати has-\*з псевдокласом, наприклад has-[:focus], щоб стилізувати елемент на основі стану його нащадків. Ви також можете використовувати селектори елементів, наприклад has-[img]або has-[a], щоб стилізувати елемент на основі вмісту його нащадків.

Якщо вам потрібно створити стиль для елемента на основі нащадків батьківського елемента, ви можете позначити батьківського елемента класом group використати group-has-\*варіант для стилізації цільового елемента:

in ----
Варіант in-\*працює так само, groupза винятком того, що вам не потрібно додавати groupдо батьківського елемента:

<div tabindex="0" class="group">
  <div class="opacity-50 group-focus:opacity-100">

<div tabindex="0">
  <div class="opacity-50 in-focus:opacity-100">
    <!-- ... -->
  </div>
</div>

peer-----
Якщо вам потрібно стилізувати елемент на основі стану однорідного елемента, позначте братський клас класом peerі використовуйте peer-\*такі варіанти, як peer-invalidстиль цільового елемента:
Важливо зауважити, що peerмаркер можна використовувати лише для попередніх елеентів
<input type="email" class="peer ..." />

<p class="invisible peer-invalid:visible ...">

file----
<input
  type="file"
  class="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
/>

data----

<div data-size="large" class="data-[size=large]:p-8">

\*-----
Стилізація прямих дітей

  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">

\*\*------
Як і \*, **варіант можна використовувати для стилізації дочірніх елементів елемента. Основна відмінність полягає в тому, що **стилі будуть застосовані до всіх нащадків, а не лише до прямих дітей.

<ul class="**:data-avatar:size-12 **:data-avatar:rounded-full ...">
  {#each items as item}
    <li>
      <img src={item.src} data-avatar />
      <p>{item.name}</p>
    </li>
  {/each}
</ul>

target----
add style if url = `....#about`

 <div id="about" className="target:shadow-lg ...">
