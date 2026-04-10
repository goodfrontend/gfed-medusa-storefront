export default async function MainLayout(props: { children: React.ReactNode }) {
  const { WebComponent } =
    await import('@gfed-medusa/sf-lib-common/components/web-component');

  return (
    <div className="flex min-h-screen flex-col">
      <WebComponent tag="mfe-header">
        <WebComponent tag="mfe-cart" slot="cart" />
      </WebComponent>
      <main className="flex-1">{props.children}</main>
      <WebComponent tag="mfe-footer" />
    </div>
  );
}
