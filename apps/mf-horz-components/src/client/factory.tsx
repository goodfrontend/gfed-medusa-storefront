import { createRoot, hydrateRoot } from 'react-dom/client';

import {
  COMPONENT_REGISTRY,
  type ComponentDefinition,
} from '../config/components';

export function createHorizontalComponentElement(
  definition: ComponentDefinition
) {
  const { component: Component, dataVariable, elementTag } = definition;

  class HorizontalComponentElement extends HTMLElement {
    static get observedAttributes() {
      return ['data-props'];
    }

    private root: ReturnType<typeof createRoot> | null = null;
    private isHydrated: boolean = false;
    private mounted: boolean = false;

    private getServerData() {
      // @ts-expect-error -- dynamic data
      return window[dataVariable] ?? {};
    }

    private getOverrides() {
      const raw = this.getAttribute('data-props');
      if (!raw) {
        return {};
      }

      try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch {
        return {};
      }
    }

    connectedCallback() {
      if (this.mounted) return;
      this.mounted = true;
      this.setAttribute('mounted', 'true');

      let shadowRoot = this.shadowRoot;
      if (!shadowRoot) shadowRoot = this.attachShadow({ mode: 'open' });

      const container = shadowRoot.querySelector(`#root-${elementTag}`);
      if (!container) return;

      const serverData = this.getServerData();
      const overrides = this.getOverrides();

      const props = {
        ...serverData,
        ...overrides,
      };

      this.root = hydrateRoot(container, <Component {...props} />);
      this.isHydrated = true;
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null
    ) {
      if (name !== 'data-props' || oldValue === newValue || !this.mounted) {
        return;
      }

      const serverData = this.getServerData();
      const overrides = this.getOverrides();

      const newProps = {
        ...serverData,
        ...overrides,
      };

      const container = this.shadowRoot?.querySelector(`#root-${elementTag}`);
      if (!container || !this.root) return;

      if (this.isHydrated) {
        this.isHydrated = false;
        container.innerHTML = '';
      }

      if (!this.root) {
        this.root = createRoot(container);
      }

      this.root.render(<Component {...newProps} />);
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
