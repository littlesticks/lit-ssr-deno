import { serve } from 'https://deno.land/std@0.145.0/http/server.ts';
import { router } from 'https://crux.land/router@0.0.12';
// import './simple-greeting.js'

serve(
  router({
    '/': (_req) => {
      return new Response(SSR(), { headers: { 'content-type': 'text/html' } });
    },
  })
);

function SSR() {
  const currentTime = new Date();
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${resetCSS} ${typographyCSS}
        <style>
          body[dsd-pending] {
            display: none;
          }
          html,
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
          }
          main {
            margin: 0 auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            max-width: 800px;
            align-items: center;
            justify-content: center;
          }
          p {
            margin-bottom: 2rem;
          }
          pre code {
            padding: 0.5rem 1rem;
            background-color: black;
            color: white;
            border-radius: 0.5rem;
          }
        </style>
      </head>
      <body dsd-pending>
        <script>
          if (HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
            // This browser has native declarative shadow DOM support, so we can
            // allow painting immediately.
            document.body.removeAttribute('dsd-pending');
          }
        </script>
        <main>
          <h1>Lit SRR + Deno </h1>
          <p>This page was server side rendered at:</p>
          <time>
            <pre><code>${currentTime}</code></pre>
          </time>
          <simple-greeting></simple-greeting>
        </main>
        <script type="module">
        // Start fetching the Lit hydration support module (note the absence
        // of "await" -- we don't want to block yet).
        const litHydrateSupportInstalled = import(
          'https://cdn.skypack.dev/lit@2.3.1/experimental-hydrate-support.js'
        );

        if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRoot')) {
          // Fetch the declarative shadow DOM polyfill.
          const {hydrateShadowRoots} = await import(
            'https://cdn.skypack.dev/@webcomponents/template-shadowroot/template-shadowroot.js'
          );

          // Apply the polyfill. This is a one-shot operation, so it is important
          // it happens after all HTML has been parsed.
          hydrateShadowRoots(document.body);

          // At this point, browsers without native declarative shadow DOM
          // support can paint the initial state of your components!
          document.body.removeAttribute('dsd-pending');
        }
        await litHydrateSupportInstalled;

        // Import component modules causing them to become interactive
        import('./simple-greeting.js');
      </script>
      </body>
    </html>
  `;
}

const resetCSS = `<style>:where(:not(html,iframe,canvas,img,svg,video,audio):not(svg *,symbol *)){all:unset;display:revert}*,::after,::before{box-sizing:border-box}a,button{cursor:revert}menu,ol,ul{list-style:none}img{max-width:100%}table{border-collapse:collapse}input,textarea{-webkit-user-select:auto}textarea{white-space:revert}meter{-webkit-appearance:revert;appearance:revert}::placeholder{color:unset}:where([hidden]){display:none}:where([contenteditable]:not([contenteditable=false])){-moz-user-modify:read-write;-webkit-user-modify:read-write;overflow-wrap:break-word;-webkit-line-break:after-white-space;-webkit-user-select:auto}:where([draggable=true]){-webkit-user-drag:element}</style>`;
const typographyCSS = `<style>
:root {
  --font-size-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --font-size-md: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --font-size-lg: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
  --font-size-xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
  --font-size-xxl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
  --font-size-xxxl: clamp(3.05rem, 3.54vw + 2.17rem, 5rem);
}

h1 {
  font-size: var(--font-size-xxl);
}
</style>`;
