/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
const injectScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  };
  
  const injectStylesheet = (href) => {
    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  
  exports.onInitialClientRender = () => {
    injectScript("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML");
    injectScript("https://cdn.jsdelivr.net/npm/prismjs@1.23.0/components/prism-core.min.js");
    injectScript("https://cdn.jsdelivr.net/npm/prismjs@1.23.0/plugins/autoloader/prism-autoloader.min.js");
    injectStylesheet("https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism.css");
  
    window.MathJax = {
      tex2jax: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
        processEscapes: true,
      },
      TeX: {
        extensions: ["AMSmath.js", "AMSsymbols.js"],
      },
      showMathMenu: false,
    };
  };
  
  exports.onRouteUpdate = () => {
    if (typeof window.MathJax !== "undefined") {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
    if (typeof window.Prism !== "undefined") {
      window.Prism.highlightAll();
    }
  };
  
  