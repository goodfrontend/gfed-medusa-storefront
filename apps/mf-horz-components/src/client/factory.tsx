import { createRoot } from 'react-dom/client';
import { COMPONENT_REGISTRY, type ComponentDefinition } from '../config/components';

export function createHorizontalComponentElement(definition: ComponentDefinition) {
  const { component: Component, dataVariable } = definition;

  class HorizontalComponentElement extends HTMLElement {
    connectedCallback() {
      if (this.getAttribute('mounted') === 'true') return;
      this.setAttribute('mounted', 'true');

      // @ts-ignore
      const serverData = window[dataVariable];

      let shadowRoot = this.shadowRoot;
      if (!shadowRoot) {
        shadowRoot = this.attachShadow({ mode: 'open' });
      }

      shadowRoot.innerHTML = '';
      const root = createRoot(shadowRoot);
      
      const serviceUrl = 'http://localhost:4001';
      
      root.render(
        <>
          <link 
            rel="stylesheet" 
            href={`${serviceUrl}/dist/horizontal-components-styles.css`}
          />
          <Component {...(serverData ?? {})} />
        </>
      );
    }
  }

  return HorizontalComponentElement;
}

export function registerAllComponents() {
  COMPONENT_REGISTRY.forEach(definition => {
    const ElementClass = createHorizontalComponentElement(definition);
    
    if (!customElements.get(definition.elementTag)) {
      customElements.define(definition.elementTag, ElementClass);
    }
  });
}

