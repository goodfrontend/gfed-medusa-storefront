import {
  fetchAllComponentResources,
  injectHorizontalComponents,
  type HorizontalComponentConfig,
} from "../../../lib/horizontal-components/";

const HORIZONTAL_COMPONENTS: HorizontalComponentConfig[] = [
  {
    name: "header",
    elementTag: "mfe-header",
    dataVariable: "__HEADER_DATA__",
  },
  {
    name: "footer",
    elementTag: "mfe-footer",
    dataVariable: "__FOOTER_DATA__",
  },
];

export async function GET() {
  const hostRes = await fetch("http://localhost:3000/dk");


    const components = await fetchAllComponentResources(HORIZONTAL_COMPONENTS);
  return await injectHorizontalComponents(hostRes, components);
}
