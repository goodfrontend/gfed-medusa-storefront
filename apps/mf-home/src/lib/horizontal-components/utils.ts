import { HTMLRewriter } from "htmlrewriter";
import type { HorizontalComponentConfig, ComponentResources } from "./types";

const SERVICE_URL = "http://localhost:4001";

function extractBodyContent(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  let content = bodyMatch ? bodyMatch[1] ?? '' : html;
  
  return content
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
    .trim();
}

export async function fetchComponentResources(
  config: HorizontalComponentConfig
): Promise<ComponentResources> {
  const [htmlRes, dataRes] = await Promise.all([
    fetch(`${SERVICE_URL}/fragment/${config.name}`),
    fetch(`${SERVICE_URL}/api/${config.name}`)
  ]);

  const html = await htmlRes.text();
  const data = await dataRes.text();

  return {
    html: extractBodyContent(html),
    data,
    config,
  };
}

export async function fetchAllComponentResources(
  configs: HorizontalComponentConfig[]
): Promise<ComponentResources[]> {
  return Promise.all(configs.map(fetchComponentResources));
}

export async function injectHorizontalComponents(
  hostResponse: Response,
  components: ComponentResources[]
): Promise<Response> {
  if (components.length === 0) {
    return hostResponse;
  }

  const scriptTags = `<script defer src="${SERVICE_URL}/dist/horizontal-components-bundle.js"></script>`;
  
  const dataScripts = components
    .map(({ data, config }) => `<script>window.${config.dataVariable}=${data}</script>`)
    .join('\n');

  let rewriter = new HTMLRewriter()
    .on('head', {
      element(el) {
        el.append(`${scriptTags}${dataScripts}`, { html: true });
      },
    });

  for (const comp of components) {
    const { html, config } = comp;
    const stylesheetUrl = `${SERVICE_URL}/dist/horizontal-components-styles.css`;
    
    const shadowContent = `<template shadowrootmode="open"><link rel="stylesheet" href="${stylesheetUrl}">${html}</template>`;
    
    rewriter = rewriter.on(config.elementTag, {
      element(el) {
        try {
          el.setInnerContent(shadowContent, { html: true });
        } catch (e) {
          console.error(`Failed to inject ${config.elementTag}:`, e);
        }
      },
    });
  }

  const transformedResponse = rewriter.transform(hostResponse);
  const newHeaders = new Headers(transformedResponse.headers);
  newHeaders.delete("content-encoding");
  newHeaders.delete("content-length");

  return new Response(transformedResponse.body, {
    status: transformedResponse.status,
    statusText: transformedResponse.statusText,
    headers: newHeaders,
  });
}
