import { hydrateRoot } from 'react-dom/client';

import {
  COMPONENT_REGISTRY,
  type ComponentDefinition,
} from '../config/components';

export function createHorizontalComponentElement(
  definition: ComponentDefinition
) {
  const { component: Component, dataVariable, elementTag } = definition;

  class HorizontalComponentElement extends HTMLElement {
    connectedCallback() {
      if (this.getAttribute('mounted') === 'true') return;
      this.setAttribute('mounted', 'true');

      // @ts-ignore
      const serverData = window[dataVariable];

      let shadowRoot = this.shadowRoot;
      if (!shadowRoot) shadowRoot = this.attachShadow({ mode: 'open' });

      const container = shadowRoot.querySelector(`#root-${elementTag}`);
      if (!container) return;

      hydrateRoot(container, <Component {...(serverData ?? {})} />);
    }
  }

  return HorizontalComponentElement;
}

export function registerAllComponents() {
  COMPONENT_REGISTRY.forEach((definition) => {
    const ElementClass = createHorizontalComponentElement(definition);

    if (!customElements.get(definition.elementTag))
      customElements.define(definition.elementTag, ElementClass);
  });
}
